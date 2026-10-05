'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { THEME_VALUES } from '@/lib/themes';
import { VimCommandBar, type VimCommandResult } from './vim-command-bar';

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable);

const submitNoteForm = () => {
  const form = document.getElementById('note-form');
  if (form instanceof HTMLFormElement) {
    form.requestSubmit();
    return true;
  }
  return false;
};

/** Note id when on `/notes/<id>`, otherwise null. */
const viewedNoteId = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length === 2 && segments[0] === 'notes' ? segments[1] : null;
};

export const VimProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);

  const runCommand = useCallback(
    (raw: string): VimCommandResult => {
      const [cmd, ...args] = raw.trim().split(/\s+/);
      const done = (): VimCommandResult => ({ status: 'done' });
      const error = (message: string): VimCommandResult => ({ status: 'error', message });
      const info = (message: string): VimCommandResult => ({ status: 'info', message });
      switch (cmd) {
        case '':
          return done();
        case 'w':
          return submitNoteForm() ? done() : error('E: nothing to write');
        case 'q':
        case 'q!':
          router.back();
          return done();
        case 'wq':
        case 'x':
          return submitNoteForm() ? done() : error('E: nothing to write');
        case 'e': {
          const noteId = viewedNoteId(pathname);
          if (noteId) {
            router.push(`/notes/${noteId}/edit`);
            return done();
          }
          return error('E: nothing to edit here');
        }
        case 'n':
        case 'new':
          router.push('/notes/new');
          return done();
        case 'notes':
          router.push('/notes');
          return done();
        case 'profile':
          router.push('/profile');
          return done();
        case 'home':
          router.push('/');
          return done();
        case 'theme': {
          const [name] = args;
          if (name && (THEME_VALUES as readonly string[]).includes(name)) {
            setTheme(name);
            return done();
          }
          return info(`usage: :theme <${THEME_VALUES.join('|')}>`);
        }
        case 'h':
        case 'help':
          return info(':w save · :q back · :wq save+back · :e edit · :n new · :notes :profile :home · :theme <name>');
        default:
          return error(`E492: Not an editor command: ${cmd}`);
      }
    },
    [pathname, router, setTheme]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        setCmdOpen(false);
        return;
      }
      if (cmdOpen || isTypingTarget(e.target)) return;
      if (e.key === ':') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cmdOpen]);

  return (
    <>
      {children}
      <VimCommandBar
        key={cmdOpen ? 'open' : 'shut'}
        open={cmdOpen}
        onRun={runCommand}
        onClose={() => setCmdOpen(false)}
      />
    </>
  );
};
