# NOEL FUTKEU PLATFORM
## Reality-Aligned Execution Phase — Strategy Document
### MaxPromo Digital · May 2026

---

## CURRENT STATE AUDIT

### ✅ What's Already Done (Do Not Regress)

| Area | Status | Detail |
|---|---|---|
| Verified data config | ✅ Complete | `src/config/player.ts` — single source of truth, Transfermarkt May 2026 |
| Real images integrated | ✅ Complete | 7 real assets, all via `next/image` with cinematic treatment |
| Fake stats removed | ✅ Complete | 34 goals, 36.2km/h, €12M, fake trophies — all gone |
| Production build | ✅ Clean | `next build` exits 0, no TypeScript errors |
| Design system | ✅ Solid | CSS variables, gold/black system, glassmorphism, animations |
| 8 sections built | ✅ Functional | All sections complete and rendering correctly |
| AI labeling | ✅ Present | Clear 🤖 / ✅ separation throughout |

### 🔧 Gaps Requiring Phase 1 Attention

| Area | Gap | Priority |
|---|---|---|
| SEO metadata | "Cameroon international" in layout.tsx — incorrect (he's German/dual) | HIGH |
| Config centralization | ScoutMode/FanImmersion still have hardcoded arrays | MEDIUM |
| Story emotional depth | Timeline is informational, not documentary-cinematic | HIGH |
| Hero atmosphere | Solid but lacks full "THE ARRIVAL" tunnel-walk tension | HIGH |
| Mobile verification | Responsive behavior unverified on real viewport | HIGH |
| Font loading | Google Fonts may block render without display=swap | MEDIUM |
| Navigation quality | Not audited this session | MEDIUM |

---

## 1. VERIFIED CONTENT REWRITE STRATEGY

### Principle: One Source, Many Surfaces

All player data lives in `src/config/player.ts`. Components import from it. Nothing hardcoded.

```
player.ts
├── PLAYER            → Identity, DOB, height, nationality
├── CLUBS             → Current loan (Fürth) + parent club (Frankfurt)
├── YOUTH_CLUBS       → TuRa → SW Essen → Rot-Weiss Essen
├── SEASON_STATS_2526 → Verified 17G / 5A / 32apps
├── MARKET_VALUE      → €5M base (Dec 2025 Transfermarkt)
├── TRANSFER_NEWS     → Frankfurt buy-back, HSV interest
├── AI_SCOUT          → Projections — labeled, separated
├── STORY_TIMELINE    → Verified narrative beats
└── BRAND             → Colors, agency, site identity
```

### Language Rules

| ❌ Never Write | ✅ Write Instead |
|---|---|
| "World-class striker" | "Breakout striker — 17 goals in 32 games" |
| "Top European clubs watching" | "Multiple Bundesliga clubs confirmed interest" |
| "Clinical finisher" (unsourced) | "17 goals in 32 appearances (✅ Transfermarkt)" |
| Any quote attributed to Noel | Brand narrative only — labeled 🎨 |
| "Sprint speed: 36.2 km/h" | "Explosive profile — AI-estimated acceleration 🤖" |
| "Already legendary" | "Rapidly rising — trajectory confirmed upward" |

---

## 2. REALISM-FIRST STORYTELLING FRAMEWORK

### The Core Narrative: THE RISE

Not "already arrived." Not "destined for greatness."
The story is: **the climb — happening right now, in real time.**

### Emotional Beats (in documentary order)

1. **Essen** — Industrial city. Working class roots. Real football upbringing.
2. **The Grind** — Three youth clubs, same city, different challenges.
3. **Frankfurt Recognition** — A Bundesliga club believes in him. Signs him.
4. **The Loan** — Sent to prove himself. Not given anything. Fürth, #9.
5. **The Explosion** — 17 goals. 32 games. 49% of team's goals. Undeniable.
6. **The Return** — Frankfurt activates buy-back. The proof worked.
7. **What's Next** — Open. Unwritten. The audience witnesses it live.

### Tone

- **Raw confidence, not braggadocio** — numbers speak, not adjectives
- **Cameroonian heritage as pride, not exoticism** — identity, family, roots
- **German precision + African passion** — the dual identity is strength
- **Youth as momentum** — 23 years old, already delivering

---

## 3. SOURCE-OF-TRUTH PLAYER DATA ARCHITECTURE

```
src/
├── config/
│   └── player.ts            ← MASTER CONFIG (✅ built)
│
├── types/
│   └── player.types.ts      ← TypeScript interfaces (ADD Phase 1)
│
└── components/sections/
    ├── Hero.tsx              ← imports: PLAYER, CLUBS, SEASON_STATS_2526, BRAND ✅
    ├── Story.tsx             ← imports: STORY_TIMELINE ✅ (needs wiring)
    ├── PerformanceLab.tsx    ← imports: SEASON_STATS_2526 ✅
    ├── ScoutMode.tsx         ← NEEDS wiring to AI_SCOUT config
    ├── FanImmersion.tsx      ← NEEDS wiring to PLAYER/CLUBS/SEASON_STATS_2526
    ├── LegacyWall.tsx        ← partial wiring
    └── SponsorZone.tsx       ← needs audit
```

### TypeScript Interfaces to Add

```typescript
// src/types/player.types.ts
export type DataIntegrity = "verified" | "reported" | "ai_sim" | "narrative";

export interface StatEntry {
  value: number | string;
  label: string;
  integrity: DataIntegrity;
  source?: string;
  season?: string;
}

export interface ClubEntry {
  name: string;
  league: string;
  status: "parent" | "current_loan" | "former";
  kitColor: string;
}

export interface TimelineItem {
  year: string;
  city: string;
  title: string;
  body: string;
  type: DataIntegrity;
  badge: string;
  icon: string;
}
```

---

## 4. MEDIA ASSET ORGANIZATION STRATEGY

### Current Assets — Verified Real Photos

```
src/assets/
├── 4.png           → Hero portrait — tunnel, red light — PRIMARY FACE ASSET
├── 1.jpg           → Match action — Fürth kit — PRIMARY ACTION ASSET
├── hero-image.webp → Frankfurt signing — contract day — PRIMARY MILESTONE ASSET
├── 2.webp          → Goal celebration — fist — emotion/legacy
├── 3.webp          → Celebration arms up — energy/joy
├── 1xx.webp        → Fürth action shot — secondary match action
└── 5.png           → Lifestyle editorial — white varsity jacket — brand/sponsor
```

### Assignment Matrix

| Asset | Section (Primary) | Section (Secondary) |
|---|---|---|
| `4.png` | Hero — dominant portrait | Identity callouts |
| `1.jpg` | Hero — background | Performance Lab action |
| `hero-image.webp` | Story — Frankfurt signing beat | Legacy Wall |
| `2.webp` | Legacy Wall celebration | Story 17-goals beat |
| `3.webp` | Hero floating accent | Fan Immersion energy |
| `1xx.webp` | Story — Fürth loan beat | Match Cinema thumbnail |
| `5.png` | Fan Immersion lifestyle | Sponsor Zone editorial |

### Universal Image Treatment

```css
/* Cinematic grade — all hero/feature images */
filter: contrast(1.06) saturate(0.82) brightness(0.87);

/* Bottom anchor gradient */
background: linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.92) 100%);

/* Gold frame accent — top edge */
border-top: 1px solid rgba(212,175,55,0.35);

/* Subtle vignette on portraits */
box-shadow: inset 0 0 80px rgba(0,0,0,0.6);
```

---

## 5. SECTION-BY-SECTION VISUAL STORYTELLING DIRECTION

### HERO — "THE ARRIVAL"
**Emotion:** Tunnel walk. Lights up. Player emerges. Something about to happen.
- Full viewport — no visual escape until scroll
- `1.jpg` background (dimmed 25%, very slight blur)
- `4.png` portrait — large, right of center, editorial crop
- Left: stat bar (17 / 5 / 32 / 49%) vertical stack, staggered entry
- "THE RISE" — massive bottom-left, staggered reveal
- Gold particle system on canvas layer
- Floating goal-count badge on portrait edge

### STORY — Documentary Pacing
**Emotion:** Short film. You're watching his life.
- Alternating layout but cinematically weighted
- `hero-image.webp` → Frankfurt signing beat
- `1xx.webp` → Fürth loan beat
- `2.webp` → 17-goals celebration beat
- 2026 → beat: intentionally open-ended, forward-facing

### PERFORMANCE LAB — Control Room
**Emotion:** A scout analyzing a player through pure data.
- Verified stats tab (primary) / AI attributes tab (secondary, clearly different)
- `1.jpg` on right — darkened, precision-framed
- Bars animate on scroll entry

### SCOUT MODE — Intelligence Terminal
**Emotion:** AI running calculations. Clinical. Serious.
- Terminal UI — gold-on-black mono font pacing
- Market value: verified €5M base + "Rising ↑" clearly separated from fact

### MATCH CINEMA — The Vault
**Emotion:** Premium viewing room. Controlled access.
- Dark card grid with real asset thumbnails
- `1.jpg`, `2.webp`, `3.webp`, `1xx.webp` used as visual anchors

### FAN IMMERSION — The Community
**Emotion:** Real people, real connection, AI-assisted experience.
- Chatbot left (primary) — clearly AI-labeled
- `5.png` lifestyle right — editorial, premium
- Fan wall: believable, grounded messages

### SPONSOR ZONE — Professional Presentation
**Emotion:** Boardroom confidence. CMO-ready.
- Clean, structured, no gimmicks
- Verified stats front and center
- `5.png` lifestyle editorial
- Clear CTA: contact/media kit

### LEGACY WALL — The Record
**Emotion:** Museum. Everything here is earned, not invented.
- Only verified milestones
- `2.webp` + `5.png` visual anchors
- Quote rotator clearly marked 🎨 brand narrative

---

## 6. CINEMATIC IMAGE TREATMENT STANDARDS

### The Visual Language

```
Palette:       Near-black (#030303) base → Gold (#D4AF37) accents
Contrast:      High — dark shadows, lit subject
Saturation:    -15 to -20% from natural — editorial, not Instagram
Brightness:    Subject 85-90% | Background 70-80%
Vignette:      Strong on hero imagery, subtle on cards
Overlay:       Always gradient: transparent → #030303 bottom
Border:        1px solid rgba(212,175,55,0.15-0.3) gold frame
```

### Non-Negotiable Rules

1. ❌ No AI-generated portraits — real photos only
2. ❌ No stock football imagery — Noel assets only
3. ❌ No heavy HDR or over-sharpening
4. ✅ `quality={85}` minimum in all next/image
5. ✅ Correct `sizes` prop for responsive loading
6. ✅ `objectPosition` tuned per specific asset
7. ✅ Gradient overlay for text legibility
8. ✅ Gold line accent where image meets text

---

## 7. AUTHENTICITY PROTECTION RULES

### The Red Lines — Never Cross

```
❌ Stats beyond what Transfermarkt records
❌ Trophies or awards not on public record
❌ Direct quotes attributed to Noel
❌ Transfer fees, contract values, salary
❌ Specific match events as facts (goal vs [club] on [date])
❌ International caps (none confirmed)
❌ Sponsorship claims without agreement
❌ Named player comparisons as factual equals
```

### AI / Projection Zone — Always Label 🤖

```
✓ Attribute scores (Finishing 95 etc)
✓ League compatibility percentages
✓ Formation fit ratings
✓ Market value trajectory
✓ AI scouting summaries
✓ Chatbot responses
✓ Sprint speed estimates
✓ xG projections
```

### Verified Zone — Source Required ✅

```
✓ Season stats → "Source: Transfermarkt · May 2026"
✓ Club data → "Source: Transfermarkt verified"
✓ Personal info → "Source: Transfermarkt"
✓ Transfer news → "Source: German football media · May 2026"
```

---

## 8. HOMEPAGE EMOTIONAL PACING MAP

```
SECTION          EMOTION              PACING         TEMPO
─────────────────────────────────────────────────────────────
HERO             Presence / Arrival   Immediate      Fast reveal
── gold divider ──
STORY            Journey / Humanity   Slow unfold    Documentary
── gold divider ──
PERFORMANCE LAB  Proof / Credibility  Data-driven    Precise
── gold divider ──
SCOUT MODE       Intelligence         Terminal pace  Clinical
── gold divider ──
MATCH CINEMA     Excitement / Energy  Medium-fast    Dynamic
── gold divider ──
FAN IMMERSION    Connection / Warmth  Conversational Human
── gold divider ──
SPONSOR ZONE     Authority / Clarity  Business-like  Direct
── gold divider ──
LEGACY WALL      Legacy / Permanence  Contemplative  Slow
```

Each `gold-line-full` divider = a breath between chapters.
Scroll-triggered reveals staggered 100ms between sibling elements.

---

## 9. IMPLEMENTATION PRIORITY ROADMAP

### Phase 1 — Foundation Hardening (Immediate)

| # | Task | Effort |
|---|---|---|
| P1-01 | Fix SEO metadata (remove "Cameroon international") | 5 min |
| P1-02 | Add player.types.ts TypeScript interfaces | 15 min |
| P1-03 | Wire ScoutMode to AI_SCOUT config | 20 min |
| P1-04 | Wire FanImmersion chatbot to player.ts | 15 min |
| P1-05 | Audit + fix Navigation and Footer | 20 min |
| P1-06 | Font loading: add display=swap | 5 min |
| P1-07 | Mobile responsive audit — 375px/390px/414px | 30 min |
| P1-08 | Install sharp for image optimization | 5 min |
| P1-09 | Lighthouse audit + CWV fixes | 20 min |

**Total Phase 1: ~2.5 hours**

### Phase 2 — Emotional Upgrade (Next)

- Hero: Full "THE ARRIVAL" cinematic enhancement
- Story: Pull-quote callouts, documentary typography
- MatchCinema: Real asset thumbnails properly assigned
- Add prefers-reduced-motion respect across all animations
- Accessibility: skip-to-content, proper ARIA landmarks

### Phase 3 — Polish & Deploy (Then)

- Vercel deployment configuration
- Dynamic OpenGraph image generation
- Analytics integration (Plausible or simple GA4)
- Contact form functional wiring
- Final Core Web Vitals green

---

## 10. CLAUDE CODE SAFE-BUILD INSTRUCTIONS

### Critical: Windows NTFS Truncation Workaround

Files > ~13KB written via Write/Edit tools to workspace paths get silently truncated.

**Safe workflow for all large files:**

```bash
# 1. Write to Linux build dir via Python (no truncation)
python3 -c "
content = open('/tmp/source.tsx').read()
with open('/tmp/noel-v14/src/components/sections/File.tsx','w') as f:
    f.write(content)
print(f'{len(content)} chars, {content.count(chr(10))} lines')
"

# 2. Verify file ends correctly
tail -c 5 /tmp/noel-v14/src/components/sections/File.tsx | xxd
# Must show: 7d 0a (closing brace + newline)

# 3. Build to confirm
cd /tmp/noel-v14 && node_modules/.bin/next build

# 4. Sync to workspace
cp /tmp/noel-v14/src/.../File.tsx /sessions/exciting-tender-cerf/mnt/noel-futkeu/src/.../File.tsx
```

### File Size Guidelines

| Size | Method |
|---|---|
| < 80 lines | Write/Edit tools directly to workspace path |
| > 80 lines | Python to `/tmp/noel-v14/`, then `cp` to workspace |
| Config/types | Always safe to Write/Edit (small) |

### Build Environment Reference

```
Build dir:     /tmp/noel-v14/
Workspace:     /sessions/exciting-tender-cerf/mnt/noel-futkeu/
Windows path:  C:\Users\loneb\Documents\ai-software-dev\projects\noel-futkeu
Framework:     Next.js 14.2.29 (not v16 — SWC binary issue on NTFS)
```

---

*Strategy document generated: May 2026*
*Project: Noel Futkeu Official Platform*
*Agency: MaxPromo Digital — maxpromo.digital*
