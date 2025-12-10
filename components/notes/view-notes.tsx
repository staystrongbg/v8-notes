"use client";

import { getNotes } from "@/fetchers/get-notes";
import { NotesGrid } from "./notes-grid";
import { NotesTable } from "./notes-table";
import { useQuery } from "@tanstack/react-query";
import { NotesPagination } from "./notes-pagination";
import { NotesGridLoading } from "./notes-grid-loading";

import { NoNotes } from "./no-notes";
import { LIMIT } from "@/constants";
import { NotesQuickLinks } from "./notes-quick-links";

type Props = {
  userId: string;
  searchParams: { view?: string; page?: string; starred?: string };
};

export const ViewNotes = ({ userId, searchParams }: Props) => {
  const { page, view, starred } = searchParams;
  const pageNum = parseInt(page || "1") || 1;

  const notesFilter = starred === "true" ? "starred" : undefined;

  const { isLoading, data } = useQuery({
    queryKey: ["notes", userId, pageNum, LIMIT, notesFilter],
    queryFn: () => getNotes(userId, notesFilter, pageNum, LIMIT),
  });

  if (isLoading) return <NotesGridLoading />;
  if (!data || !data.notes || data.notes.length === 0) return <NoNotes />;
  const total = data.total || 0;

  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <NotesQuickLinks />
      <div className="flex-1">
        {view === "table" ? (
          <NotesTable notes={data.notes} />
        ) : (
          <NotesGrid notes={data.notes} />
        )}
        <NotesPagination total={total} limit={LIMIT} currentPage={pageNum} />
      </div>
    </div>
  );
};
