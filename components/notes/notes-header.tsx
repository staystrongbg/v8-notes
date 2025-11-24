import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";

export const NotesHeader = () => {
  return (
    <div className="flex justify-center mb-4">
      <Button size={"xl"} variant={"tertiary"} asChild title="Add new note">
        <div className="flex items-center gap-2">
          <Newspaper className="mr-2 h-4 w-4" />
          <Link href="/notes/new">Add new note</Link>
        </div>
      </Button>
    </div>
  );
};
