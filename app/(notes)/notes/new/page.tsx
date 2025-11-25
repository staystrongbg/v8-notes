import { NewNoteForm } from "@/components/notes/new-note-form";
import { requireUserSession } from "@/lib/require-user-session";

export default async function NewNotePage() {
  const session = await requireUserSession();

  return (
    <div className="w-full">
      <div className="max-w-2xl p-4 mx-auto">
        <h1>New Note</h1>
        <NewNoteForm userId={session.user.id} />
      </div>
    </div>
  );
}
