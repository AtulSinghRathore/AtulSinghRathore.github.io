// app/work/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { projects } from '../../../lib/constants'; // <- correct relative path

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function WorkCase({ params }: { params: Params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  const c = project.case ?? null;

  return (
    <main className="section py-20">
      <a href="/#work" className="text-muted hover:text-text">&larr; Back</a>
      <h1 className="text-4xl md:text-6xl font-extrabold mt-4">{project.title}</h1>
      {project.description && <p className="text-muted mt-2 max-w-2xl">{project.description}</p>}

      {!c ? (
        <p className="mt-12 text-muted">Case study coming soon.</p>
      ) : (
        <article className="mt-10 max-w-3xl space-y-4">
          {c.problem && <p><b>Problem:</b> {c.problem}</p>}
          {c.approach && <p><b>Approach:</b> {c.approach}</p>}
          {c.strategy && <p><b>Strategy:</b> {c.strategy}</p>}
          {c.result && <p><b>Result:</b> {c.result}</p>}
          {c.result2 && <p><b>Result:</b> {c.result2}</p>}
          {Array.isArray(c.images) && c.images.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              {c.images.map((img, i) => (
                <img key={i} src={img.src} alt={img.alt ?? ''} className="rounded-xl border border-white/10" />
              ))}
            </div>
          )}
        </article>
      )}
    </main>
  );
}
