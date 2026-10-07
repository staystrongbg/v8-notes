"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";
import { noteInputSchema } from "@/fetchers/note-input-schema";
import { extractHashtags } from "@/lib/tags";
import { applyTags } from "@/fetchers/tags";

export const newNote = async (note: {
  userId: string;
  title: string;
  text: string;
  tags?: string[];
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

  await prisma.$transaction(async tx => {
    const saved = await tx.note.create({
      data: {
        title: parsed.data.title,
        text: parsed.data.text,
        userId: session.user.id,
        isStarred: false,
      },
    });
    await applyTags(tx, saved.id, session.user.id, [
      ...(note.tags ?? []),
      ...extractHashtags(parsed.data.text),
    ]);
    return saved;
  });
  revalidatePath('/notes');
};
