// lib/constants.ts
export type Project = {
  slug: string;
  title: string;
  description: string;
  // hot-linked image (no local files)
  cover: string;
  // optional tag line you can surface later
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "ms-trading-platform",
    title: "Wealth Management Trading Platform",
    description:
      "Internal trading app for wealth managers: multi-asset orders, blotter, positions & risk. (Generic description; no proprietary details.)",
    cover: "https://source.unsplash.com/1600x900/?stock,charts,terminal",
    tags: ["FinTech", "React", "TypeScript"],
  },
  {
    slug: "payment-processing",
    title: "Payment Processing",
    description:
      "Card-present & online flows: authorization, capture, refunds, reconciliation dashboards.",
    cover: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Payment_card_reader.jpg",
    tags: ["Payments", "PCI", "APIs"],
  },
  {
    slug: "ecommerce-platform",
    title: "E-commerce Platform",
    description:
      "Catalog, cart, checkout & order tracking with responsive storefront UI.",
    cover: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Laptop_on_a_desk_%28Unsplash%29.jpg",
    tags: ["Storefront", "SSR", "SEO"],
  },
  {
    slug: "image-sharing-app",
    title: "Image Sharing",
    description:
      "Upload, feed, likes & comments with CDN optimization and lazy media.",
    cover: "https://source.unsplash.com/1600x900/?smartphone,camera,photos",
    tags: ["Mobile-first", "CDN", "Media"],
  },
  {
    slug: "data-viz-dashboard",
    title: "Data Visualization Dashboard",
    description:
      "Real-time metrics with accessible tooltips, zoom & pan for dense charts.",
    cover: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Candlesticks.png",
    tags: ["D3/Charting", "A11y"],
  },
  {
    slug: "microservices-platform",
    title: "Microservices Platform",
    description:
      "Service split, contracts, observability and rollout strategies across environments.",
    cover: "https://upload.wikimedia.org/wikipedia/commons/9/90/DHL_Netherlands_local_site_computer_room_wires_-_IMG_3294.jpg",
    tags: ["K8s", "CI/CD", "Observability"],
  },
  {
    slug: "portfolio-experiments",
    title: "Portfolio Experiments",
    description:
      "Cinematic interactions with GSAP / WebGL while preserving performance budgets.",
    cover: "https://source.unsplash.com/1600x900/?web,gsap,animation",
    tags: ["GSAP", "WebGL"],
  },
  {
    slug: "accessibility-upgrades",
    title: "Accessibility Upgrades",
    description:
      "Color-contrast, focus states, semantic roles and keyboard parity across flows.",
    cover: "https://source.unsplash.com/1600x900/?accessibility,ui",
    tags: ["WCAG", "UX"],
  },
];
