import { SignInForm } from "@/components/authentication/sign-in-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GeekyBackdrop, TerminalWindow } from "@/components/shared/terminal";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/notes");
  }

  return (
    <main className="relative mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-10">
      <GeekyBackdrop />
      <div className="relative">
        <p className="mb-4 font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> ssh v8-notes --login
        </p>
        <TerminalWindow title="~/auth --sign-in" bodyClassName="p-6">
          <h1 className="mb-4 font-mono text-xl font-bold text-foreground">
            <span className="mr-2 text-primary">#</span>sign-in
          </h1>
          <SignInForm />
        </TerminalWindow>
      </div>
    </main>
  );
}
