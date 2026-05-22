/**
 * DROPZONA — NotFoundSkeleton.
 *
 * Skeleton for /404.html. The 404 page is a centered, full-viewport layout:
 *
 *   • Topbar — brand on the left, "Need help?" link on the right.
 *   • Centered stack — status pill, the big glitchy "404" wordmark, headline
 *     + sub paragraph + requested-path row, two CTA buttons, keyboard
 *     shortcut hints.
 *   • Footer line.
 *
 * The skeleton avoids re-implementing the glitch animation; instead it
 * reserves the wordmark's space with a large image-shaped block so the real
 * SVG drops in without layout shift.
 *
 * Public API:
 *   mountNotFoundSkeleton(host?)   – inject skeleton (default #notfound-skeleton)
 *   unmountNotFoundSkeleton(host?) – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph } from './Skeleton.js';

const HOST_ID = 'notfound-skeleton';

function h(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    const arr = Array.isArray(children) ? children : [children];
    for (const c of arr) {
      if (c == null) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
  }
  return el;
}

function topbar() {
  return h('div', 'dz-sk-404__topbar', [
    h('div', 'dz-sk-404__brand', [
      createSkeleton({ variant: 'block', w: '1.9rem', h: '1.9rem', r: 8 }),
      h('div', 'dz-sk-404__brand-text', [
        createSkeleton({ variant: 'text', w: '5rem', h: '0.85rem', r: 4 }),
        createSkeleton({ variant: 'text', w: '4rem', h: '0.6rem', r: 4 }),
      ]),
    ]),
    createSkeleton({ variant: 'text', w: '5.5rem', h: '0.85rem', r: 4 }),
  ]);
}

function pillRow() {
  return h('div', 'dz-sk-404__pill-row', [
    createSkeleton({ variant: 'pill', w: '13rem', h: '1.6rem', r: 999 }),
  ]);
}

/** Reserves the glitch wordmark's footprint without re-implementing it. */
function wordmark() {
  return h('div', 'dz-sk-404__wordmark', [
    createSkeleton({ variant: 'image', w: '100%', h: '100%', r: 14 }),
  ]);
}

function headline() {
  return h('div', 'dz-sk-404__headline', [
    createSkeleton({ variant: 'text', w: '70%', h: '2rem', r: 8 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '0.9rem', widths: [88, 70] }),
    h('div', 'dz-sk-404__path-row', [
      createSkeleton({ variant: 'text', w: '5rem', h: '0.7rem', r: 4 }),
      createSkeleton({ variant: 'block', w: '12rem', h: '1.5rem', r: 6 }),
    ]),
  ]);
}

function ctaRow() {
  return h('div', 'dz-sk-404__cta-row', [
    createSkeleton({ variant: 'pill', w: '10rem', h: '2.6rem', r: 12 }),
    createSkeleton({ variant: 'pill', w: '10rem', h: '2.6rem', r: 12, className: 'dz-sk--ghost' }),
  ]);
}

function shortcuts() {
  return h('div', 'dz-sk-404__shortcuts', [
    createSkeleton({ variant: 'text', w: '5rem', h: '0.7rem', r: 4 }),
    createSkeleton({ variant: 'pill', w: '5rem', h: '1.2rem', r: 999 }),
    createSkeleton({ variant: 'pill', w: '5.5rem', h: '1.2rem', r: 999 }),
    createSkeleton({ variant: 'pill', w: '5rem', h: '1.2rem', r: 999 }),
  ]);
}

function build() {
  return h('div', 'dz-sk-404__shell', [
    topbar(),
    h('div', 'dz-sk-404__center', [
      h('div', 'dz-sk-404__stack', [
        pillRow(),
        wordmark(),
        headline(),
        ctaRow(),
        shortcuts(),
      ]),
    ]),
    h('div', 'dz-sk-404__foot',
      createSkeleton({ variant: 'text', w: '14rem', h: '0.7rem', r: 4 }),
    ),
  ]);
}

function resolveHost(host) {
  if (!host) return document.getElementById(HOST_ID);
  if (typeof host === 'string') return document.querySelector(host);
  return host;
}

/**
 * Inject the 404 skeleton.
 *
 * @param {Element|string} [host] – defaults to #notfound-skeleton
 */
export function mountNotFoundSkeleton(host) {
  const root = resolveHost(host);
  if (!root || root.dataset.mounted === '1') return;
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading page');
  root.replaceChildren(build());
  root.dataset.mounted = '1';
}

/** Remove the skeleton and clear the global loading flag. */
export function unmountNotFoundSkeleton(host) {
  const root = resolveHost(host);
  if (root) {
    root.setAttribute('aria-busy', 'false');
    root.replaceChildren();
    root.dataset.mounted = '0';
    root.classList.add('dz-sk-host--leaving');
    const detach = () => root.remove();
    root.addEventListener('transitionend', detach, { once: true });
    setTimeout(detach, 500);
  }
  document.documentElement.dataset.loading = 'false';
}
