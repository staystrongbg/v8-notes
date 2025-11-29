"use client";

import { use } from "react";
import { Note } from "@prisma/client";
import NoteCard from "./note-card";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Plus } from "lucide-react";

interface NotesGridProps {
  promise: Promise<Note[]>;
}

export const NotesGrid = ({ promise }: NotesGridProps) => {
  const notes = use(promise);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[calc(100vh-16rem)] sm:h-auto overflow-y-auto snap-y snap-mandatory sm:snap-none">
      <NoteCard notes={notes} />
    </div>
  );
};
