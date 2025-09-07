"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onReady = () => setTimeout(() => setDone(true), 350);
    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });
    return () => window.removeEventListener("load", onReady);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--ink)]">
      {/* SVG goo filter */}
      <svg width="0" height="0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur" mode="matrix" result="goo"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      <div className="relative goo">
        <span className="blob" />
        <span className="blob delay-1" />
        <span className="blob delay-2" />
      </div>

      <style jsx>{`
        .blob{
          position:absolute;
          width:18px;height:18px;border-radius:9999px;
          background: var(--paper);
          left:-40px; top:0;
          animation: b 1.2s ease-in-out infinite;
        }
        .delay-1{ animation-delay:.15s; }
        .delay-2{ animation-delay:.3s; }
        @keyframes b{
          0%{ transform:translateX(0); }
          50%{ transform:translateX(80px); }
          100%{ transform:translateX(0); }
        }
      `}</style>
    </div>
  );
}
