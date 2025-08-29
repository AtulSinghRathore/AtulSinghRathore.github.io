// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  title: "Atul Singh — Portfolio",
  description: "I craft fast, elegant, human-centered web experiences."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* suppressHydrationWarning prevents React from throwing if any upstream
         streaming markers differ at the very start of <body> */}
      <body className="bg-bg text-text" suppressHydrationWarning>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
