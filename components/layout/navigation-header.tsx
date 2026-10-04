"use client";

import { useSyncExternalStore } from "react";
import { useHideNav } from "@/hooks/use-hide-nav";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export const NavigationHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isHidden = useHideNav();
  // Render "guest" until mounted: the server can't know the session, so a
  // username rendered during SSR would hydrate mismatched HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { data: session } = useSession();
  const handle =
    !mounted
      ? "guest"
      : session?.user?.name?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
        session?.user?.email?.split("@")[0] ||
        "guest";
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300",
        isHidden && "-translate-y-full"
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-4 py-1.5 font-mono text-[11px] text-muted-foreground">
        <span className="font-bold text-primary">❯</span>
        <span className="truncate">
          <span className="text-emerald-500">{handle}@v8-notes</span>:~/notes$
        </span>
        <span aria-hidden className="animate-pulse text-primary">▌</span>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-px text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          online
        </span>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 font-mono">{children}</div>
    </header>
  );
};
