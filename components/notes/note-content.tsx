'use client';

import { getNote } from '@/fetchers/get-note';
import { useQuery } from '@tanstack/react-query';
import 'highlight.js/styles/atom-one-dark.css';
import {
  ArrowLeftIcon,
  CalendarClockIcon,
  CheckIcon,
  ChevronRightIcon,
  CopyIcon,
  CpuIcon,
  FileTextIcon,
  FingerprintIcon,
  PencilIcon,
  TimerIcon,
  TypeIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import { TerminalWindow } from '@/components/shared/terminal';
import { noteMarkdownComponents } from '../../helpers/note-markdown-components';
import { DeleteNoteAction } from './delete-note-action';
import { NoteContentLoading } from './loaders-ui/note-content-loading';
import { StarredNote } from './starred-note';

export const NoteContent = ({ noteId }: { noteId: string }) => {
  const { data: note, isLoading } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => getNote(noteId),
  });

  if (isLoading) {
    return <NoteContentLoading />;
  }
  if (!note) {
    return null;
  }

  const words = note.text.trim() ? note.text.trim().split(/\s+/).length : 0;
  const chars = note.text.length;
  const lines = note.text ? note.text.split('\n').length : 0;
  const readMins = Math.max(1, Math.ceil(words / 200));
  const shortId = noteId.slice(0, 8);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <NoteToolbar noteId={noteId} isStarred={note.isStarred} shortId={shortId} />

      <TerminalWindow
        title={`~/notes/${shortId}.md`}
        right={
          <>
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-600 sm:inline-flex dark:text-emerald-400">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              main
            </span>
            <span className="hidden font-mono text-[11px] text-muted-foreground md:inline">UTF-8</span>
          </>
        }
        footer={
          <>
            <span className="flex items-center gap-1.5">
              <CpuIcon className="size-3" />
              markdown
            </span>
            <span>Ln {lines}</span>
            <span>Wc {words}</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              ✓ saved
            </span>
          </>
        }
        bodyClassName="p-0"
      >
        <div className="grid grid-cols-2 gap-px border-b border-border/50 bg-border/40 sm:grid-cols-4">
          <HudStat icon={<CalendarClockIcon className="size-3.5" />} label="--updated">
            {note.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </HudStat>
          <HudStat icon={<TypeIcon className="size-3.5" />} label="--wc words/chars">
            {words} / {chars.toLocaleString()}
          </HudStat>
          <HudStat icon={<TimerIcon className="size-3.5" />} label="--read">
            ~{readMins} min · {lines} ln
          </HudStat>
          <HudStat icon={<FingerprintIcon className="size-3.5" />} label="--id" mono>
            {shortId}
            {note.isStarred ? ' ★' : ''}
          </HudStat>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <ChevronRightIcon className="size-3.5 text-primary" />
              cat ./title.md
            </p>
            <h1 className="font-mono text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl">
              <span className="mr-2 text-primary">#</span>
              {note.title}
            </h1>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">$</span> stat --modified{' '}
              {note.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="max-h-[50dvh] min-h-[200px] overflow-y-auto overscroll-contain pr-1">
            <div className="mb-6 flex items-center gap-3 font-mono text-[11px] text-muted-foreground/70">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <span className="flex items-center gap-1.5">
                <FileTextIcon className="size-3" />
                {'// ---- stdout: render(markdown) ----'}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <ReactMarkdown
                components={noteMarkdownComponents}
                remarkPlugins={[remarkGfm, remarkEmoji]}
                rehypePlugins={[rehypeHighlight]}
              >
                {note.text}
              </ReactMarkdown>
            </div>
            <p className="mt-6 font-mono text-[11px] text-muted-foreground/60">
              <span className="text-emerald-500">✓</span> exit 0 — EOF
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
  <div className="flex items-center gap-2.5 bg-card px-4 py-3">
    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-muted/60 text-muted-foreground">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="font-mono text-[10px] tracking-wider text-muted-foreground/70 uppercase">{label}</p>
      <p className={`truncate text-xs font-semibold text-foreground ${mono ? 'font-mono' : ''}`}>{children}</p>
    </div>
  </div>
);

const NoteToolbar = ({ noteId, isStarred, shortId }: { noteId: string; isStarred: boolean; shortId: string }) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const filePath = useMemo(() => `~/notes/${shortId}.md`, [shortId]);

  const copyPath = async () => {
    try {
      await navigator.clipboard.writeText(filePath);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <button
          onClick={() => router.back()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 font-mono text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">$ cd ..</span>
          <span className="sm:hidden">..</span>
        </button>

        <button
          onClick={copyPath}
          title="Copy path"
          className="hidden min-w-0 flex-1 cursor-pointer items-center gap-2 overflow-hidden rounded-lg border border-transparent px-3 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-border/40 hover:text-foreground md:inline-flex"
        >
          <span className="truncate">
            <span className="text-primary">❯</span> {filePath}
          </span>
          {copied ? (
            <CheckIcon className="ml-auto size-3.5 shrink-0 text-emerald-500" />
          ) : (
            <CopyIcon className="ml-auto size-3.5 shrink-0 opacity-50" />
          )}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/notes/${noteId}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 font-mono text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
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
