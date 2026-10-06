'use client';

import { useSyncExternalStore } from 'react';
import { GitBranchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const formatClock = (d: Date) =>
  `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

// Refresh the clock by notifying subscribers, not by setState-in-effect.
const subscribeClock = (notify: () => void) => {
  const id = setInterval(notify, 10_000);
  return () => clearInterval(id);
};

export const VimStatusline = ({
  mode,
  file,
  branch = 'main',
  modified = false,
  meta = [],
}: {
  mode: 'normal' | 'insert';
  file: string;
  branch?: string;
  modified?: boolean;
  meta?: string[];
}) => {
  // Server and first client pass render '--:--' identically; the live
  // time subscribes after mount.
  const now = useSyncExternalStore(subscribeClock, () => formatClock(new Date()), () => '--:--');

  return (
    <div className="flex items-stretch font-mono text-[11px]">
      <span
        className={cn(
          'shrink-0 px-3 py-1.5 font-bold tracking-wider uppercase',
          mode === 'normal' ? 'bg-primary text-primary-foreground' : 'bg-primary/80 text-primary-foreground'
        )}
      >
        {mode}
      </span>
      <span className="flex shrink-0 items-center gap-1.5 px-3 text-muted-foreground">
        <GitBranchIcon className="size-3" />
        {branch}
      </span>
      {modified && (
        <span className="flex shrink-0 items-center pr-1 text-primary" title="Modified">
          ●
        </span>
      )}
      <span className="flex min-w-0 flex-1 items-center truncate px-2 text-foreground/80">
        {file}
      </span>
      {meta.length > 0 && (
        <span className="hidden shrink-0 items-center gap-2 px-3 text-muted-foreground sm:flex">
          {meta.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted-foreground/40">│</span>}
              {item}
            </span>
          ))}
        </span>
      )}
      <span
        suppressHydrationWarning
        className="bg-primary/15 text-primary flex shrink-0 items-center px-3 font-bold"
      >
        {now}
      </span>
    </div>
  );
};
