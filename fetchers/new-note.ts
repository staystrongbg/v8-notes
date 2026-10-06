"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { noteInputSchema } from "@/fetchers/note-input-schema";

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

  const parsed = noteInputSchema.safeParse({ title: note.title, text: note.text });
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await prisma.note.create({
    data: {
      title: parsed.data.title,
      text: parsed.data.text,
      userId: session.user.id,
      isStarred: false,
    },
  });
  revalidatePath("/notes");
};
