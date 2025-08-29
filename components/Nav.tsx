"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled ? "backdrop-blur bg-bg/70" : "bg-gradient-to-b from-bg/85 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="w-9 h-9 rounded-xl grid place-items-center bg-[linear-gradient(135deg,var(--accent),var(--accent2))] text-[#0c0f15] font-extrabold shadow-glow">
          AS
        </div>
        <nav className="text-sm">
          <a className="px-3 py-2 opacity-85 hover:opacity-100" href="#work">Work</a>
          <a className="px-3 py-2 opacity-85 hover:opacity-100" href="#about">About</a>
          <a className="px-3 py-2 opacity-85 hover:opacity-100 border rounded-full ml-2 magnetic" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
