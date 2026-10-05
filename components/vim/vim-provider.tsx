'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { VimCommandBar } from './vim-command-bar';

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
  const [cmdOpen, setCmdOpen] = useState(false);

  const runCommand = useCallback(
    (raw: string): string | null => {
      const [cmd] = raw.trim().split(/\s+/);
      switch (cmd) {
        case '':
          return null;
        case 'w':
          return submitNoteForm() ? null : 'E: nothing to write';
        case 'q':
        case 'q!':
          router.back();
          return null;
        case 'wq':
        case 'x':
          return submitNoteForm() ? null : 'E: nothing to write';
        case 'e': {
          const noteId = viewedNoteId(pathname);
          if (noteId) {
            router.push(`/notes/${noteId}/edit`);
            return null;
          }
          return 'E: nothing to edit here';
        }
        case 'n':
        case 'new':
          router.push('/notes/new');
          return null;
        default:
          return `E492: Not an editor command: ${cmd}`;
      }
    },
    [pathname, router]
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
