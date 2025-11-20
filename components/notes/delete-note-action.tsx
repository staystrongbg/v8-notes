"use client";

import { deleteNote } from "@/api/delete-note";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Trash2Icon, TriangleAlertIcon } from "lucide-react";

export const DeleteNoteAction = ({ noteId }: { noteId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <Button
        variant={"destructive"}
        size={"lg"}
        onClick={() => setIsDeleting(true)}
        disabled={isDeleting}
        className="flex items-center gap-2"
      >
        <Trash2Icon className="mr-2 h-4 w-4" />
        Delete note
      </Button>
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
    onOpen();
  };
  return (
    <>
      <div className="rounded-md w-fit p-4 whitespace-nowrap fixed top-2 left-1/2 right-1/2 transform -translate-x-1/2 bg-black text-red-400">
        <div className="flex items-center gap-2">
          <TriangleAlertIcon className="mr-2 h-6 w-6" />
          <span>Are you sure you want to delete this note?</span>{" "}
          <span onClick={onDelete} className="cursor-pointer">
            y
          </span>
          /
          <span onClick={() => onOpen()} className="cursor-pointer">
            n
          </span>
        </div>
      </div>
    </>
  );
};
