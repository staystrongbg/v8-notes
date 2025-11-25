import { requireUserSession } from "@/lib/require-user-session";
import { getNotes } from "@/fetchers/get-notes";
import { Note } from "@prisma/client";
import { FilterNotes } from "@/components/notes/filter-notes";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesError } from "@/components/notes/NotesError";
import { normalizeNotesFilter } from "@/lib/normalize-notes-filter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Suspense } from "react";
import { NotesGrid } from "@/components/notes/notes-grid";
import { NotesGridLoading } from "@/components/notes/notes-grid-loading";

type PageProps = {
  searchParams: Promise<{ filter?: string | string[] }>;
};

export default async function Notes({ searchParams }: PageProps) {
  const session = await requireUserSession();

  const { filter } = await searchParams;
  const { isStarredFilter, activeFilter } = normalizeNotesFilter(filter);

  let notesPromise: Promise<Note[]>;
  let notes: Note[] = [];
  try {
    notesPromise = getNotes(session.user.id, isStarredFilter);
    notes = await notesPromise; // Await for count and empty check
  } catch (error) {
    console.error(error);
    return <NotesError />;
  }

  if (!notes || notes.length === 0) {
    return <NoNotes variant={activeFilter} />;
  }

  const noteCount = notes.length;
  const noteLengthFormat = noteCount === 1 ? "note" : "notes";

  return (
    <div className="w-full p-4">
      <NotesHeader />
      <div className="flex justify-around px-8 py-4">
        <FilterNotes />
        <p className="text-muted-foreground text-center">
          You have {noteCount} {noteLengthFormat} in this view.
        </p>
      </div>

      <Suspense fallback={<NotesGridLoading />}>
        <NotesGrid promise={notesPromise} />
      </Suspense>
    </div>
  );
}

const NotesHeader = () => {
  return (
    <header className="w-full flex justify-center flex-col items-center">
      <Button variant={"tertiary"} asChild title="Add new note">
        <div className="flex items-center gap-2">
          <Newspaper className="mr-2 h-4 w-4" />
          <Link href="/notes/new">Add new note</Link>
        </div>
      </Button>
    </header>
  );
};
