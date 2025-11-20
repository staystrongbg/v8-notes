"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";

export const getNote = async (id: string): Promise<Note | null> => {
  return await prisma.note.findUnique({
    where: {
      id,
    },
  });
};
