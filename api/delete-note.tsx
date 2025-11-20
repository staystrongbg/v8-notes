"use server";

import prisma from "@/lib/prisma";

export const deleteNote = async (noteId: string) => {
  await prisma.note.delete({
    where: {
      id: noteId,
    },
  });
};
