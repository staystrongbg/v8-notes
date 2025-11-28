import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
  betterAuthUrl,
} from "@/constants";
import { nextCookies } from "better-auth/next-js";
import { sendMail } from "./nodemailer";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: betterAuthUrl,
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
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
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ url, user }) {
      await sendMail({
        email: "ddamajadev@gmail.com",
        sendTo: user.email,
        subject: "Verify your email",
        text: `Click the link below to verify your email: ${url}`,
        // html: `<p>Click the link below to verify your email: <a href="${url}">${url}</a></p>`,
      });
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

export type Sesssion = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
