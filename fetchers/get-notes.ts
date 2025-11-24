"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { Note } from "@prisma/client";

export const getNotes = async (
  userId: string,
  filter?: "starred"
): Promise<Note[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return unauthorized();
  }

  return await prisma.note.findMany({
    where: {
      userId,
      ...(filter === "starred" && { isStarred: true }),
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
};
