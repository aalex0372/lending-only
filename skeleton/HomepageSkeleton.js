/**
 * DROPZONE — HomepageSkeleton.
 *
 * Builds and mounts a loading skeleton that mirrors the layout of the marketing
 * landing page (index.html): hero, stats, biggest-drop callout, features grid,
 * how-it-works, FAQ, and CTA. Matches the real section heights so swapping in
 * the actual content does not cause layout shift.
 *
 * Public API:
 *   mountHomepageSkeleton(host?)  – inject skeleton into host (default #homepage-skeleton)
 *   unmountHomepageSkeleton(host?) – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph, createSkeletonChips } from './Skeleton.js';

const HOST_ID = 'homepage-skeleton';

/** Create an element with class + optional children. */
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

function heroSection() {
  const left = h('div', 'dz-sk-hero__copy', [
    createSkeleton({ variant: 'pill', w: '14rem', h: '1.75rem', r: 999, className: 'dz-sk-hero__badge' }),
    h('div', 'dz-sk-hero__title', [
      createSkeleton({ variant: 'text', w: '90%', h: '3.25rem', r: 10 }),
      createSkeleton({ variant: 'text', w: '78%', h: '3.25rem', r: 10 }),
      createSkeleton({ variant: 'text', w: '60%', h: '3.25rem', r: 10 }),
    ]),
    createSkeletonParagraph({ lines: 3, lineHeight: '1rem', widths: [100, 95, 70] }),
    h('div', 'dz-sk-hero__ctas', [
      createSkeleton({ variant: 'pill', w: '11rem', h: '2.75rem', r: 12 }),
      createSkeleton({ variant: 'pill', w: '9rem', h: '2.75rem', r: 12, className: 'dz-sk--ghost' }),
    ]),
    h('div', 'dz-sk-hero__logos', [
      createSkeleton({ variant: 'text', w: '11rem', h: '0.75rem', r: 4 }),
      h('div', 'dz-sk-hero__logos-row',
        Array.from({ length: 5 }, () =>
          createSkeleton({ variant: 'block', w: '5.5rem', h: '1.2rem', r: 6 }),
        ),
      ),
    ]),
  ]);

  const card = (extraClass = '') => h('div', `dz-sk-stream-card ${extraClass}`, [
    h('div', 'dz-sk-stream-card__head', [
      createSkeleton({ variant: 'pill', w: '3rem', h: '1.1rem', r: 999 }),
      createSkeleton({ variant: 'text', w: '3.5rem', h: '0.8rem', r: 4 }),
    ]),
    createSkeleton({ variant: 'image', w: '100%', h: '100%', r: 14, className: 'dz-sk-stream-card__media' }),
    h('div', 'dz-sk-stream-card__foot', [
      createSkeleton({ variant: 'circle', w: '2.25rem', h: '2.25rem' }),
      h('div', 'dz-sk-stream-card__foot-text', [
        createSkeleton({ variant: 'text', w: '6rem', h: '0.85rem', r: 4 }),
        createSkeleton({ variant: 'text', w: '9rem', h: '0.7rem', r: 4 }),
      ]),
      createSkeleton({ variant: 'pill', w: '4.5rem', h: '1.5rem', r: 999 }),
    ]),
  ]);

  const right = h('div', 'dz-sk-hero__visual', [
    card('dz-sk-stream-card--a'),
    card('dz-sk-stream-card--b'),
    h('div', 'dz-sk-hero__ticker', [
      createSkeleton({ variant: 'pill', w: '4rem', h: '1.1rem', r: 999 }),
      createSkeleton({ variant: 'text', w: '60%', h: '0.85rem', r: 4 }),
    ]),
  ]);

  return h('section', 'dz-sk-section dz-sk-section--hero', [
    h('div', 'dz-sk-container dz-sk-hero', [left, right]),
  ]);
}

