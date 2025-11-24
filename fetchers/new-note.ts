"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";

export const newNote = async (note: {
  userId: string;
  title: string;
  text: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  await prisma.note.create({
    data: {
      title: note.title,
      text: note.text,
      userId: session.user.id,
      isStarred: false,
    },
  });
  revalidatePath("/notes");
};
