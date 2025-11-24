import { NotesHeader } from "./notes-header";
import { Separator } from "@/components/ui/separator";
import { FilterNotes } from "./filter-notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";

export const NoNotes = () => {
  return (
    <div className="w-full p-4">
      <NotesHeader />
      <Separator className="my-8" />
      <div className="flex justify-between mb-4">
        <FilterNotes />
        <p className="text-gray-600 text-center">You have 0 note(s)</p>
      </div>
      <div className="grid place-items-center gap-8">
        <NotebookIcon className="h-16 w-16 text-red-200" />
        <h1 className="text-gray-600 text-center">No notes found</h1>
        <Button variant={"tertiary"} asChild>
          <Link href="/notes/new">Create new note</Link>
        </Button>
      </div>
    </div>
  );
};
