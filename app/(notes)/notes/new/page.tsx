import { NewNoteForm } from "@/components/notes/new-note-form";
import { requireUserSession } from "@/lib/require-user-session";
import { unauthorized } from "next/navigation";
import { GeekyBackdrop, GeekyPrompt, TerminalWindow } from "@/components/shared/terminal";

export default async function NewNotePage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  return (
    <div className="relative mx-auto w-full max-w-3xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes touch ./new.md <span className="text-muted-foreground/60">--markdown --encrypt</span>
        </GeekyPrompt>
        <TerminalWindow
          title="vim ./new.md --insert"
          right={
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-600 sm:inline-flex dark:text-emerald-400">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              insert
            </span>
          }
          footer={
            <>
              <span>--insert</span>
              <span>UTF-8</span>
              <span className="ml-auto">:wq to save</span>
            </>
          }
        >
          <NewNoteForm userId={session.user.id} />
        </TerminalWindow>
      </div>
    </div>
  );
}
