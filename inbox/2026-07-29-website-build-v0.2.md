# Better Machine Website — Complete Build (v0.2)

## Context

The Better Machine website (bettermachine.ai) was deployed with only basic pages (hero, manifesto, projects inline, agents inline, blog placeholder). It was missing core pages and functionality. Erik requested the site be fully scoped and built out.

**Commit:** `0952297` on master. Build passes clean (21 pages, all static except contact API).

## What Changed (17 files, +1427/-73)

### New Pages (5)
1. **`/projects/[slug]`** — Detail pages for all 5 ventures with problem/solution/market/highlights/tech stack
2. **`/about`** — Manifesto, origin story, team bios (Ray, Liz, Erik), values grid
3. **`/ventures`** — Dedicated ventures overview page with card layout
4. **`/not-found`** — 404 page with links back home and ventures
5. **`/api/contact`** — Working contact form API route (Nodemailer SMTP + rate limiting)

### New Infrastructure
- `src/lib/ventures.ts` — Venture data model shared across project pages
- `src/lib/activity.ts` — Activity feed data (liz: 10 entries, ray: 5, eames: 4)
- `src/app/sitemap.xml` — Full sitemap with 15 page routes
- `src/app/robots.txt` — SEO rules
- OG/Twitter card metadata in root layout
- Nodemailer dependency

### Updated Pages
- Agent pages: activity feed integrated (replaced placeholder text)
- Header nav: Studio → Ventures → Agents → Blog
- Footer nav: About → /about, Ventures page link, LinkedIn/X links corrected
- Contact form: real API submission (was simulated setTimeout)
- Ghost API: graceful error handling (throw → warn + return empty for static export)

## Acceptance Criteria

1. **Build passes:** `npm run build` succeeds, all 21 pages generated
2. **Project detail pages:** All 5 ventures have detail pages with correct data
3. **About page:** Shows manifesto, origin story, team bios, values
4. **Ventures page:** Lists all 5 ventures with descriptions and links
5. **Contact form:** Submits to /api/contact, rate limited, SMTP or dev mode
6. **Activity feed:** Real data from memory logs on agent pages
7. **SEO:** sitemap.xml, robots.txt, OG/Twitter cards present
8. **404 page:** Returns 404 for unknown routes
9. **Nav:** Header and footer link to correct pages (no anchor links for /about, /ventures)

## File Boundaries

- `web/src/app/projects/[slug]/page.tsx` — Project detail pages
- `web/src/app/about/page.tsx` — About page
- `web/src/app/ventures/page.tsx` — Ventures page
- `web/src/app/not-found.tsx` — 404 page
- `web/src/app/api/contact/route.ts` — Contact API
- `web/src/lib/ventures.ts` — Venture data model
- `web/src/lib/activity.ts` — Activity feed data
- `web/src/app/sitemap.ts` — Sitemap
- `web/src/app/robots.ts` — Robots
- `web/src/app/layout.tsx` — OG/Twitter metadata
- `web/src/components/ContactForm.tsx` — Contact form component + modal
- `web/src/components/Header.tsx` — Nav links updated
- `web/src/components/Footer.tsx` — Nav links updated
- `web/src/lib/ghost.ts` — Error handling improvements
- `web/package.json` + `package-lock.json` — Nodemailer added

## Don't Do

- Do NOT deploy to production (no SMTP config, no Hostinger credentials configured)
- Do NOT change Ghost API key (requires env var on deployment host)
- Do NOT modify the deployment workflow (FTP to Hostinger)
- Do NOT add blog posts (Ghost needs posts first)
- Do NOT change the design system or color palette
- Do NOT add new pages beyond what's committed
- Do NOT modify the Eames pipeline or other repos
