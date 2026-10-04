import rehypeHighlight from 'rehype-highlight';

/**
 * Shared rehype-highlight setup so fenced code highlights everywhere,
 * no matter the tag:
 * - `aliases` maps common fence tags to highlight.js grammars
 *   (```html is `xml` upstream — without this it renders plain).
 * - `detect: true` auto-detects the language of untagged ``` blocks.
 */
export const highlightPlugin: [
  typeof rehypeHighlight,
  { detect: boolean; aliases: Record<string, string> },
] = [
  rehypeHighlight,
  {
    detect: true,
    aliases: {
      html: 'xml',
      js: 'javascript',
      ts: 'typescript',
      sh: 'bash',
      yml: 'yaml',
      md: 'markdown',
    },
  },
];
