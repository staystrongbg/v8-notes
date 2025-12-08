"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";

export const removeNoteFromStarred = async (noteId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return unauthorized();
  }
  await prisma.note.update({
    where: {
      id: noteId,
      userId: session.user.id,
    },
    data: {
      isStarred: false,
    },
  });
  revalidatePath("/notes");
};
