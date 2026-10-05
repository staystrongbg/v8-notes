'use client';

import { useState } from 'react';

export type VimCommandResult = { status: 'done' } | { status: 'error' | 'info'; message: string };

export const VimCommandBar = ({
  open,
  onRun,
  onClose,
}: {
  open: boolean;
  onRun: (cmd: string) => VimCommandResult;
  onClose: () => void;
}) => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Extract<VimCommandResult, { status: 'error' | 'info' }> | null>(null);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const outcome = onRun(value);
    if (outcome.status === 'done') {
      onClose();
    } else {
      setResult(outcome);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card">
      <form
        onSubmit={submit}
        className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-2"
      >
        <span className="font-mono text-sm font-bold text-primary">:</span>
        <input
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult(null);
          }}
          placeholder="w q wq e n d y theme help"
          aria-label="Vim command"
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
        />
        {result ? (
          <span
            title={result.message}
            className={
              result.status === 'error'
                ? 'max-w-[60vw] shrink-0 truncate font-mono text-xs text-destructive'
                : 'max-w-[60vw] shrink-0 truncate font-mono text-xs text-muted-foreground'
            }
          >
            {result.message}
          </span>
        ) : (
          <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:inline">
            Enter ↵ · Esc closes
          </span>
        )}
      </form>
    </div>
  );
};
