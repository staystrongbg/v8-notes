import { Note } from "@prisma/client";
import NoteCard from "./note-card";

export const NotesGrid = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-16rem)] sm:h-auto overflow-y-auto snap-y snap-mandatory sm:snap-none">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
