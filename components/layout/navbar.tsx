'use client';

import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { LINKS } from '@/constants';

import { UserSessionButton } from '../user/user-session-button';
import { ActiveLink } from './active-link';
import { NavigationHeader } from './navigation-header';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavigationHeader>
      <nav className="flex items-center justify-around gap-4 py-3" aria-label="Primary">
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
          className="text-muted-foreground hover:text-primary inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/40 bg-muted/40 px-3 py-2 font-mono text-xs font-medium transition-all sm:hidden"
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
        <ul className="flex flex-col gap-1 border-t border-border/40 px-4 py-2 sm:hidden">
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
