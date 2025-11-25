import type { Metadata } from "next";
import { Silkscreen, Doto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "V8 Notes",
  description: "Yet another notes app",
};

const silkscreen = Silkscreen({
  weight: "700",
  subsets: ["latin"],
});

const doto = Doto({
  weight: "900",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${silkscreen.className} ${doto.className} ${robotoMono.className} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen bg-accent`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
