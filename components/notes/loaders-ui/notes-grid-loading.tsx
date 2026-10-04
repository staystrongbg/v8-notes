import { Skeleton } from "../../ui/skeleton";
import { NoteCardLoading } from "./note-card-loading";

export const NotesGridLoading = () => {
  return (
    <div className="space-y-4" aria-hidden>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-card p-2">
        <Skeleton className="h-9 w-40 rounded-lg bg-muted" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-lg bg-muted" />
          <Skeleton className="h-9 w-20 rounded-lg bg-muted" />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-primary">❯</span>
          <Skeleton className="h-4 w-32 bg-muted" />
          <Skeleton className="ml-auto h-3 w-16 bg-muted" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NoteCardLoading key={i} />
          ))}
        </div>
        <div className="border-t border-border/50 bg-muted/40 px-4 py-2 text-center">
          <Skeleton className="mx-auto h-3.5 w-40 bg-muted" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Skeleton className="h-12 w-52 rounded-xl bg-muted" />
      </div>
    </div>
  );
};
