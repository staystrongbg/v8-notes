import React from "react";
import { Note } from "@prisma/client";
import NoteCard from "./note-card";

export const NotesGrid = React.memo(({ notes }: { notes: Note[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:h-auto overflow-y-auto snap-y snap-mandatory sm:snap-none py-4 -my-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
});

NotesGrid.displayName = "NotesGrid";
