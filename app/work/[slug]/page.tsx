import { notFound } from "next/navigation";
import { projects } from "../../../lib/constants";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function WorkCase({ params: { slug } }: Params) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="px-6 py-28 max-w-5xl mx-auto">
      <a href="/" className="text-muted hover:text-text">&larr; Back</a>
      <h1 className="text-4xl md:text-6xl font-extrabold mt-2">{project.title}</h1>
      <p className="text-muted mt-2">{project.description}</p>

      <div className="h-72 md:h-96 rounded-2xl border border-[#202637] bg-white/[.02] my-6 gradient-card" />

      <article className="prose prose-invert max-w-none">
        <h2>Problem</h2>
        <p>{project.case.problem}</p>
        <h2>Approach</h2>
        <p>{project.case.approach}</p>
        <h2>Result</h2>
        <p>{project.case.result}</p>
      </article>
    </main>
  );
}
