"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Unauthorized() {
  const pathname = usePathname();
  return (
    <main className="mx-auto grid min-h-[60vh] w-full max-w-md place-items-center px-4 py-10">
      <div className="w-full overflow-hidden rounded-xl border border-destructive/40 bg-card text-center">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-destructive">[401]</span>
          <span className="font-mono text-xs text-muted-foreground">~/ --stderr</span>
        </div>
        <div className="p-8">
          <p className="font-mono text-xs text-destructive">[stderr] 401 -- Unauthorized</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">Please log in to access this page.</p>
          <Button variant="default" type="button" asChild className="mt-4 font-mono">
            <Link href={`/sign-in?redirect=${pathname}`}>$ sign-in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
