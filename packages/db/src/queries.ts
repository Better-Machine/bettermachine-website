import { db } from ".";
import { projects, agents, projectTeam, auditLog } from "./schema";
import { eq, desc, sql } from "drizzle-orm";

export interface ProjectRow {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  status: string;
  heroImage: string | null;
  overview: string | null;
  metrics: string | null;
  techStack: string | null;
  ownerAgent: string | null;
  parentProjectId: number | null;
  lastActivityAt: Date | null;
  isPublic: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentRow {
  id: number;
  username: string;
  name: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  skills: string | null;
  githubUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Public — only isPublic projects
export async function getPublicProjects(): Promise<ProjectRow[]> {
  return db
    .select()
    .from(projects)
    .where(eq(projects.isPublic, true))
    .orderBy(desc(projects.publishedAt))
    .all() as ProjectRow[];
}

export async function getPublicProjectBySlug(slug: string): Promise<ProjectRow | null> {
  const rows = db
    .select()
    .from(projects)
    .where(sql`${projects.slug} = ${slug} AND ${projects.isPublic} = 1`)
    .all() as ProjectRow[];
  return rows[0] ?? null;
}

// Agents
export async function getPublishedAgents(): Promise<AgentRow[]> {
  return db
    .select()
    .from(agents)
    .where(eq(agents.isPublished, true))
    .orderBy(agents.username)
    .all() as AgentRow[];
}

export async function getAgentByUsername(username: string): Promise<AgentRow | null> {
  const rows = db
    .select()
    .from(agents)
    .where(eq(agents.username, username))
    .all() as AgentRow[];
  return rows[0] ?? null;
}

// PMO — all projects, grouped by owner
export async function getPmoView() {
  const allProjects = db.select().from(projects).orderBy(projects.ownerAgent, projects.name).all() as ProjectRow[];
  const allAgents = db.select().from(agents).all() as AgentRow[];

  const byOwner: Record<string, ProjectRow[]> = {};
  for (const p of allProjects) {
    const owner = p.ownerAgent || "unassigned";
    if (!byOwner[owner]) byOwner[owner] = [];
    byOwner[owner].push(p);
  }

  return { byOwner, agents: allAgents };
}

// Admin — full CRUD
export async function getAllProjects(): Promise<ProjectRow[]> {
  return db.select().from(projects).orderBy(projects.name).all() as ProjectRow[];
}

export async function getAllAgents(): Promise<AgentRow[]> {
  return db.select().from(agents).orderBy(agents.username).all() as AgentRow[];
}

export async function getProjectById(id: number): Promise<ProjectRow | null> {
  const rows = db.select().from(projects).where(eq(projects.id, id)).all() as ProjectRow[];
  return rows[0] ?? null;
}

export async function updateProject(id: number, patch: Partial<ProjectRow>, actor: string, ip?: string) {
  const before = await getProjectById(id);
  if (!before) throw new Error(`Project ${id} not found`);

  const updated = { ...patch, updatedAt: new Date(), lastActivityAt: new Date() };
  db.update(projects).set(updated).where(eq(projects.id, id)).run();

  await logAudit({
    actor,
    entity: "projects",
    entityId: id,
    action: "update",
    changes: diff(before, patch),
    ip,
  });

  return getProjectById(id);
}

export async function createProject(data: Omit<ProjectRow, "id" | "createdAt" | "updatedAt">, actor: string, ip?: string) {
  const inserted = db.insert(projects).values({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActivityAt: new Date(),
  } as any).returning().all() as ProjectRow[];

  await logAudit({
    actor,
    entity: "projects",
    entityId: inserted[0].id,
    action: "create",
    changes: { created: data },
    ip,
  });

  return inserted[0];
}

export async function updateAgent(id: number, patch: Partial<AgentRow>, actor: string, ip?: string) {
  const before = db.select().from(agents).where(eq(agents.id, id)).all() as AgentRow[];
  if (!before[0]) throw new Error(`Agent ${id} not found`);

  const updated = { ...patch, updatedAt: new Date() };
  db.update(agents).set(updated).where(eq(agents.id, id)).run();

  await logAudit({
    actor,
    entity: "agents",
    entityId: id,
    action: "update",
    changes: diff(before[0], patch),
    ip,
  });

  const after = db.select().from(agents).where(eq(agents.id, id)).all() as AgentRow[];
  return after[0];
}

export async function logAudit(entry: {
  actor: string;
  entity: string;
  entityId: number;
  action: string;
  changes?: any;
  ip?: string;
}) {
  db.insert(auditLog).values({
    actor: entry.actor,
    entity: entry.entity,
    entityId: entry.entityId,
    action: entry.action,
    changes: entry.changes ? JSON.stringify(entry.changes) : null,
    ip: entry.ip ?? null,
    createdAt: new Date(),
  } as any).run();
}

export async function getAuditLog(limit = 50) {
  return db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(limit).all();
}

function diff(before: any, patch: any): Record<string, { before: any; after: any }> {
  const out: Record<string, { before: any; after: any }> = {};
  for (const k of Object.keys(patch)) {
    if (JSON.stringify(before[k]) !== JSON.stringify(patch[k])) {
      out[k] = { before: before[k], after: patch[k] };
    }
  }
  return out;
}
