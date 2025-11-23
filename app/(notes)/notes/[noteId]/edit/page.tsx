import { EditNoteForm } from "@/components/notes/edit-note-form";
import { getNote } from "@/fetchers/get-note";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
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
    );
  }
  return (
    <div className="w-full">
      <Separator className="my-4" />
      <div className="max-w-xl p-4 mx-auto mt-4">
        <h1>{note?.title}</h1>
        <EditNoteForm note={note} />
      </div>
    </div>
  );
}
