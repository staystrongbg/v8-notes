import { Skeleton } from "../ui/skeleton";
import { NoteCardLoading } from "./note-card-loading";

export const NotesGridLoading = () => {
  return (
    <section className="mx-auto p-4 max-w-6xl">
      <div className="flex items-center justify-between w-full my-4">
        <Skeleton className="w-24 h-10 bg-gray-500" />
        <Skeleton className="w-24 h-10 bg-gray-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <NoteCardLoading key={i} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full my-4">
        <Skeleton className="w-24 h-10 bg-gray-500" />
      </div>
    </section>
  );
};
