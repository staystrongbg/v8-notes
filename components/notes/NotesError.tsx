import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";

export const NotesError = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <NotebookIcon className="h-16 w-16 text-red-200" />
      <h1>Failed to load notes</h1>
      <p className="text-gray-600">Please try again later.</p>
      <Button variant={"tertiary"} asChild>
        <Link href="/notes">Retry</Link>
      </Button>
    </div>
  );
};
