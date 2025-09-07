// components/LiquidBackground.tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight cursor-tide effect:
 * - A large radial-gradient follows the cursor (smoothed)
 * - Blended over a soft monochrome “metal” noise gradient
 * - Everything blurred + vignette for the mercury vibe
 */
export default function LiquidBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const cur = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      target.current.x = x;
      target.current.y = y;
    };

    let raf = 0;
    const tick = () => {
      // Smooth follow (tide / gravity)
      cur.current.x += (target.current.x - cur.current.x) * 0.08;
      cur.current.y += (target.current.y - cur.current.y) * 0.08;
      el.style.setProperty("--mx", `${cur.current.x}`);
      el.style.setProperty("--my", `${cur.current.y}`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        // page-wide vignette + “metal” soft gradient + cursor-tide highlight
        background:
          `radial-gradient(1200px 1200px at calc(var(--mx) * 100%) calc(var(--my) * 100%), rgba(255,255,255,.12), transparent 60%),
           radial-gradient(1200px 1200px at calc((1 - var(--mx)) * 100%) calc((1 - var(--my)) * 100%), rgba(255,255,255,.06), transparent 60%),
           radial-gradient(1600px 900px at 30% 20%, #222 0%, #0f0f10 45%, #0a0a0a 100%)`,
        filter: "blur(24px) contrast(105%) saturate(80%)",
      }}
    />
  );
}
