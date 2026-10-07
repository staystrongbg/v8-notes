'use client';

import type { RefObject } from 'react';
import {
  BoldIcon,
  CodeIcon,
  HeadingIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  SquareCodeIcon,
  StrikethroughIcon,
} from 'lucide-react';

type Selection = { text: string; start: number; end: number };
type Replacement = { text: string; selStart: number; selEnd: number };

const wrap = (before: string, after: string, placeholder: string) => {
  return ({ text, start, end }: Selection): Replacement => {
    const selected = text.slice(start, end);
    const inner = selected || placeholder;
    return {
      text: text.slice(0, start) + before + inner + after + text.slice(end),
      selStart: start + before.length,
      selEnd: start + before.length + inner.length,
    };
  };
};

const prefixLines = (prefix: string | ((index: number) => string)) => {
  return ({ text, start, end }: Selection): Replacement => {
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const before = text.slice(0, lineStart);
    const body = text.slice(lineStart, end);
    const prefixed = body
      .split('\n')
      .map((line, i) => (typeof prefix === 'function' ? `${prefix(i)}${line}` : `${prefix}${line}`))
      .join('\n');
    return {
      text: before + prefixed + text.slice(end),
      selStart: lineStart,
      selEnd: lineStart + prefixed.length,
    };
  };
};

const ACTIONS = [
  { label: 'Bold', hint: '**text**', icon: BoldIcon, apply: wrap('**', '**', 'bold') },
  { label: 'Italic', hint: '*text*', icon: ItalicIcon, apply: wrap('*', '*', 'italic') },
  {
    label: 'Strikethrough',
    hint: '~~text~~',
    icon: StrikethroughIcon,
    apply: wrap('~~', '~~', 'struck'),
  },
  { label: 'Code', hint: '`code`', icon: CodeIcon, apply: wrap('`', '`', 'code') },
  {
    label: 'Link',
    hint: '[text](url)',
    icon: LinkIcon,
    apply: ({ text, start, end }: Selection): Replacement => {
      const selected = text.slice(start, end) || 'text';
      const inserted = `[${selected}](https://)`;
      return {
        text: text.slice(0, start) + inserted + text.slice(end),
        selStart: start + selected.length + 3,
        selEnd: start + selected.length + 11,
      };
    },
  },
  { label: 'Heading', hint: '## ', icon: HeadingIcon, apply: prefixLines('## ') },
  { label: 'Quote', hint: '> ', icon: QuoteIcon, apply: prefixLines('> ') },
  { label: 'List', hint: '- ', icon: ListIcon, apply: prefixLines('- ') },
  {
    label: 'Ordered list',
    hint: '1. ',
    icon: ListOrderedIcon,
    apply: prefixLines(i => `${i + 1}. `),
  },
  {
    label: 'Code block',
    hint: '```',
    icon: SquareCodeIcon,
    apply: ({ text, start, end }: Selection): Replacement => {
      const selected = text.slice(start, end) || 'code';
      const inserted = `\n\`\`\`\n${selected}\n\`\`\`\n`;
      return {
        text: text.slice(0, start) + inserted + text.slice(end),
        selStart: start + 5,
        selEnd: start + 5 + selected.length,
      };
    },
  },
] as const;

export const MarkdownToolbar = ({
  editorRef,
  onReplace,
}: {
  editorRef: RefObject<HTMLTextAreaElement | null>;
  onReplace: (next: string, selStart: number, selEnd: number) => void;
}) => {
  const run = (apply: (sel: Selection) => Replacement) => {
    const el = editorRef.current;
    if (!el) return;
    const result = apply({ text: el.value, start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 });
    onReplace(result.text, result.selStart, result.selEnd);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.selStart, result.selEnd);
    });
  };

  return (
    <div
      role="toolbar"
      aria-label="Markdown formatting"
      className="flex flex-wrap items-center gap-1 rounded-lg border border-border/40 bg-muted/40 p-1"
    >
      {ACTIONS.map(action => (
        <button
          key={action.label}
          type="button"
          title={`${action.label} (${action.hint})`}
          aria-label={action.label}
          onClick={() => run(action.apply)}
          className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <action.icon className="size-4" />
        </button>
      ))}
    </div>
  );
};
