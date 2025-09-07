"use client";

import { useEffect, useState } from "react";

export default function HomeHeader({
  onOpenAbout,
  hidden,
}: {
  onOpenAbout: () => void;
  hidden?: boolean; // allow the "hidden" prop you passed
}) {
  const [show, setShow] = useState(!hidden);

  useEffect(() => {
    if (!hidden) {
      setShow(true);
      return;
    }
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.3);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (!show) return null;

  return (
    <header className="fixed top-4 right-4 z-50">
      <nav className="flex items-center gap-3 rounded-full bg-black/40 backdrop-blur px-3 py-1 border border-white/10">
        <a href="#work" className="px-3 py-1 rounded hover:bg-white/10 transition">
          Work
        </a>
        <button
          className="px-3 py-1 rounded hover:bg-white/10 transition"
          onClick={onOpenAbout}
        >
          About
        </button>
        <a href="#contact" className="px-3 py-1 rounded hover:bg-white/10 transition">
          Contact
        </a>
      </nav>
    </header>
  );
}
