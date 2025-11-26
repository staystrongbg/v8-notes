import { NotesHeader } from "./notes-header";
import { Separator } from "@/components/ui/separator";
import { FilterNotes } from "./filter-notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";
import MobileMenu from "../layout/mobile-menu";

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
      {/* <NotesHeader /> */}
      <MobileMenu noteCount={0} noteLengthFormat="notes" />
      <div className="grid place-items-center gap-8 mt-12">
        <NotebookIcon className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-foreground text-center">{headline}</h1>
        <p className="text-muted-foreground text-center text-sm max-w-sm">
          {subcopy}
        </p>
        <Button variant={"tertiary"} asChild>
          <Link href="/notes/new">Create new note</Link>
        </Button>
      </div>
    </div>
  );
};
