/**
 * DROPZONA — SupportSkeleton.
 *
 * Skeleton for /support.html. Mirrors the layout of the page:
 *
 *   • Centered hero — small pill tag, two big headline lines, paragraph.
 *   • Two-card grid — left: contact form (4 rows + submit); right column:
 *     Discord callout card + Direct contact card stacked.
 *   • FAQ — 5–6 collapsed accordion rows.
 *   • Footer line.
 *
 * The fixed top nav stays in the real DOM and is visible during loading,
 * matching the page's actual behavior (`.nav` is `position: fixed`).
 *
 * Public API:
 *   mountSupportSkeleton(host?)   – inject skeleton (default #support-skeleton)
 *   unmountSupportSkeleton(host?) – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph } from './Skeleton.js';

const HOST_ID = 'support-skeleton';

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

function heroBlock() {
  return h('div', 'dz-sk-sup__hero', [
    createSkeleton({ variant: 'pill', w: '10rem', h: '1.5rem', r: 999 }),
    createSkeleton({ variant: 'text', w: '14rem', h: '3.2rem', r: 10 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '1rem', widths: [88, 60] }),
  ]);
}

function formCard() {
  const formRow = () => h('div', 'dz-sk-sup__form-row', [
    createSkeleton({ variant: 'text', w: '4rem', h: '0.7rem', r: 4 }),
    createSkeleton({ variant: 'block', w: '100%', h: '2.7rem', r: 10 }),
  ]);
  return h('div', 'dz-sk-sup__card dz-sk-sup__card--form', [
    createSkeleton({ variant: 'block', w: '3rem', h: '3rem', r: 14 }),
    createSkeleton({ variant: 'text', w: '60%', h: '1.05rem', r: 6 }),
    createSkeleton({ variant: 'text', w: '85%', h: '0.8rem', r: 4 }),
    h('div', 'dz-sk-sup__form', [
      formRow(),
      formRow(),
      h('div', 'dz-sk-sup__form-row', [
        createSkeleton({ variant: 'text', w: '4rem', h: '0.7rem', r: 4 }),
        createSkeleton({ variant: 'block', w: '100%', h: '6.5rem', r: 10 }),
      ]),
      createSkeleton({ variant: 'pill', w: '100%', h: '2.75rem', r: 10 }),
    ]),
  ]);
}

function discordCard() {
  return h('div', 'dz-sk-sup__card dz-sk-sup__card--discord', [
    createSkeleton({ variant: 'block', w: '3rem', h: '3rem', r: 14 }),
    createSkeleton({ variant: 'text', w: '55%', h: '1.05rem', r: 6 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '0.8rem', widths: [92, 80] }),
    createSkeleton({ variant: 'pill', w: '100%', h: '2.75rem', r: 10 }),
  ]);
}

function directContactCard() {
  return h('div', 'dz-sk-sup__card dz-sk-sup__card--direct', [
    createSkeleton({ variant: 'text', w: '55%', h: '1rem', r: 6 }),
    createSkeleton({ variant: 'text', w: '85%', h: '0.75rem', r: 4 }),
    h('div', 'dz-sk-sup__direct-btns', [
      createSkeleton({ variant: 'pill', w: '100%', h: '2.5rem', r: 10 }),
      createSkeleton({ variant: 'pill', w: '100%', h: '2.5rem', r: 10, className: 'dz-sk--ghost' }),
      createSkeleton({ variant: 'pill', w: '100%', h: '2.5rem', r: 10, className: 'dz-sk--ghost' }),
    ]),
  ]);
}

function cardsBlock() {
  return h('div', 'dz-sk-sup__cards', [
    formCard(),
    h('div', 'dz-sk-sup__channels', [
      discordCard(),
      directContactCard(),
    ]),
  ]);
}

function faqBlock() {
  const row = () => h('div', 'dz-sk-sup__faq-row', [
    createSkeleton({ variant: 'text', w: '70%', h: '1rem', r: 6 }),
    createSkeleton({ variant: 'block', w: '1rem', h: '1rem', r: 4 }),
  ]);
  return h('div', 'dz-sk-sup__faq', [
    createSkeleton({ variant: 'text', w: '10rem', h: '1.4rem', r: 6 }),
    h('div', 'dz-sk-sup__faq-list', [row(), row(), row(), row(), row(), row()]),
  ]);
}

function build() {
  return h('div', 'dz-sk-sup__wrap', [
    heroBlock(),
    cardsBlock(),
    faqBlock(),
  ]);
}

function resolveHost(host) {
  if (!host) return document.getElementById(HOST_ID);
  if (typeof host === 'string') return document.querySelector(host);
  return host;
}

/**
 * Inject the support skeleton into `host`. Idempotent.
 *
 * @param {Element|string} [host]  – defaults to #support-skeleton
 */
export function mountSupportSkeleton(host) {
  const root = resolveHost(host);
  if (!root || root.dataset.mounted === '1') return;
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading support');
  root.replaceChildren(build());
  root.dataset.mounted = '1';
}

/**
 * Remove the skeleton and clear the global loading flag.
 *
 * @param {Element|string} [host]
 */
export function unmountSupportSkeleton(host) {
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
