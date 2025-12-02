import { UserDetails } from "@/components/user/user-details";
import { requireUserSession } from "@/lib/require-user-session";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ProfilePage() {
  const session = await requireUserSession();
  const userInitials = session.user.name?.slice(0, 1).toUpperCase() || "U";

  return (
    <div className="max-w-xl mx-auto h-full text-center p-4">
      <h2>Profile</h2>
      <section>
        <div className="flex flex-col gap-2 mt-4 items-center">
          <Avatar>
            <AvatarImage src={session.user.image || undefined} alt="user" />
            <AvatarFallback>{userInitials || "U"}</AvatarFallback>
          </Avatar>
          <p>name: {session.user.name}</p>
          <p>
            email: {session.user.email}{" "}
            <span className="text-xs">
              {session.user.emailVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <Link href="/verify-email">
                  <Button variant="link" size={"sm"} type="button">
                    Verify email
                  </Button>
                </Link>
              )}
            </span>
          </p>
          <p>date joined: {session.user.createdAt.toDateString()}</p>
        </div>
      </section>
      <UserDetails />
    </div>
  );
}

//TODO delete account
