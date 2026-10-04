'use client';

import 'highlight.js/styles/atom-one-dark.css';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import { noteMarkdownComponents } from '../../helpers/note-markdown-components';
import { highlightPlugin } from '../../helpers/code-highlight';

export const NotePreview = ({ text }: { text: string }) => {
  return (
    <aside className="self-start overflow-hidden rounded-lg border border-border/60 bg-card lg:sticky lg:top-28">
      <p className="border-b border-border/50 bg-muted/40 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
        <span className="font-bold text-primary">❯</span> preview --markdown
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
            <p className="font-mono text-xs text-muted-foreground/60">
              {'// rendered output appears here as you type…'}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
