'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  title: string;
  description: string;
  cover?: string;                       // optional remote image
  media?: { src?: string; poster?: string }; // fallback source
};

const CONFIG = {
  cardMin: 260,
  cardMax: 340,
  gapMin: 100,
  gapMax: 150,
  density: 0.55,
  ampMin: 140,
  ampMax: 220,
  baseRot: 18,
  stagger: 0.085,
};

export default function ProjectsRail({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards   = cardsRef.current;
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const clamp = gsap.utils.clamp;

      const setup = () => {
        const vw = window.innerWidth;

        const CARD_W = clamp(CONFIG.cardMin, CONFIG.cardMax, vw * 0.30);
        const GAP_X  = clamp(CONFIG.gapMin,  CONFIG.gapMax,  vw * 0.14);
        const AMP    = clamp(CONFIG.ampMin,  CONFIG.ampMax,  vw * 0.18);
        const STEP   = CARD_W * CONFIG.density + GAP_X;
        const base   = CONFIG.baseRot;

        ScrollTrigger.getAll().forEach(s => s.kill());

        const endDist = (cards.length - 1) * STEP + vw * 1.7 + CARD_W * 1.3;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${endDist}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true,
          }
        });

        cards.forEach((el, i) => {
          const startX = vw + i * STEP;
          const midX   = startX - vw * 0.5;
          const endX   = -CARD_W - GAP_X * 0.6;

          // below → crest → exit higher (semi-circle from below)
          const y0 =  AMP * 0.95;
          const y1 = -AMP * 0.15;
          const y2 = -AMP * 0.90;

          const s = i % 2 === 0 ? 1 : -1;
          const rot0 =  base * s;
          const rot1 =  base * 1.6 * s;
          const rot2 = -base * 0.7 * s;

          gsap.set(el, {
            width: CARD_W,
            x: startX,
            y: y0,
            rotate: rot0,
            transformOrigin: '50% 50%',
            willChange: 'transform',
            zIndex: 100 + i,
          });

          const D = 1;
          const offset = i * CONFIG.stagger;

          tl.to(el, {
            x: midX,
            y: y1,
            rotate: rot1,
            duration: D * 0.55,
            ease: 'power2.in',
          }, offset).to(el, {
            x: endX,
            y: y2,
            rotate: rot2,
            duration: D * 0.45,
            ease: 'power2.out',
          }, offset + D * 0.55);
        });
      };

      setup();

      // ensure ScrollTrigger accounts for async/remote images
      const refresh = () => ScrollTrigger.refresh();
      const imgs = Array.from(section.querySelectorAll<HTMLImageElement>('img'));
      const onImg = () => requestAnimationFrame(refresh);
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', onImg);
          img.addEventListener('error', onImg);
        }
      });

      window.addEventListener('resize', refresh);
      window.addEventListener('orientationchange', refresh);

      return () => {
        imgs.forEach(img => {
          img.removeEventListener('load', onImg);
          img.removeEventListener('error', onImg);
        });
        window.removeEventListener('resize', refresh);
        window.removeEventListener('orientationchange', refresh);
        ScrollTrigger.getAll().forEach(s => s.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section id="work" ref={sectionRef} className="work-bg isolate relative min-h-[180svh] overflow-visible">
      <header className="relative z-10 max-w-5xl mx-auto pt-24 pb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold">Projects</h2>
        <p className="text-muted">Scroll: cards flow right → left.</p>
      </header>

      <div ref={trackRef} className="relative z-10 h-[66vh] md:h-[62vh]">
        {projects.map((p, i) => {
          const cover = p.cover || p.media?.poster || p.media?.src || undefined;

          return (
            <div
              key={p.slug}
              ref={el => { if (el) cardsRef.current[i] = el; }}
              className="absolute top-1/2 -translate-y-1/2"
            >
              <article className="group w-[clamp(260px,30vw,340px)] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-xl overflow-hidden relative">
                <div className="relative h-40 md:h-48">
                  {cover ? (
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={800}
                      height={480}
                      className="absolute inset-0 h-full w-full object-cover select-none"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0d1016]" />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                <div className="p-4 pr-14">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-muted">{p.description}</p>
                </div>

                <a
                  href={`/work/${p.slug}`}
                  aria-label={`Open ${p.title}`}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center backdrop-blur-sm transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="rotate-12" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
