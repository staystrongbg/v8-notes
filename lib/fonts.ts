import { Silkscreen, Doto, Roboto_Mono } from "next/font/google";

const silkscreen = Silkscreen({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const doto = Doto({
  weight: "900",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export { silkscreen, doto, robotoMono };
