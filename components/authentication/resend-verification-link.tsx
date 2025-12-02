"use client";

import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const ResendVerificationEmail = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const resendEmail = async () => {
    setIsLoading(true);
    const { error } = await sendVerificationEmail({
      email,
      callbackURL: "/profile",
    });
    if (error) {
      console.error(error);
    }
    setSuccess(true);
    setIsLoading(false);
  };
  return (
    <>
      <Button
        disabled={isLoading}
        variant="tertiary"
        type="button"
        onClick={resendEmail}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            Resending verification email...
          </span>
        ) : (
          "Resend verification email"
        )}
      </Button>
      {success && (
        <p className="text-green-500">Verification email sent successfully</p>
      )}
    </>
  );
};
