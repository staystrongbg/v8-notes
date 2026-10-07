"use client";

import { addNoteToStarred } from "@/fetchers/add-note-to-starred";
import { removeNoteFromStarred } from "@/fetchers/remove-note-from-starred";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface StarredNoteProps {
  noteId: string;
  isStarred: boolean;
}

export const StarredNote = ({
  noteId,
  isStarred: initialStarred,
}: StarredNoteProps) => {
  const queryClient = useQueryClient();
  const [isStarred, setIsStarred] = useState(initialStarred);

  const { mutate, isPending } = useMutation({
    mutationFn: (next: boolean) =>
      next ? addNoteToStarred(noteId) : removeNoteFromStarred(noteId),
    onMutate: (next) => {
      setIsStarred(next);
    },
    onError: (_error, next) => {
      setIsStarred(!next);
      toast.error('Failed to update starred status');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutate(!isStarred)}
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
