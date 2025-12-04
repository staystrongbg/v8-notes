import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { ViewNotes } from "@/components/notes/view-notes";
import { Note } from "@prisma/client";
import { getNotes } from "@/fetchers/get-notes";
import { NotesError } from "@/components/notes/NotesError";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesHeader } from "@/components/notes/notes-header";
import { NotesPagination } from "@/components/notes/notes-pagination";

type SearchParams = Promise<{ view?: string; page?: string }>;

export default async function StarredNotes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { view, page } = await searchParams;
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  const pageNum = parseInt(page || "1") || 1;
  const limit = 6;

  let notes: Note[] = [];
  let total = 0;
  try {
    const result = await getNotes(session.user.id, "starred", pageNum, limit);
    notes = result.notes;
    total = result.total;
  } catch (error) {
    console.error(error);
    return <NotesError />;
  }

  if (!notes || notes.length === 0) {
    return <NoNotes />;
  }

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <NotesHeader />
      <ViewNotes view={view} notes={notes} />
      <NotesPagination total={total} limit={limit} currentPage={pageNum} />
    </div>
  );
}
