"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const SORTS = ["updated", "newest", "oldest"] as const;
type Sort = (typeof SORTS)[number];

const parseSort = (value: string | null): Sort =>
  value === "newest" || value === "oldest" ? value : "updated";

export const NotesHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fetching = useIsFetching();

  const view = searchParams.get("view") || "grid";
  const page = searchParams.get("page") || "1";
  const starred = searchParams.get("starred") === "true";
  const sort = parseSort(searchParams.get("sort"));
  const q = searchParams.get("q");
  const tag = searchParams.get("tag");
  const flags = `--view=${view} --page=${page} --sort=${sort}${starred ? " --starred" : ""}${q ? ` --query="${q}"` : ""}${tag ? ` --tag=${tag}` : ""}`;

  const setSort = (next: Sort) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", next);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="mb-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-primary">❯</span> ls --notes
        </p>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          <span className="mr-2 text-primary">#</span>Notes
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-1 font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span>
          <span>query {starred ? "--starred" : "--all"} --sort=</span>
          <span className="inline-flex items-center overflow-hidden rounded-md border border-border/40">
            {SORTS.map((option) => (
              <button
                key={option}
                onClick={() => setSort(option)}
                aria-pressed={sort === option}
                className={cn(
                  "cursor-pointer px-2 py-0.5 transition-colors",
                  sort === option
                    ? "bg-primary/15 font-bold text-primary"
                    : "text-muted-foreground/70 hover:bg-muted hover:text-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </span>
        </p>
      </div>
      <span
        title={fetching ? "Syncing with server…" : "Up to date"}
        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
      >
        <span
          className={cn(
            "size-1.5 shrink-0 rounded-full",
            fetching ? "animate-pulse bg-primary" : "bg-muted-foreground"
          )}
        />
        <span className="shrink-0">{fetching ? "syncing…" : "live"}</span>
        <span className="min-w-0 truncate text-muted-foreground/70">{flags}</span>
      </span>
    </header>
  );
};
