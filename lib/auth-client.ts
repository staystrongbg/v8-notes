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
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://v8-notes.vercel.app"
      : "http://localhost:3000",
});
