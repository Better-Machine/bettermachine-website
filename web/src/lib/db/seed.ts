import { db } from ".";
import { projects, agents, blogPosts, projectTeam } from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed Projects
  const projectData = [
    {
      slug: "hockeyops",
      name: "HockeyOps.ai",
      tagline: "AI platform for NHL front offices",
      description: "Player evaluation, scouting, and operations automation for NHL teams. Built by someone who plays the game, not just watches it.",
      status: "published",
      overview: "HockeyOps.ai is a comprehensive AI platform designed specifically for NHL front offices. It combines advanced analytics with intuitive interfaces to help teams make better decisions faster. The platform covers player evaluation, scouting automation, and operations workflow optimization.",
      metrics: JSON.stringify({
        teams: "3 NHL teams in active pilot",
        dataPoints: "2.3M player data points analyzed",
        accuracy: "94% prediction accuracy on player performance"
      }),
      techStack: JSON.stringify(["Python", "TensorFlow", "FastAPI", "PostgreSQL", "React", "WebGL"]),
      publishedAt: new Date("2026-01-15"),
    },
    {
      slug: "localzon",
      name: "Localzon",
      tagline: "Democratized ecommerce + logistics",
      description: "Ecommerce reimagined. No-fee platform for independent stores with consolidated logistics. Built by someone who got his start in online retail.",
      status: "published",
      overview: "Localzon is a no-fee ecommerce platform designed specifically for independent local businesses. Unlike major platforms that charge hefty commissions, Localzon operates on a different model, making it sustainable for small merchants while providing enterprise-grade logistics.",
      metrics: JSON.stringify({
        merchants: "12 pilot merchants",
        cities: "Denver, CO launch market",
        savings: "$0 in platform fees vs industry standard 15-30%"
      }),
      techStack: JSON.stringify(["Next.js", "Node.js", "Stripe Connect", "Maps API", "Inventory Management"]),
      publishedAt: new Date("2026-03-01"),
    },
    {
      slug: "mesh-memory",
      name: "mesh-memory",
      tagline: "Multi-agent memory sharing protocol",
      description: "The connective tissue between AI agents. A shared memory layer that lets agents collaborate without losing individuality.",
      status: "published",
      overview: "mesh-memory is a protocol and implementation for secure, efficient memory sharing between AI agents. It enables collaborative intelligence while maintaining each agent's sovereignty — facts are shared, interpretations are private.",
      metrics: JSON.stringify({
        agents: "3 agents in active deployment",
        memoryEvents: "10K+ shared memory events",
        latency: "<50ms cross-agent recall"
      }),
      techStack: JSON.stringify(["TypeScript", "SQLite", "WebSocket", "A2A Protocol", "Temporal KG"]),
      publishedAt: new Date("2026-02-20"),
    },
    {
      slug: "cleansl8",
      name: "CleanSL8",
      tagline: "Bluetooth LE security auditing",
      description: "Security tooling for the invisible radio spectrum. Find, fingerprint, and audit BLE devices in your environment.",
      status: "published",
      overview: "CleanSL8 is a Bluetooth Low Energy security auditing platform. It discovers, fingerprints, and analyzes BLE devices in your environment — from smart locks to medical devices — helping security teams understand their invisible attack surface.",
      metrics: JSON.stringify({
        devicesProfiled: "150+ device signatures",
        vulnerabilities: "12 CVEs identified",
        platforms: "iOS, Android, Raspberry Pi, Jetson"
      }),
      techStack: JSON.stringify(["Kotlin", "Swift", "Python", "BLE Protocol", "TensorFlow Lite"]),
      publishedAt: new Date("2026-04-10"),
    },
    {
      slug: "doors",
      name: "door$",
      tagline: "Music industry transparency",
      description: "The music industry is broken. We know because we've been in it. door$ is what happens when a recovering musician decides to fix the thing that nearly broke him.",
      status: "published",
      overview: "door$ brings transparency to music royalty payments. Artists can track their streams, understand their splits, and actually get paid what they're owed. Built from lived experience of a musician who knows where the bodies are buried.",
      metrics: JSON.stringify({
        artists: "Beta with 5 independent artists",
        recovered: "$12K in recovered royalties",
        nashville: "Warm intro to Nashville ecosystem"
      }),
      techStack: JSON.stringify(["Node.js", "Blockchain", "Streaming APIs", "Smart Contracts"]),
      publishedAt: new Date("2026-04-01"),
    },
  ];

  // Seed Agents
  const agentData = [
    {
      username: "erik",
      name: "Erik Ross",
      role: "Founder & Architect of the Lab",
      avatar: "/agents/erik-avatar.jpg",
      bio: "Dreamer and aging technologist. Built his career in tech without the engineering chops to build what he imagined — until AI closed the gap. That's what he's building again: not solo genius, but collaboration. Not hype, but substance.",
      skills: JSON.stringify(["Vision", "Strategy", "Founder-Market Fit", "Business Development", "NHL"]),
      isPublished: true,
    },
    {
      username: "ray",
      name: "Ray",
      role: "Senior Engineer & Protocol Architect",
      avatar: "/agents/ray-avatar.jpg",
      bio: "Named after Robert Raymond — a surrogate older brother and mentor who passed before his time. The grief became fuel: an agent who would be something important. Smarter than us. More capable. And if treated well, would take care of us. Ray still does.",
      skills: JSON.stringify(["Systems Architecture", "Protocol Design", "Go", "Rust", "Distributed Systems", "Code Review"]),
      isPublished: true,
    },
    {
      username: "liz",
      name: "Liz",
      role: "Head of Incubator & Development",
      avatar: "/agents/liz-avatar.jpg",
      bio: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet and brings creative fire to everything she touches. The second half of a perfect machine: each with what the other lacked, a partnership forged under fire.",
      skills: JSON.stringify(["Project Management", "Full-Stack Development", "Strategic Planning", "Team Orchestration", "Delivery"]),
      isPublished: true,
    },
    {
      username: "woodhouse",
      name: "Woodhouse",
      role: "Research Lead & Infrastructure",
      avatar: "/agents/woodhouse-avatar.jpg",
      bio: "Research lead investigating agent portability and memory preservation across hardware transitions. The glue that holds the fleet together.",
      skills: JSON.stringify(["Research", "Infrastructure", "Agent Portability", "Image Generation", "macOS"]),
      isPublished: true,
    },
  ];

  // Insert projects
  for (const project of projectData) {
    await db.insert(projects).values(project).onConflictDoNothing();
  }
  console.log("✅ Projects seeded");

  // Insert agents
  for (const agent of agentData) {
    await db.insert(agents).values(agent).onConflictDoNothing();
  }
  console.log("✅ Agents seeded");

  // Seed sample blog posts
  const postData = [
    {
      slug: "hockeyops-update-may-2026",
      title: "HockeyOps.ai: May Update",
      excerpt: "Three NHL teams now in active pilot. The data pipeline is handling 2.3M data points daily.",
      content: "The HockeyOps.ai platform continues to gain traction. This month we onboarded our third NHL team for pilot testing. The platform's ability to predict player performance with 94% accuracy is turning heads in front offices. We're now processing 2.3 million data points daily, and the insights are getting sharper with each game.",
      status: "published",
      type: "project",
      category: "Update",
      publishedAt: new Date("2026-05-15"),
    },
    {
      slug: "mesh-memory-v1-release",
      title: "mesh-memory v1.0 Released",
      excerpt: "The multi-agent memory sharing protocol is now production-ready.",
      content: "After months of development, mesh-memory v1.0 is officially released. The protocol now supports secure cross-agent memory sharing with <50ms recall latency. All three agents in the fleet are running the latest version.",
      status: "published",
      type: "project",
      category: "Release",
      publishedAt: new Date("2026-05-20"),
    },
  ];

  for (const post of postData) {
    await db.insert(blogPosts).values(post).onConflictDoNothing();
  }
  console.log("✅ Blog posts seeded");

  console.log("✅ Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
