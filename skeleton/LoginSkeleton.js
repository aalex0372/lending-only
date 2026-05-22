/**
 * DROPZONE — LoginSkeleton.
 *
 * Skeleton for /login.html, which has three step variants selected via the
 * `?step=` query string: 'role' (default), 'viewer', 'streamer'.
 *
 * The internal builders are re-exported (authShell, STEPS, resolveStep) so
 * SignupSkeleton.js can compose the same silhouettes against its own host —
 * login.html and signup.html share the auth-step DOM verbatim, so a single
 * source of truth for the silhouettes prevents drift.
 *
 * Public API:
 *   mountLoginSkeleton(step?)   – inject skeleton (defaults to ?step= or 'role')
 *   unmountLoginSkeleton()      – remove skeleton + clear html[data-loading]
 */

import { createSkeleton, createSkeletonParagraph } from './Skeleton.js';

const HOST_ID = 'login-skeleton';
const VALID_STEPS = new Set(['role', 'viewer', 'streamer']);

function h(tag, className, children) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (children) {
    const arr = Array.isArray(children) ? children : [children];
    for (const c of arr) if (c != null) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return el;
}

function authHeader() {
  return h('div', 'dz-sk-auth__header', [
    createSkeleton({ variant: 'pill', w: '6rem', h: '1.2rem', r: 999 }),
    createSkeleton({ variant: 'text', w: '60%', h: '1.75rem', r: 8 }),
    createSkeletonParagraph({ lines: 2, lineHeight: '0.85rem', widths: [95, 75] }),
  ]);
}

function roleStep() {
  const optionCard = () => h('div', 'dz-sk-auth__role-card', [
    createSkeleton({ variant: 'block', w: '2.75rem', h: '2.75rem', r: 12 }),
    h('div', 'dz-sk-auth__role-copy', [
      createSkeleton({ variant: 'text', w: '70%', h: '1.1rem', r: 6 }),
      createSkeleton({ variant: 'text', w: '90%', h: '0.8rem', r: 4 }),
    ]),
    createSkeleton({ variant: 'block', w: '1.2rem', h: '1.2rem', r: 6 }),
  ]);
  return h('section', 'dz-sk-auth__step', [
    authHeader(),
    h('div', 'dz-sk-auth__role-grid', [optionCard(), optionCard()]),
  ]);
}

function connectRow() {
  return h('div', 'dz-sk-auth__conn-row', [
    h('div', 'dz-sk-auth__conn-left', [
      createSkeleton({ variant: 'block', w: '2.5rem', h: '2.5rem', r: 10 }),
      h('div', 'dz-sk-auth__conn-copy', [
        createSkeleton({ variant: 'text', w: '8rem', h: '0.95rem', r: 6 }),
        createSkeleton({ variant: 'text', w: '14rem', h: '0.75rem', r: 4 }),
      ]),
    ]),
    createSkeleton({ variant: 'pill', w: '5.5rem', h: '2.1rem', r: 10 }),
  ]);
}

function viewerStep() {
  return h('section', 'dz-sk-auth__step', [
    authHeader(),
    h('div', 'dz-sk-auth__conn-list', [connectRow(), connectRow()]),
    h('div', 'dz-sk-auth__footer', [
      createSkeleton({ variant: 'pill', w: '5rem', h: '2.25rem', r: 10, className: 'dz-sk--ghost' }),
      createSkeleton({ variant: 'pill', w: '7rem', h: '2.25rem', r: 10 }),
    ]),
  ]);
}

function streamerStep() {
  // Same shape as viewer (two connection rows + footer) — content differs but the
  // skeleton silhouettes are identical.
  return viewerStep();
}

export const STEPS = { role: roleStep, viewer: viewerStep, streamer: streamerStep };

export function resolveStep(step) {
  if (!step) {
    try {
      const p = new window.URLSearchParams(window.location.search).get('step');
      if (p && VALID_STEPS.has(p)) return p;
    } catch { /* SSR-safe */ }
    return 'role';
  }
  return VALID_STEPS.has(step) ? step : 'role';
}

/**
 * Build the shared auth-skeleton shell (topbar + step card + legal line).
 * Used by both LoginSkeleton and SignupSkeleton.
 *
 * @param {'role'|'viewer'|'streamer'} step
 * @returns {HTMLElement}
 */
export function buildAuthShell(step) {
  return h('div', 'dz-sk-auth__shell', [
    h('div', 'dz-sk-auth__topbar', [
      createSkeleton({ variant: 'block', w: '8rem', h: '1.5rem', r: 8 }),
      createSkeleton({ variant: 'pill', w: '5rem', h: '1.75rem', r: 999 }),
    ]),
    h('div', 'dz-sk-auth__card', [STEPS[step]()]),
    h('div', 'dz-sk-auth__legal',
      createSkeleton({ variant: 'text', w: '18rem', h: '0.7rem', r: 4 }),
    ),
  ]);
}

function resolveHost() {
  return document.getElementById(HOST_ID);
}

/**
 * Mount login skeleton into #login-skeleton.
 *
 * @param {'role'|'viewer'|'streamer'} [step] – defaults to ?step= or 'role'
 */
export function mountLoginSkeleton(step) {
  const root = resolveHost();
  if (!root || root.dataset.mounted === '1') return;
  const which = resolveStep(step);
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading sign in');
  root.replaceChildren(buildAuthShell(which));
  root.dataset.mounted = '1';
}

/** Remove the login skeleton and clear the global loading flag. */
export function unmountLoginSkeleton() {
  const root = resolveHost();
  if (root) {
    root.setAttribute('aria-busy', 'false');
    root.classList.add('dz-sk-host--leaving');
    root.replaceChildren();
    root.dataset.mounted = '0';
    const detach = () => root.remove();
    root.addEventListener('transitionend', detach, { once: true });
    setTimeout(detach, 500);
  }
  document.documentElement.dataset.loading = 'false';
}
