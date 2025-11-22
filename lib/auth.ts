import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "@/constants";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
});

//TODO add confirmation email when signing up
