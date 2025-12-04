import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { silkscreen, doto, robotoMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "V8 Notes",
  description: "Yet another notes app",
};

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="overflow-hidden" id="main-content">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
