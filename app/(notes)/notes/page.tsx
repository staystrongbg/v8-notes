import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { ViewNotes } from "@/components/notes/view-notes";
import { NotesHeader } from "@/components/notes/notes-header";

type SearchParams = Promise<{ view?: string; page?: string; starred?: string }>;

export default async function Notes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { view, page, starred } = await searchParams;
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <NotesHeader />
      <ViewNotes userId={session.user.id} searchParams={{ view, page, starred }} />
    </div>
  );
}
