import { getNote } from "@/fetchers/get-note";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { DeleteNoteAction } from "@/components/notes/delete-note-action";
import { NoteContent } from "@/components/notes/note-content";
import { StarredNote } from "@/components/notes/starred-note";
import { requireUserSession } from "@/lib/require-user-session";
import { NotesError } from "@/components/notes/NotesError";

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  await requireUserSession();

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return <NotesError message="Note not found" />;
  }

  return (
    <div className="w-full p-4">
      <NoteHeader noteId={noteId} isStarred={note.isStarred} />
      <div className="max-w-2xl p-4 mx-auto">
        <NoteContent note={note} />
      </div>
    </div>
  );
}

const NoteHeader = ({
  noteId,
  isStarred,
}: {
  noteId: string;
  isStarred: boolean;
}) => {
  return (
    <header className="w-full flex justify-between items-center">
      <Link href="/notes" className="text-gray-500 flex items-center gap-2">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to notes
      </Link>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <StarredNote noteId={noteId} isStarred={isStarred} />
        <DeleteNoteAction noteId={noteId} />
        <Button variant={"tertiary"} size={"lg"} asChild>
          <div className="flex items-center gap-2">
            <PencilIcon className="mr-2 h-4 w-4" />
            <Link href={`/notes/${noteId}/edit`}>Edit note</Link>
          </div>
        </Button>
      </div>
    </header>
  );
};
