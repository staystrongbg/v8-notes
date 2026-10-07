export const MAX_TAGS = 10;
export const MAX_NAME_LENGTH = 30;

export const normalizeTagName = (raw: string): string | null => {
  const name = raw.toLowerCase().trim().replace(/^#+/, '').trim();
  if (!name || name.length > MAX_NAME_LENGTH || !/^[a-z0-9_-]+$/.test(name)) {
    return null;
  }
  return name;
};

export const normalizeTagNames = (names: string[]): string[] =>
  [...new Set(names.map(normalizeTagName).filter((n): n is string => n !== null))].slice(
    0,
    MAX_TAGS
  );

/** Inline #hashtags found in markdown body text.
 * Fenced code blocks and inline code are skipped so pasted code doesn't
 * spawn tags; hex colors (#fff) are rejected as names. */
export const extractHashtags = (text: string): string[] => {
  const prose = text
    .replace(/```[\s\S]*?(```|$)/g, '')
    .replace(/`[^`\n]*`/g, '');
  const names = new Set<string>();
  for (const match of prose.matchAll(/#([a-zA-Z0-9_-]+)/g)) {
    const raw = match[1];
    if (/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(raw)) continue;
    const name = normalizeTagName(raw);
    if (name) names.add(name);
  }
  return [...names];
};
