'use client';

import { LIMIT } from '@/constants';
import { type NotesSort, getNotes } from '@/fetchers/get-notes';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { NotesGridLoading } from './loaders-ui/notes-grid-loading';
import { NoNotes } from './no-notes';
import { NotesGrid } from './notes-grid';
import { NotesPagination } from './notes-pagination';
import { NotesTable } from './notes-table';
import { NotesToolbar } from './notes-toolbar';

type Props = {
  userId: string;
};

const parseSort = (value?: string): NotesSort => {
  if (value === 'newest' || value === 'oldest') {
    return value;
  }
  return 'updated';
};

export const ViewNotes = ({ userId }: Props) => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const view = searchParams.get('view');
  const starred = searchParams.get('starred');
  const sort = searchParams.get('sort');

  const pageNum = parseInt(page || '1') || 1;

  const notesFilter = starred === 'true' ? 'starred' : 'all';
  const notesSort = parseSort(sort || undefined);

  const { data, isPending } = useQuery({
    queryKey: ['notes', userId, pageNum, LIMIT, notesFilter, notesSort],
    queryFn: () => getNotes(userId, notesFilter, pageNum, LIMIT, notesSort),
  });

  if (isPending) return <NotesGridLoading />;
  if (!data || !data.notes || data.notes.length === 0) return <NoNotes />;
  const total = data.total || 0;

  return (
    <div className="space-y-4">
      <NotesToolbar />
      {view === 'table' ? <NotesTable notes={data.notes} /> : <NotesGrid notes={data.notes} />}
      <NotesPagination total={total} limit={LIMIT} currentPage={pageNum} />
    </div>
  );
};
