'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Note, Tag, type Prisma } from '@prisma/client';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

export type NotesSort = 'updated' | 'newest' | 'oldest';

const sortOrder: Record<NotesSort, { updatedAt?: 'desc'; createdAt?: 'desc' | 'asc' }> = {
  updated: { updatedAt: 'desc' },
  newest: { createdAt: 'desc' },
  oldest: { createdAt: 'asc' },
};

export type NotesFilter = 'all' | 'starred' | 'trashed';
export type NoteWithTags = Note & { tags: Tag[] };

export type NoteCounts = {
  all: number;
  starred: number;
  trashed: number;
};

export const getNoteCounts = async (userId: string): Promise<NoteCounts> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  const [all, starred, trashed] = await prisma.$transaction([
    prisma.note.count({ where: { userId, deletedAt: null } }),
    prisma.note.count({ where: { userId, deletedAt: null, isStarred: true } }),
    prisma.note.count({ where: { userId, deletedAt: { not: null } } }),
  ]);

  return { all, starred, trashed };
};

export const getNotes = async (
  userId: string,
  filter?: NotesFilter,
  page?: number,
  limit?: number,
  sort: NotesSort = 'updated',
  query?: string,
  tagName?: string,
): Promise<{ notes: NoteWithTags[]; total: number }> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  const q = query?.trim() || undefined;
  const tag = tagName?.trim().toLowerCase() || undefined;

  // Trashed notes are hidden everywhere except the trash view, which lists
  // only trashed notes and lazily purges anything older than 30 days.
  if (filter === 'trashed') {
    await prisma.note.deleteMany({
      where: {
        userId,
        deletedAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      },
    });
  }

  const where: Prisma.NoteWhereInput = { userId };

  if (filter === 'starred') {
    where.isStarred = true;
  }

  if (filter === 'trashed') {
    where.deletedAt = { not: null };
  } else {
    where.deletedAt = null;
  }

  if (tag) {
    where.tags = { some: { name: tag } };
  }

  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { text: { contains: q, mode: 'insensitive' } },
    ];
  }

  const skip = page && limit ? (page - 1) * limit : 0;
  const take = limit;

  const notes = await prisma.note.findMany({
    where,
    orderBy: sortOrder[sort] ?? sortOrder.updated,
    include: { tags: { orderBy: { name: 'asc' } } },
    skip,
    take,
  });

  const total = await prisma.note.count({
    where,
  });

  return { notes, total };
};
