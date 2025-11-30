"use client";
import { Note } from "@prisma/client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

export const NoteContent = ({ note }: { note: Note }) => {
  return (
    <div className="w-full mx-auto overflow-auto">
      <h2 className="mb-6 text-muted-foreground">{note?.title}</h2>
      <div className="mb-4">
        <ReactMarkdown
          components={{
            p(props) {
              return (
                <p {...props} className="text-muted-foreground font-normal" />
              );
            },
            a(props) {
              return <a {...props} className="text-primary underline" />;
            },
            code(props) {
              return (
                <code
                  {...props}
                  className="text-primary font-normal sm:text-sm text-xs"
                />
              );
            },
            pre(props) {
              return (
                <pre {...props} className="text-primary sm:text-sm text-xs" />
              );
            },
            h1(props) {
              return <h1 {...props} className="my-2 text-muted-foreground" />;
            },
            h2(props) {
              return <h2 {...props} className="my-2 text-muted-foreground" />;
            },
            h3(props) {
              return <h3 {...props} className="my-2 text-muted-foreground" />;
            },
          }}
          remarkPlugins={[remarkGfm]}
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
