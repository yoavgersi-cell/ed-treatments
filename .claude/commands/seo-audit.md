---
description: Run a full technical-SEO regression audit of the site and report findings (auto-fixing only clearly-safe mechanical issues).
---

# SEO Audit — ED Treatment Hub

Run a complete technical-SEO regression check on this repository and report what you
find. This is a **guardrail**, not a rank tracker: it audits the codebase (where
regressions are introduced), not live Google/Bing rankings and not the live site
(the agent proxy cannot reach edtreatmenthub.com).

Work in the `ed-treatments` repo. If it is not present, clone it first:
`git clone https://github.com/yoavgersi-cell/ed-treatments` and `cd` in, then `npm install`.

Run **every** check below and report each result. Be precise — use the exact file
locations. The content source of truth is `src/lib/seeds/ed.ts`.

## Checks

### 1. Build regression (blocker)
Run `npm run build`. If it fails, STOP and report the error verbatim — nothing else
matters until the site builds. EXIT must be 0.

### 2. Broken internal links (blocker)
Collect every internal link referenced in `src/**` (`href="/..."` in `.ts`/`.tsx`,
including inside the HTML strings in `src/lib/seeds/ed.ts`). Then build the set of
**valid routes**:
- Static pages: every `page.tsx` under `src/app` (strip the `(main)` route group) — e.g. `/`, `/reviews`, `/articles`, `/ed-cost-index`, `/how-we-rank`, `/about`, etc.
- `/reviews/<id>`: valid when `<id>` is a provider id (`providers[].id`).
- `/articles/<slug>`: valid when `<slug>` is an article slug.
- `/<battleSlug>`: valid when `<battleSlug>` is a battle slug.
Flag any referenced internal link whose target route does **not** exist — those are
real 404s for users and crawlers.

### 3. Orphaned content pages (should-fix)
For each content route (every `/reviews/*`, every `/articles/*`, every battle page),
count inbound internal links **from other files** in `src/**`. Any content page with
**0 inbound internal links** is orphaned and will struggle to rank. Report them.
(This is exactly how `best-4-in-1-ed-medication` was found orphaned.)

### 4. Duplicate / missing titles & meta descriptions (should-fix)
Across reviews, battles, articles and static pages, flag:
- Duplicate page titles or meta descriptions (two pages sharing one).
- Missing title or description.
- Titles noticeably longer than ~60 chars or descriptions longer than ~160 chars.

### 5. Index / sitemap sanity (blocker for leaks)
- Confirm every indexable content route is included in `src/app/sitemap.ts`.
- Confirm nothing carrying `robots: { index: false }` is also in the sitemap.
- Confirm `src/app/layout.tsx` still has `robots.index: true` (no accidental
  site-wide noindex) and `lang="en-US"`.
- Confirm the geo signals are intact (hreflang emits only `en-US` + `x-default`;
  canonical/domain uses `https://www.edtreatmenthub.com` consistently).

### 6. Schema presence (note)
Spot-check that reviews/articles/battles still emit their JSON-LD
(WebPage/Article/FAQPage/BreadcrumbList) and that the reviewer `Person` schema +
`reviewedBy` still render on content pages.

## Output format
Report findings grouped by severity:
- 🔴 **Breakers** — build fail, broken internal links, site-wide noindex, sitemap/noindex leaks.
- 🟠 **Should-fix** — orphaned pages, duplicate titles, missing/overlong meta.
- 🟡 **Notes** — minor or informational.
If everything is clean, say so plainly in one line per section.

## Fixing policy (report-first)
Auto-fix **only** clearly-mechanical, unambiguous issues:
- a broken internal link with an obvious correct target,
- a newly-orphaned content page (add ONE natural, contextual internal link from a genuinely relevant page — no stuffing),
- a duplicate or missing title / meta description.

For anything ambiguous, structural, or editorial — **report it and leave it for a
human.** When in doubt, do not fix; flag it.

Commit any fixes with a clear message and push to branch
`claude/ed-men-domain-tt5yvd` **only** — never to `main`, never force-push. End the
run with a short summary: what you checked, what you fixed, what still needs a human.
