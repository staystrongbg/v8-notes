import { NewNoteForm } from "@/components/notes/new-note-form";
import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";

export default async function NewNotePage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  return (
    <div className="w-full">
      <div className="max-w-2xl p-4 mx-auto">
        <h2>New Note</h2>
        <NewNoteForm userId={session.user.id} />
      </div>
    </div>
  );
}
