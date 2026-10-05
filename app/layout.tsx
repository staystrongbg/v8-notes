import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { doto, robotoMono, silkscreen } from '@/lib/fonts';
import { Providers } from '@/lib/providers';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'V8 Notes',
  description: 'Yet another notes app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${silkscreen.className} ${doto.className} ${robotoMono.className} bg-background grid min-h-screen grid-rows-[auto_1fr_auto] antialiased`}
      >
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
