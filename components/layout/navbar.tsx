import { LINKS } from "@/constants";
import { ActiveLink } from "./active-link";
import { UserSessionButton } from "../user/user-session-button";
import { ThemeToggle } from "./theme-toggle";
import { NavigationHeader } from "./navigation-header";

export default function Navbar() {
  return (
    <NavigationHeader>
      <nav
        className="flex justify-around items-center gap-4 py-3"
        aria-label="Primary"
      >
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
          {LINKS.map((item) => (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                className="flex items-center gap-2 text-xs md:text-base font-medium hover:text-blue-500"
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
