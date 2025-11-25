"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { UserDropdown } from "./user-dropdown";
import { useSession } from "@/lib/auth-client";

export const UserSessionButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button variant="ghost" disabled>
        Checking session…
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
