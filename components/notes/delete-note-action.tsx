'use client';

import { deleteNote } from '@/fetchers/delete-note';
import { Trash2Icon, TriangleAlertIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useVimActions } from '@/components/vim/vim-provider';

export const DeleteNoteAction = ({ noteId }: { noteId: string }) => {
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
        <DeleteNoteConfirmationDialog noteId={noteId} onClose={() => setIsDeleting(false)} />
      )}
    </>
  );
};

const DeleteNoteConfirmationDialog = ({
  noteId,
  onClose,
}: {
  noteId: string;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    try {
      setIsPending(true);
      await deleteNote(noteId);
      toast.success('Note deleted successfully');
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
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-note-title"
        className="border-destructive/60 bg-background shadow-destructive/30 w-full max-w-md overflow-hidden rounded-xl border-2 font-mono shadow-2xl"
      >
        <div className="border-border/50 bg-muted/50 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="text-destructive font-mono text-xs font-bold">[rm]</span>
          <span className="text-muted-foreground text-xs">~/notes/rm --confirm</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:bg-muted hover:text-foreground ml-auto rounded p-1 transition-colors"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="border-destructive/30 bg-destructive/15 flex size-10 shrink-0 items-center justify-center rounded-lg border">
              <TriangleAlertIcon className="text-destructive size-5" />
            </div>
            <div>
              <h2 id="delete-note-title" className="text-foreground text-sm font-bold">
                $ rm -rf note?
              </h2>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                This action cannot be undone. The note will be permanently removed.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
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
              {isPending ? 'deleting...' : '--force'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
