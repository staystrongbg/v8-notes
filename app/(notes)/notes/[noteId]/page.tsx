import { Separator } from "@/components/ui/separator";
import { getNote } from "@/api/get-note";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { DeleteNoteAction } from "@/components/notes/delete-note-action";
import { unauthorized } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

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
  return (
    <div className="w-full p-4">
      <NoteHeader noteId={noteId} />
      <div className="p-4 max-w-2xl mx-auto flex flex-col gap-16">
        <h2>{note?.title}</h2>
        <p>{note?.text}</p>
        <p>
          {note?.updatedAt.toDateString()},{" "}
          {note?.updatedAt.toTimeString().slice(0, 5)}
        </p>
      </div>
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
