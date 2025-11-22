import { createAuthClient } from "better-auth/react";
import { baseUrl } from "@/constants";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  changeEmail,
  changePassword,
  updateUser,
} = createAuthClient({
  baseURL: baseUrl,
});
