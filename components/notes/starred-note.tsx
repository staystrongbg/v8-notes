"use client";

import { addNoteToStarred } from "@/fetchers/add-note-to-starred";
import { removeNoteFromStarred } from "@/fetchers/remove-note-from-starred";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export const StarredNote = ({
  noteId,
  isStarred: initialStarred,
}: {
  noteId: string;
  isStarred: boolean;
}) => {
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
      onClick={toggleStarred}
      disabled={isPending}
      className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
      title={isStarred ? "Remove from starred" : "Add to starred"}
    >
      <Star
        className={`h-5 w-5 ${
          isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
    </button>
  );
};
