"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelCube() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const cube = cubeRef.current!;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(cube, { transformStyle: "preserve-3d", rotateX: -12, rotateY: 18 });
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=140%",
          scrub: true,
          pin: true
        }
      })
      .to(cube, { rotateY: 198, ease: "none" }, 0)
      .to(cube, { rotateX: 12, ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  const face = (className: string, transform: string, label: string) => (
    <div
      className={`absolute inset-0 grid place-items-center text-sm font-semibold ${className}`}
      style={{ transform }}
    >
      <span className="px-2 py-1 rounded bg-black/30 border border-white/10">{label}</span>
    </div>
  );

  return (
    <section ref={wrapRef} className="relative min-h-[80svh] md:min-h-[100svh]">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={cubeRef}
          className="relative w-[55vmin] h-[55vmin] rounded-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* faces: 3D panels with gradients */}
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(60%_60%_at_30%_30%,rgba(62,166,255,.25),transparent)]" />
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "translateZ(27.5vmin)", "Web / GSAP")}
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "rotateY(90deg) translateZ(27.5vmin)", "3D / CSS")}
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "rotateY(-90deg) translateZ(27.5vmin)", "Art Dir.")}
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "rotateX(90deg) translateZ(27.5vmin)", "Motion")}
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "rotateX(-90deg) translateZ(27.5vmin)", "Interaction")}
          {face("rounded-2xl bg-white/[.02] border border-[#202637]",
            "rotateY(180deg) translateZ(27.5vmin)", "Case Studies")}
        </div>
      </div>
    </section>
  );
}
