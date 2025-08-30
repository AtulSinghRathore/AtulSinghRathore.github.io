"use client";

import { useMemo, useRef, useState } from "react";
import type { Project } from "../lib/constants";
import { motion } from "framer-motion";

function VideoPreview({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  return (
    <div className="relative h-64 bg-[#0f1624] overflow-hidden">
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover"
        preload="metadata"
        muted
        playsInline
        loop
        poster={poster}
        onMouseEnter={() => ref.current?.play()}
        onMouseLeave={() => {
          if (!ref.current) return;
          ref.current.pause();
          ref.current.currentTime = 0;
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="card-sheen" />
    </div>
  );
}

function ImagePreview({ src }: { src: string }) {
  return (
    <div className="relative h-64 bg-[#0f1624] overflow-hidden">
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="card-sheen" />
    </div>
  );
}

export default function SelectedWork({ data }: { data: Project[] }) {
  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(data.flatMap((p) => p.tags)))],
    [data]
  );
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? data : data.filter((p) => p.tags.includes(tag));

  return (
    <section id="work" className="min-h-[100svh] py-20 px-6">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Selected Work</h2>
        <p className="text-muted">Filter and explore. Click any tile to open a case.</p>
      </header>

      {/* Sticky filter capsule */}
      <div className="sticky top-14 z-30">
        <div className="max-w-5xl mx-auto backdrop-blur bg-[#0b0d12]/55 border border-[#202637] rounded-full px-2 py-2">
          <div className="flex flex-wrap gap-1.5">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors
                  ${tag === t ? "text-[#0c0f15]" : "text-muted border border-[#2b3243]"}`}
                style={
                  tag === t
                    ? { backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }
                    : {}
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid (NO initial/animate/exit to avoid SSR hydration mismatch) */}
      <div className="grid max-w-5xl mx-auto gap-5 md:grid-cols-2 mt-5">
        {shown.map((p) => (
          <motion.a
            key={p.slug}
            href={`/work/${p.slug}`}
            layout
            transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
            onMouseMove={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              const r = el.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              el.style.setProperty("--rx", String(py * -6));
              el.style.setProperty("--ry", String(px * 6));
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.setProperty("--rx", "0");
              el.style.setProperty("--ry", "0");
            }}
            className="group border border-[#202637] rounded-2xl overflow-hidden bg-white/[.02] block
                       [transform-style:preserve-3d]
                       [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]
                       transition-transform duration-300 will-change-transform hover:shadow-glow"
          >
            {p.media?.kind === "video" ? (
              <VideoPreview src={p.media.src} poster={p.media.poster} />
            ) : p.media?.kind === "image" ? (
              <ImagePreview src={p.media.src} />
            ) : (
              <div className="relative h-64 bg-[#0f1624] card-sheen" />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-muted">{p.description}</p>
              <div className="mt-2 flex gap-1.5 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
