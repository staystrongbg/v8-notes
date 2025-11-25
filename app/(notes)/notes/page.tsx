import { requireUserSession } from "@/lib/require-user-session";
import { getNotes } from "@/fetchers/get-notes";
import NoteCard from "@/components/notes/note-card";

import { Note } from "@prisma/client";

import { FilterNotes } from "@/components/notes/filter-notes";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesError } from "@/components/notes/NotesError";
import { normalizeNotesFilter } from "@/lib/normalize-notes-filter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Suspense } from "react";
import { NoteCardLoading } from "@/components/notes/note-card-loading";
//TODO infinite scroll
//TODO implement RTE

type PageProps = {
  searchParams: Promise<{ filter?: string | string[] }>;
};

export default async function Notes({ searchParams }: PageProps) {
  const session = await requireUserSession();

  const { filter } = await searchParams;
  const { isStarredFilter, activeFilter } = normalizeNotesFilter(filter);

  let notes: Note[] = [];
  try {
    notes = await getNotes(session.user.id, isStarredFilter);
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
        <FilterNotes activeFilter={activeFilter} />
        <p className="text-gray-600 text-center">
          You have {noteCount} {noteLengthFormat} in this view.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <NoteCard notes={notes} />
      </div>
    </div>
  );
}

export const NotesHeader = () => {
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
