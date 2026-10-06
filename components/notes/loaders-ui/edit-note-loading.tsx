import { Skeleton } from "../../ui/skeleton";

export const EditNoteLoading = () => {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-20 bg-muted" />
        <Skeleton className="h-10 bg-muted" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-24 bg-muted" />
        <Skeleton className="min-h-[220px] bg-muted" />
        <Skeleton className="h-3 w-28 bg-muted" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 flex-1 bg-muted" />
        <Skeleton className="h-10 flex-[2] bg-muted" />
      </div>
    </div>
  );
};
