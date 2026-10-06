export const THEME_VALUES = [
  'light',
  'dark',
  'system',
  'matrix',
  'ocean',
  'crimson',
  'midnight',
] as const;

export type ThemeValue = (typeof THEME_VALUES)[number];
