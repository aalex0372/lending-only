# Skeleton — DROPZONE loading states

A self-contained, dependency-free skeleton loading layer for the marketing
landing page, the auth flow, and the in-app SPA. Vanilla JS (ES modules) +
CSS variables. Drops into any of the project's static HTML files with three
lines of HTML and one `<script type="module">` block.

---

## Folder contents

```
skeleton/
├── README.md             ← this file
├── skeleton.css          ← all skeleton styles (shimmer, layout, theming hooks)
├── Skeleton.js           ← primitives: createSkeleton, createSkeletonParagraph, createSkeletonChips
├── loader.js             ← shared bootstrap: autoUnmount() + ?skeleton= URL flag
├── HomepageSkeleton.js   ← marketing landing (index.html)
├── LoginSkeleton.js      ← /login.html, dispatches by ?step=role|viewer|streamer
├── SignupSkeleton.js     ← /signup.html, shares LoginSkeleton's step silhouettes
├── SupportSkeleton.js    ← /support.html (hero + 2-card grid + FAQ)
├── LegalSkeleton.js      ← /privacy.html + /terms.html (kind: 'privacy' | 'terms')
├── NotFoundSkeleton.js   ← /404.html (centered topbar + wordmark + CTAs)
└── AppSkeleton.js        ← in-app SPA dispatcher, one builder per route in router.js
```

Nothing else in the repo imports from outside this folder. Move, rename, or
delete the folder and the only ripples are in the HTML entry points
(`index.html`, `login.html`, `signup.html`, `support.html`, `privacy.html`,
`terms.html`, `404.html`, `app.html`) and `eslint.config.js` /
`package.json` (lint glob).

---

## What it does

For each entry-point HTML file we mount a skeleton that visually mirrors the
page's real layout, then unmount it once the page is ready. The real `<main>`
or routed `.page` element is hidden behind a single CSS gate
(`html[data-loading="true"]`) so there is **no layout shift** when the real
content swaps in.

Three guarantees:

1. **No fullscreen spinner.** Each page has a layout-shaped skeleton — hero
   blocks, stat tiles, stream cards, tables, form rows, etc. — matching the
   real surface.
2. **Layout-shift-free.** Skeleton sections use the same widths, gaps, and
   `min-height`s as the real content. The unmount is a fade, not a reflow.
3. **Accessible.** Each host has `role="status"` + `aria-busy="true"` +
   `aria-live="polite"`. Individual shimmer rectangles are `aria-hidden="true"`
   so screen readers hear "Loading homepage" once, not 200 empty regions.
   `@media (prefers-reduced-motion: reduce)` swaps the shimmer for a soft
   opacity pulse.

---

## Quick start — add a skeleton to a new page

Three small additions per page. The example below is for a hypothetical
`/checkout.html`.

### 1. In `<head>` — set the loading flag and load styles

```html
<script>try{document.documentElement.dataset.loading='true'}catch(_){}</script>
<link rel="stylesheet" href="/skeleton/skeleton.css"/>
```

The inline `<script>` must be in the `<head>` (it runs synchronously before
the `<body>` paints, so the real content is hidden from frame one).

### 2. In `<body>` — drop the skeleton host where the real content would go

Place it as a sibling of (or above) the element you want to mask. Keep your
header/nav outside this block if you want it visible during loading.

```html
<div id="checkout-skeleton"
     role="status"
     aria-busy="true"
     aria-live="polite"
     aria-label="Loading checkout"></div>

<main id="checkout-main"> ...real content... </main>
```

### 3. Before `</body>` — mount and auto-unmount

```html
<script type="module">
  import { mountCheckoutSkeleton, unmountCheckoutSkeleton }
    from '/skeleton/CheckoutSkeleton.js';
  import { autoUnmount } from '/skeleton/loader.js';

  mountCheckoutSkeleton();
  autoUnmount(unmountCheckoutSkeleton);
</script>
```

Add a CSS rule in `skeleton.css` (next to the existing ones) so `data-loading`
hides your real content:

```css
html[data-loading="true"]  main#checkout-main { visibility: hidden; }
html[data-loading="false"] #checkout-skeleton { display: none; }
```

