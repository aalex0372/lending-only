/**
 * DROPZONA — LegalSkeleton.
 *
 * Shared skeleton for /privacy.html and /terms.html. Both pages use the same
 * narrow-article layout: <nav>, <h1>, "effective date" pill, intro paragraph,
 * a tinted callout, then 5–8 (h2 + paragraph/list) blocks, then a footer line.
 *
 * The skeleton ships one builder that takes a `length` hint so we can mirror
 * privacy.html (shorter, list-heavy) and terms.html (longer, prose-heavy)
 * with a single source of truth.
 *
 * Public API:
 *   mountLegalSkeleton({ kind, host })  – kind: 'privacy' | 'terms'
 *   unmountLegalSkeleton(host?)         – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph } from './Skeleton.js';

const HOST_ID = 'legal-skeleton';

/** Section shape per legal kind: { lines, hasList, listItems }. */
const LAYOUT = {
  privacy: [
    { lines: 1, hasList: false },
    { lines: 1, hasList: true, listItems: 4 },
    { lines: 0, hasList: true, listItems: 4 },
    { lines: 1, hasList: true, listItems: 3 },
    { lines: 2, hasList: false },
    { lines: 0, hasList: true, listItems: 3 },
    { lines: 1, hasList: false },
    { lines: 2, hasList: false },
  ],
  terms: [
    { lines: 2, hasList: true, listItems: 3 },
    { lines: 2, hasList: false },
    { lines: 0, hasList: true, listItems: 4 },
    { lines: 0, hasList: true, listItems: 4 },
    { lines: 2, hasList: false },
    { lines: 0, hasList: true, listItems: 4 },
    { lines: 2, hasList: false },
    { lines: 2, hasList: false },
    { lines: 1, hasList: false },
  ],
};

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

function navBlock() {
  return h('div', 'dz-sk-legal__nav', [
    h('div', 'dz-sk-legal__brand', [
      createSkeleton({ variant: 'block', w: '1.9rem', h: '1.9rem', r: 8 }),
      createSkeleton({ variant: 'text', w: '6rem', h: '0.85rem', r: 4 }),
    ]),
    createSkeleton({ variant: 'text', w: '7rem', h: '0.85rem', r: 4 }),
  ]);
}

function headerBlock() {
  return h('div', 'dz-sk-legal__header', [
    createSkeleton({ variant: 'text', w: '60%', h: '2.5rem', r: 8 }),
    createSkeleton({ variant: 'text', w: '10rem', h: '0.75rem', r: 4 }),
    createSkeletonParagraph({ lines: 3, lineHeight: '0.9rem', widths: [98, 92, 70] }),
    h('div', 'dz-sk-legal__callout', [
      createSkeletonParagraph({ lines: 2, lineHeight: '0.85rem', widths: [95, 78] }),
    ]),
  ]);
}

function sectionBlock(spec) {
  const children = [
    createSkeleton({ variant: 'text', w: '40%', h: '1.4rem', r: 6, className: 'dz-sk-legal__h2' }),
  ];
  if (spec.lines > 0) {
    children.push(
      createSkeletonParagraph({
        lines: spec.lines === 1 ? 2 : 3,
        lineHeight: '0.85rem',
        widths: [98, 94, 80, 65],
      }),
    );
  }
  if (spec.hasList) {
    const list = h('div', 'dz-sk-legal__list',
      Array.from({ length: spec.listItems || 3 }, (_, i) =>
        h('div', 'dz-sk-legal__list-row', [
          createSkeleton({ variant: 'circle', w: '0.4rem', h: '0.4rem' }),
          createSkeleton({ variant: 'text', w: `${68 + ((i * 11) % 28)}%`, h: '0.85rem', r: 4 }),
        ]),
      ),
    );
    children.push(list);
  }
  return h('div', 'dz-sk-legal__section', children);
}

function footerBlock() {
  return h('div', 'dz-sk-legal__foot',
    createSkeleton({ variant: 'text', w: '70%', h: '0.7rem', r: 4 }),
  );
}

function build(kind) {
  const spec = LAYOUT[kind] || LAYOUT.privacy;
  const wrap = h('div', 'dz-sk-legal__wrap', [
    navBlock(),
    h('div', 'dz-sk-legal__article', [
      headerBlock(),
      ...spec.map(sectionBlock),
      footerBlock(),
    ]),
  ]);
  return wrap;
}

function resolveHost(host) {
  if (!host) return document.getElementById(HOST_ID);
  if (typeof host === 'string') return document.querySelector(host);
  return host;
}

/**
 * Inject the legal skeleton.
 *
 * @param {object} [opts]
 * @param {'privacy'|'terms'} [opts.kind='privacy']
 * @param {Element|string} [opts.host]
 */
export function mountLegalSkeleton(opts = {}) {
  const { kind = 'privacy', host } = opts;
  const root = resolveHost(host);
  if (!root || root.dataset.mounted === '1') return;
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', kind === 'terms' ? 'Loading terms' : 'Loading privacy policy');
  root.replaceChildren(build(kind));
  root.dataset.mounted = '1';
}

/** Remove the skeleton and clear the global loading flag. */
export function unmountLegalSkeleton(host) {
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
