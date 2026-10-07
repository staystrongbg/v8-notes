import { ArrowRightIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import type { NoteWithTags } from '@/fetchers/get-notes';
import { PurgeNoteButton, RestoreNoteButton } from './trash-note-actions';

export default function NoteCard({
  note,
  trashed = false,
  baseQuery = '',
}: {
  note: NoteWithTags;
  trashed?: boolean;
  baseQuery?: string;
}) {
  const preview = note.text.trim().split('\n')[0]?.slice(0, 120) || '// empty file';
  const chipHref = (name: string) => {
    const params = new URLSearchParams(baseQuery);
    params.set('tag', name);
    params.delete('page');
    return `/notes?${params.toString()}`;
  };

  return (
    <article className="group border-border/60 bg-card hover:border-primary/50 hover:shadow-primary/10 flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="border-border/50 bg-muted/40 flex items-center gap-1.5 border-b px-3.5 py-2">
        <span className="text-primary font-mono text-[11px] font-bold">❯</span>
        <span className="text-muted-foreground min-w-0 flex-1 truncate font-mono text-[11px]">./{note.id}</span>
        {note.isStarred && (
          <StarIcon
            className="fill-primary text-primary ml-auto h-3.5 w-3.5 shrink-0"
            aria-label="Starred note"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="text-foreground line-clamp-1 font-mono text-base font-bold">
          <span className="text-primary mr-1.5">#</span>
          {note.title}
        </h3>
        <p className="text-muted-foreground mt-2 line-clamp-3 font-mono text-xs leading-relaxed">
          <span className="text-primary/60">❯</span> {preview}
        </p>
        {note.tags.length > 0 && (
          <p className="mt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
            {note.tags.map(tag => (
              <Link
                key={tag.id}
                href={chipHref(tag.name)}
                className="text-primary/80 hover:text-primary rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </p>
        )}
        <time className="text-muted-foreground/70 mt-3 font-mono text-[11px]">
          mtime{' '}
          {note.updatedAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>

        <Link
          href={`/notes/${note.id}`}
          className="text-primary hover:text-primary/80 mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold transition-colors"
        >
          $ open
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
        {trashed && (
          <div className="mt-3 flex items-center gap-4 border-t border-dashed border-border/60 pt-3">
            <RestoreNoteButton noteId={note.id} userId={note.userId} />
            <PurgeNoteButton noteId={note.id} userId={note.userId} />
          </div>
        )}
      </div>
    </article>
  );
}
