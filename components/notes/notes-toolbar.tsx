"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Plus, Star, Grid, Table2Icon, Library, Trash2Icon, XIcon, CommandIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";
import { useVim, useVimActions } from "@/components/vim/vim-provider";
import { cn } from "@/lib/utils";

export const NotesToolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageUrl = useCreatePageUrl();

  const isStarred = searchParams.get("starred") === "true";
  const isTrashed = searchParams.get("trashed") === "true";
  const currentView = searchParams.get("view") || "grid";
  const urlQuery = searchParams.get("q") ?? "";

  const [text, setText] = useState(urlQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  useVimActions({ focusSearch: () => inputRef.current?.focus() });
  const { openPalette } = useVim();

  // Re-sync after browser back/forward (urlQuery only changes outside typing).
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (syncedQuery !== urlQuery) {
    setSyncedQuery(urlQuery);
    setText(urlQuery);
  }

  useEffect(() => {
    if (text === urlQuery) return;
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (text.trim()) {
        params.set("q", text.trim());
      } else {
        params.delete("q");
      }
      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }, 250);
    return () => clearTimeout(id);
  }, [text, urlQuery, searchParams, pathname, router]);

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-border/60 bg-card">
      <div className="flex flex-wrap items-center gap-2 p-2">
        <nav className="flex items-center gap-1 rounded-lg border border-border/40 bg-muted/40 p-1 font-mono text-xs">
          <button
            onClick={() => router.push("/notes")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all",
              !isStarred && !isTrashed
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
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Star className="h-3.5 w-3.5" />
            --starred
          </button>
          <button
            onClick={() => router.push("/notes?trashed=true")}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 font-medium transition-all",
              isTrashed
                ? "bg-primary/15 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Trash2Icon className="h-3.5 w-3.5" />
            --trash
          </button>
        </nav>

        <div className="flex min-w-36 flex-1 items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 font-mono text-xs focus-within:border-primary/50">
          <span className="font-bold text-primary">/</span>
          <input
            ref={inputRef}
            id="notes-search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="query --all"
            aria-label="Search notes"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
          />
          {text && (
            <button
              onClick={() => {
                setText("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/notes/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 font-mono text-xs font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5" />
            touch new
          </Link>

          <button
            onClick={openPalette}
            title="Command palette (Ctrl+K)"
            aria-label="Command palette"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 font-mono text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <CommandIcon className="h-3.5 w-3.5" />
            <kbd className="hidden rounded border border-border/40 px-1 text-[10px] lg:inline">ctrl+k</kbd>
          </button>

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
