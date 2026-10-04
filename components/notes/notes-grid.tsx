import React from "react";
import { Note } from "@prisma/client";
import NoteCard from "./note-card";

export const NotesGrid = React.memo(({ notes }: { notes: Note[] }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-primary">❯</span>
        <span className="font-mono text-xs text-muted-foreground">~/notes --grid</span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{notes.length} files</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:h-auto overflow-y-auto snap-y snap-mandatory sm:snap-none p-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      <p className="border-t border-border/50 bg-muted/40 px-4 py-2 text-center font-mono text-xs text-muted-foreground">
        -- eof · {notes.length} notes --
      </p>
    </div>
  );
});

NotesGrid.displayName = "NotesGrid";
