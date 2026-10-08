import { HeartIcon } from 'lucide-react';
import { DONATE_URL } from '@/constants';
import { cn } from '@/lib/utils';

export const DonateButton = ({ className }: { className?: string }) => {
  if (!DONATE_URL) return null;

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <HeartIcon className="size-3.5 text-primary" />
      $ donate --thanks
    </a>
  );
};
