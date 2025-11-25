import { getNote } from "@/fetchers/get-note";
import { requireUserSession } from "@/lib/require-user-session";
import { NotesError } from "@/components/notes/NotesError";
import EditNoteForm from "@/components/notes/edit-note-form";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  await requireUserSession();

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return <NotesError message="Note not found" />;
  }
  return (
    <div className="w-full">
      <div className="max-w-2xl p-4 mx-auto">
        <h1>{note?.title}</h1>
        <EditNoteForm note={note} />
      </div>
    </div>
  );
}
