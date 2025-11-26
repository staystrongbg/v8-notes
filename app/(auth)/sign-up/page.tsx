import { SignUpForm } from "@/components/authentication/sign-up-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/notes");
  }

  return (
    <main className="sm:w-lg w-full mx-auto p-6 space-y-4">
      <h2>Sign Up</h2>
      <SignUpForm />
    </main>
  );
}
