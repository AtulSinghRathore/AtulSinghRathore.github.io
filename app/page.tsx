// app/page.tsx
import Hero from "../components/Hero";
import Contact from "../components/Contact";
import SelectedWork from "../components/SelectedWork";
import NingHero from "../components/NingHero";
import { projects } from "../lib/constants";

export default function HomePage() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      {/* Ning-style banner (outlined PROJECTS + blend headline) */}
      <NingHero />

      {/* About / Philosophy (sticky) */}
      <section id="about" className="min-h-[100svh] grid items-center py-28 px-6">
        <div className="grid max-w-5xl mx-auto gap-7 md:grid-cols-[1fr_1.2fr]">
          <div className="sticky top-28 self-start">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-3">Principles</h2>
            <ul className="text-muted space-y-2 max-w-md">
              <li><b>Clarity first:</b> reduce noise, amplify signal.</li>
              <li><b>Motion as meaning:</b> transitions narrate, not decorate.</li>
              <li><b>Speed is UX:</b> 60fps, minimal payload.</li>
              <li><b>Accessibility:</b> respect preferences & focus.</li>
            </ul>
          </div>

          <div className="space-y-7">
            {[
              { t: "Narrative Layouts", c: "Sticky chapters where content unfolds with your scroll." },
              { t: "Tactile Interactions", c: "Magnetic buttons, subtle cursor lag, hover intent." },
              { t: "Performance Discipline", c: "GPU transforms only. Lazy everything. Code split deep." }
            ].map((f, i) => (
              <article key={i} className="border border-[#202637] rounded-2xl p-5 bg-white/[.02]">
                <h3 className="text-xl mb-2">{f.t}</h3>
                <div className="gradient-card h-56 rounded-xl mb-3" />
                <p className="text-muted">{f.c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work (your updated implementation) */}
      <SelectedWork data={projects} />

      {/* Capabilities */}
      <section id="capabilities" className="min-h-[70svh] py-20 px-6">
        <header className="max-w-5xl mx-auto mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Capabilities</h2>
          <p className="text-muted">From product thinking to performant delivery.</p>
        </header>

        <div className="grid max-w-5xl mx-auto gap-4 md:grid-cols-3">
          {[
            { t: "Web Experience", d: "Next.js, React, TypeScript, GSAP, Framer Motion." },
            { t: "Systems & APIs", d: "Edge functions, caching, analytics, CI/CD." },
            { t: "Design & Motion", d: "Minimal, cinematic, narrative UX with restraint." }
          ].map((c) => (
            <div key={c.t} className="border border-[#202637] rounded-2xl p-5 bg-white/[.02]">
              <div className="w-12 h-12 rounded-full mb-2 shadow-glow bg-[radial-gradient(circle_at_30%_30%,var(--accent),transparent_60%),radial-gradient(circle_at_70%_70%,var(--accent2),transparent_60%)]" />
              <h3 className="text-xl mb-1">{c.t}</h3>
              <p className="text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <header className="max-w-4xl mx-auto mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Kind Words</h2>
        </header>
        <div className="grid max-w-4xl mx-auto gap-4">
          <figure className="border border-[#202637] rounded-2xl p-5 bg-white/[.02]">
            <blockquote className="text-lg">“Calm, precise, and fast. The experience feels inevitable.”</blockquote>
            <figcaption className="text-muted">— Product Lead</figcaption>
          </figure>
          <figure className="border border-[#202637] rounded-2xl p-5 bg-white/[.02]">
            <blockquote className="text-lg">“Animations that explain, not distract. Loved it.”</blockquote>
            <figcaption className="text-muted">— Design Director</figcaption>
          </figure>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <Contact />
      </section>
    </main>
  );
}
