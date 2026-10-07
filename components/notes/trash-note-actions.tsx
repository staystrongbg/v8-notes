'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { HistoryIcon, Trash2Icon } from 'lucide-react';
import { purgeNote, restoreNote } from '@/fetchers/trash-note';

export const RestoreNoteButton = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => restoreNote(noteId, userId),
    onSuccess: async () => {
      toast.success('Note restored');
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => toast.error('Failed to restore note'),
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="text-primary hover:text-primary/80 inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold transition-colors disabled:opacity-50"
    >
      <HistoryIcon className="h-3.5 w-3.5" />
      {isPending ? 'restoring...' : '$ restore'}
    </button>
  );
};

export const PurgeNoteButton = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => purgeNote(noteId, userId),
    onSuccess: async () => {
      toast.success('Note permanently deleted');
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => toast.error('Failed to delete note'),
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="text-destructive/80 hover:text-destructive inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-bold transition-colors disabled:opacity-50"
    >
      <Trash2Icon className="h-3.5 w-3.5" />
      {isPending ? 'purging...' : '$ purge'}
    </button>
  );
};
