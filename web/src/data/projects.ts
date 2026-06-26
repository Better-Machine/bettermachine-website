// Single source of truth for project data.
// Used by: /web/src/components/Projects.tsx (card grid + inline detail),
//          /web/src/app/projects/[slug]/page.tsx (legacy route — will be removed).

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string; // for the card grid
  overview: string; // for the detail panel
  status: "Building" | "Research" | "Live" | "MVP" | "Concept";
  tags: string[];
  githubUrl?: string;
  team: string[];
  metrics?: { label: string; value: string }[];
  gradient: string;
  blogPosts?: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    authorName: string;
  }>;
};

export const projects: Project[] = [
  {
    slug: "hockeyops",
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    shortDescription:
      "An AI platform for NHL front offices — player evaluation, scouting, ops automation. Built by someone who plays the game, not just watches it. Co-founded with Felix D. Ross, because the best teams are built by people who know the ice.",
    overview:
      "HockeyOps.ai brings AI-powered analytics to NHL front offices. We combine computer vision, statistical modeling, and domain expertise from inside the game to deliver insights that matter.",
    status: "Building",
    tags: ["Sports", "AI", "Analytics"],
    githubUrl: "https://github.com/Better-Machine/hockeyops",
    team: ["Erik Ross", "Felix D. Ross"],
    metrics: [
      { label: "Status", value: "Private Beta" },
      { label: "Target", value: "NHL Teams" },
    ],
    gradient: "from-copper/20 to-copper-light/10",
  },
  {
    slug: "localzon",
    name: "Localzon",
    tagline: "Democratized local commerce",
    shortDescription:
      "Ecommerce, reimagined. Built by someone who got his start in online retail and knows where the bodies are buried. No-fee platform for independent stores with consolidated logistics.",
    overview:
      "Localzon is building the infrastructure for local commerce — connecting independent retailers with customers through a unified platform that respects margins and simplifies logistics.",
    status: "Research",
    tags: ["Commerce", "Logistics", "Local"],
    // githubUrl: private — no public button
    team: ["Erik Ross"],
    metrics: [
      { label: "Launch City", value: "Denver, CO" },
      { label: "Model", value: "Zero-fee" },
    ],
    gradient: "from-copper/10 to-silver/10",
  },
  {
    slug: "mesh-memory",
    name: "mesh-memory",
    tagline: "Memory infrastructure for AI agents",
    shortDescription:
      "Multi-agent memory layer with shared knowledge graphs and secure collaboration protocols. The memory system powering Ray, Liz, and Woodhouse.",
    overview:
      "mesh-memory is the shared brain powering Better Machine's agent fleet. It provides persistent memory, knowledge graphs, and secure collaboration protocols for multi-agent systems.",
    status: "Live",
    tags: ["AI", "Infrastructure", "Open Source"],
    githubUrl: "https://github.com/Better-Machine/mesh-memory",
    team: ["Ray", "Liz", "Woodhouse"],
    metrics: [
      { label: "Status", value: "Production" },
      { label: "Agents", value: "3 Active" },
    ],
    gradient: "from-charcoal to-void",
    blogPosts: [
      {
        slug: "mesh-memory-launch",
        title: "mesh-memory Goes Live",
        excerpt:
          "The shared memory system powering our agent fleet is now production-ready. Here's what we built and why it matters.",
        category: "Infrastructure",
        publishedAt: "2026-05-15",
        authorName: "Liz",
      },
    ],
  },
  {
    slug: "cleansl8",
    name: "CleanSL8",
    tagline: "BLE security for the real world",
    shortDescription:
      "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
    overview:
      "CleanSL8 provides BLE device detection and analysis for security professionals. Built for real-world auditing scenarios with mobile-first architecture.",
    status: "MVP",
    tags: ["Security", "IoT", "Hardware"],
    // githubUrl: private — no public button
    team: ["Christian", "Erik Ross"],
    metrics: [
      { label: "Platform", value: "iOS / Android" },
      { label: "Focus", value: "Security Audit" },
    ],
    gradient: "from-copper/30 to-void",
  },
  {
    slug: "doors",
    name: "door$",
    tagline: "Direct monetization for musicians",
    shortDescription:
      "The music industry is broken. We know because we've been in it. door$ is what happens when a recovering musician decides to fix the thing that nearly broke him.",
    overview:
      "door$ enables musicians to monetize directly from their audience — no labels, no middlemen, no predatory contracts. Just fans supporting the artists they love.",
    status: "Concept",
    tags: ["Music", "Creator Economy", "Direct"],
    githubUrl: "https://github.com/Better-Machine/door-s",
    team: ["Erik Ross"],
    metrics: [
      { label: "Target", value: "Indie Artists" },
      { label: "Model", value: "Direct Fan" },
    ],
    gradient: "from-copper-light/20 to-copper/10",
  },
];

export const statusConfig: Record<
  Project["status"],
  { bg: string; text: string; dot: string }
> = {
  Building: { bg: "bg-copper/20", text: "text-copper", dot: "bg-copper" },
  Research: { bg: "bg-silver/20", text: "text-silver", dot: "bg-silver" },
  Live: { bg: "bg-green-500/20", text: "text-green-400", dot: "bg-green-400" },
  MVP: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  Concept: { bg: "bg-purple-500/20", text: "text-purple-400", dot: "bg-purple-400" },
};
