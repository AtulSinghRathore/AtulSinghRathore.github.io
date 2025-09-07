// app/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Hero from '../components/Hero';
import ShowreelCube from '../components/ShowreelCube';
import ProjectsRail from '../components/ProjectsRail';
import ContactFooter from '../components/ContactFooter';
import AboutModal from '../components/AboutModal';
import { projects as sourceProjects } from '../lib/constants';

export default function HomePage() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const projects = useMemo(
    () => (Array.isArray(sourceProjects) ? sourceProjects : []).slice(0, 8),
    []
  );

  return (
    <main>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />

      {/* 1) HERO */}
      <section id="hero" className="relative min-h-[100svh]">
        <Hero onOpenAbout={() => setAboutOpen(true)} />
      </section>

      {/* 2) SHOWREEL */}
      <section id="showreel" className="relative min-h-[100svh]">
        <ShowreelCube />
      </section>

      {/* 3) SELECTED WORK */}
      <ProjectsRail projects={projects} />

      {/* 4) CONTACT / FINAL FOOTER */}
      <section id="contact">
        <ContactFooter />
      </section>
    </main>
  );
}
