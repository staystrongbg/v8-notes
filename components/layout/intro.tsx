import Link from 'next/link';
import { GeekyBackdrop, GeekyPrompt, TerminalWindow } from '../shared/terminal';
import { SignUpButton } from './signup-button';

const ROUTES = [
  { path: '/notes', desc: 'list, star, and search notes' },
  { path: '/notes/new', desc: 'write a note in markdown' },
  { path: '/notes?view=table', desc: 'same notes, table view' },
  { path: '/profile', desc: 'account and settings' },
] as const;

const FEATURES = ['markdown + code highlight', 'starred filter', 'grid / table views', '5 themes'] as const;

const SHORTCUTS = [
  { keys: ':', desc: 'open command bar' },
  { keys: ':w', desc: 'save note' },
  { keys: ':q', desc: 'back to list' },
  { keys: ':wq', desc: 'save + back' },
  { keys: ':e', desc: 'edit this note' },
  { keys: ':n', desc: 'new note' },
  { keys: ':d', desc: 'delete note' },
  { keys: ':y', desc: 'yank (copy) note' },
  { keys: ':notes', desc: 'go to notes' },
  { keys: ':profile', desc: 'go to profile' },
  { keys: ':theme …', desc: 'switch theme' },
  { keys: ':help', desc: 'all commands' },
  { keys: 'Esc', desc: 'close bar' },
] as const;

export const Intro = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-24">
      <GeekyBackdrop />
      <div className="relative mx-auto w-full max-w-4xl">
        <GeekyPrompt>v8-notes --help</GeekyPrompt>
        <TerminalWindow title="v8-notes --help" bodyClassName="p-0">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="mr-3 text-primary">#</span>v8-notes
            </h1>
            <p className="mt-3 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
              Plain markdown notes with syntax-highlighted code blocks, starring,
              and grid or table views. No lock-in — just text.
            </p>

            <p className="mt-8 mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Usage
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ROUTES.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="group flex items-baseline gap-2 rounded-lg border border-border/40 bg-muted/30 px-3 py-2.5 font-mono text-xs transition-colors hover:border-primary/50"
                >
                  <span className="shrink-0 font-bold text-primary group-hover:underline">
                    $ {route.path}
                  </span>
                  <span className="truncate text-muted-foreground"># {route.desc}</span>
                </Link>
              ))}
            </div>

            <p className="mt-8 mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Features
            </p>
            <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span> {feature}
                </li>
              ))}
            </ul>

            <p className="mt-8 mb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
              Shortcuts
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SHORTCUTS.map((item) => (
                <div
                  key={item.keys}
                  className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/30 px-3 py-2 font-mono text-xs"
                >
                  <kbd className="shrink-0 rounded border border-border/60 bg-muted px-1.5 py-0.5 font-bold text-primary">
                    {item.keys}
                  </kbd>
                  <span className="truncate text-muted-foreground">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SignUpButton />
              <Link
                href="/notes"
                className="text-primary inline-flex items-center gap-2 px-2 py-3 font-mono text-sm font-bold underline decoration-dotted decoration-primary/50 underline-offset-4 hover:decoration-solid"
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
