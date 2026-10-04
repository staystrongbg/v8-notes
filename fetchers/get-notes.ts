'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Note } from '@prisma/client';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

export type NotesSort = 'updated' | 'newest' | 'oldest';

const sortOrder: Record<NotesSort, { updatedAt?: 'desc'; createdAt?: 'desc' | 'asc' }> = {
  updated: { updatedAt: 'desc' },
  newest: { createdAt: 'desc' },
  oldest: { createdAt: 'asc' },
};

export const getNotes = async (
  userId: string,
  filter?: 'all' | 'starred',
  page?: number,
  limit?: number,
  sort: NotesSort = 'updated',
): Promise<{ notes: Note[]; total: number }> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  const where = {
    userId,
    ...(filter === 'starred' && { isStarred: true }),
  };

  const skip = page && limit ? (page - 1) * limit : 0;
  const take = limit;

  const notes = await prisma.note.findMany({
    where,
    orderBy: sortOrder[sort] ?? sortOrder.updated,
    skip,
    take,
  });

  const total = await prisma.note.count({
    where,
  });

  return { notes, total };
};
