/**
 * DROPZONA — SignupSkeleton.
 *
 * Skeleton for /signup.html. The signup page shares the auth-step DOM with
 * login.html (role / viewer / streamer step variants selected via `?step=`),
 * so the silhouettes are imported from LoginSkeleton. Only the host element
 * and the screen-reader label change here.
 *
 * Public API:
 *   mountSignupSkeleton(step?)   – inject skeleton (defaults to ?step= or 'role')
 *   unmountSignupSkeleton()      – remove skeleton + clear html[data-loading]
 */

import { buildAuthShell, resolveStep } from './LoginSkeleton.js';

const HOST_ID = 'signup-skeleton';

function resolveHost() {
  return document.getElementById(HOST_ID);
}

/**
 * Mount the signup skeleton into #signup-skeleton.
 *
 * @param {'role'|'viewer'|'streamer'} [step] – defaults to ?step= or 'role'
 */
export function mountSignupSkeleton(step) {
  const root = resolveHost();
  if (!root || root.dataset.mounted === '1') return;
  const which = resolveStep(step);
  root.setAttribute('role', 'status');
  root.setAttribute('aria-busy', 'true');
  root.setAttribute('aria-label', 'Loading sign up');
  root.replaceChildren(buildAuthShell(which));
  root.dataset.mounted = '1';
}

/** Remove the signup skeleton and clear the global loading flag. */
export function unmountSignupSkeleton() {
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
