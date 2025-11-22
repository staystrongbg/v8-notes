import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  changeEmail,
  changePassword,
  updateUser,
} = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
