import { UserDetails } from "@/components/user/user-details";
import { requireUserSession } from "@/lib/require-user-session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { unauthorized } from "next/navigation";
import { GeekyBackdrop, GeekyPrompt, TerminalWindow } from "@/components/shared/terminal";

export default async function ProfilePage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  const userInitials = session.user.name.slice(0, 1).toUpperCase() || "U";

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-6">
      <GeekyBackdrop />
      <div className="relative">
        <GeekyPrompt>
          v8-notes whoami <span className="text-muted-foreground/60">--profile</span>
        </GeekyPrompt>
        <TerminalWindow
          title="~/profile --whoami"
          right={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              online
            </span>
          }
          footer={
            <>
              <span title={session.user.id} className="min-w-0 max-w-48 truncate">uid {session.user.id}</span>
            </>
          }
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar className="size-14 border border-border">
              <AvatarImage src={session.user.image || undefined} alt={`${session.user.name}'s avatar`} />
              <AvatarFallback className="font-mono">{userInitials || "U"}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 font-mono text-sm">
              <p className="truncate text-base font-bold text-foreground">
                <span className="mr-2 text-primary">$</span>
                {session.user.name}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {session.user.email}{" "}
                {session.user.emailVerified ? (
                  <span className="ml-1 rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                    verified
                  </span>
                ) : (
                  <Link href="/verify-email" className="ml-1 text-primary underline decoration-dotted underline-offset-4">
                    verify?
                  </Link>
                )}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">
                since {session.user.createdAt.toDateString()}
              </p>
            </div>
          </div>
          <UserDetails />
        </TerminalWindow>
        {!session.user.emailVerified && (
          <div className="mt-4 text-center">
            <Button variant="link" size="sm" type="button" asChild className="font-mono text-xs">
              <Link href="/verify-email">$ verify-email --resend</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

//TODO delete account
