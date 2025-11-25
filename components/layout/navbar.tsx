"use client";

import { LINKS } from "@/constants";
import { ActiveLink } from "./active-link";
import { UserSessionButton } from "../user/user-session-button";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full border-b transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        className="flex justify-around items-center gap-4 py-3"
        aria-label="Primary"
      >
        <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
          {LINKS.map((item) => (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                className="flex items-center gap-2 text-xs md:text-base font-medium"
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
    </header>
  );
}
