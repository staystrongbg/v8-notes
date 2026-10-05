'use client';

import { useState } from 'react';

export const VimCommandBar = ({
  open,
  onRun,
  onClose,
}: {
  open: boolean;
  onRun: (cmd: string) => string | null;
  onClose: () => void;
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = onRun(value);
    if (err) {
      setError(err);
    } else {
      onClose();
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
            setError(null);
          }}
          placeholder="w q wq e n"
          aria-label="Vim command"
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
        />
        {error ? (
          <span className="shrink-0 font-mono text-xs text-destructive">{error}</span>
        ) : (
          <span className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:inline">
            Enter ↵ · Esc closes
          </span>
        )}
      </form>
    </div>
  );
};
