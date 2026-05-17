"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";

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

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md p-2">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-2">
          {prevPage ? (
            <Link
              href={createPageUrl("page", prevPage)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-background/60 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-background/30 border border-border/20 text-muted-foreground/40 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </div>
          )}

          <div className="px-4 py-2 text-sm font-cyber tracking-wide text-foreground/80">
            {currentPage}
            <span className="text-muted-foreground/60 mx-1">/</span>
            {totalPages}
          </div>

          {nextPage ? (
            <Link
              href={createPageUrl("page", nextPage)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-background/60 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-background/30 border border-border/20 text-muted-foreground/40 cursor-not-allowed">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
