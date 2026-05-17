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
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { StarredNote } from "./starred-note";
import { DeleteNoteAction } from "./delete-note-action";

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
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative">
            <div className="flex items-start gap-3 mb-6 pb-6 border-b border-border/30">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {note.title}
                </h2>
                <time className="text-xs text-muted-foreground/60 mt-2 block font-medium">
                  Last updated: {note.updatedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at{" "}
                  {note.updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
            </div>

            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <ReactMarkdown
                components={noteMarkdownComponents}
                remarkPlugins={[remarkGfm, remarkEmoji]}
                rehypePlugins={[rehypeHighlight]}
              >
                {note.text}
              </ReactMarkdown>
            </div>
          </div>
        </div>
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
    <header className="w-full mb-6">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md p-2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-background/60 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all cursor-pointer"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2">
            <Link
              href={`/notes/${noteId}/edit`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-background/60 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
            >
              <PencilIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Link>

            <StarredNote noteId={noteId} isStarred={isStarred} />
            <DeleteNoteAction noteId={noteId} />
          </div>
        </div>
      </div>
    </header>
  );
};
