import Link from 'next/link';

import { GeekyBackdrop, TerminalWindow } from '../shared/terminal';
import { SignUpButton } from './signup-button';

const ROUTES = [
  { path: '/notes', desc: 'list, star, and search notes' },
  { path: '/notes/new', desc: 'write a note in markdown' },
  { path: '/notes?view=table', desc: 'same notes, table view' },
  { path: '/notes?trashed=true', desc: 'trash, restore or purge' },
  { path: '/profile', desc: 'account and settings' },
] as const;

const FEATURES = [
  'markdown + code highlight',
  'full-text search ( / )',
  'starred filter',
  'trash + restore (30d)',
  'markdown toolbar',
  'grid / table views',
  '8 themes',
] as const;

const SHORTCUTS = [
  { keys: ':', desc: 'open command bar' },
  { keys: ':w', desc: 'save note' },
  { keys: ':q', desc: 'back to list' },
  { keys: ':wq', desc: 'save + back' },
  { keys: ':e', desc: 'edit this note' },
  { keys: ':n', desc: 'new note' },
  { keys: ':d', desc: 'delete note' },
  { keys: ':y', desc: 'yank (copy) note' },
  { keys: 'ctrl+k', desc: 'command palette' },
  { keys: ':notes', desc: 'go to notes' },
  { keys: ':profile', desc: 'go to profile' },
  { keys: ':theme …', desc: 'switch theme' },
  { keys: ':help', desc: 'all commands' },
  { keys: 'Esc', desc: 'close bar' },
  { keys: '/', desc: 'focus search' },
] as const;

export const Intro = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      <GeekyBackdrop />
      <div className="relative mx-auto max-w-4xl">
        <TerminalWindow title="v8-notes --help" bodyClassName="p-0">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <h1 className="text-foreground font-mono text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-primary mr-3">#</span>v8-notes
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl font-mono text-sm leading-relaxed">
              Plain markdown notes with syntax-highlighted code blocks, starring, and grid or table
              views. No lock-in — just text.
            </p>

            <p className="text-muted-foreground mt-8 mb-2 font-mono text-xs tracking-wider uppercase">
              Usage
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ROUTES.map(route => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group border-border/40 bg-muted/30 hover:border-primary/50 flex items-baseline gap-2 rounded-lg border px-3 py-2.5 font-mono text-xs transition-colors"
                >
                  <span className="text-primary shrink-0 font-bold group-hover:underline">
                    $ {route.path}
                  </span>
                  <span className="text-muted-foreground truncate"># {route.desc}</span>
                </Link>
              ))}
            </div>

            <p className="text-muted-foreground mt-8 mb-2 font-mono text-xs tracking-wider uppercase">
              Features
            </p>
            <ul className="text-muted-foreground space-y-1.5 font-mono text-xs">
              {FEATURES.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {feature}
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground mt-8 mb-2 font-mono text-xs tracking-wider uppercase">
              Shortcuts
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SHORTCUTS.map(item => (
                <div
                  key={item.keys}
                  className="border-border/40 bg-muted/30 flex items-center gap-3 rounded-lg border px-3 py-2 font-mono text-xs"
                >
                  <kbd className="border-border/60 bg-muted text-primary shrink-0 rounded border px-1.5 py-0.5 font-bold">
                    {item.keys}
                  </kbd>
                  <span className="text-muted-foreground truncate">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignUpButton />
              <Link
                href="/notes"
                className="text-primary decoration-primary/50 inline-flex items-center gap-2 px-2 py-3 font-mono text-sm font-bold underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                $ cd ~/notes
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
};
