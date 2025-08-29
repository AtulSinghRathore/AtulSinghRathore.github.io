import "./../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import ProgressRail from "../components/ProgressRail"; // <-- add

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atul Singh — Portfolio",
  description: "I craft fast, elegant, human-centered web experiences.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-bg text-text`}>
        <SmoothScroll />
        <Nav />
        <ProgressRail /> {/* <-- add */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
