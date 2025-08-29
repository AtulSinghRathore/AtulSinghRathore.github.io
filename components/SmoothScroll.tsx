"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    (window as any).__lenis = lenis; // <-- expose for other components

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", () => ScrollTrigger.update());

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (typeof value === "number") lenis.scrollTo(value);
        return window.scrollY || document.documentElement.scrollTop || 0;
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      (window as any).__lenis = undefined;
      ScrollTrigger.clearMatchMedia();
      lenis.destroy();
    };
  }, []);

  return null;
}
