import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { ViewNotes } from "@/components/notes/view-notes";
import { Note } from "@prisma/client";
import { getNotes } from "@/fetchers/get-notes";
import { NotesError } from "@/components/notes/NotesError";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesHeader } from "@/components/notes/notes-header";

type SearchParams = Promise<{ view: string }>;

export default async function StarredNotes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { view } = await searchParams;
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  let notes: Note[] = [];
  try {
    notes = await getNotes(session.user.id, "starred");
  } catch (error) {
    console.error(error);
    return <NotesError />;
  }

  if (!notes || notes.length === 0) {
    return <NoNotes />;
  }

  return (
    <div className="w-full p-4">
      <NotesHeader />
      <ViewNotes view={view} notes={notes} />
    </div>
  );
}
