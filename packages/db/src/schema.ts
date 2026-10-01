import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

// Projects table
export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  heroImage: text("hero_image"),
  overview: text("overview"),
  metrics: text("metrics"),
  techStack: text("tech_stack"),
  // PMO fields (added 2026-10-01)
  ownerAgent: text("owner_agent").references(() => agents.username),
  parentProjectId: integer("parent_project_id"),
  lastActivityAt: integer("last_activity_at", { mode: "timestamp" }),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(true),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Project images/gallery
export const projectImages = sqliteTable("project_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption"),
  order: integer("order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Agents table
export const agents = sqliteTable("agents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  skills: text("skills"),
  githubUrl: text("github_url"),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  isPublished: integer("is_published", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Agent gallery images
export const agentImages = sqliteTable("agent_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agentId: integer("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  caption: text("caption"),
  order: integer("order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Blog posts
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  status: text("status").notNull().default("draft"),
  type: text("type").notNull().default("studio"),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "set null" }),
  agentId: integer("agent_id").references(() => agents.id, { onDelete: "set null" }),
  authorId: integer("author_id").references(() => agents.id, { onDelete: "set null" }),
  category: text("category"),
  tags: text("tags"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Project team relationships
export const projectTeam = sqliteTable("project_team", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  agentId: integer("agent_id").notNull().references(() => agents.id, { onDelete: "cascade" }),
  role: text("role"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Media assets
export const mediaAssets = sqliteTable("media_assets", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size"),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt"),
  tags: text("tags"),
  uploadedBy: integer("uploaded_by").references(() => agents.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Audit log — tracks every /internal/admin edit (added 2026-10-01)
export const auditLog = sqliteTable("audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actor: text("actor").notNull(),              // username or "system"
  entity: text("entity").notNull(),            // "projects" | "agents"
  entityId: integer("entity_id").notNull(),
  action: text("action").notNull(),            // "create" | "update" | "delete"
  changes: text("changes"),                    // JSON: { field: { before, after } }
  ip: text("ip"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});

// Relations
export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
  posts: many(blogPosts),
  team: many(projectTeam),
}));

export const agentsRelations = relations(agents, ({ many }) => ({
  images: many(agentImages),
  posts: many(blogPosts),
  projects: many(projectTeam),
}));

export const blogPostsRelation = relations(blogPosts, ({ one }) => ({
  project: one(projects, {
    fields: [blogPosts.projectId],
    references: [projects.id],
  }),
  agent: one(agents, {
    fields: [blogPosts.agentId],
    references: [agents.id],
  }),
  author: one(agents, {
    fields: [blogPosts.authorId],
    references: [agents.id],
  }),
}));
