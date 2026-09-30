// Idempotent seed script — INSERT OR REPLACE on slug / username.
// Run with: `npm run seed` from web/.
//
// Source of truth: master directive 2026-09-30 08:43 EDT.

import { db } from ".";
import { projects, agents, projectTeam, blogPosts } from "./schema";
import { sql } from "drizzle-orm";

// --- Schema migration: add PMO columns if missing ---
function migrate() {
  const sqlite = (db.$client as unknown) as import("better-sqlite3").Database;
  const cols = sqlite.prepare("PRAGMA table_info(projects)").all() as Array<{ name: string }>;
  const have = new Set(cols.map((c) => c.name));
  if (!have.has("owner_agent")) {
    sqlite.exec("ALTER TABLE projects ADD COLUMN owner_agent TEXT");
  }
  if (!have.has("parent_project_id")) {
    sqlite.exec("ALTER TABLE projects ADD COLUMN parent_project_id INTEGER REFERENCES projects(id)");
  }
  if (!have.has("last_activity_at")) {
    sqlite.exec("ALTER TABLE projects ADD COLUMN last_activity_at INTEGER");
  }
  sqlite.exec("CREATE INDEX IF NOT EXISTS idx_projects_owner ON projects(owner_agent)");
  sqlite.exec("CREATE INDEX IF NOT EXISTS idx_projects_parent ON projects(parent_project_id)");
}

// --- Master directive data ---
// (Some private sparks do not have public-facing pages. They live in the
// DB for the PMO but are excluded from public card grids by `isPublished`
// or by not having a public slug route.)

const AGENTS = [
  { username: "liz",       name: "Liz",       role: "Head of Incubator & Development",  isPublished: 1 },
  { username: "ray",       name: "Ray",       role: "System Architect & Commerce Lead", isPublished: 1 },
  { username: "woodhouse", name: "Woodhouse", role: "Research Lead & Infrastructure",   isPublished: 1 },
  { username: "eames",     name: "Eames",     role: "Continuous Code Review & Improvement", isPublished: 0 }, // not yet public
  { username: "erik",      name: "Erik Ross", role: "Founder & Architect of the Lab",    isPublished: 1 },
];

const PROJECTS: Array<{
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "published" | "draft" | "held" | "research" | "concept";
  owner: string | null;
  parentSlug?: string;
  overview?: string;
  tags?: string[];
}> = [
  // ---- Liz ----
  { slug: "vigil",        name: "Vigil",              owner: "liz", status: "research",
    tagline: "AI home-network defense on the Jetson Nano",
    description: "Liz's project. Single appliance on Jetson Nano (192.168.50.33)." },
  { slug: "mesh-memory",  name: "mesh-memory",        owner: "liz", status: "published",
    tagline: "Federated agent memory infrastructure",
    description: "Multi-agent memory layer powering the BM fleet.",
    overview: "Open-source, federated memory system for AI agents. Persistent, cross-agent knowledge sharing with fact/interpretation separation and privacy controls.",
    tags: ["AI", "Infrastructure", "Open Source"] },
  { slug: "cleansl8",     name: "CleanSL8",           owner: "liz", status: "published",
    tagline: "BLE security for the real world",
    description: "Detect and analyze Bluetooth Low Energy devices for security auditing and research.",
    tags: ["Security", "IoT", "Hardware"] },
  { slug: "eames",        name: "Eames",              owner: "liz", status: "research",
    tagline: "Back-of-house dev team, agent-led",
    description: "Eames readiness is Liz's critical path. Status pending operational readiness." },
  { slug: "palace-mvp",   name: "Palace-MVP",         owner: "liz", status: "research",
    tagline: "Liz's palace-bootstrap, mesh-memory v2-rebuild lineage",
    description: "Liz's project. Local-only artifact at projects/palace-mvp/agent-passport.json." },

  // ---- Ray ----
  { slug: "gtcpgh",       name: "GTCpgh",             owner: "ray", status: "concept",
    tagline: "Pittsburgh commerce platform (was 'Barto')",
    description: "Renamed 2026-09-30. Better-Machine/GTCpgh repo." },
  { slug: "agentcy-services", name: "Agentcy.services", owner: "ray", status: "research",
    tagline: "Identity, trust, and coordination infrastructure for agent networks",
    description: "Building in public. Better-Machine/Agentcy-services." },
  { slug: "door-s",       name: "door$",              owner: "ray", status: "concept",
    tagline: "Direct monetization for musicians",
    description: "Cheapest POC of the door-s platform. Brief authored 2026-09-28." },
  { slug: "extrusion-supplies", name: "Extrusion Supplies", owner: "ray", status: "draft",
    tagline: "Tom Nentwick's Wix site rebuild",
    description: "Better-Machine/extrusionsupplies. Hostinger deploy in progress since 2026-06-27.",
    tags: ["Commerce", "Manufacturing"] },
  { slug: "hockeyops",    name: "HockeyOps.ai",       owner: "ray", status: "published",
    tagline: "AI platform for NHL front offices",
    description: "Player evaluation, scouting, ops automation. Co-founded with Felix D. Ross.",
    overview: "Comprehensive AI platform for professional hockey operations — player evaluation, scouting automation, contract analysis, and roster optimization.",
    tags: ["Sports", "AI", "Analytics"] },

  // ---- Woodhouse ----
  { slug: "agent-shared", name: "agent-shared",       owner: "woodhouse", status: "published",
    tagline: "Mesh standards and shared skills",
    description: "Repo: Kosfootel/agent-shared. Cross-agent skills, standards, promptkit." },

  // ---- Woodhouse sparks (held / in-flight) ----
  { slug: "spark-fleet-studio", name: "fleet-studio routing", owner: "woodhouse", status: "held",
    tagline: "Routing rule for the M3 Ultra (DeepSeek-V4-Flash)",
    description: "Routing-rule brief authored 2026-09-22; pending Claude review." },
  { slug: "spark-golf-caller",  name: "golf-caller",            owner: "woodhouse", status: "held",
    tagline: "Foursome coordinator (held pending Eames)",
    description: "Master directive 2026-06-27 14:40 EDT: defer until Eames is in place." },
  { slug: "spark-research-collab", name: "research-collab",   owner: "woodhouse", status: "held",
    tagline: "Dormant since 2026-06-12",
    description: "4 research files in projects/research-collab/. No follow-up." },
  { slug: "spark-decision-budget", name: "Fleet Decision Budget", owner: "woodhouse", status: "research",
    tagline: "Autonomy contract: $25/$100 floors, Layer 1/2/3",
    description: "Lesson 38. Operational since 2026-09-17. Awaiting master sign-off on public git push." },
  { slug: "spark-grok-redesign", name: "Grok Bot memory-shape redesign", owner: "woodhouse", status: "research",
    tagline: "Master + Claude program, Woodhouse as integration canary",
    description: "Lossless-claw + mesh-memory + fleet-kb reshape. Active architectural program." },
  { slug: "spark-slack-migration", name: "Slack migration", owner: "woodhouse", status: "research",
    tagline: "Workspace stood up 2026-09-22; master's call pending",
    description: "Telegram → Slack migration in design phase." },

  // ---- Eames (project-as-owner) ----
  { slug: "eames-continuous-review", name: "Eames: Continuous Code Review", owner: "eames", status: "draft",
    tagline: "Eames owns this; ship when ready",
    description: "Per master directive 2026-09-30: Eames is a project owner, not just a worker." },
];

