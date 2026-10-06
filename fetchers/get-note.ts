"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { Note } from "@prisma/client";

export const getNote = async (id: string): Promise<Note | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  return await prisma.note.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });
};
