"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ActiveLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isActive) {
    return (
      <Link href={href} className={cn("text-blue-700", className)}>
        {children}
      </Link>
    );
  }
  return (
    <Link href={href} className={cn("", className)}>
      {children}
    </Link>
  );
};
