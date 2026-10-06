import { Button } from '@/components/ui/button';
import { TerminalIcon } from 'lucide-react';
import Link from 'next/link';

type NoNotesProps = {
  variant?: 'all' | 'starred';
};

export const NoNotes = ({ variant = 'all' }: NoNotesProps) => {
  const isStarredView = variant === 'starred';
  const headline = isStarredView ? 'No starred notes yet' : '0 notes found';
  const subcopy = isStarredView
    ? "Star notes you want to keep handy and they'll appear here."
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
          <p className="max-w-sm font-mono text-xs text-muted-foreground">{subcopy}</p>
          <Button variant="default" type="button" asChild className="font-mono">
            <Link href="/notes/new">$ touch ./new.md</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
