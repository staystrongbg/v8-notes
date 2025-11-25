import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export const NotesHeader = () => {
  return (
    <header className="w-full flex justify-center flex-col items-center">
      <Button variant={"tertiary"} asChild title="Add new note">
        <div className="flex items-center gap-2">
          <Newspaper className="mr-2 h-4 w-4" />
          <Link href="/notes/new">Add new note</Link>
        </div>
      </Button>
    </header>
  );
};
