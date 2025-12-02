import { ResendVerificationEmail } from "@/components/authentication/resend-verification-link";
import { requireUserSession } from "@/lib/require-user-session";
import { redirect, unauthorized } from "next/navigation";

export default async function VerifyEmailPage() {
  const session = await requireUserSession();

  if (!session?.user) unauthorized();

  if (session?.user.emailVerified) {
    redirect("/verify-email");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          Please check your email for a verification link.
        </p>
        <ResendVerificationEmail email={session?.user?.email} />
      </div>
    </div>
  );
}
