import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hey, Blue!",
  description: "Connection before correction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setThemeScript = `
  (function(){
    try{
      var key = 'heyblue:theme';
      var stored = localStorage.getItem(key);
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var useDark = false;
      if(stored === 'dark') useDark = true;
      else if(stored === 'light') useDark = false;
      else useDark = prefersDark;
      if(useDark) document.documentElement.classList.add('dark');
    }catch(e){}
  })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body
        suppressHydrationWarning
  className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-[#0a1f3d] text-gray-900 dark:text-gray-100`}
      >
        <Header />
        <main>{children}</main>
        <CookieConsentBanner />
        <Footer />
      </body>
    </html>
  );
}
