'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Note, Tag } from '@prisma/client';
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

  const where = {
    userId,
    ...(filter === 'starred' && { isStarred: true }),
    ...(filter === 'trashed' ? { deletedAt: { not: null } } : { deletedAt: null }),
    ...(tag && { tags: { some: { name: tag } } }),
    ...(q && {
      OR: [
        { title: { contains: q, mode: 'insensitive' as const } },
        { text: { contains: q, mode: 'insensitive' as const } },
      ],
    }),
  };

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
