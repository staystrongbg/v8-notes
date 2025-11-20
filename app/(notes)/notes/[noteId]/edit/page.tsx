import { EditNoteForm } from "@/components/notes/edit-note-form";
import { getNote } from "@/api/get-note";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

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
