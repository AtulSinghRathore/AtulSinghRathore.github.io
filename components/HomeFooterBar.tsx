// components/HomeFooterBar.tsx
"use client";

export default function HomeFooterBar({ onOpenAbout }: { onOpenAbout: () => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[55]">
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md">
          <div className="flex items-center justify-between text-[12px] tracking-[.25em] px-4 py-3">
            <button
              onClick={onOpenAbout}
              className="pointer-events-auto opacity-80 hover:opacity-100 transition"
            >
              ( ABOUT )
            </button>
            <p className="opacity-70 text-center">
              I’m a digital designer based in India — focused on web experience & motion design.
            </p>
            <a href="#contact" className="pointer-events-auto opacity-80 hover:opacity-100 transition">
              ( CONTACT )
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
