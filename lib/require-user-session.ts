import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const requireUserSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("session", session);

  if (!session?.user) {
    return unauthorized();
  }

  return session;
});
