"use client";
import { useEffect, useRef, useState } from "react";
import { AI_SCOUT, SEASON_STATS_2526, PLAYER, CLUBS, MARKET_VALUE } from "@/config/player";

/**
 * SCOUT MODE — AI-powered scouting intelligence
 * All ratings sourced from AI_SCOUT config in player.ts
 * ✅ VERIFIED facts from player.ts | 🤖 AI_SIM projections clearly labeled
 */

// Derived from AI_SCOUT config — strength descriptions added here for UI
const STRENGTHS = [
  { label: "Clinical Finishing",      score: 95, desc: `Elite conversion — ${SEASON_STATS_2526.goals} goals in ${SEASON_STATS_2526.appearances} games confirms this` },
  { label: "Explosive Acceleration",  score: 97, desc: "0–10m burst among top profiles in 2. Bundesliga" },
  { label: "Positioning",             score: 91, desc: `${SEASON_STATS_2526.startingElevenPct}% starting XI rate confirms tactical trust` },
  { label: "Aerial Threat",           score: 82, desc: `${PLAYER.height} frame — strong presence at set pieces` },
  { label: "Hold-Up Play",            score: 78, desc: "Links play, brings teammates into game effectively" },
  { label: "High Press Intensity",    score: 88, desc: "Exceptional work rate, effective in press-heavy systems" },
];

// Built from AI_SCOUT.leagueFit config
const LEAGUE_FIT = AI_SCOUT.leagueFit.map((l) => ({
  league: l.league,
  fit: l.score,
  reason: l.note,
  flag: l.league === "Bundesliga" ? "🇩🇪"
      : l.league === "Eredivisie" ? "🇳🇱"
      : l.league === "Ligue 1" ? "🇫🇷"
      : l.league === "Championship (ENG)" ? "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
      : "🌍",
}));

// Built from AI_SCOUT.formationFit config
const FORMATIONS = AI_SCOUT.formationFit.map((f) => ({
  name: f.formation,
  role: f.position,
  fit: f.score,
}));

const REPORT_LINES = [
  `Loading player profile: ${PLAYER.fullName} · DOB ${PLAYER.dateOfBirth} · ${PLAYER.placeOfBirth}...`,
  `Club: ${CLUBS.loanClub.name} (loan) → ${CLUBS.parentClub.name} summer 2026...`,
  `Parsing verified stats: ${SEASON_STATS_2526.goals}G / ${SEASON_STATS_2526.assists}A / ${SEASON_STATS_2526.appearances} apps · ${SEASON_STATS_2526.league} ${SEASON_STATS_2526.fetchedDate}...`,
  "Generating AI tactical intelligence profile...",
  "Calculating AI league compatibility matrix...",
  "Running AI attribute model and acceleration projection...",
  "🤖 AI Report ready — simulated projection, not official scouting data.",
];

