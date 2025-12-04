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

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Card
      key={note.id}
      className="dark:hover:border-accent hover:border-orange-400 h-[calc(100vh-16rem)] w-full snap-start sm:h-auto"
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle>
              <h3 className="line-clamp-1">{note.title}</h3>
            </CardTitle>
            <p className="text-xs text-muted-foreground font-normal">
              {note.updatedAt.toDateString()}
            </p>
          </div>
          <span>
            {note.isStarred && <StarIcon aria-label="Starred note" />}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="line-clamp-3 font-roboto-mono font-normal text-muted-foreground text-sm leading-relaxed">
          {note.text}
        </p>
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
  );
}
