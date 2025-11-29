import { requireUserSession } from "@/lib/require-user-session";
import { getNotes } from "@/fetchers/get-notes";
import { Note } from "@prisma/client";
import { FilterNotes } from "@/components/notes/filter-notes";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesError } from "@/components/notes/NotesError";
import { normalizeNotesFilter } from "@/lib/normalize-notes-filter";

import { Suspense } from "react";
import { NotesGrid } from "@/components/notes/notes-grid";
import { NotesGridLoading } from "@/components/notes/notes-grid-loading";
import MobileMenu from "@/components/layout/mobile-menu";
import { Plus } from "lucide-react";
import Link from "next/link";

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
      <NotesHeader noteCount={noteCount} noteLengthFormat={noteLengthFormat} />
      <MobileMenu noteCount={noteCount} noteLengthFormat={noteLengthFormat} />

      <Suspense fallback={<NotesGridLoading />}>
        <NotesGrid promise={notesPromise} />
      </Suspense>
    </div>
  );
}

const NotesHeader = ({
  noteCount,
  noteLengthFormat,
}: {
  noteCount: number;
  noteLengthFormat: string;
}) => {
  return (
    <header className="xl:w-1/2 w-full items-center justify-between flex sm:flex-row flex-col  p-4 rounded-lg">
      <div className="p-4 flex-col sm:self-start self-center sm:flex hidden gap-2">
        <FilterNotes />
        <p className="text-muted-foreground text-sm">
          You have {noteCount} {noteLengthFormat} in this view.
        </p>
      </div>
      <Link href="/notes/new">
        <div className="flex flex-col items-center gap-2">
          <div className=" h-fit w-fit p-4 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 hover:border-accent/80 hover:text-accent-foreground/80 flex items-center justify-center">
            <Plus className="h-8 w-8" />
          </div>
          <p className="text-sm">New Note</p>
        </div>
      </Link>
    </header>
  );
};
