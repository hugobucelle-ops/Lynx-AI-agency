import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LYNX AI Agency — Agencia GEO y SEO Local en Barcelona",
    template: "%s | LYNX AI Agency",
  },
  description:
    "La primera agencia en España en Generative Engine Optimization (GEO) y SEO Local.",
  metadataBase: new URL("https://lynxai.agency"),
  robots: { index: true, follow: true },
};

// Root layout: only provides html/body + font CSS variables
// Lang and locale-specific content handled in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${syne.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {children}
      </body>
    </html>
  );
}
