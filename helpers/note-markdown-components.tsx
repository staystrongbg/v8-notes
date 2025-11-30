import { Components } from "react-markdown";

export const noteMarkdownComponents: Components = {
  p(props) {
    return (
      <p
        {...props}
        className="text-muted-foreground font-normal sm:text-sm text-xs"
      />
    );
  },
  a(props) {
    return (
      <a {...props} className="text-primary underline sm:text-sm text-xs" />
    );
  },
  code(props) {
    return (
      <code
        {...props}
        className="text-primary font-normal sm:text-sm text-xs"
      />
    );
  },
  pre(props) {
    return <pre {...props} className="text-primary sm:text-sm text-xs" />;
  },
  h1(props) {
    return <h1 {...props} className="my-2 text-muted-foreground" />;
  },
  h2(props) {
    return <h2 {...props} className="my-2 text-muted-foreground" />;
  },
  h3(props) {
    return <h3 {...props} className="my-2 text-muted-foreground" />;
  },
  table(props) {
    return (
      <table
        {...props}
        className="border-collapse border border-muted-foreground my-4"
      />
    );
  },
  thead(props) {
    return <thead {...props} className="bg-muted-foreground" />;
  },
  tbody(props) {
    return <tbody {...props} />;
  },
  tr(props) {
    return <tr {...props} className="border-b border-muted-foreground" />;
  },
  th(props) {
    return (
      <th
        {...props}
        className="border border-muted-foreground px-4 py-2 text-left"
      />
    );
  },
  td(props) {
    return (
      <td {...props} className="border border-muted-foreground px-4 py-2" />
    );
  },
};
