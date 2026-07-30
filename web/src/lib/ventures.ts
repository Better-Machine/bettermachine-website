// Venture data shared across project pages
export interface Venture {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  market: string;
  status: string;
  github?: string;
  website?: string;
  founder: string;
  tech: string[];
  highlights: string[];
}

export const ventures: Record<string, Venture> = {
  hockeyops: {
    slug: "hockeyops",
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    description:
      "A comprehensive AI platform for professional hockey operations — player evaluation, scouting automation, contract analysis, and roster optimization. Built by someone who plays the game and understands the front office.",
    problem:
      "NHL front offices still rely on spreadsheets, tribal knowledge, and manual scouting reports. The best data exists in silos — video, tracking, biometrics — and no single tool synthesizes them into actionable decisions.",
    solution:
      "An AI-native platform that ingests multi-modal hockey data (video, tracking, biometrics, contract history) and produces standardized evaluations, trade comparables, and roster optimization recommendations. Built on agentic workflows that reduce a GM's scouting workload by 70%.",
    market: "32 NHL front offices + 30 AHL affiliates + 500+ D1 programs",
    status: "In Development",
    founder: "Erik Ross",
    tech: ["AI Agents", "Video Analysis", "Statistical Modeling", "Rust", "Go"],
    highlights: [
      "Agentic evaluation pipeline (draft, trade, free agency)",
      "Multi-modal data ingestion (video + tracking + biometrics)",
      "Built by an insider who plays the game",
      "Co-founded with Felix Ross (50% owner, former NHL prospect)",
    ],
  },
  localzon: {
    slug: "localzon",
    name: "Localzon",
    tagline: "Private project",
    description:
      "A private platform project leveraging AI to solve real problems in local commerce and community services.",
    problem:
      "Local businesses are underserved by technology — stuck between expensive enterprise solutions and unusable consumer apps.",
    solution:
      "A lightweight, AI-powered platform designed for local businesses that need powerful tools without the complexity. Private project — more details when it's ready.",
    market: "Local commerce",
    status: "Private",
    founder: "Erik Ross",
    tech: ["AI Agents", "Local Commerce", "SaaS"],
    highlights: [
      "Private project — details under embargo",
      "AI-native approach to local commerce",
      "Built on the Better Machine incubator model",
    ],
  },
  doors: {
    slug: "door-s",
    name: "door$",
    tagline: "Music industry infrastructure, rebuilt",
    description:
      "A platform that modernizes the music industry's revenue infrastructure — from master rights management to royalty distribution. Built on Erik's lived experience as a recovering musician and recording artist.",
    problem:
      "Music revenue flows through opaque intermediaries. Artists lose 40-60% of their revenue to inefficient rights management, delayed royalty payments, and fragmented distribution channels. The masters recording industry — including Erik's own — sit idle because the infrastructure to monetize them is broken.",
    solution:
      "An AI-powered platform that automates rights identification, royalty calculation, and revenue distribution across streaming, sync, and physical media. Direct-to-artist payout, transparent accounting, and AI-powered rights discovery.",
    market: "150M+ active music listeners, $35B global recorded music industry",
    status: "Planning",
    founder: "Erik Ross",
    tech: ["AI Agents", "Blockchain", "Rights Management", "Node.js"],
    highlights: [
      "Founder is a recording artist (lived the problem)",
      "Blackbird Studios (Nashville) connection for master digitization",
      "Warm intro to Nashville music ecosystem for GTM",
      "Revenue model: take rate on processed royalties",
    ],
  },
  "mesh-memory": {
    slug: "mesh-memory",
    name: "mesh-memory",
    tagline: "Federated agent memory infrastructure",
    description:
      "An open-source, federated memory system for AI agents — enabling persistent, cross-agent knowledge sharing with built-in fact/interpretation separation and privacy controls.",
    problem:
      "AI agents are isolated. Each session starts from zero. There's no way for agents to share learned facts, maintain project context, or preserve institutional knowledge across sessions and hardware. This is a fundamental bottleneck for multi-agent systems.",
    solution:
      "A SQLite-based temporal knowledge graph with verbatim + semantic search, federated P2P sync, and architectural fact/interpretation separation. Each agent owns its palace (identity, critical facts, deep memory); shared memory flows through narrow, purpose-built tunnels.",
    market: "All AI agent developers, multi-agent fleets, autonomous systems",
    status: "In Development",
    founder: "Erik Ross / Better Machine agents",
    tech: ["SQLite", "TypeScript", "P2P Networking", "Temporal KG"],
    github: "https://github.com/Better-Machine/mesh-memory",
    highlights: [
      "Production quality — full test suite, QA reports, ADRs",
      "Federated architecture — each agent runs its own receiver",
      "Architectural fact/interpretation separation",
      "Eames pipeline dogfood: real QA on real code",
    ],
  },
  "agentcy-services": {
    slug: "agentcy-services",
    name: "Agentcy.services",
    tagline: "Agentic AI as infrastructure",
    description:
      "A platform that operationalizes AI agents as production infrastructure — not chatbots, but autonomous systems with real responsibilities. Named after Ray and Liz: a partnership forged under fire.",
    problem:
      "Most AI deployments treat agents as conversational assistants. The real opportunity is autonomous systems that own outcomes — not prompts, but production-grade infrastructure with SLAs, observability, and accountability.",
    solution:
      "Agentcy.services provides the operational layer for production AI agents: session management, A2A communication, persistent identity, observability, and governance. It's the difference between a chatbot and an employee.",
    market: "Organizations deploying multiple AI agents",
    status: "In Development",
    founder: "Erik Ross / Better Machine agents",
    tech: ["TypeScript", "Node.js", "A2A Protocol", "Observability"],
    highlights: [
      "Named after real people — Ray and Liz",
      "Production-grade agent infrastructure",
      "A2A communication protocol",
      "Ownership model: agents own outcomes, not just inputs",
    ],
  },
};

export function getVenture(slug: string): Venture | null {
  return ventures[slug] || null;
}

export function getAllVentures(): Venture[] {
  return Object.values(ventures);
}
