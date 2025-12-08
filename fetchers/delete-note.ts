"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";

export const deleteNote = async (noteId: string): Promise<Note> => {
  return await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
};
