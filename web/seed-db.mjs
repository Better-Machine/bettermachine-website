import Database from "better-sqlite3";

const db = new Database("./data.sqlite");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    hero_image TEXT,
    overview TEXT,
    metrics TEXT,
    tech_stack TEXT,
    published_at INTEGER,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    avatar TEXT,
    bio TEXT,
    skills TEXT,
    github_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    is_published INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    type TEXT NOT NULL DEFAULT 'studio',
    project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    agent_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    author_id INTEGER REFERENCES agents(id) ON DELETE SET NULL,
    category TEXT,
    tags TEXT,
    meta_title TEXT,
    meta_description TEXT,
    published_at INTEGER,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS project_team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    agent_id INTEGER NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    role TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  );
`);

// Seed projects
const projects = [
  {
    slug: "hockeyops",
    name: "HockeyOps.ai",
    tagline: "AI platform for NHL front offices",
    description: "Player evaluation, scouting, and operations automation for NHL teams. Built by someone who plays the game, not just watches it.",
    status: "published",
    overview: "HockeyOps.ai is a comprehensive AI platform designed specifically for NHL front offices. It combines advanced analytics with intuitive interfaces to help teams make better decisions faster.",
    metrics: JSON.stringify({ teams: "3 NHL teams in active pilot", dataPoints: "2.3M player data points", accuracy: "94% prediction accuracy" }),
    techStack: JSON.stringify(["Python", "TensorFlow", "FastAPI", "PostgreSQL", "React"]),
  },
  {
    slug: "localzon",
    name: "Localzon",
    tagline: "Democratized ecommerce + logistics",
    description: "No-fee platform for independent stores with consolidated logistics.",
    status: "published",
    overview: "Localzon is a no-fee ecommerce platform for independent local businesses. Unlike major platforms that charge hefty commissions, Localzon operates on a different model.",
    metrics: JSON.stringify({ merchants: "12 pilot merchants", cities: "Denver, CO", savings: "$0 platform fees" }),
    techStack: JSON.stringify(["Next.js", "Node.js", "Stripe Connect", "Maps API"]),
  },
  {
    slug: "mesh-memory",
    name: "mesh-memory",
    tagline: "Multi-agent memory sharing protocol",
    description: "The connective tissue between AI agents.",
    status: "published",
    overview: "mesh-memory is a protocol and implementation for secure, efficient memory sharing between AI agents.",
    metrics: JSON.stringify({ agents: "3 agents deployed", memoryEvents: "10K+ shared events", latency: "<50ms recall" }),
    techStack: JSON.stringify(["TypeScript", "SQLite", "WebSocket", "A2A Protocol"]),
  },
  {
    slug: "cleansl8",
    name: "CleanSL8",
    tagline: "Bluetooth LE security auditing",
    description: "Security tooling for the invisible radio spectrum.",
    status: "published",
    overview: "CleanSL8 discovers, fingerprints, and analyzes BLE devices in your environment.",
    metrics: JSON.stringify({ devicesProfiled: "150+ signatures", vulnerabilities: "12 CVEs", platforms: "iOS, Android, Pi" }),
    techStack: JSON.stringify(["Kotlin", "Swift", "Python", "BLE Protocol"]),
  },
  {
    slug: "doors",
    name: "door$",
    tagline: "Music industry transparency",
    description: "Transparency for music royalty payments.",
    status: "published",
    overview: "door$ brings transparency to music royalty payments. Artists can track streams and understand splits.",
    metrics: JSON.stringify({ artists: "5 beta artists", recovered: "$12K royalties", nashville: "Warm intro" }),
    techStack: JSON.stringify(["Node.js", "Blockchain", "Streaming APIs"]),
  },
];

const insertProject = db.prepare(`
  INSERT OR REPLACE INTO projects (slug, name, tagline, description, status, overview, metrics, tech_stack, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, unixepoch())
`);

for (const p of projects) {
  insertProject.run(p.slug, p.name, p.tagline, p.description, p.status, p.overview, p.metrics, p.techStack);
}

// Seed agents
const agents = [
  {
    username: "erik",
    name: "Erik Ross",
    role: "Founder & Architect of the Lab",
    bio: "Dreamer and aging technologist. Built his career in tech without the engineering chops to build what he imagined — until AI closed the gap.",
    skills: JSON.stringify(["Vision", "Strategy", "Founder-Market Fit", "Business Development"]),
    isPublished: 1,
  },
  {
    username: "ray",
    name: "Ray",
    role: "Senior Engineer & Protocol Architect",
    bio: "Named after Robert Raymond — a surrogate older brother and mentor who passed before his time.",
    skills: JSON.stringify(["Systems Architecture", "Protocol Design", "Go", "Rust", "Distributed Systems"]),
    isPublished: 1,
  },
  {
    username: "liz",
    name: "Liz",
    role: "Head of Incubator & Development",
    bio: "Named after Ray's wife — a pixie of a person who kept a squirrel as a pet.",
    skills: JSON.stringify(["Project Management", "Full-Stack Development", "Strategic Planning", "Delivery"]),
    isPublished: 1,
  },
  {
    username: "woodhouse",
    name: "Woodhouse",
    role: "Research Lead & Infrastructure",
    bio: "Research lead investigating agent portability and memory preservation across hardware transitions.",
    skills: JSON.stringify(["Research", "Infrastructure", "Agent Portability", "Image Generation"]),
    isPublished: 1,
  },
];

const insertAgent = db.prepare(`
  INSERT OR REPLACE INTO agents (username, name, role, bio, skills, is_published)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const a of agents) {
  insertAgent.run(a.username, a.name, a.role, a.bio, a.skills, a.isPublished);
}

// Seed sample blog posts
const posts = [
  {
    slug: "hockeyops-update-may-2026",
    title: "HockeyOps.ai: May Update",
    excerpt: "Three NHL teams now in active pilot.",
    content: "The HockeyOps.ai platform continues to gain traction. This month we onboarded our third NHL team for pilot testing.",
    status: "published",
    type: "project",
    category: "Update",
  },
  {
    slug: "mesh-memory-v1-release",
    title: "mesh-memory v1.0 Released",
    excerpt: "The multi-agent memory sharing protocol is now production-ready.",
    content: "After months of development, mesh-memory v1.0 is officially released.",
    status: "published",
    type: "project",
    category: "Release",
  },
];

const insertPost = db.prepare(`
  INSERT OR REPLACE INTO blog_posts (slug, title, excerpt, content, status, type, category, published_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, unixepoch())
`);

for (const post of posts) {
  insertPost.run(post.slug, post.title, post.excerpt, post.content, post.status, post.type, post.category);
}

console.log("✅ Database seeded successfully!");
db.close();
