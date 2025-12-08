import { Skeleton } from "../ui/skeleton";

export const EditNoteLoading = () => {
  return (
    <div className="flex flex-col gap-4 max-w-3xl p-4 mx-auto my-4">
      <Skeleton className="w-md h-8 bg-gray-700" />
      <Skeleton className="w-full h-10 bg-gray-700" />
      <Skeleton className="w-full h-50 bg-gray-700" />
      <div className="flex gap-4 items-center">
        <Skeleton className="flex-1 h-10 bg-gray-700" />
        <Skeleton className="flex-2 h-10 bg-gray-700" />
      </div>
    </div>
  );
};
