/**
 * NOEL FUTKEU PLATFORM — TypeScript Type Definitions
 * MaxPromo Digital © 2026
 */

/** Data integrity label — used throughout the platform */
export type DataIntegrity = "verified" | "reported" | "ai_sim" | "narrative";

export interface StatEntry {
  value: number | string;
  suffix?: string;
  label: string;
  note?: string;
  integrity: DataIntegrity;
  source?: string;
  season?: string;
  max?: number;
}

export interface ClubEntry {
  name: string;
  shortName: string;
  league: string;
  country: string;
  kitColor: string;
  status: "parent" | "current_loan" | "former";
}

export interface TimelineItem {
  year: string;
  city: string;
  title: string;
  body: string;
  icon: string;
  side: "left" | "right";
  type: DataIntegrity;
  badge: string;
  photoKey?: "frankfurt" | "furth" | "celebration";
}

export interface LeagueFitEntry {
  league: string;
  score: number;
  note: string;
  flag?: string;
}

export interface FormationFitEntry {
  formation: string;
  position: string;
  score: number;
}

export interface StrengthEntry {
  label: string;
  score: number;
  desc: string;
}

export interface TransferNewsEntry {
  status: string;
  keyFacts: readonly string[];
  sources: readonly string[];
  verified: boolean;
}
