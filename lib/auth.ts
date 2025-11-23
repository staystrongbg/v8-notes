import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "@/constants";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: "https://v8-notes.vercel.app",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    },
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  trustedOrigins: ["https://v8-notes.vercel.app", "http://localhost:3000"],
  plugins: [nextCookies()],
});

//TODO add confirmation email when signing up
