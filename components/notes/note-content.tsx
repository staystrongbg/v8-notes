"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { noteMarkdownComponents } from "../../helpers/note-markdown-components";
import { useQuery } from "@tanstack/react-query";
import { getNote } from "@/fetchers/get-note";
import { NoteContentLoading } from "./note-content-loading";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { DeleteNoteAction } from "./delete-note-action";
import { StarredNote } from "./starred-note";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const NoteContent = ({ noteId }: { noteId: string }) => {
  const { data: note, isLoading } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: () => getNote(noteId),
  });

  if (isLoading) {
    return <NoteContentLoading />;
  }
  if (!note) {
    return null;
  }
  return (
    <>
      <NoteHeader noteId={noteId} isStarred={note.isStarred} />
      <div className="max-w-3xl mx-auto overflow-auto">
        <h2 className="mb-6 text-muted-foreground">{note.title}</h2>
        <div className="mb-4">
          <ReactMarkdown
            components={noteMarkdownComponents}
            remarkPlugins={[remarkGfm, remarkEmoji]}
            rehypePlugins={[rehypeHighlight]}
          >
            {note.text}
          </ReactMarkdown>
        </div>
        <p className="sm:text-sm text-xs text-muted-foreground">
          Last updated: {note.updatedAt.toLocaleDateString()} at{" "}
          {note.updatedAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </>
  );
};

const NoteHeader = ({
  noteId,
  isStarred,
}: {
  noteId: string;
  isStarred: boolean;
}) => {
  const router = useRouter();
  return (
    <header className="w-full mb-8 flex justify-between items-center">
      <Button variant={"ghost"} onClick={() => router.back()}>
        <ArrowLeftIcon className="h-4 w-4" />
        Back to notes
      </Button>
      <div className="flex items-center gap-2">
        <StarredNote noteId={noteId} isStarred={isStarred} />
        <DeleteNoteAction noteId={noteId} />
        <Link href={`/notes/${noteId}/edit`}>
          <Button
            variant={"tertiary"}
            size={"default"}
            type="button"
            className=""
          >
            <PencilIcon />
            <span className="sm:flex hidden justify-center">Edit note</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
