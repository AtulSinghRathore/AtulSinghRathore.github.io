// components/ProjectModal.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Project as ProjectType } from "../lib/constants";

/** Collect slide URLs from various shapes (cover, gallery[], media.poster/src) */
function collectSlides(p: ProjectType): string[] {
  const anyp = p as unknown as Record<string, any>;
  const out: string[] = [];

  if (typeof anyp.cover === "string" && anyp.cover.trim()) out.push(anyp.cover.trim());

  if (Array.isArray(anyp.gallery)) {
    for (const g of anyp.gallery) {
      if (typeof g === "string" && g.trim()) out.push(g.trim());
    }
  }

  if (anyp.media && typeof anyp.media === "object") {
    const m = anyp.media as { poster?: unknown; src?: unknown };
    if (typeof m.poster === "string" && m.poster.trim()) out.push(m.poster.trim());
    if (typeof m.src === "string" && m.src.trim()) out.push(m.src.trim());
  }

  const unique = [...new Set(out)];
  if (unique.length === 0) {
    const seed = encodeURIComponent((anyp.slug as string) || "slide");
    unique.push(`https://picsum.photos/seed/${seed}/1200/800`);
  }
  return unique;
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectType | null;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);

  // Call hooks unconditionally (before any early returns)
  const slides = useMemo(() => (project ? collectSlides(project) : []), [project]);
  const len = slides.length || 1;
  const safeIndex = ((i % len) + len) % len;

  useEffect(() => {
    if (!project) return; // okay to bail inside effect
    setI(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => v + 1);
      if (e.key === "ArrowLeft") setI((v) => v - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-6 md:inset-10 rounded-2xl border border-white/15 bg-[#0b0d12]/95 overflow-hidden"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full grid grid-rows-[auto_1fr_auto]">
            <header className="p-4 md:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted text-sm">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="relative">
              <img
                src={slides[safeIndex]}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>

            <footer className="p-4 md:p-6 flex items-center justify-between gap-3">
              <button
                className="px-4 py-2 rounded-md border border-white/20 hover:bg-white/10"
                onClick={() => setI((v) => v - 1)}
              >
                Prev
              </button>
              <div className="text-muted text-sm">
                {safeIndex + 1} / {len}
              </div>
              <button
                className="px-4 py-2 rounded-md border border-white/20 hover:bg-white/10"
                onClick={() => setI((v) => v + 1)}
              >
                Next
              </button>
            </footer>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
