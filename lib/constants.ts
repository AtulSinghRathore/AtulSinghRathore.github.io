export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[]; // <--
  case: { problem: string; approach: string; result: string };
};

export const projects: Project[] = [
  {
    slug: "signal",
    title: "Signal",
    description: "Real-time web dashboard — Next.js, GSAP, WebSockets",
    tags: ["Web", "GSAP", "Realtime"],
    case: {
      problem: "Stakeholders needed a live telemetry dashboard with zero training.",
      approach: "Built narrative views with sticky sections and gentle reveals for context.",
      result: "Time-to-insight improved 2×; reduced onboarding friction dramatically."
    }
  },
  {
    slug: "trace",
    title: "Trace",
    description: "Case study: sticky storytelling — r3f + ScrollTrigger",
    tags: ["Case Study", "3D", "Scroll"],
    case: {
      problem: "Complex visualizations overwhelmed users.",
      approach: "Segmented chapters; pinned text while media advanced in 3–4 frames.",
      result: "Engagement and completion rate increased by 68%."
    }
  },
  {
    slug: "vita",
    title: "Vita",
    description: "Design system & motion — Framer Motion",
    tags: ["Design System", "Motion"],
    case: {
      problem: "Inconsistent interactions across product surfaces.",
      approach: "Created motion tokens and patterns with strict constraints.",
      result: "Shipped consistent, accessible transitions at scale."
    }
  },
  {
    slug: "arc",
    title: "Arc",
    description: "3D depth & parallax — WebGL-light",
    tags: ["3D", "Parallax"],
    case: {
      problem: "Landing pages felt flat and interchangeable.",
      approach: "Subtle depth, parallax layers, and masked reveals at 60fps.",
      result: "Brand recall and conversion uplift across campaigns."
    }
  }
];
