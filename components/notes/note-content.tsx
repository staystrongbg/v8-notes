import { Note } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { noteMarkdownComponents } from "../../helpers/note-markdown-components";

export const NoteContent = ({ note }: { note: Note }) => {
  return (
    <div className="w-full mx-auto overflow-auto">
      <h2 className="mb-6 text-muted-foreground">{note?.title}</h2>
      <div className="mb-4">
        <ReactMarkdown
          components={noteMarkdownComponents}
          remarkPlugins={[remarkGfm, remarkEmoji]}
          rehypePlugins={[rehypeHighlight]}
        >
          {note?.text}
        </ReactMarkdown>
      </div>
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
