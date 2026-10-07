import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { NoteWithTags } from '@/fetchers/get-notes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { PurgeNoteButton, RestoreNoteButton } from './trash-note-actions';

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
      <div className="border-border/60 bg-card overflow-hidden rounded-xl border">
        <div className="border-border/50 bg-muted/40 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="text-primary font-mono text-xs font-bold">❯</span>
          <span className="text-muted-foreground font-mono text-xs">
            {trashed ? '~/notes --trash' : '~/notes --table'}
          </span>
          <span className="text-muted-foreground ml-auto font-mono text-[11px]">
            {notes.length} rows
          </span>
        </div>
        <Table>
          <TableCaption className="font-mono text-xs">
            -- eof · {notes.length} notes --
          </TableCaption>
          <TableHeader>
            <TableRow className="font-mono text-xs uppercase">
              <TableHead className="w-[100px]">file</TableHead>
              <TableHead>star</TableHead>
              <TableHead className="text-right">mtime</TableHead>
              {trashed && <TableHead className="text-right">actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody className="font-mono text-sm">
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`${pathname}/${note.id}`}
                    className="text-primary block max-w-56 min-w-0 truncate overflow-hidden hover:underline"
                  >
                    <span className="text-muted-foreground">❯ </span>./{note.id}
                    <span className="text-muted-foreground ml-2 hidden text-xs lg:inline">
                      {note.title}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  {note.isStarred ? (
                    <span className="text-primary">★</span>
                  ) : (
                    <span className="text-muted-foreground/40">·</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-xs">
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
  },
);

NotesTable.displayName = 'NotesTable';
