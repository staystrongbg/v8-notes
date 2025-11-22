import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import {
  betterAuthSecret,
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "@/constants";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseUrl: "https://v8-notes.vercel.app/",
  secret: betterAuthSecret,
  trustedOrigins: ["https://v8-notes.vercel.app/", "http://localhost:3000"],
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
});

//TODO add confirmation email when signing up
