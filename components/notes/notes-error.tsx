import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TriangleAlertIcon } from "lucide-react";

export const NotesError = ({
  message = "Failed to load notes",
}: {
  message?: string;
}) => {
  return (
    <div className="mx-auto mt-8 max-w-lg overflow-hidden rounded-xl border border-destructive/40 bg-card">
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-destructive">[stderr]</span>
        <span className="font-mono text-xs text-muted-foreground">~/notes</span>
      </div>
      <div className="grid place-items-center gap-3 p-8 text-center">
        <TriangleAlertIcon className="h-10 w-10 text-destructive" />
        <p className="font-mono text-xs text-destructive">[stderr] {message}</p>
        <p className="font-mono text-xs text-muted-foreground">exit 1 — please try again.</p>
        <Button variant="default" asChild type="button" className="font-mono">
          <Link href="/notes">$ retry</Link>
        </Button>
      </div>
    </div>
  );
};
