import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Note } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PurgeNoteButton, RestoreNoteButton } from "./trash-note-actions";

export const NotesTable = React.memo(({ notes, trashed = false }: { notes: Note[]; trashed?: boolean }) => {
  const pathname = usePathname();
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-primary">❯</span>
        <span className="font-mono text-xs text-muted-foreground">
          {trashed ? "~/notes --trash" : "~/notes --table"}
        </span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{notes.length} rows</span>
      </div>
      <Table>
        <TableCaption className="font-mono text-xs">-- eof · {notes.length} notes --</TableCaption>
        <TableHeader>
          <TableRow className="font-mono text-xs uppercase">
            <TableHead className="w-[100px]">file</TableHead>
            <TableHead>star</TableHead>
            <TableHead className="text-right">mtime</TableHead>
            {trashed && <TableHead className="text-right">actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="font-mono text-sm">
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell className="font-medium">
                <Link href={`${pathname}/${note.id}`} className="text-primary hover:underline block min-w-0 max-w-56 truncate overflow-hidden">
                  <span className="text-muted-foreground">❯ </span>./{note.id}
                  <span className="ml-2 hidden text-xs text-muted-foreground lg:inline">{note.title}</span>
                </Link>
              </TableCell>
              <TableCell>{note.isStarred ? <span className="text-primary">★</span> : <span className="text-muted-foreground/40">·</span>}</TableCell>
              <TableCell className="text-right text-xs text-muted-foreground">
                {note.createdAt.toDateString()}
              </TableCell>
              {trashed && (
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-3">
                    <RestoreNoteButton noteId={note.id} userId={note.userId} />
                    <PurgeNoteButton noteId={note.id} userId={note.userId} />
                  </span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
});

NotesTable.displayName = "NotesTable";
