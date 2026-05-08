"use client";
import { useEffect, useRef, useState } from "react";

const STRENGTHS = [
  { label: "Clinical Finishing", score: 95, desc: "Elite conversion rate in 1v1 and box situations" },
  { label: "Explosive Acceleration", score: 97, desc: "0–10m burst among fastest in Europe" },
  { label: "Technical Dribbling", score: 91, desc: "High success in tight spaces under pressure" },
  { label: "Aerial Threat", score: 82, desc: "Strong in the box despite physical frame" },
  { label: "Hold-Up Play", score: 78, desc: "Capable of linking play and bringing team forward" },
  { label: "High Press Intensity", score: 88, desc: "Exceptional work rate, triggers press effectively" },
];

const LEAGUE_FIT = [
  { league: "Bundesliga", fit: 96, flag: "🇩🇪", reason: "High-press systems, space behind defenses" },
  { league: "Ligue 1", fit: 94, flag: "🇫🇷", reason: "Dynamic attackers rewarded, transition football" },
  { league: "Serie A", fit: 87, flag: "🇮🇹", reason: "Tactical flexibility, strong counter-attack play" },
  { league: "Premier League", fit: 92, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", reason: "Physicality and pace ideal for EPL intensity" },
  { league: "La Liga", fit: 85, flag: "🇪🇸", reason: "Positional play developing, technical base strong" },
];

const FORMATIONS = [
  { name: "4-3-3", fit: 98, role: "CF / LW" },
  { name: "4-2-3-1", fit: 95, role: "CAM / ST" },
  { name: "3-5-2", fit: 88, role: "ST" },
  { name: "4-4-2", fit: 82, role: "ST" },
];

const REPORT_LINES = [
  "Analysing 38 match datasets across 2025/26 season...",
  "Processing 4,820 touch events and positional data...",
  "Generating tactical intelligence profile...",
  "Calculating league compatibility matrix...",
  "Projecting market value trajectory...",
  "Report ready. Loading scout analysis...",
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
      const t = setTimeout(() => {
        setGenerating(false);
        setGenerated(true);
      }, 400);
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
            AI{" "}
            <span className="text-gradient-gold">Scout</span>{" "}
            Mode
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            The future of player evaluation. Real AI-powered scouting intelligence —
            tactical analysis, league compatibility, and market projections.
          </p>
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
            </div>
          </div>

          {/* Center: AI Report Generator */}
          <div className="reveal">
            <div
              className="glass-card p-8 h-full scan-effect"
              style={{ border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <div className="font-label mb-4">AI Scout Report Generator</div>

              {/* Terminal UI */}
              <div
                className="rounded-xl p-5 mb-6 font-mono text-xs min-h-[240px] relative overflow-hidden"
                style={{ background: "#020202", border: "1px solid rgba(212,175,55,0.1)" }}
              >
                {/* Toolbar */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#CE1126" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FCD116" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#007A5E" }} />
                  <span className="ml-2 text-white/20 text-xs">scout_ai — analysis_engine.exe</span>
                </div>
                {/* Lines */}
                <div className="space-y-1.5">
                  <p style={{ color: "rgba(212,175,55,0.6)" }}>
                    {">"} initializing noel_futkeu_profile...
                  </p>
                  {reportLines.map((line, i) => (
                    <p
                      key={i}
                      style={{ color: i === reportLines.length - 1 ? "#22c55e" : "rgba(255,255,255,0.5)" }}
                    >
                      {i === reportLines.length - 1 ? "✓ " : "→ "}
                      {line}
                    </p>
                  ))}
                  {generating && (
                    <p style={{ color: "#D4AF37" }}>
                      {">"}{" "}
                      <span style={{ animation: "dotBlink 0.8s ease-in-out infinite" }}>
                        processing...
                      </span>
                    </p>
                  )}
                  {!generating && !generated && reportLines.length === 0 && (
                    <p style={{ color: "rgba(255,255,255,0.25)" }}>
                      {">"} Ready. Click Generate to run analysis.
                    </p>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              {!generated && (
                <button
                  onClick={startGeneration}
                  disabled={generating}
                  className="btn-gold w-full mb-6"
                  style={{ opacity: generating ? 0.6 : 1 }}
                >
                  {generating ? "Generating..." : "Generate Scout Report"}
                </button>
              )}

              {/* Report Output */}
              {generated && (
                <div
                  className="rounded-xl p-6 space-y-4"
                  style={{
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.2)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(212,175,55,0.2)" }}
                    >
                      <span>🤖</span>
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">AI Scout Analysis</div>
                      <div className="font-label" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.6)" }}>
                        Confidence: 94%
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-white/70 leading-relaxed font-light">
                    <p>
                      <span className="text-yellow-400 font-semibold">Profile:</span> Elite attacking forward with exceptional pace (top 3% globally) and clinical finishing.
                    </p>
                    <p>
                      <span className="text-yellow-400 font-semibold">Best fit:</span> High-press Bundesliga systems — RB Leipzig, Bayer Leverkusen profiles.
                    </p>
                    <p>
                      <span className="text-yellow-400 font-semibold">Verdict:</span> Ready for top-5 European league. Market value trajectory: +40% over 18 months.
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

          {/* Right: League Fit */}
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
            </div>

            {/* Formation Fit */}
            <div className="glass-card p-6">
              <div className="font-label mb-5">Formation Fit</div>
              <div className="grid grid-cols-2 gap-3">
                {FORMATIONS.map((f) => (
                  <div
                    key={f.name}
                    className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
                    style={{
                      background: f.fit >= 95 ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${f.fit >= 95 ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <div className={`font-black text-xl mb-1 ${f.fit >= 95 ? "text-gradient-gold" : "text-white/50"}`}>
                      {f.name}
                    </div>
                    <div className="font-label" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.7)" }}>
                      {f.role}
                    </div>
                    <div className="font-label mt-1" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>
                      {f.fit}% fit
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Value */}
            <div
              className="glass-card-gold p-6"
              style={{ border: "1px solid rgba(212,175,55,0.25)" }}
            >
              <div className="font-label mb-3">Market Value Projection</div>
              <div
                className="font-black text-gradient-gold mb-1"
                style={{ fontSize: "2.5rem", letterSpacing: "-0.04em" }}
              >
                €12M
              </div>
              <div className="text-white/40 text-xs font-light mb-3">Current Estimated Value</div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 font-bold text-sm">↑ +40%</span>
                <span className="text-white/30 text-xs">projected 18 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
