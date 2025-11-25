import { NotesHeader } from "./notes-header";
import { Separator } from "@/components/ui/separator";
import { FilterNotes } from "./filter-notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";

type NoNotesProps = {
  variant?: "all" | "starred";
};

export const NoNotes = ({ variant = "all" }: NoNotesProps) => {
  const isStarredView = variant === "starred";
  const headline = isStarredView ? "No starred notes yet" : "No notes found";
  const subcopy = isStarredView
    ? "Star notes you want to keep handy and they'll appear here."
    : "Create a note to capture your first idea.";

  return (
    <div className="w-full p-4">
      <NotesHeader />
      <Separator className="my-8" />
      <div className="flex justify-between mb-4">
        <FilterNotes activeFilter={variant} />
        <p className="text-gray-600 text-center">
          You have 0 notes in this view.
        </p>
      </div>
      <div className="grid place-items-center gap-8">
        <NotebookIcon className="h-16 w-16 text-red-200" />
        <h1 className="text-gray-600 text-center">{headline}</h1>
        <p className="text-gray-500 text-center text-sm max-w-sm">{subcopy}</p>
        <Button variant={"tertiary"} asChild>
          <Link href="/notes/new">Create new note</Link>
        </Button>
      </div>
    </div>
  );
};
