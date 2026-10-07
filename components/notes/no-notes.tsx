import { Button } from '@/components/ui/button';
import { TerminalIcon } from 'lucide-react';
import Link from 'next/link';

type NoNotesProps = {
  variant?: 'all' | 'starred' | 'search' | 'trash';
  query?: string;
};

export const NoNotes = ({ variant = 'all', query }: NoNotesProps) => {
  const isStarredView = variant === 'starred';
  const isSearchView = variant === 'search';
  const isTrashView = variant === 'trash';
  const headline = isSearchView
    ? '0 matches'
    : isStarredView
      ? 'No starred notes yet'
      : isTrashView
        ? 'Trash is empty'
        : '0 notes found';
  const subcopy = isSearchView
    ? `No notes match "${query ?? ''}".`
    : isStarredView
      ? "Star notes you want to keep handy and they'll appear here."
      : isTrashView
        ? 'Deleted notes rest here for 30 days before automatic purge.'
        : 'Create a note to capture your first idea.';

  return (
    <div>
      <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-xl border border-dashed border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-primary">❯</span>
          <span className="font-mono text-xs text-muted-foreground">~/notes --empty</span>
        </div>
        <div className="grid place-items-center gap-4 p-8 text-center">
          <TerminalIcon className="h-10 w-10 text-muted-foreground/60" />
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> ls ./notes <span className="text-muted-foreground/60"># → {headline}</span>
          </p>
          <h2 className="font-mono text-lg font-bold text-foreground">{headline}</h2>
          <p className="max-w-sm font-mono text-xs break-words text-muted-foreground">{subcopy}</p>
          <Button variant="default" type="button" asChild className="font-mono">
            {isSearchView ? (
              <Link href="/notes">$ reset query</Link>
            ) : isTrashView ? (
              <Link href="/notes">$ cd ~/notes</Link>
            ) : (
              <Link href="/notes/new">$ touch ./new.md</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
