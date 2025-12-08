import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotebookIcon } from "lucide-react";

export const NotesError = ({
  message = "Failed to load notes",
}: {
  message?: string;
}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <NotebookIcon className="h-16 w-16 text-red-200" />
      <h1>{message}</h1>
      <p className="text-gray-600">Please try again later.</p>
      <Button variant={"tertiary"} asChild type="button">
        <Link href="/notes">Retry</Link>
      </Button>
    </div>
  );
};
