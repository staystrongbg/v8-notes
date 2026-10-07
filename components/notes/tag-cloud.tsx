'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getTags } from '@/fetchers/tags';
import { cn } from '@/lib/utils';

export const TagCloud = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag') ?? undefined;
  const showTrashed = searchParams.get('trashed') === 'true';

  const { data: tags } = useQuery({
    queryKey: ['tags', userId, showTrashed],
    queryFn: () => getTags(userId, showTrashed),
  });

  const visible = (tags ?? []).filter(tag => tag._count.notes > 0 || tag.name === activeTag);
  if (visible.length === 0) return null;

  const toggle = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get('tag') === name) {
      params.delete('tag');
    } else {
      params.set('tag', name);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 py-2">
      <span className="font-mono text-[11px] font-bold text-primary">❯ #tags</span>
      {visible.map(tag => {
        const isActive = tag.name === activeTag;
        return (
          <button
            key={tag.id}
            onClick={() => toggle(tag.name)}
            aria-pressed={isActive}
            className={cn(
              'cursor-pointer rounded-md border px-2 py-1 font-mono text-[11px] transition-colors',
              isActive
                ? 'border-primary/60 bg-primary/15 font-bold text-primary'
                : 'border-border/40 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            #{tag.name}
            <span className="ml-1 opacity-60">{tag._count.notes}</span>
          </button>
        );
      })}
    </div>
  );
};
