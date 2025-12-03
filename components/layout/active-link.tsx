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

  return (
    <Link href={href} className={cn(isActive && "text-blue-500", className)}>
      {children}
    </Link>
  );
};
