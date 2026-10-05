import EditNoteForm from '@/components/notes/edit-note-form';
import { NotesError } from '@/components/notes/notes-error';
import { VimStatusline } from '@/components/notes/vim-statusline';
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
    <div className="relative mx-auto w-full max-w-[75vw] px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes vim <span className="text-foreground">./notes/{noteId}</span>
        </GeekyPrompt>
        <TerminalWindow
          title={`vim ./${noteId} --edit`}
          statusline={
            <VimStatusline
              mode="insert"
              file={`~/notes/${noteId}`}
              modified
              meta={['utf-8', ':wq to save']}
            />
          }
        >
          <EditNoteForm note={note} />
        </TerminalWindow>
      </div>
    </div>
  );
}