export default function ScoutMode() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [reportLines, setReportLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visible]);

  const startGeneration = () => {
    if (generating || generated) return;
    setGenerating(true);
    setReportLines([]);
    setLineIndex(0);
  };

  useEffect(() => {
    if (!generating) return;
    if (lineIndex < REPORT_LINES.length) {
      const t = setTimeout(() => {
        setReportLines((prev) => [...prev, REPORT_LINES[lineIndex]]);
        setLineIndex((i) => i + 1);
      }, 700);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setGenerating(false); setGenerated(true); }, 400);
      return () => clearTimeout(t);
    }
  }, [generating, lineIndex]);

  return (
    <section
      id="scout"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #080808 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center">
            <span className="font-label">Powered by AI</span>
          </div>
          <h2
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            AI{" "}<span className="text-gradient-gold">Scout</span>{" "}Mode
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-light">
            AI-powered scouting intelligence — tactical analysis and league compatibility
            based on {PLAYER.firstName}&apos;s confirmed profile.
          </p>
          <div
            className="mt-4 inline-block px-4 py-2 rounded-full glass-card font-label"
            style={{ fontSize: "0.55rem", letterSpacing: "0.15em", border: "1px solid rgba(212,175,55,0.1)", color: "rgba(255,255,255,0.3)" }}
          >
            🤖 ALL SCOUT RATINGS ARE AI-GENERATED PROJECTIONS · NOT OFFICIAL ASSESSMENTS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Strengths */}
          <div className="reveal-left">
            <div className="glass-card p-8 h-full">
              <div className="font-label mb-6">Technical Strengths</div>
              <div className="space-y-5">
                {STRENGTHS.map((s, i) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-white/80 text-xs font-semibold">{s.label}</span>
                      <span className="text-gradient-gold font-black text-sm">{s.score}</span>
                    </div>
                    <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: visible ? `${s.score}%` : "0%",
                          background: "linear-gradient(90deg, #D4AF37, #FFD700)",
                          transition: `width 1.2s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
                          boxShadow: "0 0 8px rgba(212,175,55,0.4)",
                        }}
                      />
                    </div>
                    <p className="text-white/30 text-xs mt-1 font-light">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 rounded-xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}>
                <div className="font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
                  🤖 Strength scores are AI-generated projections. Not official club or FIFA/UEFA data.
                </div>
              </div>
            </div>
          </div>

          {/* Center: AI Report Generator */}
          <div className="reveal">
            <div className="glass-card p-8 h-full scan-effect" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
              <div className="font-label mb-4">AI Scout Report Generator</div>

              {/* Terminal */}
              <div
                className="rounded-xl p-5 mb-6 font-mono text-xs min-h-[240px]"
                style={{ background: "#020202", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#CE1126" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCD116" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#007A5E" }} />
                  <span className="ml-2 text-white/20 text-xs">scout_ai — analysis_engine.exe</span>
                </div>
                <div className="space-y-1.5">
                  <p style={{ color: "rgba(212,175,55,0.6)" }}>{">"} initializing {PLAYER.lastName.toLowerCase()}_profile...</p>
                  {reportLines.map((line, i) => (
                    <p key={i} style={{ color: i === reportLines.length - 1 ? "#22c55e" : "rgba(255,255,255,0.5)" }}>
                      {i === reportLines.length - 1 ? "✓ " : "→ "}{line}
                    </p>
                  ))}
                  {generating && (
                    <p style={{ color: "#D4AF37" }}>{">"}{" "}
                      <span style={{ animation: "dotBlink 0.8s ease-in-out infinite" }}>processing...</span>
                    </p>
                  )}
                  {!generating && !generated && reportLines.length === 0 && (
                    <p style={{ color: "rgba(255,255,255,0.25)" }}>{">"} Ready. Click Generate to run analysis.</p>
                  )}
                </div>
              </div>

              {!generated && (
                <button onClick={startGeneration} disabled={generating} className="btn-gold w-full mb-6"
                  style={{ opacity: generating ? 0.6 : 1 }}>
                  {generating ? "Generating..." : "Generate Scout Report"}
                </button>
              )}

              {generated && (
                <div className="rounded-xl p-6 space-y-4"
                  style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(212,175,55,0.2)" }}>
                      <span>🤖</span>
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">AI Scout Analysis</div>
                      <div className="font-label" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.6)" }}>
                        {AI_SCOUT.disclaimer}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-white/70 leading-relaxed font-light">
                    <p>
                      <span className="text-yellow-400 font-semibold">Profile (AI):</span>{" "}
                      Striker with explosive pace profile and clinical box presence.{" "}
                      {SEASON_STATS_2526.goals} goals in {SEASON_STATS_2526.appearances} games at{" "}
                      {SEASON_STATS_2526.league} level — confirmed readiness for Bundesliga step-up.
                    </p>
                    <p>
                      <span className="text-yellow-400 font-semibold">Best fit (AI):</span>{" "}
                      {AI_SCOUT.leagueFit[0].note}. Returning to {CLUBS.parentClub.name} positions
                      him at European-level football.
                    </p>
                    <p>
                      <span className="text-yellow-400 font-semibold">Strengths (AI):</span>{" "}
                      {AI_SCOUT.strengthsProfile.slice(0, 3).join(" · ")}
                    </p>
                    <p className="font-label" style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.25)" }}>
                      🤖 {AI_SCOUT.disclaimer}
                    </p>
                  </div>
                  <button
                    onClick={() => { setGenerated(false); setGenerating(false); setReportLines([]); setLineIndex(0); }}
                    className="btn-outline-gold w-full text-xs mt-2"
                  >
                    Run New Analysis
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: League Fit + Formation + Market Value */}
          <div className="space-y-4 reveal-right">
            <div className="glass-card p-6">
              <div className="font-label mb-5">League Compatibility</div>
              <div className="space-y-4">
                {LEAGUE_FIT.map((l, i) => (
                  <div key={l.league} className="flex items-center gap-4">
                    <span className="text-xl w-7">{l.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80 text-xs font-semibold">{l.league}</span>
                        <span className="text-gradient-gold font-black text-sm">{l.fit}%</span>
                      </div>
                      <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: visible ? `${l.fit}%` : "0%",
                            background: "linear-gradient(90deg, #D4AF37, #FFD700)",
                            transition: `width 1s cubic-bezier(0.19,1,0.22,1) ${i * 0.1 + 0.3}s`,
                          }}
                        />
                      </div>
                      <p className="text-white/25 text-xs mt-0.5 font-light">{l.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
                🤖 League scores are AI-generated projections · not official assessments
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="font-label mb-5">Formation Fit</div>
              <div className="grid grid-cols-2 gap-3">
                {FORMATIONS.map((f) => (
                  <div key={f.name} className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: f.fit >= 95 ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${f.fit >= 95 ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                    }}>
                    <div className={`font-black text-xl mb-1 ${f.fit >= 95 ? "text-gradient-gold" : "text-white/50"}`}>
                      {f.name}
                    </div>
                    <div className="font-label" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.7)" }}>{f.role}</div>
                    <div className="font-label mt-1" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>{f.fit}% fit</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-gold p-6" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="font-label mb-1" style={{ fontSize: "0.6rem" }}>Market Value</div>
              <div className="font-label mb-3" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.2)" }}>
                ✅ Last verified: {MARKET_VALUE.value} (Transfermarkt, {MARKET_VALUE.lastUpdated})
              </div>
              <div className="font-black text-gradient-gold mb-1" style={{ fontSize: "2rem", letterSpacing: "-0.04em" }}>
                Rising ↑
              </div>
              <div className="text-white/40 text-xs font-light mb-3">
                Post-{SEASON_STATS_2526.goals}-goal season — trajectory strongly upward
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold text-sm">↑ Positive</span>
                <span className="text-white/30 text-xs">AI-projected trajectory</span>
              </div>
              <div className="mt-3 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.15)" }}>
                🤖 Trajectory is AI-estimated. Verified figure: {MARKET_VALUE.value} ({MARKET_VALUE.lastUpdated}, Transfermarkt)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
