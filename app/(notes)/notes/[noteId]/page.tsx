import { NoteContent } from "@/components/notes/note-content";
import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();
  const { noteId } = await params;
  return (
    <div className="max-w-6xl p-4 mx-auto">
      <NoteContent noteId={noteId} />
    </div>
  );
}
