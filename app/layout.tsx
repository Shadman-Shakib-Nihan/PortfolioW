import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { profile, siteConfig } from "@/data/portfolio";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"||t==="dark"?t:"dark";var r=document.documentElement;r.classList.toggle("dark",d==="dark");r.style.colorScheme=d;r.dataset.theme=d;}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Shadman Shakib",
  },
  description: siteConfig.description,
  applicationName: "Shadman Shakib — Portfolio",
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Shadman Shakib",
    "AI engineer",
    "machine learning engineer",
    "full-stack developer",
    "computer vision",
    "Next.js developer",
    "Laravel developer",
    "Python developer",
    "Dhaka Bangladesh",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Shadman Shakib",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a09" },
    { media: "(prefers-color-scheme: light)", color: "#f2f0e8" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
