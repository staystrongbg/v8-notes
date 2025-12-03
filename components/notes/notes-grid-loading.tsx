import { NoteCardLoading } from "./note-card-loading";

export const NotesGridLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <NoteCardLoading key={i} />
      ))}
    </div>
  );
};
