import { NoteContent } from '@/components/notes/note-content';
import { GeekyBackdrop, GeekyPrompt } from '@/components/shared/terminal';
import { requireUserSession } from '@/lib/require-user-session';
import { unauthorized } from 'next/navigation';

type PageParams = Promise<{
  noteId: string;
}>;

export default async function Note({ params }: { params: PageParams }) {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();
  const { noteId } = await params;
  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes open <span className="text-foreground">./notes/{noteId}</span>
        </GeekyPrompt>
        <NoteContent noteId={noteId} />
      </div>
    </div>
  );
}
