import { cn } from '@/lib/utils';

export const GeekyBackdrop = ({ className }: { className?: string }) => (
  <div
    aria-hidden
    className={cn(
      'pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.18] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]',
      className
    )}
  />
);

export const GeekyPrompt = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn('mb-4 font-mono text-xs text-muted-foreground', className)}>
    <span className="text-primary">$</span> {children}
  </p>
);

export const TerminalWindow = ({
  title,
  right,
  footer,
  statusline,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  right?: React.ReactNode;
  footer?: React.ReactNode;
  statusline?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl shadow-black/5 dark:shadow-black/40',
      className
    )}
  >
    <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
      <span className="font-mono text-xs font-bold text-primary">❯</span>
      <span className="truncate font-mono text-xs text-muted-foreground">{title}</span>
      <span aria-hidden className="animate-pulse font-mono text-xs text-primary">▌</span>
      {right ? <div className="ml-auto flex shrink-0 items-center gap-2">{right}</div> : null}
    </div>
    <div className={cn('p-6 sm:p-8', bodyClassName)}>{children}</div>
    {statusline ? (
      <div className="border-t border-border/50 bg-muted/40">{statusline}</div>
    ) : footer ? (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/50 bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
        {footer}
      </div>
    ) : null}
  </div>
);
