import Hero from "../components/Hero";
import Contact from "../components/Contact";
import ShowreelCube from "../components/ShowreelCube";
import ProjectsGrid from "../components/ProjectsGrid";
import { projects } from "../lib/constants";

export default function HomePage() {
  return (
    <main>
      <section id="hero"><Hero /></section>

      {/* Showreel / scroll-driven cube */}
      <ShowreelCube />

      {/* About (sticky) – keep your existing section here */}

      {/* Work (filterable) */}
      <section id="work" className="min-h-[100svh] py-20 px-6">
        <header className="max-w-5xl mx-auto mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Selected Work</h2>
          <p className="text-muted">Filter and explore. Click any tile to open a case.</p>
        </header>
        <ProjectsGrid data={projects} />
      </section>

      {/* Capabilities, Testimonials, Contact (unchanged) */}
      <section id="contact" className="py-20 px-6"><Contact /></section>
    </main>
  );
}
