"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Unauthorized() {
  const pathname = usePathname();
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Button variant={"tertiary"} asChild className="mt-4">
        <Link href={`/sign-in?redirect=${pathname}`}>Sign in</Link>
      </Button>
    </main>
  );
}
