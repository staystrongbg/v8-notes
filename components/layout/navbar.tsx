'use client';

import { LINKS } from '@/constants';
import { MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { UserSessionButton } from '../user/user-session-button';
import { ActiveLink } from './active-link';
import { NavigationHeader } from './navigation-header';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavigationHeader>
      <nav className="flex items-center justify-around gap-4 py-3" aria-label="Primary">
        <div className="bg-background flex flex-col items-center rounded-lg px-4 py-2">
          <span className="font-mono text-xl font-bold">
            {/* <span className="text-foreground">#</span> */}
            <span className="text-primary">v8</span>
          </span>
          {/* <span className="text-muted-foreground text-xs">notes</span> */}
        </div>
        <ul className="hidden items-center gap-2 sm:flex sm:gap-4">
          {LINKS.map(item => (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                className="text-muted-foreground hover:text-primary flex items-center gap-2 text-xs font-medium md:text-base"
              >
                <item.icon aria-hidden="true" className="size-4" />
                <span>{item.name}</span>
              </ActiveLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setMenuOpen(open => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="text-muted-foreground hover:text-primary border-border/40 bg-muted/40 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs font-medium transition-all sm:hidden"
        >
          {menuOpen ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          menu
        </button>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="sr-only">Account menu</span>
          <UserSessionButton />
        </div>
      </nav>
      {menuOpen && (
        <ul className="border-border/40 flex flex-col gap-1 border-t px-4 py-2 sm:hidden">
          {LINKS.map(item => (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-primary hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all"
              >
                <item.icon aria-hidden="true" className="size-4" />
                <span>{item.name}</span>
              </ActiveLink>
            </li>
          ))}
        </ul>
      )}
    </NavigationHeader>
  );
}
