'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

import { normalizeTagNames } from '@/lib/tags';
import type { Prisma } from '@prisma/client';

const requireOwner = async (userId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  return session;
};

export const getTags = async (userId: string, includeTrashed = false) => {
  await requireOwner(userId);

  return prisma.tag.findMany({
    where: { userId },
    include: {
      _count: {
        select: { notes: includeTrashed ? true : { where: { deletedAt: null } } },
      },
    },
    orderBy: { name: 'asc' },
  });
};

/** Tag writes against a transaction client — lets callers share one atomic unit. */
export const applyTags = async (
  tx: Prisma.TransactionClient,
  noteId: string,
  userId: string,
  names: string[]
) => {
  const normalized = normalizeTagNames(names);

  const note = await tx.note.findFirst({
    where: { id: noteId, userId, deletedAt: null },
    select: { id: true },
  });
  if (!note) throw new Error('Note not found');

  await tx.note.update({
    where: { id: noteId },
    data: { tags: { set: [] } },
  });

  for (const name of normalized) {
    const tag = await tx.tag.upsert({
      where: { userId_name: { userId, name } },
      create: { userId, name },
      update: {},
      select: { id: true },
    });
    await tx.note.update({
      where: { id: noteId },
      data: { tags: { connect: { id: tag.id } } },
    });
  }

  await tx.tag.deleteMany({
    where: { userId, notes: { none: {} } },
  });
};

export const setNoteTags = async (noteId: string, userId: string, names: string[]) => {
  await requireOwner(userId);

  await prisma.$transaction(async tx => {
    await applyTags(tx, noteId, userId, names);
  });

  revalidatePath('/notes');
};
