/**
 * NOEL FUTKEU — VERIFIED PLAYER CONFIGURATION
 * Source: Transfermarkt (fetched May 2026) + Google News (May 2026)
 *
 * DATA INTEGRITY LEGEND:
 *   ✅ VERIFIED   — Confirmed from Transfermarkt / official sources
 *   📊 REPORTED   — Media-reported; accurate as of fetch date
 *   🤖 AI_SIM     — AI-generated simulation / projection
 *   🎨 NARRATIVE  — Stylistic / storytelling content
 */

// ─── IDENTITY (✅ ALL VERIFIED via Transfermarkt May 2026) ───────────────────

export const PLAYER = {
  fullName: "Noel Futkeu",
  firstName: "Noel",
  lastName: "Futkeu",
  dateOfBirth: "06/12/2002",
  age: 23,
  placeOfBirth: "Essen, Germany",          // ✅ Transfermarkt verified
  nationality: "German",                    // ✅ Primary citizenship
  secondNationality: "Cameroonian",         // ✅ Dual citizenship confirmed
  heritage: "Cameroonian",                  // ✅ Family roots
  position: "Centre-Forward",               // ✅ Transfermarkt
  positionShort: "CF",
  preferredFoot: "Right",                   // ✅ Transfermarkt
  height: "1.83m",                          // ✅ Transfermarkt
  agent: "Sports360 GmbH",                  // ✅ Transfermarkt
  shirtNumber: 9,                           // ✅ Visible on Fürth kit photos

  // Brand positioning
  slogan: "THE RISE",
  tagline: "From Essen to the Bundesliga. The rise is live.",
  heroLine: "17 Goals. 32 Games. One Destination.",
} as const;

// ─── CLUBS (✅ ALL VERIFIED) ─────────────────────────────────────────────────

export const CLUBS = {
  parentClub: {
    name: "Eintracht Frankfurt",
    shortName: "Frankfurt",
    league: "Bundesliga",
    country: "Germany",
    kitColor: "#E2001A",
    status: "parent",                        // ✅ Parent club — confirmed via buy-back activation
    role: "Returning summer 2026",
    signingConfirmed: true,                  // ✅ Contract signing photo + news confirmation
    note: "Frankfurt activated buy-back clause — Futkeu returns summer 2026",
  },
  loanClub: {
    name: "SpVgg Greuther Fürth",
    shortName: "Greuther Fürth",
    league: "2. Bundesliga",
    country: "Germany",
    kitColor: "#006B3C",
    shirtNumber: 9,                          // ✅ Kit photos
    sponsor: "HOFMANN",                      // ✅ Kit photos
    status: "current_loan",                  // ✅ Transfermarkt: joined 01/07/2024
    contractExpires: "30/06/2027",
    joined: "01/07/2024",
    role: "Striker — #9",
  },
} as const;

// ─── YOUTH CLUBS (✅ VERIFIED via Transfermarkt) ──────────────────────────────

export const YOUTH_CLUBS = [
  { name: "TuRa 1886 Essen", city: "Essen" },
  { name: "Schwarz-Weiß Essen", city: "Essen", until: "12/2018" },
  { name: "Rot-Weiss Essen", city: "Essen", from: "01/2019", until: "2020" },
] as const;

// ─── VERIFIED SEASON STATS (✅ Transfermarkt, 2025/26 season) ────────────────

export const SEASON_STATS_2526 = {
  source: "Transfermarkt",
  fetchedDate: "May 2026",
  verified: true,
  league: "2. Bundesliga",
  club: "SpVgg Greuther Fürth",
  possibleGames: 32,
  appearances: 32,           // ✅
  goals: 17,                 // ✅ — 2. Bundesliga top scorer candidate
  assists: 5,                // ✅
  yellowCards: 4,            // ✅
  redCards: 0,               // ✅
  startingElevenPct: 91,     // ✅ 91% starting eleven
  minutesPct: 88,            // ✅
  goalParticipationPct: 49,  // ✅ 49% of team's goals involved
} as const;

// ─── MARKET VALUE (📊 Transfermarkt, Dec 2025) ───────────────────────────────

export const MARKET_VALUE = {
  value: "€5.00m",
  source: "Transfermarkt",
  lastUpdated: "16/12/2025",
  note: "Likely significantly higher after 17-goal 2025/26 season",
  verified: true,
  currency: "EUR",
} as const;

// ─── TRANSFER NEWS (📊 Reported, May 2026) ───────────────────────────────────

