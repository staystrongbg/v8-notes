import { Book, HomeIcon, InfoIcon } from "lucide-react";
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
    name: "about",
    href: "/about",
    icon: InfoIcon,
    position: "start",
  },
];


export const githubClientId = process.env.GITHUB_CLIENT_ID as string;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET as string;

export const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;


export const baseUrl = process.env.BASE_URL;
