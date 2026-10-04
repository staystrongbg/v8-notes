"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  limit: number;
  currentPage: number;
};

export const NotesPagination = ({ total, limit, currentPage }: Props) => {
  const createPageUrl = useCreatePageUrl();
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const btn = (disabled: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all",
      disabled
        ? "cursor-not-allowed border-border/20 bg-background/30 text-muted-foreground/40"
        : "border-border/30 bg-background/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
    );

  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card p-1.5">
        {prevPage ? (
          <Link href={createPageUrl("page", prevPage)} className={btn(false)}>
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">--prev</span>
          </Link>
        ) : (
          <span className={btn(true)}>
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">--prev</span>
          </span>
        )}

        <div className="px-3 py-2 font-mono text-xs text-foreground">
          [{currentPage}<span className="mx-1 text-muted-foreground/60">/</span>{totalPages}]
        </div>

        {nextPage ? (
          <Link href={createPageUrl("page", nextPage)} className={btn(false)}>
            <span className="hidden sm:inline">--next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className={btn(true)}>
            <span className="hidden sm:inline">--next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </div>
  );
};
