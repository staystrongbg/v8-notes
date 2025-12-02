"use client";

import { useHideNav } from "@/hooks/use-hide-nav";

export const NavigationHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isHidden = useHideNav();
  return (
    <header
      className={`w-full border-b transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </header>
  );
};
