import { ResendVerificationEmail } from "@/components/authentication/resend-verification-link";
import { requireUserSession } from "@/lib/require-user-session";
import { redirect, unauthorized } from "next/navigation";
import { GeekyBackdrop, TerminalWindow } from "@/components/shared/terminal";
import { MailWarningIcon } from "lucide-react";

export default async function VerifyEmailPage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  if (session?.user.emailVerified) {
    redirect("/profile");
  }
  return (
    <div className="relative mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-10">
      <GeekyBackdrop />
      <div className="relative">
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> v8-notes verify --email
        </p>
        <TerminalWindow title="~/auth --verify" bodyClassName="p-6 text-center">
          <MailWarningIcon className="mx-auto h-10 w-10 text-amber-500" />
          <h1 className="mt-3 font-mono text-lg font-bold text-foreground">[pending] verify your email</h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Check <span className="text-foreground">{session?.user?.email}</span> for a verification link.
          </p>
          <div className="mt-5">
            <ResendVerificationEmail email={session?.user?.email} />
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
