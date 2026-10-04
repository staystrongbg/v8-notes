import { SignUpForm } from "@/components/authentication/sign-up-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GeekyBackdrop, TerminalWindow } from "@/components/shared/terminal";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/notes");
  }

  return (
    <main className="relative mx-auto w-full max-w-md px-4 py-10">
      <GeekyBackdrop />
      <div className="relative">
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> ssh v8-notes --register
        </p>
        <TerminalWindow title="~/auth --sign-up" bodyClassName="p-6">
          <h2 className="mb-4 font-mono text-xl font-bold text-foreground">
            <span className="mr-2 text-primary">#</span>sign-up
          </h2>
          <SignUpForm />
        </TerminalWindow>
      </div>
    </main>
  );
}
