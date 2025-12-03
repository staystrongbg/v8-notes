import { NotesGrid } from "./notes-grid";
import { NotesTable } from "./notes-table";
import { Note } from "@prisma/client";

type Props = {
  view?: string;
  notes: Note[];
};

export const ViewNotes = async ({ notes, view = "grid" }: Props) => {
  return (
    <section className="w-full">
      {view === "grid" ? (
        <div className="mx-auto max-w-6xl">
          <NotesGrid notes={notes} />
        </div>
      ) : (
        <div className="mx-auto max-w-5xl">
          <NotesTable notes={notes} />
        </div>
      )}
    </section>
  );
};
