import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { NewNoteForm } from "@/components/notes/new-note-form";

export default async function NewNotePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  return (
    <div className="h-screen max-w-xl mx-auto">
      <h1>New Note</h1>
      <div className="mt-12">
        <NewNoteForm userId={session.user.id} />
      </div>
    </div>
  );
}
