import { cn } from '@/lib/utils';
import { Components } from 'react-markdown';

export const noteMarkdownComponents: Components = {
  p({ node, ...props }) {
    return <p {...props} className="text-foreground/85 text-[15px] leading-7 break-words" />;
  },
  a({ node, ...props }) {
    return (
      <a
        {...props}
        className="text-primary decoration-primary/50 font-mono text-sm break-words underline decoration-dotted underline-offset-4 hover:decoration-solid"
      />
    );
  },
  code({ node, className, ...props }) {
    const isBlock = /language-|hljs/.test(className ?? '');
    if (isBlock) {
      return (
        <code
          {...props}
          className={cn(
            'hljs bg-transparent! p-0 font-mono text-[13px] leading-relaxed',
            className,
          )}
        />
      );
    }
    return (
      <code
        {...props}
        className={cn(
          'border-primary/25 bg-primary/10 text-primary rounded border px-1.5 py-0.5 font-mono text-[12.5px] font-normal break-words',
          className,
        )}
      />
    );
  },
  pre({ node, className, ...props }) {
    return (
      <pre
        {...props}
        className={cn(
          'border-border/60 my-4 overflow-x-auto rounded-lg border bg-[#0d1117]! p-4 font-mono text-[13px] shadow-inner',
          className,
        )}
      />
    );
  },
  blockquote({ node, ...props }) {
    return (
      <blockquote
        {...props}
        className="border-primary bg-primary/5 text-muted-foreground my-4 rounded-r-lg border-l-2 px-4 py-3 font-mono text-sm break-words italic"
      />
    );
  },
  hr({ node, ...props }) {
    return <hr {...props} className="border-border my-6 border-dashed" />;
  },
  ul({ node, ...props }) {
    return (
      <ul {...props} className="marker:text-primary my-3 list-disc space-y-1.5 pl-5 text-[15px]" />
    );
  },
  ol({ node, ...props }) {
    return (
      <ol
        {...props}
        className="marker:text-primary my-3 list-decimal space-y-1.5 pl-5 font-mono text-[15px] marker:font-bold"
      />
    );
  },
  li({ node, ...props }) {
    return <li {...props} className="text-foreground/85 leading-7 break-words" />;
  },
  h1({ node, ...props }) {
    return (
      <h1
        {...props}
        className="text-foreground before:text-primary/60 mt-6 mb-3 font-mono font-bold break-words before:mr-2 before:content-['#'] md:text-xl"
      />
    );
  },
  h2({ node, ...props }) {
    return (
      <h2
        {...props}
        className="text-foreground before:text-primary/60 mt-5 mb-2 font-mono font-bold break-words before:mr-2 before:content-['##'] md:text-lg"
      />
    );
  },
  h3({ node, ...props }) {
    return (
      <h3
        {...props}
        className="text-foreground before:text-primary/60 mt-4 mb-2 font-mono font-bold break-words before:mr-2 before:content-['###'] md:text-base"
      />
    );
  },
  table({ node, ...props }) {
    return (
      <div className="border-border/60 my-4 overflow-x-auto rounded-lg border">
        <table {...props} className="w-full border-collapse font-mono text-[13px]" />
      </div>
    );
  },
  thead({ node, ...props }) {
    return <thead {...props} className="bg-muted/70 text-left" />;
  },
  tbody({ node, ...props }) {
    return <tbody {...props} className="divide-border/40 divide-y" />;
  },
  tr({ node, ...props }) {
    return <tr {...props} className="hover:bg-muted/40 transition-colors" />;
  },
  th({ node, ...props }) {
    return (
      <th
        {...props}
        className="text-foreground px-4 py-2 text-left text-xs font-bold tracking-wider uppercase"
      />
    );
  },
  td({ node, ...props }) {
    return <td {...props} className="border-border/40 text-muted-foreground border-t px-4 py-2" />;
  },
};
