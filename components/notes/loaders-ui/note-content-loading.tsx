import { Skeleton } from "../../ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="mx-auto max-w-4xl" aria-hidden>
      <div className="mb-4 overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="flex flex-wrap items-center gap-2 p-2">
          <Skeleton className="h-9 w-24 rounded-lg bg-muted" />
          <Skeleton className="hidden h-9 flex-1 rounded-lg bg-muted md:block" />
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-9 w-10 rounded-lg bg-muted sm:w-16" />
            <Skeleton className="h-9 w-10 rounded-lg bg-muted sm:w-20" />
            <Skeleton className="h-9 w-10 rounded-lg bg-muted sm:w-20" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-primary">❯</span>
          <Skeleton className="h-4 w-40 bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-px border-b border-border/50 bg-border/40 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-card px-4 py-3">
              <Skeleton className="size-7 shrink-0 rounded-md bg-muted" />
              <div className="min-w-0 flex-1 space-y-1.5">
                <Skeleton className="h-2.5 w-16 bg-muted" />
                <Skeleton className="h-3.5 w-24 bg-muted" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 p-6 sm:p-8">
          <Skeleton className="h-3.5 w-32 bg-muted" />
          <Skeleton className="h-8 w-2/3 bg-muted" />
          <Skeleton className="h-3.5 w-48 bg-muted" />
          <Skeleton className="h-px! bg-muted" />
          <Skeleton className="h-4 bg-muted" />
          <Skeleton className="h-4 bg-muted" />
          <Skeleton className="h-4 w-5/6 bg-muted" />
          <Skeleton className="h-32 rounded-lg bg-muted" />
          <Skeleton className="h-4 w-2/3 bg-muted" />
        </div>
        <div className="flex items-center gap-4 border-t border-border/50 bg-muted/40 px-4 py-2">
          <Skeleton className="h-3 w-20 bg-muted" />
          <Skeleton className="h-3 w-12 bg-muted" />
          <Skeleton className="h-3 w-12 bg-muted" />
          <Skeleton className="ml-auto h-3 w-14 bg-muted" />
        </div>
      </div>
    </div>
  );
};
