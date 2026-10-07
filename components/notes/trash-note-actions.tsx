'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { HistoryIcon, Trash2Icon } from 'lucide-react';
import { purgeNote, restoreNote } from '@/fetchers/trash-note';

export const RestoreNoteButton = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onRestore = async () => {
    try {
      setIsPending(true);
      await restoreNote(noteId, userId);
      toast.success('Note restored');
      router.refresh();
    } catch {
      toast.error('Failed to restore note');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={onRestore}
      disabled={isPending}
      className="text-primary hover:text-primary/80 inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold transition-colors disabled:opacity-50"
    >
      <HistoryIcon className="h-3.5 w-3.5" />
      {isPending ? 'restoring...' : '$ restore'}
    </button>
  );
};

export const PurgeNoteButton = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onPurge = async () => {
    try {
      setIsPending(true);
      await purgeNote(noteId, userId);
      toast.success('Note permanently deleted');
      router.refresh();
    } catch {
      toast.error('Failed to delete note');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={onPurge}
      disabled={isPending}
      className="text-destructive/80 hover:text-destructive inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold transition-colors disabled:opacity-50"
    >
      <Trash2Icon className="h-3.5 w-3.5" />
      {isPending ? 'purging...' : '$ purge'}
    </button>
  );
};
