import { NoteContent } from "@/components/notes/note-content";
import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { GeekyBackdrop, GeekyPrompt } from "@/components/shared/terminal";

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();
  const { noteId } = await params;
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes open <span className="text-foreground">./notes/{noteId.slice(0, 8)}…</span>
        </GeekyPrompt>
        <NoteContent noteId={noteId} />
      </div>
    </div>
  );
}
