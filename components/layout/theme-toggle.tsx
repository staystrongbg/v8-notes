'use client';

import { THEMES, type ThemeValue } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const THEME_ICONS: Partial<Record<ThemeValue, typeof Sun>> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const THEME_OPTIONS = THEMES;

export const ThemeToggle = () => {
  // Gate theme-dependent UI behind mount: the server can't know the stored
  // theme, so rendering it during SSR hydrates mismatched HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { setTheme, theme } = useTheme();
  const active = mounted ? THEME_OPTIONS.find(option => option.value === theme) : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={`Theme: ${active?.label ?? '…'}`}>
          {active?.swatch ? (
            <span
              aria-hidden
              className="border-border size-4 rounded-sm border"
              style={{ backgroundColor: active.swatch }}
            />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-mono">
        {THEME_OPTIONS.map(option => {
          const Icon = THEME_ICONS[option.value];
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(mounted && theme === option.value && 'text-primary')}
            >
              {option.swatch ? (
                <span
                  aria-hidden
                  className="border-border mr-2 size-3.5 shrink-0 rounded-sm border"
                  style={{ backgroundColor: option.swatch }}
                />
              ) : (
                Icon && <Icon className="mr-2 h-4 w-4" />
              )}
              --{option.value}
              {mounted && theme === option.value && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
