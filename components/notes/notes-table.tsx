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
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NoteWithTags } from "@/fetchers/get-notes";
import { PurgeNoteButton, RestoreNoteButton } from "./trash-note-actions";

export const NotesTable = React.memo(
  ({
    notes,
    trashed = false,
    baseQuery = '',
  }: {
    notes: NoteWithTags[];
    trashed?: boolean;
    baseQuery?: string;
  }) => {
    const pathname = usePathname();
    const chipHref = (name: string) => {
      const params = new URLSearchParams(baseQuery);
      params.set('tag', name);
      params.delete('page');
      return `/notes?${params.toString()}`;
    };
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
                {note.tags.length > 0 && (
                  <span className="mt-1 flex max-w-56 flex-wrap gap-1 overflow-hidden font-mono text-[11px]">
                    {note.tags.slice(0, 3).map(tag => (
                      <Link
                        key={tag.id}
                        href={chipHref(tag.name)}
                        className="text-primary/80 hover:text-primary rounded border border-border/50 bg-muted/50 px-1 py-px transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </span>
                )}
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
