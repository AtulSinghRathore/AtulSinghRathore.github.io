"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  radius?: number; // pixels of influence
};

export default function CursorFormingText({ text, className = "", radius = 160 }: Props) {
  // allow nulls inside the array
  const refs = useRef<Array<HTMLSpanElement | null>>([]);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const chars = useMemo(() => text.split(""), [text]);

  // helper that returns a ref setter with the correct signature
  const setRef = (idx: number) => (el: HTMLSpanElement | null) => {
    refs.current[idx] = el; // return void (nothing)
  };

  useEffect(() => {
    if (reduce) return;

    let frame = 0;

    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;

        refs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const d = Math.hypot(dx, dy);

          const p = Math.max(0, Math.min(1, 1 - d / radius));
          const opacity = 0.35 + 0.65 * p;
          const scale = 0.9 + 0.1 * p;
          const blur = (1 - p) * 4;

          el.style.opacity = String(opacity);
          el.style.transform = `translateZ(0) scale(${scale})`;
          el.style.filter = `blur(${blur.toFixed(2)}px)`;
        });
      });
    };

    const onResize = () =>
      onMove(
        new MouseEvent("mousemove", {
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 3
        })
      );

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    // initialize
    onResize();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      // reset styles
      refs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "";
        el.style.transform = "";
        el.style.filter = "";
      });
    };
  }, [radius, reduce]);

  return (
    <span className={`cursor-forming ${className}`}>
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={`s-${i}`} aria-hidden="true" className="inline-block w-[0.35em]" />
        ) : (
          <span key={i} ref={setRef(i)} className="cf-char">
            {ch}
          </span>
        )
      )}
    </span>
  );
}
