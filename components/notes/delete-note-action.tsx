"use client";

import { deleteNote } from "@/fetchers/delete-note";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2Icon, TriangleAlertIcon } from "lucide-react";

export const DeleteNoteAction = ({ noteId }: { noteId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDeleting(true)}
        disabled={isDeleting}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-background/60 border border-border/30 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer disabled:opacity-50"
      >
        <Trash2Icon className="w-4 h-4" />
        <span className="sm:inline hidden">Delete</span>
      </button>
      {isDeleting && (
        <DeleteNoteConfirmationDialog
          noteId={noteId}
          onOpen={() => setIsDeleting((prev) => !prev)}
        />
      )}
    </>
  );
};
const DeleteNoteConfirmationDialog = ({
  noteId,
  onOpen,
}: {
  noteId: string;
  onOpen: () => void;
}) => {
  const router = useRouter();
  const onDelete = async () => {
    await deleteNote(noteId);
    toast.success("Note deleted successfully");
    router.push("/notes");
  };
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5 backdrop-blur-md px-5 py-3 shadow-lg shadow-destructive/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-destructive/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative flex items-center gap-3 text-sm">
          <TriangleAlertIcon className="w-5 h-5 text-destructive shrink-0" />
          <span className="text-destructive-foreground font-medium">Delete this note?</span>
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => onOpen()}
            className="px-3 py-1 rounded-lg bg-background/60 border border-border/30 text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
