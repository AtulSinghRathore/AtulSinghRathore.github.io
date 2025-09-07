"use client";

import { useEffect, useMemo, useRef } from "react";

export default function CursorTrailText({ text, className="" }: { text:string; className?:string }) {
  const spansRef = useRef<HTMLSpanElement[]>([]);
  spansRef.current = [];
  const add = (el: HTMLSpanElement | null) => { if (el) spansRef.current.push(el); };

  const chars = useMemo(() => text.split(""), [text]);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    let raf = 0;
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      for (const el of spansRef.current) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width/2;
        const cy = rect.top + rect.height/2;
        const dx = mx - cx;
        const dy = my - cy;
        const d = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - d / 180); // 0..1
        const tx = (dx / 40) * influence;
        const ty = (dy / 40) * influence;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        el.dataset.hot = influence > 0.25 ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      for (const el of spansRef.current) { el.style.transform = ""; el.dataset.hot = "0"; }
    };
  }, []);

  return (
    <span className={`cursor-trail ${className}`}>
      {chars.map((c, i) => (
        <span key={i} ref={add} className="ct-char">{c === " " ? "\u00A0" : c}</span>
      ))}
    </span>
  );
}
