"use client";

import { LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type DropdownUser = {
  name: string | null;
  email: string | null;
  image?: string | null;
};

interface UserDropdownProps {
  user: DropdownUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const userInitials = user.name?.slice(0, 1).toUpperCase() || "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={user.image || undefined} alt="user" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </div>
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
