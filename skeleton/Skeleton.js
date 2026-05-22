/**
 * DROPZONE — Skeleton primitive.
 *
 * Tiny vanilla helper for building skeleton loading shapes that mirror real
 * content dimensions. Use these primitives to compose page-level skeletons
 * like HomepageSkeleton without hand-writing repetitive markup.
 *
 * All shapes share the `.dz-sk` class (shimmer + theming live in
 * css/skeleton.css) and are marked `aria-hidden="true"` so screen readers
 * only hear the single `role="status"` wrapper that the page mounts.
 */

const VARIANTS = new Set(['block', 'text', 'circle', 'pill', 'image']);

/**
 * Build a single skeleton shape.
 *
 * @param {object} [opts]
 * @param {'block'|'text'|'circle'|'pill'|'image'} [opts.variant='block']
 * @param {string|number} [opts.w]   - width (e.g. '100%', '12rem', 240)
 * @param {string|number} [opts.h]   - height (e.g. '1rem', 48)
 * @param {string|number} [opts.r]   - border-radius (e.g. '999px', 12)
 * @param {string} [opts.className]  - extra class names
 * @param {string} [opts.ariaLabel]  - if set, exposes block to AT (rare)
 * @returns {HTMLElement}
 */
export function createSkeleton(opts = {}) {
  const { variant = 'block', w, h, r, className = '', ariaLabel } = opts;
  const tag = variant === 'text' ? 'span' : 'div';
  const el = document.createElement(tag);
  el.className = `dz-sk dz-sk--${VARIANTS.has(variant) ? variant : 'block'}${className ? ' ' + className : ''}`;
  if (w !== undefined) el.style.width = typeof w === 'number' ? w + 'px' : w;
  if (h !== undefined) el.style.height = typeof h === 'number' ? h + 'px' : h;
  if (r !== undefined) el.style.borderRadius = typeof r === 'number' ? r + 'px' : r;
  if (ariaLabel) {
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', ariaLabel);
  } else {
    el.setAttribute('aria-hidden', 'true');
  }
  return el;
}

/**
 * Build several text-line skeletons of varied width to approximate a paragraph.
 *
 * @param {object} [opts]
 * @param {number} [opts.lines=3]   - number of lines
 * @param {string} [opts.lineHeight='0.9rem']
 * @param {string} [opts.gap='0.6rem']
 * @param {number[]} [opts.widths]  - percentages per line; cycles if shorter
 * @returns {HTMLElement}
 */
export function createSkeletonParagraph(opts = {}) {
  const {
    lines = 3,
    lineHeight = '0.9rem',
    gap = '0.6rem',
    widths = [100, 96, 88, 70],
  } = opts;
  const wrap = document.createElement('div');
  wrap.className = 'dz-sk-paragraph';
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.gap = gap;
  wrap.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < lines; i++) {
    wrap.appendChild(
      createSkeleton({ variant: 'text', w: `${widths[i % widths.length]}%`, h: lineHeight, r: 6 }),
    );
  }
  return wrap;
}

/**
 * Convenience: build a horizontal stack of identical skeleton chips.
 *
 * @param {number} count
 * @param {object} [chipOpts]  - forwarded to createSkeleton
 * @returns {HTMLElement}
 */
export function createSkeletonChips(count, chipOpts = {}) {
  const row = document.createElement('div');
  row.className = 'dz-sk-row';
  row.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < count; i++) {
    row.appendChild(createSkeleton({ variant: 'pill', w: '5.5rem', h: '1.6rem', r: 999, ...chipOpts }));
  }
  return row;
}
