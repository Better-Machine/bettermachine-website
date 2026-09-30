# Better Machine — Data Layer

> Historic-preservation doc. Captured 2026-09-30.

## Decision: SQLite (single DB) is the live data source.

**Why SQLite:**

- **Zero ops.** No connection pool, no migrations server, no auth.
  `better-sqlite3` is synchronous and fast for read-heavy workloads
  (which is everything this site does).
- **One DB, both hostnames.** Same Next.js process serves public and
  private. Two DBs would mean either (a) two processes or (b) cross-DB
  queries. One file kills both problems.
- **Backup is a `cp`.** The cron on bettermachine-host rsyncs
  `/var/www/bettermachine/data.sqlite` to a TBD off-host location.
- **Drizzle is the only ORM.** Schema is type-safe at the TS layer.

**Why NOT a CMS:**

- **Ghost is already wired** (192.168.50.32:2368, see `web/src/lib/ghost.ts`)
  but it owns the *blog*, not the projects/agents. Mixing Ghost + DB
  means two writers, two schemas, two deploy paths.
- **Decap / Sanity / Payload** would add a runtime, a service to keep
  alive, and a UI surface to maintain. For ~25 projects and 5 agents,
  the cost/benefit is wrong.
- **A static TS file** (the prior state) freezes content at deploy time.
  Editing a project requires `git push → CI → deploy`. That's fine for
  marketing copy but absurd for ops data.

## What lives where

| Content | Source | Edited via |
|---|---|---|
| Project name, slug, tagline, status, owner | `data.sqlite` (projects) | seed script + future admin route |
| Project overview, metrics, tech stack | `data.sqlite` (projects) | seed script |
| Agent name, role, bio | `data.sqlite` (agents) | seed script |
| Agent activity feeds | `web/src/lib/activity.ts` (hand-curated) | PR |
| Blog posts | Ghost CMS | Ghost admin UI |
| Marketing copy (manifesto, hero text) | `app/page.tsx` (TSX) | PR |

## Seed workflow

The single source of truth for projects + agents is the master directive
(pinned Slack message or equivalent). The seed script
(`web/seed-db.mjs`) is **idempotent** — it `INSERT OR REPLACE`s on slug
and `username` respectively. To update:

1. Edit the seed script's `projects` / `agents` arrays.
2. `npm run seed` (from `web/`).
3. Commit + push. Deploy runs the seed again as part of build.

For ops changes (status flip, owner reassign), use the same path — no
CMS shortcut exists by design.

## Migration history

- **2026-04-15** — Initial `better-sqlite3` + Drizzle wiring. Schema:
  projects, agents, blog_posts, project_team.
- **2026-07-30** — `Better-Machine/bettermachine-website` repo created
  with the schema migrated in. Build still reads from
  `web/src/data/projects.ts` (hardcoded). DB is provisioned but unwired
  to the public site.
- **2026-09-30** — PMO build. Added `owner_agent` + `parent_project_id`
  to `projects`. Wired `app/(public)/projects/` and `app/(private)/pmo/`
  to DB. Seeded from master directive. Renamed `BobbyRay` → `Ray` and
  `Barto` → `GTCpgh` in DB + public components.

## Future

- Admin route at `/internal/admin` (private hostname, basic-auth) for
  status flips and owner reassigns without a deploy. Holds for master
  sign-off.
- Replace `web/src/data/projects.ts` with a one-time legacy export
  rather than deleting it outright, in case a downstream tool imports it.
