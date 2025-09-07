// app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

import { Inter } from "next/font/google";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import LiquidBackground from "../components/LiquidBackground";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Atul Singh — Portfolio",
  description: "I craft fast, elegant, human-centered web experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* DO NOT add "use client" here; layouts must stay Server Components */}
      <body className={`${inter.className} bg-bg text-text`} suppressHydrationWarning>
        {/* Background lives behind everything */}
        <LiquidBackground />
        <SmoothScroll />
        <Nav />

        {children}

        <Footer />
      </body>
    </html>
  );
}
