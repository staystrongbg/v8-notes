"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light", label: "Light", swatch: "#f0f2f5", icon: Sun },
  { value: "dark", label: "Dark", swatch: "#7aa2f7", icon: Moon },
  { value: "matrix", label: "Matrix", swatch: "#34ff88" },
  { value: "ocean", label: "Ocean", swatch: "#5eb1ff" },
  { value: "crimson", label: "Crimson", swatch: "#ff6b5e" },
  { value: "midnight", label: "Midnight", swatch: "#e5e5e5" },
  { value: "system", label: "System", swatch: undefined, icon: Monitor },
] as const;

export const ThemeToggle = () => {
  // Gate theme-dependent UI behind mount: the server can't know the stored
  // theme, so rendering it during SSR hydrates mismatched HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { setTheme, theme } = useTheme();
  const active = mounted ? THEME_OPTIONS.find((option) => option.value === theme) : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={`Theme: ${active?.label ?? "…"}`}>
          {active?.swatch ? (
            <span
              aria-hidden
              className="size-4 rounded-sm border border-border"
              style={{ backgroundColor: active.swatch }}
            />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="font-mono">
        {THEME_OPTIONS.map((option) => {
          const Icon = "icon" in option ? option.icon : undefined;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(mounted && theme === option.value && "text-primary")}
            >
              {option.swatch ? (
                <span
                  aria-hidden
                  className="mr-2 size-3.5 shrink-0 rounded-sm border border-border"
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
