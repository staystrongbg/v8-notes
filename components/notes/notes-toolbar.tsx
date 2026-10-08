'use client';

import { useVim, useVimActions } from '@/components/vim/vim-provider';
import { useCreatePageUrl } from '@/hooks/use-create-page-url';
import { cn } from '@/lib/utils';
import {
  CommandIcon,
  Grid,
  Library,
  Plus,
  Star,
  Table2Icon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const NotesToolbar = ({
  notesTotal,
  notesStarredTotal,
  notesTrashedTotal,
}: {
  notesTotal?: number;
  notesStarredTotal?: number;
  notesTrashedTotal?: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageUrl = useCreatePageUrl();

  const isStarred = searchParams.get('starred') === 'true';
  const isTrashed = searchParams.get('trashed') === 'true';
  const currentView = searchParams.get('view') || 'grid';
  const urlQuery = searchParams.get('q') ?? '';

  const [text, setText] = useState(urlQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  useVimActions({ focusSearch: () => inputRef.current?.focus() });
  const { openPalette } = useVim();

  // Re-sync after browser back/forward (urlQuery only changes outside typing).
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (syncedQuery !== urlQuery) {
    setSyncedQuery(urlQuery);
    setText(urlQuery);
  }

  useEffect(() => {
    if (text === urlQuery) return;
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (text.trim()) {
        params.set('q', text.trim());
      } else {
        params.delete('q');
      }
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    }, 250);
    return () => clearTimeout(id);
  }, [text, urlQuery, searchParams, pathname, router]);

  return (
    <div className="border-border/60 bg-card mb-4 overflow-hidden rounded-xl border">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <nav className="border-border/40 bg-muted/40 flex items-center gap-1 rounded-lg border p-1 font-mono text-xs">
          <button
            onClick={() => router.push('/notes')}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all',
              !isStarred && !isTrashed
                ? 'bg-primary/15 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Library className="h-3.5 w-3.5" />
            ./all ({notesTotal ?? "…"})
          </button>
          <button
            onClick={() => router.push('/notes?starred=true')}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all',
              isStarred
                ? 'bg-primary/15 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Star className="h-3.5 w-3.5" />
            --starred ({notesStarredTotal ?? "…"})
          </button>
          <button
            onClick={() => router.push('/notes?trashed=true')}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all',
              isTrashed
                ? 'bg-primary/15 text-primary shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Trash2Icon className="h-3.5 w-3.5" />
            --trash ({notesTrashedTotal ?? "…"})
          </button>
        </nav>

        <div className="border-border/40 bg-muted/40 focus-within:border-primary/50 flex min-w-36 flex-1 items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs">
          <span className="text-primary font-bold">/</span>
          <input
            ref={inputRef}
            id="notes-search"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="query --all"
            aria-label="Search notes"
            autoComplete="off"
            spellCheck={false}
            className="text-foreground placeholder:text-muted-foreground/50 min-w-0 flex-1 bg-transparent outline-none"
          />
          {text && (
            <button
              onClick={() => {
                setText('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/notes/new"
            className="bg-primary text-primary-foreground shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-3.5 py-2 font-mono text-xs font-bold shadow-md transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5" />
            touch new
          </Link>

          <button
            onClick={openPalette}
            title="Command palette (Ctrl+K)"
            aria-label="Command palette"
            className="border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <kbd className="border-border/40 hidden rounded border px-1 text-[10px] lg:inline">
              ctrl+k
            </kbd>
          </button>

          <div className="border-border/40 bg-muted/40 flex items-center gap-1 rounded-lg border p-1">
            <Link
              href={createPageUrl('view', 'grid')}
              aria-label="Grid view"
              className={cn(
                'inline-flex items-center rounded-md px-2.5 py-2 transition-all',
                currentView === 'grid'
                  ? 'bg-primary/15 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Grid className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={createPageUrl('view', 'table')}
              aria-label="Table view"
              className={cn(
                'inline-flex items-center rounded-md px-2.5 py-2 transition-all',
                currentView === 'table'
                  ? 'bg-primary/15 text-primary shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Table2Icon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