function statsSection() {
  const header = h('div', 'dz-sk-section__header', [
    createSkeleton({ variant: 'text', w: '8rem', h: '0.85rem', r: 4 }),
    createSkeleton({ variant: 'text', w: '60%', h: '2.25rem', r: 8 }),
    createSkeleton({ variant: 'text', w: '40%', h: '1rem', r: 6 }),
  ]);
  const grid = h('div', 'dz-sk-stats-grid',
    Array.from({ length: 4 }, () =>
      h('div', 'dz-sk-stat', [
        createSkeleton({ variant: 'text', w: '55%', h: '2.25rem', r: 8 }),
        createSkeleton({ variant: 'text', w: '80%', h: '0.85rem', r: 4 }),
        createSkeleton({ variant: 'text', w: '70%', h: '0.75rem', r: 4 }),
      ]),
    ),
  );
  return h('section', 'dz-sk-section', [h('div', 'dz-sk-container', [header, grid])]);
}

function biggestDropSection() {
  return h('section', 'dz-sk-section', [
    h('div', 'dz-sk-container', [
      h('div', 'dz-sk-bigdrop', [
        h('div', 'dz-sk-bigdrop__left', [
          createSkeleton({ variant: 'pill', w: '10rem', h: '1.4rem', r: 999 }),
          createSkeleton({ variant: 'text', w: '85%', h: '2.5rem', r: 8 }),
          createSkeletonParagraph({ lines: 2, lineHeight: '0.95rem', widths: [95, 75] }),
          h('div', 'dz-sk-hero__ctas', [
            createSkeleton({ variant: 'pill', w: '9rem', h: '2.5rem', r: 12 }),
          ]),
        ]),
        h('div', 'dz-sk-bigdrop__right', [
          createSkeleton({ variant: 'image', w: '100%', h: '100%', r: 16 }),
        ]),
      ]),
    ]),
  ]);
}

function featuresSection() {
  const header = h('div', 'dz-sk-section__header', [
    createSkeleton({ variant: 'text', w: '10rem', h: '0.85rem', r: 4 }),
    createSkeleton({ variant: 'text', w: '70%', h: '2.5rem', r: 8 }),
    createSkeleton({ variant: 'text', w: '55%', h: '2.5rem', r: 8 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '0.95rem', widths: [90, 65] }),
  ]);

  const big = h('div', 'dz-sk-feat dz-sk-feat--big', [
    h('div', 'dz-sk-feat__copy', [
      createSkeleton({ variant: 'text', w: '70%', h: '1.4rem', r: 6 }),
      createSkeletonParagraph({ lines: 2, lineHeight: '0.85rem', widths: [95, 80] }),
    ]),
    h('div', 'dz-sk-feat__chart',
      Array.from({ length: 3 }, () =>
        h('div', 'dz-sk-feat__chart-row', [
          createSkeleton({ variant: 'pill', w: '4.5rem', h: '1.4rem', r: 8 }),
          createSkeleton({ variant: 'text', w: '40%', h: '0.7rem', r: 4 }),
          createSkeleton({ variant: 'pill', w: '2.5rem', h: '1.2rem', r: 6 }),
        ]),
      ),
    ),
  ]);

  const mid = h('div', 'dz-sk-feat dz-sk-feat--mid', [
    h('div', 'dz-sk-feat__copy', [
      createSkeleton({ variant: 'text', w: '60%', h: '1.2rem', r: 6 }),
      createSkeletonParagraph({ lines: 2, lineHeight: '0.85rem', widths: [95, 75] }),
    ]),
    h('div', 'dz-sk-feat__bars',
      Array.from({ length: 3 }, () =>
        createSkeleton({ variant: 'block', w: '100%', h: '0.9rem', r: 6 }),
      ),
    ),
  ]);

  const small = (i) => h('div', 'dz-sk-feat dz-sk-feat--sm', [
    createSkeleton({ variant: 'block', w: '2.25rem', h: '2.25rem', r: 8 }),
    createSkeleton({ variant: 'text', w: '70%', h: '1rem', r: 6 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '0.75rem', widths: [95, 70 + (i % 2) * 10] }),
  ]);

  const grid = h('div', 'dz-sk-feat-grid', [
    big,
    mid,
    small(0), small(1), small(2), small(3),
  ]);

  return h('section', 'dz-sk-section', [h('div', 'dz-sk-container', [header, grid])]);
}

