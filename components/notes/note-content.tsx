"use client";
import { Note } from "@prisma/client";

export const NoteContent = ({ note }: { note: Note }) => {
  return (
    <div className=" mx-auto">
      <h2 className="mb-6 text-foreground">{note?.title}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground mb-6 whitespace-pre-wrap">
        {note?.text}
      </p>
      <p className="sm:text-sm text-xs text-muted-foreground">
        Last updated: {note?.updatedAt.toLocaleDateString()} at{" "}
        {note?.updatedAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};
