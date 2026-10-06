import { NewNoteForm } from "@/components/notes/new-note-form";
import { VimStatusline } from "@/components/notes/vim-statusline";
import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { GeekyBackdrop, GeekyPrompt, TerminalWindow } from "@/components/shared/terminal";

export default async function NewNotePage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes touch ./new.md <span className="text-muted-foreground/60">--markdown</span>
        </GeekyPrompt>
        <TerminalWindow
          title="vim ./new.md --insert"
          right={
            <span className="hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary sm:inline-flex">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              insert
            </span>
          }
          statusline={
            <VimStatusline
              mode="insert"
              file="~/notes/new.md"
              modified
              meta={['markdown', ':wq to save']}
            />
          }
        >
          <NewNoteForm userId={session.user.id} />
        </TerminalWindow>
      </div>
    </div>
  );
}
