"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Note } from "@prisma/client";

const requireOwner = async (userId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  return session;
};

export const trashNote = async (noteId: string, userId: string): Promise<Note> => {
  await requireOwner(userId);

  const trashedNote = await prisma.note.update({
    where: {
      id: noteId,
      userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  revalidatePath("/notes");
  return trashedNote;
};

export const restoreNote = async (noteId: string, userId: string): Promise<Note> => {
  await requireOwner(userId);

  const restoredNote = await prisma.note.update({
    where: {
      id: noteId,
      userId,
    },
    data: {
      deletedAt: null,
    },
  });
  revalidatePath("/notes");
  return restoredNote;
};

export const purgeNote = async (noteId: string, userId: string): Promise<Note> => {
  await requireOwner(userId);

  const purgedNote = await prisma.note.delete({
    where: {
      id: noteId,
      userId,
    },
  });
  revalidatePath("/notes");
  return purgedNote;
};
