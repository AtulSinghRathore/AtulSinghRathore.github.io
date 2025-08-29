"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../lib/constants";

export default function ProjectsGrid({ data }: { data: Project[] }) {
  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(data.flatMap((p) => p.tags)))],
    [data]
  );
  const [tag, setTag] = useState("All");
  const shown = tag === "All" ? data : data.filter((p) => p.tags.includes(tag));

  return (
    <div className="max-w-5xl mx-auto">
      {/* filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={`px-3 py-1.5 rounded-full border text-sm ${
              tag === t ? "border-transparent text-[#0c0f15]" : "border-[#2b3243] text-muted"
            }`}
            style={tag === t ? { backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      {/* grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <AnimatePresence initial={false}>
          {shown.map((p) => (
            <motion.a
              key={p.slug}
              href={`/work/${p.slug}`}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="group border border-[#202637] rounded-2xl overflow-hidden bg-white/[.02] block"
            >
              <div className="relative h-64 bg-[#0f1624]">
                <div className="absolute inset-0 -translate-x-[120%] rotate-[8deg] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[120%] duration-700 ease-[cubic-bezier(.2,.6,.2,1)]" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-muted">{p.description}</p>
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs text-muted border border-[#2b3243] px-2 py-0.5 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
