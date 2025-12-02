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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${silkscreen.className} ${doto.className} ${robotoMono.className} antialiased grid grid-rows-[auto_1fr_auto] min-h-screen bg-background`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
