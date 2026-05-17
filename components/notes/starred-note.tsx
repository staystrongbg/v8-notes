"use client";

import { addNoteToStarred } from "@/fetchers/add-note-to-starred";
import { removeNoteFromStarred } from "@/fetchers/remove-note-from-starred";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

interface StarredNoteProps {
  noteId: string;
  isStarred: boolean;
}

export const StarredNote = ({
  noteId,
  isStarred: initialStarred,
}: StarredNoteProps) => {
  const [isStarred, setIsStarred] = useState(initialStarred);
  const [isPending, startTransition] = useTransition();

  const toggleStarred = () => {
    startTransition(async () => {
      if (isStarred) {
        await removeNoteFromStarred(noteId);
        setIsStarred(false);
      } else {
        await addNoteToStarred(noteId);
        setIsStarred(true);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={toggleStarred}
      disabled={isPending}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border transition-all cursor-pointer disabled:opacity-50 ${
        isStarred
          ? "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20"
          : "bg-background/60 border-border/30 text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
      title={isStarred ? "Remove from starred" : "Add to starred"}
    >
      <Star className={`w-4 h-4 ${isStarred ? "fill-amber-500" : ""}`} />
      <span className="hidden sm:inline">{isStarred ? "Starred" : "Star"}</span>
    </button>
  );
};
