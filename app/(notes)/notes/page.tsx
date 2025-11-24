import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getNotes } from "@/fetchers/get-notes";
import { Separator } from "@/components/ui/separator";
import { unauthorized } from "next/navigation";
import NoteCard from "@/components/notes/note-card";

import { Note } from "@prisma/client";

import { FilterNotes } from "@/components/notes/filter-notes";
import { NoNotes } from "@/components/notes/no-notes";
import { NotesError } from "@/components/notes/NotesError";
import { NotesHeader } from "@/components/notes/notes-header";

//TODO infinite scroll

type PageProps = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function Notes({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  const { filter } = await searchParams;
  const isStarredFilter = filter === "starred" ? "starred" : undefined;

  let notes: Note[] = [];
  let noteCount = 0;
  try {
    notes = await getNotes(session.user.id, isStarredFilter);
    noteCount = notes.length;
  } catch (error) {
    console.error(error);
    return <NotesError />;
  }
  //if no notes and not starred filter render no notes
  if (!isStarredFilter && (!notes || notes.length === 0)) {
    return <NoNotes />;
  }

  //if no notes and starred filter render no starred notes
  if (isStarredFilter && notes.length === 0) {
    return <NoNotes />;
  }

  return (
    <div className="w-full p-4">
      <NotesHeader />
      <Separator className="my-8" />
      <div className="flex justify-between mb-4">
        <FilterNotes />
        <p className="text-gray-600 text-center">
          You have {noteCount} note(s)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <NoteCard notes={notes} />
      </div>
    </div>
  );
}
