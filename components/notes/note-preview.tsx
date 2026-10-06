'use client';

import 'highlight.js/styles/atom-one-dark.css';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import { highlightPlugin } from '../../helpers/code-highlight';
import { noteMarkdownComponents } from '../../helpers/note-markdown-components';

export const NotePreview = ({ text }: { text: string }) => {
  return (
    <aside className="border-border/60 bg-card self-start overflow-hidden rounded-lg border lg:sticky lg:top-28">
      <p className="border-border/50 bg-muted/40 text-muted-foreground border-b px-3 py-1.5 font-mono text-[11px]">
        <span className="text-primary font-bold">❯</span> preview --markdown
      </p>
      <div className="max-h-[60dvh] overflow-y-auto overscroll-contain p-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {text.trim() ? (
            <ReactMarkdown
              components={noteMarkdownComponents}
              remarkPlugins={[remarkGfm, remarkEmoji]}
              rehypePlugins={[highlightPlugin]}
            >
              {text}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground/60 font-mono text-xs">
              {'// rendered output appears here as you type…'}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