`visibility: hidden` is intentional — it keeps the real DOM in the layout tree
so the browser computes its final size, preventing a measurement jump when the
skeleton hides.

That's it. The skeleton fades out on `window.load + document.fonts.ready` or
2.5s, whichever fires first.

---

## API reference

### `Skeleton.js` — primitives

```js
import {
  createSkeleton,           // single shape
  createSkeletonParagraph,  // N text lines of varied width
  createSkeletonChips,      // horizontal pill stack
} from '/skeleton/Skeleton.js';
```

`createSkeleton(opts)` returns an HTMLElement. All shapes share `.dz-sk`; the
shimmer is implemented as a `::after` pseudo-element animation in
`skeleton.css`. Individual shapes are `aria-hidden="true"` by default.

| Option       | Type                                         | Default     | Purpose |
| ------------ | -------------------------------------------- | ----------- | ------- |
| `variant`    | `'block'\|'text'\|'circle'\|'pill'\|'image'` | `'block'`   | shape preset (controls border-radius) |
| `w`          | string \| number                             | —           | width (e.g. `'70%'`, `'12rem'`, `240`) |
| `h`          | string \| number                             | —           | height |
| `r`          | string \| number                             | per variant | override border-radius |
| `className`  | string                                       | `''`        | extra class names appended |
| `ariaLabel`  | string                                       | —           | if set, exposes block to AT as `role="img"` (rare) |

`createSkeletonParagraph({ lines, lineHeight, gap, widths })` returns a
column of text-skeleton lines with varied widths.

`createSkeletonChips(count, chipOpts)` returns a wrapped row of pill skeletons.

### `loader.js` — shared bootstrap

```js
import { autoUnmount } from '/skeleton/loader.js';
autoUnmount(unmountFn, { capMs: 2500 });
```

Reads `?skeleton=` from the URL and schedules `unmountFn()` accordingly:

| URL param          | Behavior |
| ------------------ | -------- |
| `?skeleton=hold`   | skeleton stays until reload (logs to console) — use for QA/design review |
| `?skeleton=2000`   | hold for exactly 2000 ms — use for screenshots/recordings |
| (none)             | unmount when `window.load` AND `document.fonts.ready`, with a `capMs` (default 2500ms) failsafe |

Returns the promise that resolves when unmount fires, or `null` when held.

### Page modules

