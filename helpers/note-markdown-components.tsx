import { cn } from "@/lib/utils";
import { Components } from "react-markdown";

export const noteMarkdownComponents: Components = {
  p({ node, ...props }) {
    return <p {...props} className="text-[15px] leading-7 text-foreground/85" />;
  },
  a({ node, ...props }) {
    return (
      <a
        {...props}
        className="font-mono text-sm text-primary underline decoration-dotted decoration-primary/50 underline-offset-4 hover:decoration-solid"
      />
    );
  },
  code({ node, className, ...props }) {
    const isBlock = /language-|hljs/.test(className ?? "");
    if (isBlock) {
      return (
        <code
          {...props}
          className={cn("hljs bg-transparent! p-0 font-mono text-[13px] leading-relaxed", className)}
        />
      );
    }
    return (
      <code
        {...props}
        className={cn(
          "rounded border border-primary/25 bg-primary/10 px-1.5 py-0.5 font-mono text-[12.5px] font-normal break-words text-primary",
          className
        )}
      />
    );
  },
  pre({ node, className, ...props }) {
    return (
      <pre
        {...props}
        className={cn(
          "my-4 overflow-x-auto rounded-lg border border-border/60 bg-[#0d1117]! p-4 font-mono text-[13px] shadow-inner",
          className
        )}
      />
    );
  },
  blockquote({ node, ...props }) {
    return (
      <blockquote
        {...props}
        className="my-4 rounded-r-lg border-l-2 border-primary bg-primary/5 px-4 py-3 font-mono text-sm text-muted-foreground italic"
      />
    );
  },
  hr({ node, ...props }) {
    return <hr {...props} className="my-6 border-dashed border-border" />;
  },
  ul({ node, ...props }) {
    return <ul {...props} className="my-3 list-disc space-y-1.5 pl-5 text-[15px] marker:text-primary" />;
  },
  ol({ node, ...props }) {
    return <ol {...props} className="my-3 list-decimal space-y-1.5 pl-5 font-mono text-[15px] marker:text-primary marker:font-bold" />;
  },
  li({ node, ...props }) {
    return <li {...props} className="leading-7 text-foreground/85" />;
  },
  h1({ node, ...props }) {
    return (
      <h1
        {...props}
        className="mt-6 mb-3 font-mono text-xl font-bold text-foreground before:mr-2 before:text-primary/60 before:content-['#']"
      />
    );
  },
  h2({ node, ...props }) {
    return (
      <h2
        {...props}
        className="mt-5 mb-2 font-mono text-lg font-bold text-foreground before:mr-2 before:text-primary/60 before:content-['##']"
      />
    );
  },
  h3({ node, ...props }) {
    return (
      <h3
        {...props}
        className="mt-4 mb-2 font-mono text-base font-bold text-foreground before:mr-2 before:text-primary/60 before:content-['###']"
      />
    );
  },
  table({ node, ...props }) {
    return (
      <div className="my-4 overflow-x-auto rounded-lg border border-border/60">
        <table {...props} className="w-full border-collapse font-mono text-[13px]" />
      </div>
    );
  },
  thead({ node, ...props }) {
    return <thead {...props} className="bg-muted/70 text-left" />;
  },
  tbody({ node, ...props }) {
    return <tbody {...props} className="divide-y divide-border/40" />;
  },
  tr({ node, ...props }) {
    return <tr {...props} className="transition-colors hover:bg-muted/40" />;
  },
  th({ node, ...props }) {
    return (
      <th {...props} className="px-4 py-2 text-left text-xs font-bold tracking-wider text-foreground uppercase" />
    );
  },
  td({ node, ...props }) {
    return <td {...props} className="border-t border-border/40 px-4 py-2 text-muted-foreground" />;
  },
};
