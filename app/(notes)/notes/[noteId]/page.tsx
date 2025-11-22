import { Separator } from "@/components/ui/separator";
import { getNote } from "@/api/get-note";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, NotebookIcon, PencilIcon } from "lucide-react";
import { DeleteNoteAction } from "@/components/notes/delete-note-action";
import { unauthorized } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NoteContent } from "@/components/notes/note-content";
import { Suspense } from "react";
import { NoteContentLoading } from "@/components/notes/note-content-loading";

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
        <NotebookIcon className="h-16 w-16 text-gray-200" />
        <h1>Failed to load note</h1>
        <p className="text-gray-600">Please try again later.</p>
        <Button variant={"tertiary"} asChild>
          <Link href="/notes">Retry</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full p-4">
      <NoteHeader noteId={noteId} />
      <Suspense fallback={<NoteContentLoading />}>
        <NoteContent note={note} />
      </Suspense>
    </div>
  );
}

const NoteHeader = ({ noteId }: { noteId: string }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Link href="/notes" className="text-gray-500 flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to notes
        </Link>
        <div className="flex items-center gap-2">
          <DeleteNoteAction noteId={noteId} />
          <Button variant={"tertiary"} size={"lg"} asChild>
            <div className="flex items-center gap-2">
              <PencilIcon className="mr-2 h-4 w-4" />
              <Link href={`/notes/${noteId}/edit`}>Edit note</Link>
            </div>
          </Button>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
};
