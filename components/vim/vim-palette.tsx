'use client';

import { getNotes } from '@/fetchers/get-notes';
import { useSession } from '@/lib/auth-client';
import { THEME_VALUES } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { type VimActions, useVim, viewedNoteId } from './vim-provider';

type PaletteItem = {
  id: string;
  label: string;
  hint: string;
  run: () => void;
};

const score = (label: string, query: string) => {
  const text = label.toLowerCase();
  const q = query.toLowerCase();
  if (text.startsWith(q)) return 2;
  if (text.includes(q)) return 1;
  return -1;
};

export const VimPalette = ({ available }: { available: (keyof VimActions)[] }) => {
  const { paletteOpen, setPaletteOpen, invoke } = useVim();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const [wasOpen, setWasOpen] = useState(paletteOpen);
  if (wasOpen !== paletteOpen) {
    setWasOpen(paletteOpen);
    if (paletteOpen) {
      setQuery('');
      setActive(0);
    }
  }

  const close = () => setPaletteOpen(false);
  const go = (href: string) => {
    close();
    router.push(href);
  };
  const noteId = viewedNoteId(pathname);
  const has = (key: keyof VimActions) => available.includes(key);

  const commands: PaletteItem[] = [
    ...(has('save')
      ? [{ id: 'save', label: 'Save note', hint: ':w', run: () => invoke('save') }]
      : []),
    ...(noteId
      ? [
          {
            id: 'edit',
            label: 'Edit this note',
            hint: ':e',
            run: () => go(`/notes/${noteId}/edit`),
          },
        ]
      : []),
    ...(has('remove')
      ? [{ id: 'delete', label: 'Delete note', hint: ':d', run: () => invoke('remove') }]
      : []),
    ...(has('yank')
      ? [{ id: 'yank', label: 'Yank (copy) note', hint: ':y', run: () => invoke('yank') }]
      : []),
    { id: 'new', label: 'New note', hint: ':n', run: () => go('/notes/new') },
    { id: 'notes', label: 'Go to notes', hint: ':notes', run: () => go('/notes') },
    { id: 'profile', label: 'Go to profile', hint: ':profile', run: () => go('/profile') },
    { id: 'home', label: 'Go home', hint: ':home', run: () => go('/') },
    ...THEME_VALUES.map(name => ({
      id: `theme:${name}`,
      label: `Theme: ${name}`,
      hint: ':theme',
      run: () => setTheme(name),
    })),
  ];

  const q = query.trim();
  const { data: recent, error: recentError } = useQuery({
    queryKey: ['palette-recent', userId],
    queryFn: () => getNotes(userId ?? '', 'all', 1, 5, 'updated'),
    enabled: paletteOpen && !!userId && !q,
  });

  const {
    data: found,
    error: searchError,
    isLoading,
  } = useQuery({
    queryKey: ['palette-search', userId, q],
    queryFn: () => getNotes(userId ?? '', 'all', 1, 7, 'updated', q),
    enabled: paletteOpen && !!userId && !!q,
  });
  const notes = (q ? found?.notes : recent?.notes) ?? [];
  const notesError = q ? searchError : recentError;

  const matchedCommands = (
    q
      ? commands
          .map(item => ({ item, rank: score(`${item.label} ${item.hint} ${item.id}`, q) }))
          .filter(entry => entry.rank > 0)
          .sort((a, b) => b.rank - a.rank)
          .map(entry => entry.item)
      : commands
  ).slice(0, 9);

  const rows: Array<{
    key: string;
    render: () => React.ReactNode;
    run: () => void;
    section: string;
  }> = [
    ...(notesError
      ? [
          {
            key: 'notes:error',
            section: 'notes',
            run: () => {},
            render: () => (
              <span className="text-destructive font-mono text-xs">
                [stderr] notes failed to load — try again
              </span>
            ),
          },
        ]
      : []),
    ...matchedCommands.map(item => ({
      key: `cmd:${item.id}`,
      section: 'commands',
      run: () => {
        item.run();
        close();
      },
      render: () => (
        <>
          <span className="truncate">{item.label}</span>
          <kbd className="border-border/60 bg-muted text-primary ml-auto shrink-0 rounded border px-1.5 py-0.5 font-mono text-[11px]">
            {item.hint}
          </kbd>
        </>
      ),
    })),
    ...notes.map(note => ({
      key: `note:${note.id}`,
      section: 'notes',
      run: () => go(`/notes/${note.id}`),
      render: () => (
        <>
          <span className="truncate">{note.title}</span>
          <span className="text-muted-foreground ml-auto shrink-0 font-mono text-[11px]">
            ❯ {note.id.slice(0, 8)}
          </span>
        </>
      ),
    })),
  ];
  const current = rows.length === 0 ? 0 : Math.min(active, rows.length - 1);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${current}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [current]);

  if (!paletteOpen) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(prev => (rows.length === 0 ? 0 : (prev + 1) % rows.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(prev => (rows.length === 0 ? 0 : (prev - 1 + rows.length) % rows.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      rows[current]?.run();
    }
  };

  const blocks: Array<{ section: string; rows: typeof rows }> = [];
  for (const row of rows) {
    const last = blocks[blocks.length - 1];
    if (last && last.section === row.section) {
      last.rows.push(row);
    } else {
      blocks.push({ section: row.section, rows: [row] });
    }
  }
  let flatIndex = -1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-[12vh]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="border-border/60 bg-card w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="text-primary font-mono text-sm font-bold">❯</span>
          <input
            autoFocus
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="command or note title…"
            aria-label="Command palette"
            autoComplete="off"
            spellCheck={false}
            className="placeholder:text-muted-foreground/50 min-w-0 flex-1 bg-transparent font-mono text-sm outline-none"
          />
          <kbd className="border-border/60 bg-muted text-muted-foreground shrink-0 rounded border px-1.5 py-0.5 font-mono text-[11px]">
            esc
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-1.5">
          {isLoading && <Loader2 className="text-muted-foreground mx-auto h-4 w-4 animate-spin" />}
          {rows.length === 0 && (
            <p className="text-muted-foreground px-3 py-6 text-center font-mono text-xs">
              0 matches
            </p>
          )}
          {blocks.map(block => (
            <div key={block.section}>
              <p className="text-muted-foreground/70 px-3 pt-2 pb-1 font-mono text-[10px] tracking-wider uppercase">
                {block.section}
              </p>
              {block.rows.map(row => {
                flatIndex += 1;
                const i = flatIndex;
                return (
                  <button
                    key={row.key}
                    data-index={i}
                    onClick={row.run}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-xs transition-colors',
                      i === current ? 'bg-primary/15 text-primary' : 'text-foreground',
                    )}
                  >
                    {row.render()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
