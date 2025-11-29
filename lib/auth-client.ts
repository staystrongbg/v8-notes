import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  changeEmail,
  changePassword,
  updateUser,
  sendVerificationEmail,
} = createAuthClient({
  // baseURL: "https://v8-notes.vercel.app",
});
