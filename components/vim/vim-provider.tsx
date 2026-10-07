'use client';

import { THEME_VALUES } from '@/lib/themes';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { VimCommandBar, type VimCommandResult } from './vim-command-bar';
import { VimPalette } from './vim-palette';

export type VimActions = {
  save?: () => void;
  remove?: () => void;
  yank?: () => void;
  focusSearch?: () => void;
};

type VimContextValue = {
  register: (actions: VimActions) => () => void;
  invoke: (key: keyof VimActions) => boolean;
  snapshot: () => (keyof VimActions)[];
  paletteOpen: boolean;
  openPalette: () => void;
  setPaletteOpen: (open: boolean) => void;
};

const VimActionsContext = createContext<(actions: VimActions) => () => void>(() => () => {});

const VimContext = createContext<VimContextValue | null>(null);

export const useVim = () => {
  const ctx = useContext(VimContext);
  if (!ctx) throw new Error('useVim must be used inside VimProvider');
  return ctx;
};

export const useVimActions = (actions: VimActions) => {
  const register = useContext(VimActionsContext);
  useEffect(() => register(actions));
};

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable);

/** Note id when on `/notes/<id>`, otherwise null. */
export const viewedNoteId = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length !== 2 || segments[0] !== 'notes') return null;
  const [, id] = segments;
  return id === 'new' ? null : id;
};

export const VimProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [available, setAvailable] = useState<(keyof VimActions)[]>([]);
  const actionsRef = useRef<VimActions>({});

  // Close overlays on navigation (render-phase adjustment: own state only).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setCmdOpen(false);
    setPaletteOpen(false);
  }

  const snapshot = useCallback((): (keyof VimActions)[] => {
    const actions = actionsRef.current;
    return (Object.keys(actions) as (keyof VimActions)[]).filter(key => actions[key] !== undefined);
  }, []);

  const invoke = useCallback((key: keyof VimActions): boolean => {
    const action = actionsRef.current[key];
    if (action) {
      action();
      return true;
    }
    return false;
  }, []);

  const openPalette = useCallback(() => {
    setAvailable(snapshot());
    setPaletteOpen(true);
  }, [snapshot]);

  const register = useCallback((actions: VimActions) => {
    const prev = actionsRef.current;
    actionsRef.current = { ...prev, ...actions };
    return () => {
      const cur = actionsRef.current;
      const next: VimActions = { ...cur };
      (Object.keys(actions) as (keyof VimActions)[]).forEach(key => {
        if (next[key] === actions[key]) delete next[key];
      });
      actionsRef.current = next;
    };
  }, []);

  const runCommand = useCallback(
    (raw: string): VimCommandResult => {
      const [cmd, ...args] = raw.trim().split(/\s+/);
      const actions = actionsRef.current;
      const done = (): VimCommandResult => ({ status: 'done' });
      const error = (message: string): VimCommandResult => ({ status: 'error', message });
      const info = (message: string): VimCommandResult => ({ status: 'info', message });
      switch (cmd) {
        case '':
          return done();
        case 'w':
          if (actions.save) {
            actions.save();
            return done();
          }
          return error('E: nothing to write');
        case 'q':
        case 'q!':
          router.back();
          return done();
        case 'wq':
        case 'x':
          if (actions.save) {
            actions.save();
            return done();
          }
          return error('E: nothing to write');
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
        case 'd':
        case 'delete':
          if (actions.remove) {
            actions.remove();
            return done();
          }
          return error('E: nothing to delete here');
        case 'y':
        case 'yank':
          if (actions.yank) {
            actions.yank();
            return done();
          }
          return error('E: nothing to yank here');
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
          return info(
            ':w save · :q back · :wq save+back · :e edit · :n new · :d delete · :y yank · :notes :profile :home · :theme <name>',
          );
        default:
          return error(`E492: Not an editor command: ${cmd}`);
      }
    },
    [pathname, router, setTheme],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openPalette();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        setCmdOpen(false);
        setPaletteOpen(false);
        return;
      }
      if (cmdOpen || paletteOpen || isTypingTarget(e.target)) return;
      if (e.key === ':') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.key === '/') {
        const focusSearch = actionsRef.current.focusSearch;
        if (focusSearch) {
          e.preventDefault();
          focusSearch();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cmdOpen, paletteOpen, openPalette]);

  const value: VimContextValue = useMemo(
    () => ({ register, invoke, snapshot, paletteOpen, openPalette, setPaletteOpen }),
    [register, invoke, snapshot, paletteOpen, openPalette]
  );

  return (
    <VimActionsContext.Provider value={register}>
      <VimContext.Provider value={value}>
        {children}
        <VimCommandBar
          key={cmdOpen ? 'open' : 'shut'}
          open={cmdOpen}
          onRun={runCommand}
          onClose={() => setCmdOpen(false)}
        />
        <VimPalette available={available} />
      </VimContext.Provider>
    </VimActionsContext.Provider>
  );
};
