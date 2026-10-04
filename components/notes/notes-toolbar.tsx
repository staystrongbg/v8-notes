"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Star, Grid, Table2Icon, Library } from "lucide-react";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";
import { cn } from "@/lib/utils";

export const NotesToolbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createPageUrl = useCreatePageUrl();

  const isStarred = searchParams.get("starred") === "true";
  const currentView = searchParams.get("view") || "grid";

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <nav className="flex items-center gap-1 rounded-lg border border-border/40 bg-muted/40 p-1 font-mono text-xs">
          <button
            onClick={() => router.push("/notes")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all",
              !isStarred
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Library className="h-3.5 w-3.5" />
            ./all
          </button>
          <button
            onClick={() => router.push("/notes?starred=true")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all",
              isStarred
                ? "bg-amber-500/15 text-amber-500 shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Star className="h-3.5 w-3.5" />
            --starred
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/notes/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 font-mono text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5" />
            touch new
          </Link>

          <div className="flex items-center gap-1 rounded-lg border border-border/40 bg-muted/40 p-1">
            <Link
              href={createPageUrl("view", "grid")}
              aria-label="Grid view"
              className={cn(
                "inline-flex items-center rounded-md px-2.5 py-2 transition-all",
                currentView === "grid"
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Grid className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={createPageUrl("view", "table")}
              aria-label="Table view"
              className={cn(
                "inline-flex items-center rounded-md px-2.5 py-2 transition-all",
                currentView === "table"
                  ? "bg-primary/15 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Table2Icon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
