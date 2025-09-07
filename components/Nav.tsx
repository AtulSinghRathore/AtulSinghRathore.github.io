'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Site"
      className={`pointer-events-none fixed top-6 right-6 z-[60] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-4">
        <a href="#work" className="pill">Work</a>
        <a href="#about" className="pill">About</a>
        <a href="#contact" className="pill">Contact</a>
      </div>
    </nav>
  );
}