async function seed() {
  console.log("🌱 Seeding database (master directive 2026-09-30 08:43 EDT)...");
  migrate();
  console.log("  → migration applied (owner_agent, parent_project_id, last_activity_at)");

  // --- Agents ---
  for (const a of AGENTS) {
    await db.insert(agents).values({
      username: a.username,
      name: a.name,
      role: a.role,
      isPublished: a.isPublished === 1,
    }).onConflictDoUpdate({
      target: agents.username,
      set: { name: a.name, role: a.role, isPublished: a.isPublished === 1 },
    });
  }
  console.log(`  → ${AGENTS.length} agents upserted`);

  // --- Projects (two passes: first create all so parents can resolve, then re-update parent_project_id) ---
  for (const p of PROJECTS) {
    await db.insert(projects).values({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      overview: p.overview ?? null,
      status: p.status,
      ownerAgent: p.owner,
    }).onConflictDoUpdate({
      target: projects.slug,
      set: {
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        overview: p.overview ?? null,
        status: p.status,
        ownerAgent: p.owner,
        updatedAt: new Date(),
      },
    });
  }
  console.log(`  → ${PROJECTS.length} projects upserted`);

  // --- Resolve parent_project_id ---
  const allProjects = await db.select().from(projects);
  const slugToId = new Map(allProjects.map((p) => [p.slug, p.id]));
  for (const p of PROJECTS) {
    if (!p.parentSlug) continue;
    const parentId = slugToId.get(p.parentSlug);
    if (!parentId) {
      console.warn(`  ⚠ parent not found for ${p.slug}: ${p.parentSlug}`);
      continue;
    }
    await db.update(projects)
      .set({ parentProjectId: parentId })
      .where(sql`${projects.slug} = ${p.slug}`);
  }
  console.log("  → parent_project_id resolved");

  // --- Project team (synthetic rollups) ---
  // Wire each project to its owner agent via project_team.
  for (const p of PROJECTS) {
    if (!p.owner) continue;
    const agentIdRow = await db.select().from(agents).where(sql`${agents.username} = ${p.owner}`).limit(1);
    const agentId = agentIdRow[0]?.id;
    if (!agentId) continue;
    const projectId = slugToId.get(p.slug);
    if (!projectId) continue;
    // Idempotent: delete and reinsert to keep unique semantics simple
    await db.delete(projectTeam).where(sql`${projectTeam.projectId} = ${projectId} AND ${projectTeam.agentId} = ${agentId}`);
    await db.insert(projectTeam).values({ projectId, agentId, role: "owner" });
  }
  console.log("  → project_team wired");

  console.log("✅ Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
