'use client';

import { useVimActions } from '@/components/vim/vim-provider';
import { trashNote } from '@/fetchers/trash-note';
import { Trash2Icon, TriangleAlertIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const DeleteNoteAction = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  useVimActions({ remove: () => setIsDeleting(true) });

  return (
    <>
      <button
        onClick={() => setIsDeleting(true)}
        disabled={isDeleting}
        className="border-destructive/30 bg-background/60 text-destructive/80 hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium tracking-wide uppercase transition-all disabled:opacity-50"
      >
        <Trash2Icon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">rm</span>
        <kbd className="border-destructive/20 hidden rounded border px-1 text-[10px] lg:inline">
          :d
        </kbd>
      </button>
      {isDeleting && (
        <DeleteNoteConfirmationDialog
          noteId={noteId}
          userId={userId}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  );
};

const DeleteNoteConfirmationDialog = ({
  noteId,
  userId,
  onClose,
}: {
  noteId: string;
  userId: string;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    try {
      setIsPending(true);
      await trashNote(noteId, userId);
      toast.success('Note moved to trash');
      router.push('/notes');
    } catch {
      toast.error('Failed to delete note');
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Cancel delete"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/80 backdrop-blur-md"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-note-title"
        aria-describedby="delete-note-desc"
        className="bg-card text-card-foreground border-destructive ring-destructive/40 animate-in fade-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-xl border-2 font-mono shadow-[0_0_90px_-12px_var(--destructive)] ring-2 duration-200"
      >
        <div className="border-destructive/30 bg-destructive/10 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="text-destructive font-mono text-xs font-bold">[rm]</span>
          <span className="text-muted-foreground min-w-0 flex-1 truncate text-xs">
            ~/notes/rm --confirm
          </span>
          <span className="border-destructive/40 bg-destructive/15 text-destructive rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">
            danger
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:bg-muted hover:text-foreground ml-1 rounded p-1 transition-colors"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="border-destructive/40 bg-destructive/15 flex size-10 shrink-0 items-center justify-center rounded-lg border">
              <TriangleAlertIcon className="text-destructive size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="delete-note-title" className="text-foreground text-sm font-bold">
                <span className="text-destructive" aria-hidden="true">
                  ❯{' '}
                </span>
                $ trash note?
              </h2>
              <p
                id="delete-note-desc"
                className="text-muted-foreground mt-1 text-xs leading-relaxed"
              >
                Move to trash. Restore within 30 days — older trash is purged automatically.
              </p>
              <p className="text-muted-foreground mt-2 min-w-0 truncate text-[11px]" title={noteId}>
                target: <span className="text-foreground break-all">{noteId}</span>
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
              autoFocus
              className="border-border bg-background text-foreground hover:bg-muted inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border px-4 font-mono text-xs font-semibold transition-colors disabled:opacity-50"
            >
              --cancel
            </button>
            <button
              onClick={onDelete}
              disabled={isPending}
              className="bg-destructive shadow-destructive/30 hover:bg-destructive/90 text-primary-foreground inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 font-mono text-xs font-semibold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Trash2Icon className="size-3.5" />
              {isPending ? 'trashing...' : '--trash'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