| Module                  | Exports                                                       | Notes |
| ----------------------- | ------------------------------------------------------------- | ----- |
| `HomepageSkeleton.js`   | `mountHomepageSkeleton(host?)`, `unmountHomepageSkeleton(host?)` | Builds hero / stats / biggest-drop / features / how / faq / cta. Host defaults to `#homepage-skeleton`. |
| `LoginSkeleton.js`      | `mountLoginSkeleton(step?)`, `unmountLoginSkeleton()`, plus `buildAuthShell(step)`, `STEPS`, `resolveStep()` | `step` reads from `?step=role\|viewer\|streamer` if omitted. Host: `#login-skeleton`. The auth-shell helpers are re-exported so `SignupSkeleton` can compose the same silhouettes. |
| `SignupSkeleton.js`     | `mountSignupSkeleton(step?)`, `unmountSignupSkeleton()`       | Thin wrapper around `LoginSkeleton`'s shell — signup shares the role / viewer / streamer auth-step DOM. Host: `#signup-skeleton`. |
| `SupportSkeleton.js`    | `mountSupportSkeleton(host?)`, `unmountSupportSkeleton(host?)` | Mirrors hero + 2-card grid (form / Discord+direct) + FAQ. Fixed-overlay style — keeps the page's own fixed nav visible. Host: `#support-skeleton`. |
| `LegalSkeleton.js`      | `mountLegalSkeleton({kind, host?})`, `unmountLegalSkeleton(host?)` | `kind: 'privacy' \| 'terms'` picks the section pattern (privacy has more lists, terms has more prose). Host: `#legal-skeleton`. |
| `NotFoundSkeleton.js`   | `mountNotFoundSkeleton(host?)`, `unmountNotFoundSkeleton(host?)` | Topbar + centered stack (status pill, big wordmark block reserving the glitch SVG's footprint, headline, two CTAs, keyboard hints). Host: `#notfound-skeleton`. |
| `AppSkeleton.js`        | `mountAppSkeleton(pageId?)`, `unmountAppSkeleton()`, `resolvePageIdFromPath(pathname)` | If `pageId` omitted, resolves from `location.pathname` via the same map as `js/router.js`. Host: `#app-skeleton`. |

All `mount*` functions are idempotent (won't double-mount).

### Per-page CSS gates

Each page-level skeleton uses a `:has()`-scoped visibility rule in
`skeleton.css` so the same generic class names on different pages don't bleed
across each other (e.g. both `support.html` and `404.html` use `.page`).
Pattern:

```css
html[data-loading="true"]:has(#<host-id>) <selector-to-hide> { visibility: hidden; }
html[data-loading="false"] #<host-id> { display: none; }
```

---

## Adding a new skeleton for an in-app route

`AppSkeleton.js` is built around a `BUILDERS` table keyed by `pageId`. To add
a route — say a new `/app/s/payouts` page that the router exposes as
`'s-payouts'`:

1. Add a builder function near the others (`payoutsSkeleton`). Compose it
   from the shared atoms: `statsRow`, `card`, `tableBlock`, `connectionRow`,
   `gameChips`, `triggerRow`, `wizardStep`, `healthRow`, `streamCard`, `ticker`.
   Reach for `createSkeleton` directly only when no atom fits.

2. Register the route in two places:

   ```js
   // path → pageId
   const PATH_TO_PAGE = {
     // …
     '/app/s/payouts': 's-payouts',
   };
   // pageId → builder
   const BUILDERS = {
     // …
     's-payouts': payoutsSkeleton,
   };
   ```

3. If the new layout needs styles the existing atoms don't cover, add classes
   in `skeleton.css` under the **App SPA skeleton** section, prefixed with
   `.dz-sk-app__`. Keep the shimmer at `.dz-sk` — don't reinvent it.

Unknown pageIds fall back to `sDashSkeleton()`.

---

## Theming

Skeletons consume the existing page CSS variables, so they re-skin
automatically when the site's theme changes:

| Token             | Used for                                      |
| ----------------- | --------------------------------------------- |
| `--card`          | base color of every skeleton container & shape |
| `--border`        | hairlines around skeleton cards               |
| `--primary`       | shimmer highlight tint                        |
| `--background`    | inset surfaces (e.g. trigger rows)            |
| `--foreground`    | shape base color mix                          |
| `--radius`        | not directly used — variants set their own radii |

The two skeleton-specific tokens (defined at `:root` in `skeleton.css`) are:

```css
--dz-sk-base:      color-mix(in oklab, var(--card) 92%, var(--foreground) 4%);
--dz-sk-highlight: color-mix(in oklab, var(--card) 70%, var(--primary) 18%);
--dz-sk-radius:    8px;
```

If you ever need to brand-tweak the shimmer (e.g. brighter accent during a
campaign), overriding these two variables is enough — no module changes.

---

## How the loading gate works (architecture)

The hide/show flip is one CSS attribute on `<html>`:

```css
html[data-loading="true"]  main#main-content     { visibility: hidden; }   /* homepage */
html[data-loading="true"]  main .auth-step       { display: none; }        /* login   */
html[data-loading="true"]  .main .page           { display: none !important; } /* app SPA */
html[data-loading="false"] #homepage-skeleton    { display: none; }
html[data-loading="false"] #login-skeleton       { display: none; }
html[data-loading="false"] #app-skeleton         { display: none; }
```

`data-loading="true"` is set by an inline `<script>` in `<head>` so it lands
before first paint. Each `unmount*()` function sets it to `"false"` and then
removes the skeleton host (with a 280ms opacity transition for the fade).

The homepage uses `visibility: hidden` rather than `display: none` so the
real `<main>` still reserves layout space — that's what prevents the scroll
position and below-the-fold elements from jumping when content reveals. The
login and app pages can safely use `display: none` because their skeletons
fully mirror the routed page's size.

### Module order for `app.html`

The SPA bootstrap module is intentionally placed **before** `js/main.js` in
document order:

```html
<script type="module"> ... mountAppSkeleton(); autoUnmount(...) ... </script>
<script type="module" src="/js/main.js"></script>
```

Module scripts execute in document order, so `mountAppSkeleton()` runs first
and the skeleton appears immediately. `main.js` then bootstraps the router as
normal — its `.act`-on-current-page work happens beneath the loading gate
(`.main .page { display: none !important }`) so the user never sees the live
DOM until the unmount.

### Why a 2.5s failsafe cap

A flaky CDN or a 404 on an image could leave `window.load` unfired
indefinitely. Capping the wait at 2.5s means users always see real content
within a known upper bound — and the skeleton has had plenty of time to do
its job.

---

## Debug & QA

| URL form                                  | What it does |
| ----------------------------------------- | ------------ |
| `http://localhost:3000/?skeleton=hold`    | Hold the homepage skeleton indefinitely |
| `http://localhost:3000/login?step=streamer&skeleton=hold` | Hold the streamer-step login skeleton |
| `http://localhost:3000/app/s/triggers?skeleton=hold`     | Hold the triggers-page app skeleton |
| `http://localhost:3000/app/s/dashboard?skeleton=1500`    | Show the dashboard skeleton for 1.5s |

On localhost the default behavior unmounts in ~30–80ms (fonts are cached,
HTML is local), which is too fast to perceive. Throttle DevTools network to
**Slow 4G** for a realistic feel, or use `?skeleton=hold` for visual review.

---

## Browser support

- **Modern evergreen browsers only.** Uses `color-mix()` and `oklch()` for
  theming (matching the rest of the project's `landing.css` / `main.css`).
- No transpilation, no polyfills, no build step. The files are loaded as ES
  modules directly from the static server.

---

## Linting

`skeleton/` is in the project's `eslint` glob (see `eslint.config.js`). Run:

```
npm run lint
```

The build allows `^_`-prefixed unused args; catch blocks use the bindingless
`catch { … }` form to stay clean.

---

## Files at a glance

| File                | LOC  | Purpose                                                       |
| ------------------- | ---- | ------------------------------------------------------------- |
| `Skeleton.js`       | ~95  | Primitives + shape variants                                   |
| `loader.js`         | ~75  | `autoUnmount()` + URL-param parsing                           |
| `HomepageSkeleton.js` | ~290 | Marketing landing skeleton                                  |
| `LoginSkeleton.js`  | ~160 | Auth flow, 3 step variants; re-exports `buildAuthShell` etc. |
| `SignupSkeleton.js` | ~50  | Wraps `LoginSkeleton`'s shell against `#signup-skeleton`      |
| `SupportSkeleton.js` | ~140 | Support page (hero + 2-card grid + FAQ)                      |
| `LegalSkeleton.js`  | ~140 | Privacy / Terms (driven by `kind` param)                      |
| `NotFoundSkeleton.js` | ~135 | 404 page                                                    |
| `AppSkeleton.js`    | ~430 | SPA dispatcher + 12 page builders + shared atoms             |
| `skeleton.css`      | ~960 | Shimmer + per-page layout                                    |

---

## Handoff checklist

- [x] One folder, one source of truth (`skeleton/`)
- [x] Zero runtime dependencies
- [x] Eight HTML files use it (`index.html`, `login.html`, `signup.html`,
      `support.html`, `privacy.html`, `terms.html`, `404.html`, `app.html`)
- [x] `npm run lint` passes
- [x] `?skeleton=hold` / `?skeleton=<ms>` debug params work on every page
- [x] No layout shift on swap (verified by reserving real-content space)
- [x] Per-page CSS gates scoped with `:has()` so generic class names
      (`.page`, `nav.nav`) don't cross-hide between pages
- [x] Dark mode (default) + light mode (via existing CSS variables)
- [x] `prefers-reduced-motion: reduce` falls back to a soft pulse
- [x] Screen readers hear one "Loading X" announcement per page, not 200
