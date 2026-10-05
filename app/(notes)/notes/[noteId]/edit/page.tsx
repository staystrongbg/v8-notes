import { NotesError } from '@/components/notes/notes-error';
import { GeekyBackdrop, GeekyPrompt } from '@/components/shared/terminal';
import { getNote } from '@/fetchers/get-note';
import { requireUserSession } from '@/lib/require-user-session';
import { unauthorized } from 'next/navigation';
import { EditNoteView } from '@/components/notes/edit-note-view';

export default async function EditNotePage({ params }: { params: Promise<{ noteId: string }> }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  const { noteId } = await params;
  const note = await getNote(noteId);

  if (!note) {
    return <NotesError message="Note not found" />;
  }
  return (
    <div className="relative mx-auto w-full max-w-[75vw] px-4 py-6">
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
