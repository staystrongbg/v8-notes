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
  // baseURL: "https://v8-notes.vercel.app",
});
