import { Skeleton } from "../ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="w-full p-4 dark:bg-gradient-to-b from-slate-800 to-slate-900">
      <div className=" flex justify-between items-center mb-4 ">
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <div className="mx-auto max-w-2xl gap-4 flex flex-col ">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="w-full h-64" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    </div>
  );
};
