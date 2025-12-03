import { NotesGrid } from "./notes-grid";
import { NotesTable } from "./notes-table";
import { Note } from "@prisma/client";

type Props = {
  view?: string;
  notes: Note[];
};

export const ViewNotes = async ({ notes, view = "grid" }: Props) => {
  return (
    <section className="mx-auto max-w-6xl">
      {view === "grid" ? (
        <div className="">
          <NotesGrid notes={notes} />
        </div>
      ) : (
        <div className="">
          <NotesTable notes={notes} />
        </div>
      )}
    </section>
  );
};
