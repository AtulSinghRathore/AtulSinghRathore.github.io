"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NingHero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // fade/slide the sub headline in on mount (client only)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      el.querySelector("[data-hero-sub]"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
    );

    // subtle parallax on the big outlined word
    const big = el.querySelector("[data-hero-big]") as HTMLElement | null;
    if (big) {
      gsap.to(big, {
        yPercent: -8,
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        }
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden min-h-[52svh] flex items-end"
      aria-label="Projects hero"
    >
      {/* subtle background wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(255,255,255,0.06)_0%,transparent_60%)]" />

      {/* huge stroked word behind */}
      <div
        data-hero-big
        className="absolute inset-x-0 top-4 text-center select-none text-transparent stroke-text whitespace-nowrap"
        aria-hidden="true"
      >
        <span className="hero-big">PROJECTS</span>
      </div>

      {/* optional labels at top-right using blend-mode */}
      <div className="pointer-events-none absolute top-4 right-4 mix-blend-difference text-[13px] tracking-wide hidden md:flex gap-6 text-white/90">
        <span>DESIGN</span>
        <span>FOLIO</span>
        <span>CONTACT</span>
        <span>ABOUT</span>
      </div>

      {/* sub-headline */}
      <div className="relative z-10 w-full px-6 pb-10">
        <h4
          data-hero-sub
          className="mx-auto max-w-3xl text-center text-xl md:text-2xl mix-blend-difference text-white/95"
        >
          HAVE AN IDEA IN MIND? <span className="opacity-70">Feel free to contact.</span>
        </h4>
      </div>
    </section>
  );
}
