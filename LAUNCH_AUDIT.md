# Dropzona — Production Launch Audit

**Date:** 2026-05-21
**Scope:** dropzona.vercel.app (production site)
**Pages reviewed:** `index.html`, `support.html`, nav/footer, JSON-LD schema, sitemap
**Pages created:** `privacy.html`, `terms.html`

---

## 1. What changed, by page

### `index.html` — landing page

| Area | Before | After |
|---|---|---|
| Hero — primary copy | Generic "giveaway pipeline" paragraph only | Added a prominent **Auto trade delivery** callout box directly below the hero paragraph with the required messaging: *"Winners selected from eligible chat instantly. The Steam trade offer sends itself — you keep playing the next round."* |
| Hero — secondary CTA | "Watch a live drop" → `signup.html` (misleading: there are no public live drops yet) | "See how it works" → `#how` anchor |
| Hero mockup card #1 | Fake stream "NovaFPS · 9,200 viewers · 150 skins · $640" | Neutralized: "Your stream · Live · Drops live" |
| Hero mockup card #2 | Fake stream "AimLegend · 18.5K viewers · Faceit lvl 10 · Dust2 · 320 skins · $1.24K" + fake kill-feed players (AimLegend, noob_123, b1ade45) + fake 4,500 coin badge | Neutralized: "Your channel · Live · Dust2 · Drops · live" + generic CT_2/T_4/T_5 role labels + `$` placeholder |
| Hero floating "winner won" badge | "AceShot22 just won AWP \| Asiimov · $320" | "Winner selected — Trade sent automatically" |
| Drops marquee strip below hero | Scrolling fake winners: xDreamer, pro100_gamer, ShadowByte, NightCrawler, FrostPeak, VortexAim, QuantumCS, PrismFrag with fake skins | **Removed entirely.** Re-add after launch with real, opt-in winner feed. |
| Stats section "By the numbers" | "<500ms kill→chat latency", "99.9%+ trade delivery rate" claims | Replaced with qualitative copy: "Real-time", "Hands-free trade delivery" + note that measured metrics publish post-launch |
| Stats section right-rail caption | "Targets we're building toward in BETA. Real metrics will land here at public launch." | "In open BETA. The pipeline is live end-to-end; the prize-volume and viewer counters switch on at public launch." |
| Biggest-drop "Sneak peek" | Fake streamer "FrostPeak", fake winner "xDreamer", "$14,420", "Settled in 4.1s" | "Your channel / Chat viewer / Top-tier / Auto-settled" + softened description |
| Features — "Instant drops" | "p95 480ms" badge + literal ms timings (60ms / 130ms / 480ms) | Replaced with "Live" badge + "Step 1/2/3" labels and qualitative copy |
| Features — "Auto trade delivery" card | Mock chat: "@dropzona picked a winner from 1,204 chatters" + "Trade sent to @xDreamer · cleared in 4.1s" | "@dropzona picked an eligible chatter" + "Trade offer sent to winner · auto-confirmed" |
| Feature card — Test Mode | Implied live | **Marked `Soon` badge.** Description retained as a roadmap preview. |
| Feature card — Multi-Language | Claimed "EN / ES / RU / PT / DE translations" | **Marked `Soon`.** Rewritten as: "On the roadmap — English ships first." |
| Feature card — Real-Time Analytics | Claimed full analytics dashboard | Renamed **Drop history & analytics**, marked `Soon`, described as "expanding through BETA" |
| Feature card — Secure & Reliable | Claimed "encrypted tokens — we never touch credentials" | Renamed **Built on official APIs**, copy reduced to verifiable facts: "Twitch OAuth and Steam's own trade-offer flow. We never see your Steam password." |
| Feature card — Points Lottery | Claimed live "burn channel points for tickets" | Renamed **Watch-time points**, marked `Soon`, rewritten as a retention program for non-winning viewers |
| Feature card — Subscriber Mode | Claimed live sub-only / VIP / follow-age restrictions | Renamed **Subscriber & loyalty rules**, marked `Soon` |
| **NEW: Points / retention section** | (didn't exist) | Inserted a dedicated `#points` section between Features and How it works. Frames the points program as engagement for non-winning viewers with three pillars: watch & chat to earn, burn for lottery entries, sub/loyalty boosts. Marked `Coming soon`. |
| How it works section | Already accurate ("Connect / Configure / Stream") | Kept verbatim. |
| FAQ | 5 questions including unsupported claims (p95 <500ms, IP/device fingerprinting, Dota 2 private beta, Valorant/Apex roadmap, Discord with `#` href) | **Fully rewritten** with the 7 required Q&A items below. Discord button now points at the real URL. |
| CTA trust strip | "Anti-fraud baked in" claim | Replaced with "Twitch & Steam OAuth" (verifiable fact) |
| Footer | 4 columns: Product (Features, Writings), Company (About / Manifesto / Careers / Press) — all `href="#"`, Legal (Privacy / Terms / Trade safety / Status) — all `href="#"`, plus "All systems operational" status badge | **Restructured.** Product (Features, How it works, FAQ, Support), **Community** (real Discord, X, Instagram links), Legal (real Privacy + Terms pages). Removed "All systems operational." Added explicit Valve / Steam / Twitch / Amazon disclaimer. |
| Nav | Top-nav link "Writings" pointing to support.html | Renamed to **Support**. |
| JSON-LD `ld-organization` | Listed fake `github.com/dropzona` in `sameAs` | Replaced with real `x.com/dropzona`, `instagram.com/dropzona`, `discord.gg/dropzona`. Removed unconfirmed `support@dropzona.tv` contact point. |
| JSON-LD `ld-software` | featureList claimed 11 features incl. "Anti-bot and anti-stream-snipe filtering", "Watch-time and account-age eligibility floors", "Test Mode for safe trigger configuration", "Multi-language Twitch chat announcements", "Real-time analytics dashboard", "Channel-points-powered Points Lottery", "Subscriber Mode" | Trimmed to the 4 verified live features only. |
| JSON-LD `ld-faq` | Hardcoded the old FAQ answers including unsupported claims | Rewritten to match the new 7-item FAQ verbatim. |

### `support.html`

| Area | Before | After |
|---|---|---|
| Brand name | "DROPZONE" everywhere (different from "Dropzona" elsewhere) | Normalized to **Dropzona / DROPZONA** |
| Page title / meta | "Get help with DROPZONE. Contact support by email or Discord." | "Get help with Dropzona. Reach the team on Discord, X, or Instagram." |
| Hero sub-copy | "We're a small team and we care about every message. Reach out — we usually respond within a few hours." | "Dropzona is in open BETA. The fastest way to reach us is Discord — that's where the team lives, and you'll usually get a real human reply." (No specific response-time promise.) |
| Contact form | Mailto form posting to unconfirmed `support@dropzona.tv`, then showed "Message sent! We'll get back to you within 24 hours." | **Removed.** Replaced with a "When you reach out, include" card that asks for role, what happened, Twitch handle, and any error/screenshot/trade-offer ID. JS handler also removed. |
| Direct contact strip | "Email, X, or Instagram — we reply within 24 hours." with a `mailto:support@dropzona.tv` button | "Other ways to reach us — public DMs on X and Instagram. We don't guarantee response times during BETA — Discord is faster." Email button removed. |
| FAQ Q: How do I connect Steam Trade URL | Mentioned DROPZONE brand | Normalized brand, expanded with public-inventory requirement |
| FAQ Q: Why didn't I receive my skin | Vague | Rewritten with specific failure modes (missing URL, expired URL, private inventory, trade restrictions) and the expire→return-to-streamer behaviour |
| FAQ Q: Is this gambling | Claimed "Selection is random and provably fair" | Removed "provably fair" (unverified). Now: viewers don't pay, prize is from streamer's own inventory, "local rules may still apply — check your jurisdiction." |
| FAQ Q: How do I set up CS2 Game Agent | "Setup Wizard" generic | Now ties explicitly to the in-app wizard generating the GSI config |
| FAQ Q: Trade bot offline | Referred to nonexistent "Shared Secret / Identity Secret" config and "Health dashboard" | **Replaced with:** "What if Steam declines or delays a trade?" — accurate explanation of Steam-side causes (Mobile Authenticator holds, inventory full, trade restrictions) |
| **NEW FAQ Q:** affiliation | (didn't exist) | Added: "Is Dropzona affiliated with Valve, Steam, Twitch, or CS2?" — No, independent product, official integrations, trademarks belong to their owners |
| Footer | "© 2026 DROPZONE · Not affiliated with Valve" | "© 2026 Dropzona · Independent product · Not affiliated with Valve, Steam, Counter-Strike, Twitch, or Amazon" |

### `privacy.html` *(new)*

Minimal launch-safe privacy policy covering:
- What we collect (streamer + viewer + operational), explicitly noting **no Steam passwords or 2FA codes**
- How we use it (run drops, dashboards, support, abuse prevention) — explicitly **not selling data, no third-party ads**
- Third-party dependencies (Twitch, Steam/Valve, Vercel)
- 30-day deletion on account close
- User choices (disconnect Twitch/Steam, request export/deletion via Discord)
- Children/age requirement deferred to Twitch and Steam terms
- Contact: Discord and X
- Independent-product disclaimer in footer

### `terms.html` *(new)*

Minimal BETA terms of use covering:
- What Dropzona is (and is not — we don't host, own, escrow, or sell skins)
- Independent-product disclaimer up-front in a callout
- Eligibility (age, Twitch/Steam ToS, local laws)
- Streamer responsibilities (legality of giveaway, ownership of inventory, taxes, ToS compliance)
- Viewer responsibilities (free entry, keep Trade URL current, Steam trade restrictions apply)
- "Provided as-is" + BETA disclaimer (no uptime, latency, or trade-success guarantee)
- Acceptable use (no illegal gambling, no fraud, no abuse)
- IP & trademark notice
- Liability cap (capped at 12-month payments — typically zero in BETA)
- Change notice via Discord/X
- Contact: Discord and X

### `sitemap.xml`

Added `privacy.html` and `terms.html`. Bumped lastmod to 2026-05-21.

---

## 2. Broken / fake links — disposition

| Link | Type | Action taken |
|---|---|---|
| Footer About / Manifesto / Careers / Press | All were `href="#"` | **Removed** — column deleted. |
| Footer Trade safety / Status | Both were `href="#"` | **Removed.** No public status page or trade-safety doc exists yet. |
| Footer Privacy / Terms | Both were `href="#"` | **Replaced** with real `privacy.html` and `terms.html`. |
| Footer "All systems operational" badge | Decorative claim, no real status page | **Removed.** |
| Footer "Writings" link | Misleading label for support | Repointed and **renamed Support** (top nav also fixed). |
| FAQ "Join Discord" button | Was `href="#"` | **Repointed** to `https://discord.gg/dropzona` (confirmed real). |
| Discord (`discord.gg/dropzona`) — real | Confirmed real by product owner | Now linked in footer, FAQ, support page |
| X (`x.com/dropzona`) — real | Confirmed real | Linked in footer + support page (replaces old `twitter.com/dropzona`) |
| Instagram (`instagram.com/dropzona`) — real | Confirmed real | Linked in footer + support page |
| GitHub (`github.com/dropzona`) — in JSON-LD `sameAs` | Not confirmed real | **Removed** from JSON-LD |
| Email `support@dropzona.tv` | Not confirmed real | **Removed** from JSON-LD contact point, removed from support form. (If you want this to exist, set up the mailbox and a single "Email us" line can be re-added.) |
| Hero "Watch a live drop" button → `signup.html` | Misleading — no public live drops yet | Re-labeled "See how it works" → `#how` anchor |

---

## 3. Live-vs-coming-soon table (current page wording)

| Feature on page | Live? | How it's presented now |
|---|---|---|
| CS2 GSI event → winner → Twitch chat announcement | ✅ Live | Stated as live in hero, features, FAQ |
| Steam trade offer auto-delivery from streamer inventory | ✅ Live | Hero callout + Auto Trade Delivery feature card |
| Map any in-game event to a drop (config) | ✅ Live | Features primary card (with prize-amount toggles) |
| Test Mode (trigger simulation) | ❌ Not live | `Soon` badge on feature card |
| Multi-language announcements | ❌ Not live | `Soon` badge — English ships first |
| Drop history & analytics | ⚠️ Partial / expanding | `Soon` badge — "expanding through BETA" |
| Built on official APIs (Twitch OAuth, Steam trade flow) | ✅ Live | Stated as fact, no "encrypted tokens" claim |
| Watch-time points program (retention) | ❌ Not live | Whole dedicated `#points` section labelled `Coming soon`; `Soon` badge on feature card |
| Subscriber & loyalty rules | ❌ Not live | `Soon` badge |
| Anti-fraud / anti-bot filtering | ❌ Not surfaced as a feature | Removed from CTA trust strip and JSON-LD; no FAQ claims about it |
| Dota 2 / Valorant / Apex support | ❌ Not live | All references **removed** from FAQ and footer badges |
| Public status page | ❌ Not live | "All systems operational" removed |

---

## 4. Items NOT touched (and why)

- **`app.html`** still uses demo data (`xDreamer` as the placeholder username; sample skin rows like "AK-47 \| Redline · $8.40 · Triple Kill"). This is the in-app dashboard, viewed only after sign-in, and the demo seed data is a reasonable substitute until a real account loads. ⚠️ **Recommendation:** Either (a) load a true empty/onboarding state for brand-new accounts and only show seeded demo data when the user clicks a "show demo" button, or (b) make sure the demo data is visibly labelled "Demo." Left for product owner to choose — this audit did not modify `app.html`.
- **`signup.html` / `login.html`** — out of scope; visually scanned, no fake stats noticed beyond standard form copy.
- **`404.html`** — out of scope for this pass.
- **`mobile/*`** — out of scope for this pass.
- **`robots.txt`** — already production-safe.

---

## 5. Production-readiness checklist

### Must verify before flipping DNS
- [ ] `discord.gg/dropzona` invite is permanent (not 1-day) and the channel can receive new members.
- [ ] `x.com/dropzona` handle is the one the team controls and is set to public.
- [ ] `instagram.com/dropzona` handle is the one the team controls and is set to public.
- [ ] If you want an email channel back, register `support@dropzona.tv`, confirm it receives mail, then re-add it to `support.html` and the `ld-organization` JSON-LD contact point.
- [ ] Replace the `LAUNCH_AUDIT.md` placeholder date in `privacy.html` / `terms.html` with an actually-reviewed effective date (currently 2026-05-21).
- [ ] Privacy + Terms reviewed by a lawyer, **especially**: jurisdiction, governing law, dispute resolution, and the disclaimer of warranties — these were written launch-safe, not legally optimised for your jurisdiction.
- [ ] Confirm that nothing in `app.html`'s demo data leaks fake winners onto an authenticated-but-empty account.
- [ ] OG image (`/opengraph-image.png`) and twitter-image still reflect current branding (not audited here).
- [ ] CSP / security headers reviewed (not in scope of this audit).

### Should verify within 1 week of launch
- [ ] Watch the homepage in DevTools at 4K, 1440p, 768px, 390px — confirm the new hero "Auto trade delivery" callout and the new `#points` section don't overflow or stack awkwardly.
- [ ] Confirm the new FAQ accordion still expands on mouse + keyboard (all items currently rendered open; if you wire up real toggle JS, audit accessibility).
- [ ] Confirm scroll anchors (`#features`, `#how`, `#faq`, `#points`) actually exist and scroll to the right spot.
- [ ] Confirm Discord/X/Instagram links open with `target="_blank"` and `rel="noopener noreferrer"` (they do — verified in this pass).

### Tone & positioning — final state
- Positioning is now: **"Dropzona helps CS2 streamers reward real viewers through automated, event-triggered skin giveaways."**
- All hyped/unverifiable claims (latency numbers, fraud-prevention specifics, encrypted tokens, multi-language, 99.9% delivery) are gone.
- Roadmap items (Test Mode, Multi-Language, Analytics, Points, Subscriber rules) are visible but explicitly labelled `Soon`.
- Affiliation disclaimer is now present in footer, in Terms, and in the FAQ.

---

*Audit produced 2026-05-21. Edits applied directly to source. Diff against pre-audit `index.html` / `support.html` for review.*
