import { Skeleton } from "../ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto gap-4 flex flex-col">
      <Skeleton className="h-10 w-1/2 " />
      <Skeleton className="w-full h-64" />
      <Skeleton className="h-12 w-1/4" />
    </div>
  );
};
