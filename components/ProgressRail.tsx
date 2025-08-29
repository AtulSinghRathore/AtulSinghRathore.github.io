"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["hero", "about", "work", "capabilities", "testimonials", "contact"] as const;

export default function ProgressRail() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.01 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 opacity-70"
      aria-hidden="true"
    >
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => go(id)}
          className="w-2.5 h-2.5 rounded-full outline outline-1 outline-transparent bg-[#2a3142] transition-transform hover:scale-110"
          data-active={active === id}
          style={active === id ? { background: "var(--accent)", outlineColor: "var(--accent)" } : {}}
          title={id}
        />
      ))}
    </div>
  );
}
