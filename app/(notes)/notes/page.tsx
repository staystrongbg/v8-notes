import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getNotes } from "@/api/get-notes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper, NotebookIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NoteCard } from "@/components/notes/note-card";
import { unauthorized } from "next/navigation";

//TODO starred notes
//TODO search notes
//TODO sort notes
//TODO pagination
//TODO infinite scroll

export default async function Notes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  let notes;
  try {
    notes = await getNotes(session.user.id);
  } catch (error) {
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
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <NotebookIcon className="h-16 w-16 text-gray-200" />
        <h1>No notes yet...</h1>
        <Button variant={"tertiary"} asChild>
          <div className="flex items-center gap-2">
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/notes/new">Add your first note</Link>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex justify-center mb-4">
        <Button size={"xl"} variant={"tertiary"} asChild title="Add new note">
          <div className="flex items-center gap-2">
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/notes/new">Add new note</Link>
          </div>
        </Button>
      </div>
      <Separator className="my-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
