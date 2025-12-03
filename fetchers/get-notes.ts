"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { Note } from "@prisma/client";

export const getNotes = async (
  userId: string,
  filter?: "starred",
  page?: number,
  limit?: number
): Promise<{ notes: Note[]; total: number }> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  const where = {
    userId,
    ...(filter === "starred" && { isStarred: true }),
  };

  const skip = page && limit ? (page - 1) * limit : 0;
  const take = limit;

  const notes = await prisma.note.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
    skip,
    take,
  });

  const total = await prisma.note.count({
    where,
  });

  return { notes, total };
};
