import { getNote } from "@/fetchers/get-note";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { DeleteNoteAction } from "@/components/notes/delete-note-action";
import { NoteContent } from "@/components/notes/note-content";
import { StarredNote } from "@/components/notes/starred-note";
import { requireUserSession } from "@/lib/require-user-session";
import { NotesError } from "@/components/notes/NotesError";
import { unauthorized } from "next/navigation";

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return <NotesError message="Note not found" />;
  }

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <NoteHeader noteId={noteId} isStarred={note.isStarred} />
      <NoteContent note={note} />
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
    <header className="w-full mb-8 flex justify-between items-center">
      <Link href="/notes" className="text-gray-500 flex items-center gap-2">
        <ArrowLeftIcon className="h-4 w-4" />
        Back to notes
      </Link>
      <div className="flex items-center gap-2">
        <StarredNote noteId={noteId} isStarred={isStarred} />
        <DeleteNoteAction noteId={noteId} />
        <Link href={`/notes/${noteId}/edit`}>
          <Button
            variant={"tertiary"}
            size={"default"}
            type="button"
            className=""
          >
            <PencilIcon />
            <span className="sm:flex hidden justify-center">Edit note</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
