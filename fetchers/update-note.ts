"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Note } from "@prisma/client";
import { noteInputSchema } from "@/fetchers/note-input-schema";

export const updateNote = async (
  note: Omit<Note, "createdAt" | "updatedAt" | "user" | "deletedAt">
): Promise<Note> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  const parsed = noteInputSchema.safeParse({ title: note.title, text: note.text });
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: note.id,
      userId: session.user.id,
    },
    data: {
      title: parsed.data.title,
      text: parsed.data.text,
      isStarred: note.isStarred,
    },
  });
  revalidatePath("/notes");
  return updatedNote;
};
