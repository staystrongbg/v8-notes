import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { UserDetails } from "@/components/user/user-details";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return unauthorized();
  }

  return (
    <div className="max-w-xl mx-auto h-full text-center">
      <h1>Profile</h1>
      <Separator className="my-4 w-full" />
      <section>
        <div className="flex flex-col gap-2 mt-4 items-center">
          <Image
            src={session.user.image || "/placeholder-image-person.png"}
            alt={session.user.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <p>name: {session.user.name}</p>
          <p>email: {session.user.email}</p>
          <p>date joined: {session.user.createdAt.toDateString()}</p>
        </div>
      </section>
      <UserDetails />
    </div>
  );
}

//TODO delete account
//TODO email verified?