function howSection() {
  const header = h('div', 'dz-sk-section__header', [
    createSkeleton({ variant: 'text', w: '8rem', h: '0.85rem', r: 4 }),
    createSkeleton({ variant: 'text', w: '55%', h: '2.25rem', r: 8 }),
  ]);
  const steps = h('div', 'dz-sk-how-grid',
    Array.from({ length: 3 }, () =>
      h('div', 'dz-sk-how-step', [
        createSkeleton({ variant: 'circle', w: '2.5rem', h: '2.5rem' }),
        createSkeleton({ variant: 'text', w: '70%', h: '1.1rem', r: 6 }),
        createSkeletonParagraph({ lines: 2, lineHeight: '0.8rem', widths: [95, 80] }),
      ]),
    ),
  );
  return h('section', 'dz-sk-section', [h('div', 'dz-sk-container', [header, steps])]);
}

function faqSection() {
  const header = h('div', 'dz-sk-section__header', [
    createSkeleton({ variant: 'text', w: '6rem', h: '0.85rem', r: 4 }),
    createSkeleton({ variant: 'text', w: '50%', h: '2.25rem', r: 8 }),
  ]);
  const list = h('div', 'dz-sk-faq-list',
    Array.from({ length: 5 }, () =>
      h('div', 'dz-sk-faq-row', [
        createSkeleton({ variant: 'text', w: '70%', h: '1.1rem', r: 6 }),
        createSkeleton({ variant: 'block', w: '1rem', h: '1rem', r: 4 }),
      ]),
    ),
  );
  return h('section', 'dz-sk-section', [h('div', 'dz-sk-container dz-sk-container--narrow', [header, list])]);
}

function ctaSection() {
  return h('section', 'dz-sk-section', [
    h('div', 'dz-sk-container dz-sk-container--narrow', [
      h('div', 'dz-sk-cta', [
        createSkeleton({ variant: 'pill', w: '16rem', h: '1.6rem', r: 999 }),
        createSkeleton({ variant: 'text', w: '70%', h: '2.5rem', r: 8 }),
        createSkeleton({ variant: 'text', w: '60%', h: '2.5rem', r: 8 }),
        createSkeletonParagraph({ lines: 2, lineHeight: '0.95rem', widths: [90, 70] }),
        h('div', 'dz-sk-hero__ctas', [
          createSkeleton({ variant: 'pill', w: '12rem', h: '2.75rem', r: 12 }),
          createSkeleton({ variant: 'pill', w: '10rem', h: '2.75rem', r: 12, className: 'dz-sk--ghost' }),
        ]),
        createSkeletonChips(3, { w: '7rem', h: '1.4rem' }),
      ]),
    ]),
  ]);
}

/**
 * Build the full homepage skeleton tree (detached).
 *
 * @returns {DocumentFragment}
 */
function build() {
  const frag = document.createDocumentFragment();
  frag.appendChild(heroSection());
  frag.appendChild(statsSection());
  frag.appendChild(biggestDropSection());
  frag.appendChild(featuresSection());
  frag.appendChild(howSection());
  frag.appendChild(faqSection());
  frag.appendChild(ctaSection());
  return frag;
}

function resolveHost(host) {
  if (!host) return document.getElementById(HOST_ID);
  if (typeof host === 'string') return document.querySelector(host);
  return host;
}

/**
 * Inject the homepage skeleton into `host`. Idempotent.
 *
 * @param {Element|string} [host]  – defaults to #homepage-skeleton
 */
export function mountHomepageSkeleton(host) {
  const root = resolveHost(host);
  if (!root || root.dataset.mounted === '1') return;
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading homepage');
  root.replaceChildren(build());
  root.dataset.mounted = '1';
}

/**
 * Remove the skeleton and clear the global loading flag so the real <main>
 * becomes visible. Safe to call more than once.
 *
 * @param {Element|string} [host]
 */
export function unmountHomepageSkeleton(host) {
  const root = resolveHost(host);
  if (root) {
    root.setAttribute('aria-busy', 'false');
    root.replaceChildren();
    root.dataset.mounted = '0';
    // Animate out via CSS, then detach.
    root.classList.add('dz-sk-host--leaving');
    const detach = () => root.remove();
    root.addEventListener('transitionend', detach, { once: true });
    // Failsafe in case transitionend doesn't fire (display:none, reduced-motion)
    setTimeout(detach, 500);
  }
  document.documentElement.dataset.loading = 'false';
}
