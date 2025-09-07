"use client";

import { useCallback } from "react";

export default function Contact() {
  const backToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      {/* subtle mercury bg just for this section */}
      <div className="absolute inset-0 pointer-events-none contact-noise" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 opacity-70">
          Have an idea in mind? Feel free to contact.
        </h2>

        {/* Back to top */}
        <div className="py-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={backToTop}
              className="group w-14 h-14 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-md flex items-center justify-center"
              aria-label="Back to top"
            >
              {/* Straight Up Arrow */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </button>

            <span className="text-xs tracking-[0.35em] uppercase opacity-70">
              Back to top
            </span>
          </div>
        </div>

        <div
          className="text-[11vw] md:text-[9vw] font-extrabold leading-none tracking-tighter opacity-[.06] select-none text-center"
          aria-hidden="true"
        >
          GET IN TOUCH
        </div>
      </div>

      {/* footer stripe for last page only */}
      <div className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <div className="opacity-80">© {new Date().getFullYear()} Atul Singh</div>
          <nav className="flex items-center gap-6">
            <a className="hover:opacity-100 opacity-80" href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a className="hover:opacity-100 opacity-80" href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:opacity-100 opacity-80" href="mailto:atul0636@gmail.com">atul0636@gmail.com</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
