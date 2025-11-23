"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";

export const updateNote = async (
  note: Omit<Note, "createdAt" | "updatedAt" | "user">
): Promise<Note> => {
  return await prisma.note.update({
    where: {
      id: note.id,
    },
    data: {
      title: note.title,
      text: note.text,
    },
  });
};
