import { LINKS } from '@/constants';

import { UserSessionButton } from '../user/user-session-button';
import { ActiveLink } from './active-link';
import { NavigationHeader } from './navigation-header';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  return (
    <NavigationHeader>
      <nav className="flex items-center justify-around gap-4 py-3" aria-label="Primary">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
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
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="sr-only">Account menu</span>
          <UserSessionButton />
        </div>
      </nav>
    </NavigationHeader>
  );
}
