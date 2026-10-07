'use client';

import { TerminalWindow } from '@/components/shared/terminal';
import { purgeNote, restoreNote } from '@/fetchers/trash-note';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeftIcon, HistoryIcon, Trash2Icon, TriangleAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { VimStatusline } from './vim-statusline';

export const TrashedNotePanel = ({
  noteId,
  userId,
  title,
}: {
  noteId: string;
  userId: string;
  title: string;
}) => {
  const router = useRouter();
  const restore = useMutation({
    mutationFn: () => restoreNote(noteId, userId),
    onSuccess: () => {
      toast.success('Note restored');
      router.push('/notes');
    },
    onError: () => toast.error('Failed to restore note'),
  });
  const purge = useMutation({
    mutationFn: () => purgeNote(noteId, userId),
    onSuccess: () => {
      toast.success('Note permanently deleted');
      router.push('/notes?trashed=true');
    },
    onError: () => toast.error('Failed to delete note'),
  });
  const isPending = restore.isPending || purge.isPending;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <TerminalWindow
        title={`~/notes/${noteId}`}
        statusline={<VimStatusline mode="normal" file={`~/notes/${noteId}`} meta={['trashed']} />}
        bodyClassName="p-6 sm:p-8"
      >
        <div className="grid place-items-center gap-4 text-center">
          <TriangleAlertIcon className="text-destructive size-10" />
          <h1 className="text-foreground font-mono text-xl font-bold">
            <span className="text-primary mr-2">#</span>
            {title}
          </h1>
          <p className="text-muted-foreground max-w-sm font-mono text-xs leading-relaxed">
            This note is in trash. Restore it within 30 days of deletion — older trash is purged
            automatically.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => router.back()}
              disabled={isPending}
              className="border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-4 font-mono text-xs font-medium transition-all disabled:opacity-50"
            >
              <ArrowLeftIcon className="size-3.5" />$ cd ..
            </button>
            <button
              onClick={() => restore.mutate()}
              disabled={isPending}
              className="bg-primary text-primary-foreground inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-4 font-mono text-xs font-bold transition-all hover:brightness-110 disabled:opacity-50"
            >
              <HistoryIcon className="size-3.5" />
              {restore.isPending ? 'restoring...' : '$ restore'}
            </button>
            <button
              onClick={() => purge.mutate()}
              disabled={isPending}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg px-4 font-mono text-xs font-bold transition-all disabled:opacity-50"
            >
              <Trash2Icon className="size-3.5" />
              {purge.isPending ? 'purging...' : '$ purge'}
            </button>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};