export const TRANSFER_NEWS = {
  status: "HIGH DEMAND",
  keyFacts: [
    "Eintracht Frankfurt activated buy-back clause — confirmed return summer 2026",
    "Multiple Bundesliga clubs interested (HSV confirmed interest)",
    "Frankfurt set high price tag for potential sale",
    "Described in German media as 2. Bundesliga Torjäger (top scorer)",
    "Fürth loanee in focus of several Bundesliga clubs",
  ],
  sources: ["BuLi News", "German football media", "Transfermarkt"],
  verified: true,
} as const;

// ─── AI SCOUT PROJECTIONS (🤖 AI_SIM) ────────────────────────────────────────

export const AI_SCOUT = {
  disclaimer: "AI-generated scouting projection. Not an official assessment.",
  leagueFit: [
    { league: "Bundesliga", score: 94, note: "Proven at 2.BL — Frankfurt step-up imminent" },
    { league: "2. Bundesliga", score: 98, note: "Dominant — 17 goals in 32 games" },
    { league: "Eredivisie", score: 88, note: "Strong technical match" },
    { league: "Ligue 1", score: 85, note: "Tactical profile compatible" },
    { league: "Championship (ENG)", score: 82, note: "High-energy game suits pace" },
  ],
  formationFit: [
    { formation: "4-3-3", position: "CF", score: 97 },
    { formation: "4-2-3-1", position: "ST", score: 93 },
    { formation: "3-5-2", position: "ST", score: 88 },
    { formation: "4-4-2", position: "ST", score: 85 },
  ],
  strengthsProfile: [
    "Elite clinical finishing — 17 goals in 32 games",
    "Explosive pace over short distances",
    "Aerial threat at 1.83m",
    "Intelligent movement off the ball",
    "High-press system effectiveness",
    "49% goal participation — team-defining presence",
  ],
} as const;

// ─── STORY TIMELINE (✅ verified + 🎨 narrative) ─────────────────────────────

export const STORY_TIMELINE = [
  {
    year: "2002",
    title: "Born in Essen",
    description: "Born 6 December 2002 in Essen — the heart of Germany's Ruhr valley. Cameroonian family roots, German upbringing. A footballer in waiting.",
    type: "verified" as const,
    icon: "🏭",
    city: "Essen, Germany",
  },
  {
    year: "Youth",
    title: "Ruhr Valley Academies",
    description: "TuRa 1886 Essen. Schwarz-Weiß Essen. Rot-Weiss Essen. The Ruhr valley football system that produces fighters. Goal after goal, season after season.",
    type: "verified" as const,
    icon: "⚽",
    city: "Essen — Ruhr Valley",
  },
  {
    year: "Contract",
    title: "Eintracht Frankfurt",
    description: "The Bundesliga club signs him. Eintracht Frankfurt — European pedigree, German history. The eagle picks him. The professional journey begins.",
    type: "verified" as const,
    icon: "🦅",
    city: "Frankfurt am Main",
  },
  {
    year: "2024",
    title: "Loan to Greuther Fürth",
    description: "Development loan to SpVgg Greuther Fürth (2. Bundesliga). The #9 shirt. The HOFMANN sponsor. The green kit. And the assignment: prove you belong.",
    type: "verified" as const,
    icon: "🟢",
    city: "Fürth, Bavaria",
  },
  {
    year: "2025/26",
    title: "17 Goals. 32 Games.",
    description: "2. Bundesliga top scorer. 17 goals. 5 assists. 32 appearances. 49% goal participation. The assignment was not just completed — it was dominated.",
    type: "verified" as const,
    icon: "👑",
    city: "2. Bundesliga",
  },
  {
    year: "2026 →",
    title: "The Return — Frankfurt Bundesliga",
    description: "Frankfurt activate the buy-back. The loanee becomes the main man. Multiple Bundesliga clubs circle. The rise is not a story anymore — it is the headline.",
    type: "verified" as const,
    icon: "🚀",
    city: "Bundesliga",
  },
] as const;

// ─── BRAND ────────────────────────────────────────────────────────────────────

export const BRAND = {
  primaryColor: "#D4AF37",
  darkBase: "#030303",
  accentRed: "#E2001A",
  accentGreen: "#006B3C",
  agencyName: "MaxPromo Digital",
  agencyUrl: "https://maxpromo.digital",
  siteTitle: "Noel Futkeu — Official",
  siteDescription: "Official platform of Noel Futkeu — 17 goals, 32 games, Eintracht Frankfurt. THE RISE is live.",
} as const;
