"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export const SignUpButton = () => {
  const { data: session } = useSession();

  return session ? null : (
    <div className="mt-8">
      <Button
        asChild
        size="lg"
        className="bg-linear-to-r from-sky-500 to-fuchsia-500 hover:from-sky-600 hover:to-fuchsia-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link href="/sign-up">Sign Up to Start Capturing</Link>
      </Button>
    </div>
  );
};
