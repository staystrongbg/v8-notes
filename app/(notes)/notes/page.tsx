import { NotesHeader } from '@/components/notes/notes-header';
import { ViewNotes } from '@/components/notes/view-notes';
import { GeekyBackdrop } from '@/components/shared/terminal';
import { requireUserSession } from '@/lib/require-user-session';
import { unauthorized } from 'next/navigation';

export default async function Notes() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <NotesHeader />
        <ViewNotes userId={session.user.id} />
      </div>
    </div>
  );
}
