import EditNoteForm from '@/components/notes/edit-note-form';
import { NotesError } from '@/components/notes/notes-error';
import { GeekyBackdrop, GeekyPrompt, TerminalWindow } from '@/components/shared/terminal';
import { getNote } from '@/fetchers/get-note';
import { requireUserSession } from '@/lib/require-user-session';
import { unauthorized } from 'next/navigation';

export default async function EditNotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return <NotesError message="Note not found" />;
  }
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes vim <span className="text-foreground">./notes/{noteId}</span>
        </GeekyPrompt>
        <TerminalWindow
          title={`vim ./${noteId} --edit`}
          right={
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-600 sm:inline-flex dark:text-amber-400">
              <span className="size-1.5 animate-pulse rounded-full bg-amber-500" />
              editing
            </span>
          }
          footer={
            <>
              <span>--edit</span>
              <span>UTF-8</span>
              <span className="ml-auto">:wq to save</span>
            </>
          }
        >
          <EditNoteForm note={note} />
        </TerminalWindow>
      </div>
    </div>
  );
}
