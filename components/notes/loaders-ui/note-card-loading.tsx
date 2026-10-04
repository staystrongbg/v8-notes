import { Skeleton } from "../../ui/skeleton";

export const NoteCardLoading = () => {
  return (
    <div aria-hidden className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex items-center gap-1.5 border-b border-border/50 bg-muted/40 px-3.5 py-2">
        <span className="font-mono text-[11px] font-bold text-primary">❯</span>
        <Skeleton className="h-3.5 w-24 bg-muted" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="h-5 w-3/4 bg-muted" />
        <Skeleton className="mt-3 h-3.5 w-full bg-muted" />
        <Skeleton className="mt-1.5 h-3.5 w-full bg-muted" />
        <Skeleton className="mt-1.5 h-3.5 w-2/3 bg-muted" />
        <Skeleton className="mt-3 h-3 w-28 bg-muted" />
        <Skeleton className="mt-4 h-4 w-16 bg-muted" />
      </div>
    </div>
  );
};
