"use client";

import { useEffect, useState } from "react";

export default function EasterEgg(){
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let step = 0;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((step === 0 && k === "a") || (step === 1 && k === "s")) step++;
      else step = 0;
      if (step === 2) { setOpen(v => !v); step = 0; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 surface px-4 py-3 text-sm">
      <div className="opacity-70 mb-1">Hidden links</div>
      <ul className="space-y-1">
        <li><a className="underline" href="https://github.com/AtulSinghRathore" target="_blank">GitHub</a></li>
        <li><a className="underline" href="mailto:atul0636@gmail.com">Email me</a></li>
      </ul>
    </div>
  );
}
