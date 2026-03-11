import { createAuthClient } from "better-auth/react";

const isProduction = process.env.NODE_ENV === "production";

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
  baseURL: isProduction 
    ? "https://v8-notes.vercel.app"
    : "http://localhost:3000",
});
