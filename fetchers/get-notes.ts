"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";

export const getNotes = async (userId: string): Promise<Note[]> => {
  return await prisma.note.findMany({
    where: { userId },
  });
};
