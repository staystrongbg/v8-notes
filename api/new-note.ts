"use server";

import prisma from "@/lib/prisma";
import { Note } from "@prisma/client";

export const newNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt" | "user">
): Promise<Note> => {
  return await prisma.note.create({
    data: note,
  });
};
