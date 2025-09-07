// components/Hero.tsx
"use client";

export default function Hero({ onOpenAbout }: { onOpenAbout: () => void }) {
  return (
    <div className="relative mx-auto flex h-[100svh] max-w-[1400px] items-center justify-center px-6">
      <h1 className="pointer-events-none select-none text-center text-[clamp(56px,8vw,168px)] leading-none font-black tracking-tight">
        ATUL SINGH’25
      </h1>

      {/* Invisible #about anchor for the header “About” link */}
      <span id="about" className="absolute -top-20" aria-hidden />

      {/* Clickable hotspots if you want them even on hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-between text-xs tracking-[.25em] opacity-60">
        <button onClick={onOpenAbout} className="pointer-events-auto hover:opacity-100">
          ( ABOUT )
        </button>
        <a href="#contact" className="pointer-events-auto hover:opacity-100">
          ( CONTACT )
        </a>
      </div>
    </div>
  );
}
