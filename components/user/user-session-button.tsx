"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { UserDropdown } from "./user-dropdown";
import { useSession } from "@/lib/auth-client";
import { Skeleton } from "../ui/skeleton";

export const UserSessionButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button variant="ghost" disabled aria-label="Loading user session">
        <Skeleton className="size-4" />
      </Button>
    );
  }

  if (session?.user) {
    return <UserDropdown user={session.user} />;
  }

  return (
    <Link href="/sign-in">
      <Button variant="outline">Sign In</Button>
    </Link>
  );
};
