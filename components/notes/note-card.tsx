import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Note } from "@prisma/client";

export const NoteCard = ({ note }: { note: Note }) => {
  return (
    <Card key={note.id} className="hover:shadow-lg">
      <CardHeader>
        <CardTitle>
          <h3 className="line-clamp-1">{note.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{note.text}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/notes/${note.id}`} className="underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};
