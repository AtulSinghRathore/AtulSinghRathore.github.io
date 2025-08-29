"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string>("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd) as Record<string, string>;
    setStatus("Sending…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      setStatus(json.ok ? "Sent!" : "Failed. Please email me directly.");
    } catch {
      setStatus("Something went wrong. Please email me directly.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-1">Let’s work together</h2>
        <p className="text-muted">Tell me about your project. I’ll reply within 24h.</p>
      </header>

      <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-muted text-sm">Name</span>
          <input name="name" required className="rounded-xl bg-[#0e1118] border border-[#202637] px-3 py-3 outline-none" />
        </label>
        <label className="grid gap-1">
          <span className="text-muted text-sm">Email</span>
          <input type="email" name="email" required className="rounded-xl bg-[#0e1118] border border-[#202637] px-3 py-3 outline-none" />
        </label>
        <label className="grid gap-1 md:col-span-2">
          <span className="text-muted text-sm">Message</span>
          <textarea name="message" rows={5} required className="rounded-xl bg-[#0e1118] border border-[#202637] px-3 py-3 outline-none resize-y"></textarea>
        </label>
        <div className="md:col-span-2 flex items-center gap-3">
          <button className="magnetic inline-flex items-center justify-center px-5 py-3 rounded-full font-semibold shadow-glow text-[#0c0f15]"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--accent), var(--accent2))" }}>
            Send
          </button>
          <a className="text-muted" href="mailto:natul0636@natul.com">Or email me directly</a>
          <p aria-live="polite" className="text-sm text-muted">{status}</p>
        </div>
      </form>
    </div>
  );
}
