'use client';

import { useVimActions } from '@/components/vim/vim-provider';
import { restoreNote, trashNote } from '@/fetchers/trash-note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const DeleteNoteAction = ({ noteId, userId }: { noteId: string; userId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => trashNote(noteId, userId),
    onSuccess: () => {
      toast.success('Note moved to trash', {
        action: {
          label: '$ undo',
          onClick: () => restoreNote(noteId, userId).then(() =>
            queryClient.invalidateQueries({ queryKey: ['notes'] })
          ),
        },
      });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes');
    },
    onError: () => toast.error('Failed to delete note'),
  });
  useVimActions({ remove: () => mutate() });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      title="Move to trash (:d)"
      className="border-destructive/30 bg-background/60 text-destructive/80 hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium tracking-wide uppercase transition-all disabled:opacity-50"
    >
      <Trash2Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">rm</span>
      <kbd className="border-destructive/20 hidden rounded border px-1 text-[10px] lg:inline">
        :d
      </kbd>
    </button>
  );
};
