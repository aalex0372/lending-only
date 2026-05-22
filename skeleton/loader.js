/**
 * DROPZONE — Skeleton loader bootstrap.
 *
 * Shared "when to unmount" logic used by every page that mounts a skeleton.
 * Extracted so each HTML file's bootstrap is one import + two function calls
 * instead of duplicating the URL-param parsing and the load-readiness race.
 *
 * Behavior, in priority order:
 *
 *   1. `?skeleton=hold` → skeleton stays mounted until manual reload. Useful
 *      for QA/design review of the skeleton itself (logs to console so it's
 *      obvious you're in held mode).
 *
 *   2. `?skeleton=<ms>` → skeleton holds for exactly N milliseconds then
 *      unmounts. Useful for demos and screen recordings.
 *
 *   3. Default → unmount as soon as window.load AND document.fonts.ready
 *      have both fired, with a 2.5s failsafe cap so a hung resource never
 *      strands users on the skeleton.
 *
 * Designed so the module can be imported and run safely even after window.load
 * has already fired (it checks document.readyState before adding the listener).
 */

const DEFAULT_CAP_MS = 2500;

/** Read the `?skeleton=` value from the current URL, or null. */
function readParam() {
  try {
    return new window.URLSearchParams(window.location.search).get('skeleton');
  } catch {
    return null;
  }
}

/** Build the "ready to unmount" promise based on window.load + fonts. */
function buildReadyPromise(capMs) {
  const loaded = new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });
  const fonts = (document.fonts && document.fonts.ready) || Promise.resolve();
  const cap = new Promise((resolve) => setTimeout(resolve, capMs));
  return Promise.race([Promise.all([loaded, fonts]), cap]);
}

/**
 * Schedule `unmount()` to run when the page is ready (or per the ?skeleton=
 * URL parameter). Returns the promise that resolves when unmount fires, or
 * `null` when held indefinitely.
 *
 * @param {() => void} unmount        the page's unmount function
 * @param {object}     [opts]
 * @param {number}     [opts.capMs]   max wait before forcing unmount (default 2500)
 * @returns {Promise<void>|null}
 */
export function autoUnmount(unmount, opts = {}) {
  const capMs = typeof opts.capMs === 'number' ? opts.capMs : DEFAULT_CAP_MS;
  const param = readParam();

  if (param === 'hold') {
    console.info('[skeleton] held — remove ?skeleton=hold from the URL to dismiss');
    return null;
  }

  const explicitDelay = Number(param);
  const wait = Number.isFinite(explicitDelay) && explicitDelay >= 0
    ? new Promise((resolve) => setTimeout(resolve, explicitDelay))
    : buildReadyPromise(capMs);

  return wait.then(() => unmount());
}
