import { EditNoteView } from '@/components/notes/edit-note-view';
import { NotesError } from '@/components/notes/notes-error';
import { TrashedNotePanel } from '@/components/notes/trashed-note-panel';
import { GeekyBackdrop, GeekyPrompt } from '@/components/shared/terminal';
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
  if (note.deletedAt) {
    return (
      <div className="relative mx-auto w-full max-w-6xl px-4 py-6">
        <GeekyBackdrop />
        <div className="relative">
          <GeekyPrompt>
            v8-notes vim <span className="text-foreground">./notes/{noteId}</span>
          </GeekyPrompt>
          <TrashedNotePanel noteId={noteId} userId={note.userId} title={note.title} />
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes vim <span className="text-foreground">./notes/{noteId}</span>
        </GeekyPrompt>
        <EditNoteView note={note} />
      </div>
    </div>
  );
}
