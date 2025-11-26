import Image from "next/image";
import { UserDetails } from "@/components/user/user-details";
import { requireUserSession } from "@/lib/require-user-session";

export default async function ProfilePage() {
  const session = await requireUserSession();

  return (
    <div className="max-w-xl mx-auto h-full text-center p-4">
      <h2>Profile</h2>
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
