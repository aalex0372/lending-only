# Dropzona — Landing Bundle (Developer Handoff)

This bundle contains the **public-facing landing surface** for dropzona.tv and everything it depends on. Drop the entire folder into the web root of your static host (Vercel-ready), or extract directly into the repo at the project root.

The authenticated app surface (`app.html`, `mobile/`, `/app/*` routes) is **not included** — it lives in the main repo. The bundle is self-sufficient for the marketing site and the public auth-entry pages.

---

## What's in this bundle

### Public HTML pages (all production-ready, BETA-truthful)

This handoff covers the marketing surface and the auth-entry pages. The
custom `404.html` ships in the bundle and is wired up the same way (skeleton
loader, head meta), but isn't owned by this handoff — treat it as
host-managed.

| File | Route | Indexable | Notes |
|---|---|---|---|
| `index.html` | `/` | ✓ index, follow | Landing page. 8 JSON-LD blocks (Organization, WebSite, SoftwareApplication, WebPage, BreadcrumbList, HowTo, Speakable, FAQPage). |
| `support.html` | `/support.html` | ✓ index, follow | Contact + FAQ. Real Discord / X / Instagram links. Contact form submits via `mailto:support@dropzona.tv` — confirm the mailbox exists before launch, or replace the handler with a real API endpoint. |
| `privacy.html` | `/privacy.html` | ✓ index, follow | Launch-safe privacy policy. **Needs legal review before launch.** |
| `terms.html` | `/terms.html` | ✓ index, follow | BETA terms of use. **Needs legal review before launch.** |
| `login.html` | `/login.html` | ✓ index, follow | Auth entry, links to the app. |
| `signup.html` | `/signup.html` | ✓ index, follow | Auth entry, links to the app. |

### SEO + hosting infrastructure

| File | Purpose |
|---|---|
| `robots.txt` | Allow public surface, disallow `/app`, `/app/`, `/app.html`, `/mobile/`, and internal asset dirs. Per-AI-bot allow + app-exclude pairs. Scraper blocklist. Sitemap pointer. |
| `sitemap.xml` | 6 public URLs (home, support, privacy, terms, login, signup). |
| `llms.txt` | Structured product summary for AI crawlers (emerging convention). |
| `vercel.json` | `cleanUrls`, security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), HTTP-level `X-Robots-Tag: noindex,nofollow` for `/app*` and `/mobile*`, cache headers for HTML / `robots.txt` / `sitemap.xml` / `llms.txt` / static asset dirs, and rewrites for `/app/*` → `app.html` (preserved from the main app — only relevant if you serve `app.html` from the same domain). |
| `manifest.webmanifest` | PWA manifest. |

### Assets

| File | Used by | Purpose |
|---|---|---|
| `css/landing.css` | `index.html`, `login.html`, `signup.html` | Compiled Tailwind utility CSS. Generated, do not edit by hand. |
| `skeleton/HomepageSkeleton.js` | `index.html` | DOM-built skeleton for the landing during page load. |
| `skeleton/LoginSkeleton.js` | `login.html` | Skeleton for the login page. Also exports the shared `buildAuthShell` helper used by `SignupSkeleton`. |
| `skeleton/SignupSkeleton.js` | `signup.html` | Thin wrapper around `LoginSkeleton`'s auth shell — signup shares the role / viewer / streamer step DOM. |
| `skeleton/SupportSkeleton.js` | `support.html` | Hero + 2-card grid (form / Discord + direct contact) + FAQ. Fixed-overlay style so the page's own fixed nav stays visible during load. |
| `skeleton/LegalSkeleton.js` | `privacy.html`, `terms.html` | Shared module driven by a `kind: 'privacy' \| 'terms'` parameter (different section patterns per page). |
| `skeleton/Skeleton.js` | All page skeletons | Primitives used by every per-page skeleton (`createSkeleton`, `createSkeletonParagraph`, `createSkeletonChips`). |
| `skeleton/loader.js` | All skeleton consumers | `autoUnmount` helper that removes the skeleton once the real content has rendered. Also handles `?skeleton=hold` / `?skeleton=<ms>` debug params. |
| `skeleton/skeleton.css` | All pages with skeletons | Skeleton styles. Per-page visibility gates are scoped with `:has()` to prevent class-name collisions between pages. |
| `skeleton/README.md` | — | Full skeleton-system documentation. |

### Documentation

| File | Purpose |
|---|---|
| `LAUNCH_AUDIT.md` | Page-by-page production audit. Lists every "Coming soon" label, every removed fake claim, every neutralised metric, and the items still needing manual verification (real OG image, GSC/Bing verification, legal review, app.html demo-data decision). **Read this first.** |
| `HANDOFF.md` | This file. |

