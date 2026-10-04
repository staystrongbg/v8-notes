import { Note } from '@prisma/client';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

export default function NoteCard({ note }: { note: Note }) {
  const preview = note.text.trim().split('\n')[0]?.slice(0, 120) || '// empty file';
  const shortId = note.id.slice(0, 8);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/40 px-3.5 py-2">
        <span className="font-mono text-[11px] font-bold text-primary">❯</span>
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          ./{shortId}.md
        </span>
        {note.isStarred && (
          <StarIcon className="ml-auto h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-label="Starred note" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 font-mono text-base font-bold text-foreground">
          <span className="mr-1.5 text-primary">#</span>
          {note.title}
        </h3>
        <p className="mt-2 line-clamp-3 font-mono text-xs leading-relaxed text-muted-foreground">
          <span className="text-primary/60">❯</span> {preview}
        </p>
        <time className="mt-3 font-mono text-[11px] text-muted-foreground/70">
          mtime {note.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </time>

        <Link
          href={`/notes/${note.id}`}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary transition-colors hover:text-primary/80"
        >
          $ open
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
