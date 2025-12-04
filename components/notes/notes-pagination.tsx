"use client";

import { Button } from "@/components/ui/button";
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
    <div className="flex items-center justify-center gap-2 mt-8">
      {prevPage && (
        <Button variant="outline" size="sm" asChild>
          <Link href={createPageUrl("page", prevPage)}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>
      )}

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage && (
        <Button variant="outline" size="sm" asChild>
          <Link href={createPageUrl("page", nextPage)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
