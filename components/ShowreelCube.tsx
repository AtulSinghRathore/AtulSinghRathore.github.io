// components/ShowreelCube.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelCube() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const inner = innerRef.current!;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",   // when section enters
        end: "bottom top",     // when it leaves
        scrub: true,
      },
    });

    tl.fromTo(
      wrap,
      { scale: 0.25, rotate: -15 },
      { scale: 0.75, rotate: 0, ease: "none" }
    ).to(wrap, { rotateY: 360, ease: "none" });

    gsap.to(inner, {
      rotateX: -360,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="mx-auto grid min-h-[120svh] place-items-center">
      <div
        ref={wrapRef}
        className="relative h-[52vmin] w-[52vmin] [transform-style:preserve-3d]"
      >
        {/* 6 faces */}
        {["front", "back", "left", "right", "top", "bottom"].map((side, i) => (
          <Face key={side} i={i}>
            <span className="opacity-70">{side.toUpperCase()}</span>
          </Face>
        ))}

        {/* inner cube, counter-rotating */}
        <div ref={innerRef} className="absolute inset-0 m-auto h-[36vmin] w-[36vmin] [transform-style:preserve-3d]">
          {["F", "B", "L", "R", "T", "D"].map((s, i) => (
            <Face key={s} i={i} inner>
              <span className="opacity-60">{s}</span>
            </Face>
          ))}
        </div>
      </div>
    </div>
  );
}

function Face({
  i,
  inner,
  children,
}: {
  i: number;
  inner?: boolean;
  children: React.ReactNode;
}) {
  const d = inner ? "translateZ(18vmin)" : "translateZ(26vmin)";
  const transform = [
    `${d}`, // front
    `rotateY(180deg) ${d}`, // back
    `rotateY(-90deg) ${d}`, // left
    `rotateY(90deg) ${d}`, // right
    `rotateX(90deg) ${d}`, // top
    `rotateX(-90deg) ${d}`, // bottom
  ][i];

  return (
    <div
      className="absolute inset-0 grid place-items-center rounded-2xl bg-white/[.02] border border-white/10 shadow-[inset_0_0_60px_rgba(255,255,255,.05)]"
      style={{ transform }}
    >
      {children}
    </div>
  );
}
