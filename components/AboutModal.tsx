'use client';

import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AboutModal({ open, onClose }: Props) {
  // lock scroll when open
  useEffect(() => {
    if (open) document.documentElement.classList.add('overflow-y-hidden');
    else document.documentElement.classList.remove('overflow-y-hidden');
    return () => document.documentElement.classList.remove('overflow-y-hidden');
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={[
        'pointer-events-none fixed inset-0 z-[70]',
        open ? 'pointer-events-auto' : '',
      ].join(' ')}
    >
      {/* BACKDROP (click to close) */}
      <button
        aria-label="Close about"
        onClick={onClose}
        className={[
          'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* SLIDING PANEL (from right) */}
      <aside
        className={[
          'fixed right-0 top-0 h-full w-[min(540px,90vw)] bg-[#0c0f14]/95',
          'border-l border-white/10 shadow-2xl',
          'transition-transform duration-500 ease-[cubic-bezier(.2,.6,.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 md:p-8 overflow-y-auto h-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About</h2>
          <p className="text-muted leading-relaxed">
            I’m a digital designer focused on web experience &amp; motion design.
            I mix interactions, code, and narrative to produce precise, fluid interfaces.
          </p>

          <div className="mt-8 grid gap-2 text-sm">
            <div className="text-muted">Recognitions</div>
            <ul className="space-y-1">
              <li>• Site of the Day</li>
              <li>• Developer Award</li>
              <li>• Honorable Mention</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* CENTER CLOSE BUTTON (rotates smoothly on hover) */}
      <button
        onClick={onClose}
        aria-label="Close"
        className={[
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-11 h-11 rounded-full border border-white/20 bg-white/10',
          'shadow-lg backdrop-blur-md',
          'grid place-items-center',
          'transition-transform duration-500 ease-[cubic-bezier(.2,.6,.2,1)]',
          open ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none',
          'hover:rotate-90',
        ].join(' ')}
      >
        {/* Cross icon */}
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
