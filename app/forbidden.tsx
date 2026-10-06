import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-md place-items-center px-4 py-10">
      <div className="w-full overflow-hidden rounded-xl border border-destructive/40 bg-card text-center">
        <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-xs font-bold text-destructive">[403]</span>
          <span className="font-mono text-xs text-muted-foreground">~/ --stderr</span>
        </div>
        <div className="p-8">
          <p className="font-mono text-xs text-destructive">[stderr] 403 -- Forbidden</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">You are not authorized to access this resource.</p>
          <Link href="/" className="mt-4 inline-block font-mono text-sm text-primary underline decoration-dotted underline-offset-4">
            $ cd ~/home
          </Link>
        </div>
      </div>
    </div>
  );
}
