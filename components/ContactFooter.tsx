'use client';

export default function ContactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative z-[40] border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Back to top */}
        <div className="grid place-items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="group w-14 h-14 rounded-xl border border-white/15 bg-black/40 hover:bg-black/55 transition-colors grid place-items-center focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {/* Straight up arrow */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
          <div className="text-[11px] tracking-[.25em] opacity-70">BACK TO TOP</div>
        </div>

        {/* Background wordmark */}
        <div className="mt-16 text-[min(16px,3.8vw)] font-black leading-[.9] opacity-[0.07] text-center select-none">
          GET IN TOUCH
        </div>

        {/* Footer links */}
        <div className="mt-16 grid grid-cols-4 items-center text-sm opacity-90">
          <div className="text-left">© {year} Atul Singh</div>
          <a className="justify-self-center hover:opacity-100 opacity-80" href="https://instagram.com/" target="_blank" rel="noreferrer noopener">
            Instagram
          </a>
          <a className="justify-self-center hover:opacity-100 opacity-80" href="https://linkedin.com/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a className="justify-self-end hover:opacity-100 opacity-80" href="mailto:atul0636@gmail.com">
            atul0636@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