---

## Folder structure

```
dropzona-landing/
├── HANDOFF.md              ← you are here
├── LAUNCH_AUDIT.md         ← full audit + checklist
├── index.html              ← landing
├── support.html
├── privacy.html
├── terms.html
├── login.html
├── signup.html
├── 404.html                ← ships in bundle, out of handoff scope
├── robots.txt
├── sitemap.xml
├── llms.txt
├── manifest.webmanifest
├── vercel.json
├── css/
│   └── landing.css
└── skeleton/
    ├── HomepageSkeleton.js
    ├── LoginSkeleton.js
    ├── SignupSkeleton.js
    ├── SupportSkeleton.js
    ├── LegalSkeleton.js
    ├── NotFoundSkeleton.js  ← paired with 404.html, out of handoff scope
    ├── Skeleton.js
    ├── loader.js
    ├── skeleton.css
    └── README.md
```

---

## Running it locally

This is a static site — no build step required. Any static server works:

```bash
# from inside dropzona-landing/
npx serve . -p 3000
# then open http://localhost:3000/
```

Or:

```bash
python3 -m http.server 3000
```

Notes:
- `vercel.json` is honoured only by Vercel — local servers will ignore `cleanUrls`, the security headers, and the rewrites. To test the rewrites locally, deploy a preview to Vercel.
- The support contact form opens the user's mail client via `mailto:support@dropzona.tv`. No SMTP is needed on our end, but the mailbox must exist for replies. If you want a hosted form instead, replace the submit handler at the bottom of `support.html`.
- Hold any skeleton for visual QA with `?skeleton=hold` (e.g. `http://localhost:3000/support.html?skeleton=hold`), or pin it for N ms with `?skeleton=2000`.

---

## Deploying

### Vercel (recommended — this bundle was designed for it)

1. Create a new Vercel project pointing at this folder.
2. Set `dropzona.tv` as the primary production domain. **Important:** every canonical, every OG URL, every JSON-LD `url`, the sitemap, `llms.txt`, and `robots.txt`'s sitemap pointer are hard-coded to `https://dropzona.tv/`. If you ship under a different domain, search/replace `dropzona.tv` across all files.
3. The `vercel.json` will be picked up automatically — no environment variables required.
4. After deploy, verify `https://<your-domain>/robots.txt`, `/sitemap.xml`, and `/llms.txt` all return `200`.

### Any other static host

- Make sure the host serves `404.html` on 404 responses.
- Make sure `text/plain` is the response `Content-Type` for `robots.txt` and `llms.txt`.
- Make sure `application/xml` is the response `Content-Type` for `sitemap.xml`.
- If you can set HTTP response headers, port the security + cache headers from `vercel.json`.
- If you can set redirects: this bundle assumes the canonical domain is `https://dropzona.tv`. Configure 301 redirects from any preview / `vercel.app` / `www.` domain to the canonical.

---

## What's intentionally missing

- `opengraph-image.png` and `twitter-image.png` — referenced by every page's OG and Twitter card meta, but the image asset itself is not in this bundle. Generate a 1200×630 PNG and drop it at `/opengraph-image.png` (and a copy at `/twitter-image.png`) on the production host before public launch. If you already have a brand OG image in the main repo's Vercel project, copy it over.
- Favicon source. The HTML uses `/favicon.ico` and `/icon` / `/apple-icon` routes that the original Next.js project served dynamically. If you're moving to a plain static host, drop static `favicon.ico`, `icon-512.png`, and `apple-touch-icon.png` at the web root.
- Real Google Search Console / Bing Webmaster Tools verification tokens — see `LAUNCH_AUDIT.md` § 5 for how to wire those in.
- App shell (`app.html`, `mobile/`, `/app/*`). Not in scope for this handoff.

---

## What's production-true vs. coming-soon

The landing copy is honest about state:

**Live now (claimed as live in the copy):**
- CS2 GSI event triggers
- Automatic chat winner selection
- Steam trade-offer delivery from streamer's connected inventory
- Twitch OAuth + Steam OpenID

**Coming soon (labelled `Soon` on every surface):**
- Test Mode
- Multi-language announcements
- Drop history & analytics
- Watch-time points program (retention)
- Subscriber & loyalty rules

If anything in the "live now" list is **not actually live yet**, flag it before launch — the copy will mislead users otherwise. See `LAUNCH_AUDIT.md` § 6 for the full list of softened / removed claims.

---

## Contact

Questions about this bundle: ask whoever sent it to you. The audit doc covers most of "why is this like this" already.
