export const THEMES = [
  { value: 'light', label: 'Light', swatch: '#f0f2f5' },
  { value: 'dark', label: 'Dark', swatch: '#7aa2f7' },
  { value: 'matrix', label: 'Matrix', swatch: '#34ff88' },
  { value: 'ocean', label: 'Ocean', swatch: '#5eb1ff' },
  { value: 'crimson', label: 'Crimson', swatch: '#ff6b5e' },
  { value: 'midnight', label: 'Midnight', swatch: '#e5e5e5' },
  { value: 'blossom', label: 'Blossom', swatch: '#ec4899' },
  { value: 'system', label: 'System', swatch: undefined },
] as const;

export type ThemeValue = (typeof THEMES)[number]['value'];

export const THEME_VALUES: readonly ThemeValue[] = THEMES.map(theme => theme.value);
