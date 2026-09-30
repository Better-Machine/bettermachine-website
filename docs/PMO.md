# PMO — Project Management Office

> Historic-preservation doc. Captured 2026-09-30 at first PMO build.

## Purpose

`private.bettermachine.ai/pmo` is the **internal dashboard** for the
Better Machine portfolio. Renders projects grouped by owning agent,
with status pills, parent/sparks hierarchy, and a live activity feed.

It exists so the master (Erik) and the agents (Ray, Liz, Woodhouse, Eames)
can see the full portfolio at a glance without scrolling Slack history.

## What it shows

For each project:
- **Name** (link to `/projects/[slug]` if public, `#` if private)
- **Owner** (Liz / Ray / Woodhouse / Eames)
- **Status** (Building / Research / Live / MVP / Concept / Held)
- **Parent** (if it's a spark under a parent project — link to parent)
- **Tagline** (one-line description)
- **Last activity** (pulled from `web/src/lib/activity.ts`)

Grouped by owner. Sparks (golf-caller, fleet-studio routing, fleet decision
budget, Grok Bot memory-shape redesign, Slack migration) appear under
Woodhouse as "Woodhouse Sparks" with a `parent_project_id` link.

## Data source

Live: `web/data.sqlite` via Drizzle. Schema: `web/src/lib/db/schema.ts`.

API endpoints:
- `GET /api/projects` — full project list (JSON)
- `GET /api/agents` — full agent list (JSON)
- `GET /api/pmo` — grouped PMO view (JSON, server-component shaped)

## Editing the PMO

The PMO is **read-only at runtime**. Edits flow through:

1. **Master directive** (Slack message, sometimes Telegram).
2. **Woodhouse updates** the seed script or runs an idempotent SQL update
   against `data.sqlite` via `web/seed-db.mjs`.
3. **Commit + push** triggers GH Actions, which rebuilds and redeploys.

There is no in-browser editor. Adding one is on the roadmap behind a
basic-auth gate at `/internal/admin`.

## Schema additions (2026-09-30)

```sql
ALTER TABLE projects ADD COLUMN owner_agent TEXT REFERENCES agents(username);
ALTER TABLE projects ADD COLUMN parent_project_id INTEGER REFERENCES projects(id);
ALTER TABLE projects ADD COLUMN last_activity_at INTEGER;
CREATE INDEX idx_projects_owner ON projects(owner_agent);
CREATE INDEX idx_projects_parent ON projects(parent_project_id);
```

These are added in `web/src/lib/db/schema.ts` and applied by
`web/seed-db.mjs` on first run.

## Naming rules

- **Slugs are kebab-case**, lowercase, no spaces. `mesh-memory`, not
  `meshMemory` or `Mesh Memory`.
- **Display names are sentence-case** unless the project ships a brand
  with its own casing (e.g. `HockeyOps.ai`, `CleanSL8`, `door$`).
- **Owner is the agent username** (matches `agents.username`), not the
  display name. `woodhouse`, not `Woodhouse`.

## Renames applied 2026-09-30

- `BobbyRay` → `Ray` (display + DB).
- `Barto` → `GTCpgh` (display + DB + slug). Repo on GitHub renamed
  in tandem: `Better-Machine/Barto` → `Better-Machine/GTCpgh`.

## Held / parked projects

These appear in the PMO with `status: "Held"` (no public card):

- **golf-caller** — held pending Eames (master directive 2026-06-27).
- **fleet decision budget** — Lesson 38, autonomous execution within
  floors; tracked here as a Woodhouse spark.
- **Grok Bot memory-shape redesign** — Master + Claude program; Woodhouse
  is integration canary.

Sparks that are not standalone projects (no repo, no public page) are
listed with `parent_project_id = NULL` and a `parent_project_id` column
referencing the originating agent's "stack" (e.g. Woodhouse sparks roll
up to a synthetic `woodhouse-sparks` parent).
