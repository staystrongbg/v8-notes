"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Note } from "@prisma/client";
import { noteInputSchema } from "@/fetchers/note-input-schema";
import { extractHashtags } from "@/lib/tags";
import { applyTags } from "@/fetchers/tags";

export const updateNote = async (
  note: Omit<Note, "createdAt" | "updatedAt" | "user" | "deletedAt"> & { tags?: string[] }
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

  const updatedNote = await prisma.$transaction(async tx => {
    const saved = await tx.note.update({
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
    await applyTags(tx, note.id, session.user.id, [
      ...(note.tags ?? []),
      ...extractHashtags(parsed.data.text),
    ]);
    return saved;
  });
  revalidatePath("/notes");
  return updatedNote;
};
