import { Book, HomeIcon, Star } from "lucide-react";
export const LINKS = [
  {
    name: "home",
    href: "/",
    icon: HomeIcon,
    position: "start",
  },
  {
    name: "notes",
    href: "/notes",
    icon: Book,
    position: "start",
  },
  {
    name: "starred",
    href: "/starred-notes",
    icon: Star,
    position: "start",
  },
];

export const githubClientId = process.env.GITHUB_CLIENT_ID as string;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;

export const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

export const betterAuthSecret = process.env.BETTER_AUTH_SECRET as string;
export const betterAuthUrl = process.env.BETTER_AUTH_URL as string;

export const resendApiKey = process.env.RESEND_API_KEY as string;

export const nodemailerEmail = process.env.NODEMAILER_EMAIL as string;
export const nodemailerPassword = process.env.NODEMAILER_PASSWORD as string;
