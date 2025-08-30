// components/Hero.tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorFormingText from "../components/CursorFormingText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-sub", { y: 16, opacity: 0, duration: 0.6 }, 0.2)
      .from(".hero-cta", { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.3);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[100svh] grid items-center px-6">
      {/* ... your gradient layers remain ... */}

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="font-black text-[clamp(36px,8vw,96px)] leading-[1.05] tracking-[-0.02em]">
          <CursorFormingText text="Atul Singh" />
          <br />
          <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--accent2))" }}>
            <CursorFormingText text="Full-Stack Developer" radius={200} />
          </span>
        </h1>

        <p className="hero-sub text-muted text-[clamp(16px,2.2vw,22px)] mt-1">
          I build fast, elegant, human-centered web experiences.
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <a href="#work" className="hero-cta magnetic inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold shadow-glow text-[#0c0f15]"
             style={{ backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }}>
            See Work
          </a>
          <a href="#about" className="hero-cta magnetic inline-flex items-center justify-center px-5 py-3 rounded-full border border-[#2b3243]">
            Philosophy
          </a>
        </div>
      </div>
    </div>
  );
}
