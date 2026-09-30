# Better Machine — Site Architecture

> Historic-preservation doc. Captured 2026-09-30 during the first PMO build.

## Overview

Two Next.js 15 (App Router, Turbopack) sites share a single repo and a single
SQLite database, served from `192.168.50.32:/var/www/bettermachine` and routed
by Cloudflare DNS:

| Hostname | Purpose | Source |
|---|---|---|
| `bettermachine.ai` / `www.bettermachine.ai` | Public marketing site | Cloudflare → Hostinger Node.js env (cached) |
| `private.bettermachine.ai` | Internal dashboard (PMO, agents, ops) | Cloudflare → bettermachine-host (192.168.50.32) |

Both serve the **same Next.js build**. The route group
`app/(private)/` is gated by hostname via `middleware.ts` and 404s on the
public host. The route group `app/(public)/` is open.

## Source layout

```
bettermachine-website/
├── web/                          # Next.js 15 app
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/         # Public routes (open)
│   │   │   │   └── projects/[slug]/page.tsx
│   │   │   ├── (private)/        # Private routes (hostname-gated)
│   │   │   │   └── pmo/page.tsx
│   │   │   ├── agents/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── ventures/[slug]/page.tsx
│   │   │   ├── api/              # API routes
│   │   │   │   ├── contact/route.ts
│   │   │   │   ├── projects/route.ts
│   │   │   │   └── agents/route.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── Projects.tsx      # Public homepage grid (client component)
│   │   │   ├── Agents.tsx        # Public homepage grid (client component)
│   │   │   ├── ProjectDetail.tsx
│   │   │   └── Header.tsx / Footer.tsx
│   │   ├── data/
│   │   │   └── projects.ts       # LEGACY hardcoded data — read at build time only
│   │   ├── lib/
│   │   │   ├── ventures.ts       # LEGACY ventures map
│   │   │   ├── activity.ts       # Hand-curated agent activity feeds
│   │   │   ├── ghost.ts          # Ghost CMS client (192.168.50.32:2368)
│   │   │   └── db/               # Drizzle ORM + SQLite
│   │   │       ├── index.ts
│   │   │       ├── schema.ts
│   │   │       └── seed.ts
│   │   └── data.sqlite           # SQLite DB (gitignored)
│   └── public/                   # Static assets
├── lib/db/                       # Top-level Drizzle schema (legacy mirror)
├── docs/                         # ← you are here
├── DEPLOY.md                     # GH Actions workflow
└── package.json
```

## Data layer

Three coexisting data sources — **only one is authoritative for runtime reads**:

1. **`web/data.sqlite`** (Drizzle / better-sqlite3) — **authoritative**.
   Schema in `web/src/lib/db/schema.ts`. Seed script: `web/seed-db.mjs`
   or `web/src/lib/db/seed.ts` (both exist; the latter uses Drizzle).
2. **`web/src/data/projects.ts`** — legacy hardcoded array. **Build-time
   fallback only**. Public homepage components read from this if the DB
   has zero rows, but in practice the DB is seeded and the array is dead
   code as of 2026-09-30.
3. **`web/src/lib/ventures.ts`** — legacy hardcoded map used by
   `app/projects/[slug]/page.tsx`. Should be deleted; the new
   `app/ventures/[slug]/page.tsx` route reads from the DB.

## Database schema (Drizzle)

See `web/src/lib/db/schema.ts` for the canonical definition. Tables:

- `projects` — slug, name, tagline, description, status, hero_image,
  overview, metrics (JSON), tech_stack (JSON), owner_agent, parent_project_id,
  published_at, created_at, updated_at.
- `agents` — username, name, role, avatar, bio, skills (JSON),
  github_url, twitter_url, linkedin_url, is_published.
- `project_team` — many-to-many between projects and agents with optional role.
- `blog_posts` — slug, title, excerpt, content, featured_image, status,
  type, project_id, agent_id, author_id, published_at.
- `project_images`, `agent_images`, `blog_images` — galleries.
- `contact_submissions` — `/api/contact` writes here.

## Routing

Public route group `app/(public)/` — currently contains `/projects/[slug]`.
Routing is open.

Private route group `app/(private)/` — `/pmo`, future internal tools.
Gated by `middleware.ts`:

```ts
export const config = { matcher: ["/pmo/:path*", "/internal/:path*"] };

const PRIVATE_HOSTS = ["private.bettermachine.ai", "192.168.50.32"];
const PUBLIC_HOSTS = ["bettermachine.ai", "www.bettermachine.ai"];

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  // Private routes on a public host → 404
  if (url.pathname.startsWith("/pmo") || url.pathname.startsWith("/internal")) {
    if (!PRIVATE_HOSTS.some((h) => host.includes(h))) {
      return NextResponse.rewrite(new URL("/404-private", req.url));
    }
  }
  return NextResponse.next();
}
```

Cloudflare routes by hostname; the middleware is defense-in-depth in case
the routes are ever accessed via the public hostname.

## Build & deploy

GitHub Actions builds `web/` → static export → SCPs to
`192.168.50.32:/var/www/bettermachine` via `DEPLOY_KEY` secret. See `DEPLOY.md`.

Manual:
```bash
cd web && npm ci && npm run build
rsync -avz --delete .next/ erik-ross@192.168.50.32:/var/www/bettermachine/
```

## Why two repos (as of 2026-09-30)

- `Better-Machine/bettermachine-website` — public repo. The code lives
  here because the build pipeline depends on it.
- `Better-Machine/bettermachine-website-internal` — private repo. Holds
  ops-only docs, runbooks, env templates, and the internal schema/migrations
  history. Keeps public-repo surface clean while preserving internal
  context for Woodhouse and future agents.

The PMO route (`app/(private)/pmo/`) lives in the **public** repo because
the build artifact is the same Next.js app — the route is just gated by
hostname. The internal repo holds the *docs* that explain how the PMO
works, not the code itself.
