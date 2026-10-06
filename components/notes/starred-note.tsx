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
      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium tracking-wide uppercase transition-all disabled:opacity-50 ${
        isStarred
          ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
          : "border-border/30 bg-background/60 text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
      title={isStarred ? "Remove from starred" : "Add to starred"}
    >
      <Star className={`h-3.5 w-3.5 ${isStarred ? "fill-primary" : ""}`} />
      <span className="hidden sm:inline">{isStarred ? "starred" : "star"}</span>
    </button>
  );
};
