'use client';

import { useHideNav } from '@/hooks/use-hide-nav';
import { useSession } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { useSyncExternalStore } from 'react';

export const NavigationHeader = ({ children }: { children: React.ReactNode }) => {
  const isHidden = useHideNav();
  // Render "guest" until mounted: the server can't know the session, so a
  // username rendered during SSR would hydrate mismatched HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { data: session } = useSession();
  const handle = !mounted
    ? 'guest'
    : session?.user?.name?.toLowerCase().replace(/[^a-z0-9]/g, '') ||
      session?.user?.email?.split('@')[0] ||
      'guest';
  return (
    <header
      className={cn(
        'border-border/60 bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md transition-transform duration-300',
        isHidden && '-translate-y-full',
      )}
    >
      <div className="border-border/40 bg-muted/40 text-muted-foreground flex items-center gap-2 border-b px-4 py-1.5 font-mono text-[11px]">
        <span className="text-primary font-bold">❯</span>
        <span className="truncate">
          <span className="text-primary">{handle}@v8-notes</span>:~/notes$
        </span>
        <span aria-hidden className="text-primary animate-pulse">
          ▌
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-px text-primary">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          online
        </span>
      </div>
      <div className="mx-auto max-w-7xl px-4 font-mono">{children}</div>
    </header>
  );
};
