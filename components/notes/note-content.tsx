'use client';

import { TerminalWindow } from '@/components/shared/terminal';
import { useVimActions } from '@/components/vim/vim-provider';
import { getNote } from '@/fetchers/get-note';
import { useQuery } from '@tanstack/react-query';
import 'highlight.js/styles/atom-one-dark.css';
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  FileTextIcon,
  FingerprintIcon,
  PencilIcon,
  TimerIcon,
  TypeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import { highlightPlugin } from '../../helpers/code-highlight';
import { noteMarkdownComponents } from '../../helpers/note-markdown-components';
import { DeleteNoteAction } from './delete-note-action';
import { NoteContentLoading } from './loaders-ui/note-content-loading';
import { NotesError } from './notes-error';
import { StarredNote } from './starred-note';
import { VimStatusline } from './vim-statusline';

export const NoteContent = ({ noteId }: { noteId: string }) => {
  const { data: note, isPending } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => getNote(noteId),
  });

  if (isPending) {
    return <NoteContentLoading />;
  }
  if (!note) {
    return <NotesError message="Note not found" />;
  }

  const words = note.text.trim() ? note.text.trim().split(/\s+/).length : 0;
  const chars = note.text.length;
  const lines = note.text ? note.text.split('\n').length : 0;
  const readMins = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="mx-auto max-w-4xl">
      <NoteToolbar noteId={noteId} isStarred={note.isStarred} title={note.title} text={note.text} />

      <TerminalWindow
        title={`~/notes/${noteId}`}
        statusline={
          <VimStatusline
            mode="normal"
            file={`~/notes/${noteId}`}
            meta={[`Ln ${lines}`, `Wc ${words}`, `~${readMins} min`]}
          />
        }
        bodyClassName="p-0"
      >
        <div className="border-border/50 bg-border/40 grid grid-cols-2 gap-px border-b sm:grid-cols-4">
          <HudStat icon={<CalendarClockIcon className="size-3.5" />} label="--updated">
            {note.updatedAt.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </HudStat>
          <HudStat icon={<TypeIcon className="size-3.5" />} label="--wc words/chars">
            {words} / {chars.toLocaleString()}
          </HudStat>
          <HudStat icon={<TimerIcon className="size-3.5" />} label="--read">
            ~{readMins} min · {lines} ln
          </HudStat>
          <HudStat icon={<FingerprintIcon className="size-3.5" />} label="--id" mono>
            {noteId}
            {note.isStarred ? ' ★' : ''}
          </HudStat>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-muted-foreground mb-2 flex items-center gap-1.5 font-mono text-xs">
              <ChevronRightIcon className="text-primary size-3.5" />
              cat ./title.md
            </p>
            <h1 className="text-foreground font-mono text-2xl leading-tight font-bold tracking-tight break-words sm:text-3xl">
              <span className="text-primary mr-2">#</span>
              {note.title}
            </h1>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              <span className="text-primary">$</span> stat --modified{' '}
              {note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="max-h-[50dvh] min-h-[200px] overflow-y-auto overscroll-contain pr-1">
            <div className="text-muted-foreground/70 mb-6 flex items-center gap-3 font-mono text-[11px]">
              <span className="via-border h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
              <span className="flex items-center gap-1.5">
                <FileTextIcon className="size-3" />
                {'// ---- stdout: render(markdown) ----'}
              </span>
              <span className="via-border h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <ReactMarkdown
                components={noteMarkdownComponents}
                remarkPlugins={[remarkGfm, remarkEmoji]}
                rehypePlugins={[highlightPlugin]}
              >
                {note.text}
              </ReactMarkdown>
            </div>
            <p className="text-muted-foreground/60 mt-6 font-mono text-[11px]">
              <span className="text-primary">✓</span> exit 0 — EOF
            </p>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};

const HudStat = ({
  icon,
  label,
  children,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  mono?: boolean;
}) => (
  <div className="bg-card flex min-w-0 items-center gap-2.5 px-4 py-3">
    <span className="border-border/50 bg-muted/60 text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-md border">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-muted-foreground/70 font-mono text-[10px] tracking-wider uppercase">
        {label}
      </p>
      <p className={`text-foreground truncate text-xs font-semibold ${mono ? 'font-mono' : ''}`}>
        {children}
      </p>
    </div>
  </div>
);

const NoteToolbar = ({
  noteId,
  isStarred,
  title,
  text,
}: {
  noteId: string;
  isStarred: boolean;
  title: string;
  text: string;
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const copyNote = async () => {
    try {
      await navigator.clipboard.writeText(`# ${title}\n\n${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  useVimActions({ yank: () => void copyNote() });

  return (
    <div className="border-border/60 bg-card mb-4 overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <button
          onClick={() => router.back()}
          className="border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">$ cd ..</span>
          <span className="sm:hidden">..</span>
        </button>

        <button
          onClick={copyNote}
          title="Copy note (:y)"
          className="text-muted-foreground hover:border-border/40 hover:text-foreground hidden min-w-0 flex-1 cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-transparent px-3 py-2 font-mono text-xs transition-all md:inline-flex"
        >
          <span className="truncate">
            <span className="text-primary">❯</span> {noteId}
          </span>
          {copied ? (
            <CheckIcon className="text-primary ml-auto size-3.5 shrink-0" />
          ) : (
            <CopyIcon className="ml-auto size-3.5 shrink-0 opacity-50" />
          )}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/notes/${noteId}/edit`}
            className="border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all"
          >
            <PencilIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">vim</span>
          </Link>
          <StarredNote noteId={noteId} isStarred={isStarred} />
          <DeleteNoteAction noteId={noteId} />
        </div>
      </div>
    </div>
  );
};
