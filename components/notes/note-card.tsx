"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Note } from "@prisma/client";

export default function NoteCard({ notes }: { notes: Note[] }) {
  return (
    <>
      {notes.map((note) => (
        <Card
          key={note.id}
          className="transition-shadow duration-200 hover:shadow-lg border border-gray-200"
        >
          <CardHeader className="pb-3">
            <CardTitle>
              <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
                {note.title}
              </h3>
            </CardTitle>
            <p className="text-xs text-gray-500">{note.updatedAt.toDateString()}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {note.text}
            </p>
          </CardContent>
          <CardFooter className="pt-3">
            <Link
              href={`/notes/${note.id}`}
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
            >
              Read more →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}