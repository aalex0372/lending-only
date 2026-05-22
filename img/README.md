# /img/ — hero stream image

Drop the hero card image here as `hero-stream.jpg` (or `.webp`).

**Required filename:** `hero-stream.jpg`
**Target aspect:** 241 × 156 (matches `aspect-241/156` on the hero mock card; ~1.545:1)
**Recommended size:** ~960 × 620 (2× retina) — keep ≤ 80 KB
**Format:** JPG or WebP (update the `<img src>` in `index.html` if you use a different filename)
**Content:** a real Twitch stream preview / CS2 in-game frame. The hero card overlays
GSI badges (LIVE, viewer count, scoreboard, kill feed) on top, so the image should
NOT have its own scoreboard at the same position. A wide gameplay shot or a
streamer cam still works well.

If the image is missing, the hero card falls back to a neutral dark gradient
(via the inline `style` behind the `<img>`), so the page never looks broken
during development.

To swap the path, edit the `<img src="/img/hero-stream.jpg" ...>` element inside
the `<section id="hero">` block in `index.html`.
