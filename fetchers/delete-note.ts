"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Note } from "@prisma/client";

export const deleteNote = async (noteId: string): Promise<Note> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  const deletedNote = await prisma.note.delete({
    where: {
      id: noteId,
      userId: session.user.id,
    },
  });
  revalidatePath("/notes");
  return deletedNote;
};
