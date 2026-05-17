"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, Star, Grid, Table2Icon, Library } from "lucide-react";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";

export const NotesToolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageUrl = useCreatePageUrl();

  const isStarred = searchParams.get("starred") === "true";
  const currentView = searchParams.get("view") || "grid";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md p-2">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex sm:flex-row flex-col items-start sm:items-center justify-between gap-3">
        <nav className="flex items-center gap-1 p-1 rounded-xl bg-background/60 border border-border/30">
          <button
            onClick={() => router.push("/notes")}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              !isStarred
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Library className="w-4 h-4" />
            All
          </button>
          <button
            onClick={() => router.push("/notes?starred=true")}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              isStarred
                ? "bg-amber-500/10 text-amber-500 shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Star className="w-4 h-4" />
            Starred
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/notes/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold font-cyber tracking-wide rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            New
          </Link>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-background/60 border border-border/30">
            <Link
              href={createPageUrl("view", "grid")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all ${
                currentView === "grid"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Grid className="w-4 h-4" />
            </Link>
            <Link
              href={createPageUrl("view", "table")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all ${
                currentView === "table"
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Table2Icon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
