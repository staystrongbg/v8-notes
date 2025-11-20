"use client";

import { Button } from "../ui/button";
import { User } from "@prisma/client";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";
import { useSession } from "@/lib/auth-client";

export const UserSessionButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <UserDropdown user={session.user as User} />
      ) : (
        <Link href="/sign-in">
          <Button variant="outline">Sign In</Button>
        </Link>
      )}
    </>
  );
};
