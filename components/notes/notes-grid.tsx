import React from "react";
import NoteCard from "./note-card";
import type { NoteWithTags } from "@/fetchers/get-notes";

export const NotesGrid = React.memo(
  ({
    notes,
    trashed = false,
    baseQuery = "",
  }: {
    notes: NoteWithTags[];
    trashed?: boolean;
    baseQuery?: string;
  }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-primary">❯</span>
        <span className="font-mono text-xs text-muted-foreground">
          {trashed ? '~/notes --trash' : '~/notes --grid'}
        </span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{notes.length} files</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto snap-y snap-mandatory sm:snap-none p-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} trashed={trashed} baseQuery={baseQuery} />
        ))}
      </div>
      <p className="border-t border-border/50 bg-muted/40 px-4 py-2 text-center font-mono text-xs text-muted-foreground">
        -- eof · {notes.length} notes --
      </p>
    </div>
  );
});

NotesGrid.displayName = "NotesGrid";
