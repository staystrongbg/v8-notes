import { Skeleton } from "../ui/skeleton";

export const NoteContentLoading = () => {
  return (
    <div className="w-full p-4">
      <div className=" flex justify-between items-center mb-4 ">
        <Skeleton className="h-6 w-24 bg-accent" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 bg-accent" />
          <Skeleton className="h-10 w-20 bg-accent" />
          <Skeleton className="h-10 w-24 bg-accent" />
        </div>
      </div>
      <div className="mx-auto max-w-2xl gap-4 flex flex-col ">
        <Skeleton className="h-10 w-1/2 bg-accent" />
        <Skeleton className="w-full h-64 bg-accent" />
        <Skeleton className="h-6 w-1/4 bg-accent" />
      </div>
    </div>
  );
};
