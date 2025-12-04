import { NotesGrid } from "./notes-grid";
import { NotesTable } from "./notes-table";
import { Note } from "@prisma/client";

type Props = {
  view?: string;
  notes: Note[];
};

export const ViewNotes = async ({ notes, view = "grid" }: Props) => {
  if (view === "grid") return <NotesGrid notes={notes} />;

  return <NotesTable notes={notes} />;
};
