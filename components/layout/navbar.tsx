import { LINKS } from "@/constants";
import { ActiveLink } from "./active-link";
import { UserSessionButton } from "../user/user-session-button";

export default async function Navbar() {
  return (
    <header className="w-full border-b sticky top-0 z-50 bg-accent">
      <nav
        className=" flex justify-around items-center gap-4 py-3"
        aria-label="Primary"
      >
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
          {LINKS.map((item) => (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <item.icon aria-hidden="true" className="size-4" />
                <span>{item.name}</span>
              </ActiveLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="sr-only">Account menu</span>
          <UserSessionButton />
        </div>
      </nav>
    </header>
  );
}
