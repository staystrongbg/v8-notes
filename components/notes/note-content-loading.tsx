import { Skeleton } from "../ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <header className="w-full flex justify-between items-center my-4">
        <Skeleton className="h-10 w-32 bg-gray-500" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 bg-gray-500" />
          <Skeleton className="h-10 w-24 bg-gray-500" />
          <Skeleton className="h-10 w-24 bg-gray-500" />
        </div>
      </header>
      <div className="max-w-3xl mx-auto">
        <div className="w-full mx-auto overflow-auto">
          <Skeleton className="h-8 w-1/2 mb-6 bg-gray-500" />
          <Skeleton className="w-full h-64 mb-4 bg-gray-500" />
          <Skeleton className="h-4 w-1/4 bg-gray-500" />
        </div>
      </div>
    </div>
  );
};
