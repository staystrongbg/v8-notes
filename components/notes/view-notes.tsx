'use client';

import { LIMIT } from '@/constants';
import { type NotesFilter, type NotesSort, getNoteCounts, getNotes } from '@/fetchers/get-notes';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { NotesGridLoading } from './loaders-ui/notes-grid-loading';
import { NoNotes } from './no-notes';
import { NotesGrid } from './notes-grid';
import { NotesPagination } from './notes-pagination';
import { NotesTable } from './notes-table';
import { NotesToolbar } from './notes-toolbar';
import { TagCloud } from './tag-cloud';

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
  const trashed = searchParams.get('trashed');
  const sort = searchParams.get('sort');
  const q = searchParams.get('q') ?? undefined;
  const tag = searchParams.get('tag') ?? undefined;

  const pageNum = parseInt(page || '1') || 1;

  const notesFilter: NotesFilter =
    trashed === 'true' ? 'trashed' : starred === 'true' ? 'starred' : 'all';
  const notesSort = parseSort(sort || undefined);

  const { data, isPending } = useQuery({
    queryKey: ['notes', userId, pageNum, LIMIT, notesFilter, notesSort, q ?? '', tag ?? ''],
    queryFn: () => getNotes(userId, notesFilter, pageNum, LIMIT, notesSort, q, tag),
  });

  // Keyed under ['notes', …] so every existing ['notes'] invalidation
  // (trash/restore/purge/star/delete) refreshes the tab counts too.
  const { data: counts } = useQuery({
    queryKey: ['notes', userId, 'counts'],
    queryFn: () => getNoteCounts(userId),
  });

  if (isPending) return <NotesGridLoading />;
  if (!data || !data.notes || data.notes.length === 0) {
    return (
      <div className="space-y-4">
        <NotesToolbar />
        <TagCloud userId={userId} />
        <NoNotes
          variant={
            q ? 'search' : trashed === 'true' ? 'trash' : starred === 'true' ? 'starred' : 'all'
          }
          query={q}
        />
      </div>
    );
  }
  const total = data.total || 0;
  return (
    <div className="space-y-4">
      <NotesToolbar
        notesTotal={counts?.all}
        notesStarredTotal={counts?.starred}
        notesTrashedTotal={counts?.trashed}
      />
      <TagCloud userId={userId} />
      {view === 'table' ? (
        <NotesTable
          notes={data.notes}
          trashed={trashed === 'true'}
          baseQuery={searchParams.toString()}
        />
      ) : (
        <NotesGrid
          notes={data.notes}
          trashed={trashed === 'true'}
          baseQuery={searchParams.toString()}
        />
      )}
      <NotesPagination total={total} limit={LIMIT} currentPage={pageNum} />
    </div>
  );
};
