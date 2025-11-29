"use client";

import { LogOutIcon, ShieldIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";

type DropdownUser = {
  name: string | null;
  email: string | null;
  image?: string | null;
};

interface UserDropdownProps {
  user: DropdownUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <span className="ml-2 hidden sm:flex">{user.name ?? "Account"}</span>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User avatar"}
              width={36}
              height={36}
              className="rounded-full object-cover aspect-square"
            />
          ) : (
            <UserIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="size-4" /> <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        {/* {user.role === "admin" && <AdminItem />} */}
        <SignOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// function AdminItem() {
//   return (
//     <DropdownMenuItem asChild>
//       <Link href="/admin">
//         <ShieldIcon className="size-4" /> <span>Admin</span>
//       </Link>
//     </DropdownMenuItem>
//   );
// }

function SignOutItem() {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "Something went wrong");
    } else {
      toast.info("Signed out successfully");
      router.push("/sign-in");
    }
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon className="size-4" /> <span>Sign out</span>
    </DropdownMenuItem>
  );
}
