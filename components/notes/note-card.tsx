import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Note } from "@prisma/client";
import { StarIcon } from "lucide-react";

export default function NoteCard({ notes }: { notes: Note[] }) {
  return (
    <>
      {notes.map((note) => (
        <Card
          key={note.id}
          className="hover:border-accent border h-[calc(100vh-11rem)] w-full snap-start sm:h-auto:"
        >
          <CardHeader className="pb-3">
            <div className="flex justify-between">
              <div>
                <CardTitle>
                  <h3 className="line-clamp-1">{note.title}</h3>
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {note.updatedAt.toDateString()}
                </p>
              </div>
              <span>{note.isStarred && <StarIcon />}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="line-clamp-3 leading-relaxed">{note.text}</p>
          </CardContent>
          <CardFooter className="pt-3">
            <Link
              href={`/notes/${note.id}`}
              className="text-primary hover:text-primary/80 underline text-sm font-medium"
            >
              Read more →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
