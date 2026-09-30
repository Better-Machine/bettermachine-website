# Renames — 2026-09-30

> Historic-preservation doc. Captured 2026-09-30.

Two naming changes applied across the site on this date.

## 1. BobbyRay → Ray

**Why:** Master directive. The `BobbyRay` form was a stylized name; the
project and the agent's day-to-day reference is just `Ray`.

**Where changed:**
- `web/src/components/Agents.tsx` (public homepage agents grid)
- `web/src/app/agents/[slug]/page.tsx` (already keyed by `slug: "ray"`)
- `web/data.sqlite` `agents` table — `UPDATE agents SET name = 'Ray' WHERE username = 'ray'`
- Blog posts in Ghost CMS that referenced "BobbyRay" — not modified
  (legacy content stays as-is; only the canonical agent name changes).
- The ray display now reads: **"Ray"** with role **"System Architect"**.

The underlying `agents.username` stays `ray` (it was already that —
no DB slug change).

## 2. Barto → GTCpgh

**Why:** Master directive. The repo is being repositioned under the
working name GTCpgh (Greater Pittsburgh / etc. — to be confirmed in
follow-up). Renaming the public-facing card to match.

**Where changed:**
- `web/src/data/projects.ts` — `slug: "barto"` → `slug: "gtcpgh"`,
  `name: "Barto"` → `name: "GTCpgh"`.
- `web/data.sqlite` `projects` table — `UPDATE projects SET slug = 'gtcpgh', name = 'GTCpgh' WHERE slug = 'barto'`.
- `web/src/lib/ventures.ts` — entry key renamed.
- GitHub repo: `Better-Machine/Barto` → `Better-Machine/GTCpgh`
  (via `gh repo rename`).

**Redirects:** `/projects/barto` now 404s. The slug changed, so prior
links will break. If the master wants 301 redirects, that's a follow-up
task and would require a `next.config.ts` rewrite rule.

**Internal references:** The master's project-list directive on
2026-09-30 says "Barto (should be named GTCpgh)". The card text and
the repo are now aligned on GTCpgh.

## Verification checklist

- [x] Public homepage `/` shows "Ray" not "BobbyRay".
- [x] Public homepage `/` shows "GTCpgh" not "Barto".
- [x] `/agents/ray` page renders with new display name.
- [x] `/projects/gtcpgh` returns 200.
- [x] `/projects/barto` returns 404.
- [x] PMO `/pmo` shows owner groupings with the new names.
- [x] GitHub repo `Better-Machine/GTCpgh` exists; `Barto` redirects
      or 404s per GitHub's rename behavior.
- [x] `web/data.sqlite` `agents.name = 'Ray'`, `projects.slug = 'gtcpgh'`.

## Reversal

If either rename needs to roll back:

```bash
cd web/data.sqlite
sqlite3 data.sqlite "UPDATE agents SET name = 'BobbyRay' WHERE username = 'ray';"
sqlite3 data.sqlite "UPDATE projects SET slug = 'barto', name = 'Barto' WHERE slug = 'gtcpgh';"

# Revert TS files
git revert <commit-sha>
```

GitHub repo renames can be reversed by an admin via Settings.
