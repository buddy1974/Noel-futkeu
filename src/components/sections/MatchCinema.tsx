"use client";
import { useEffect, useRef, useState } from "react";

/**
 * MatchCinema — Highlight Showcase Section
 * NOTE: All highlight cards below are 🎨 CREATIVE CONCEPT representations.
 * They are stylised descriptions of Futkeu's documented playing style and
 * documented statistical profile — NOT specific match records or verified events.
 * Verified match stats: 17 goals, 5 assists, 32 appearances (SpVgg Greuther Fürth, 2024-25).
 */

const HIGHLIGHTS = [
  {
    id: 1, category: "Goals", label: "Clinical Finish — Top Corner", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["Composed Finish", "Penalty Area", "Goal Scored"], color: "#D4AF37", icon: "⚽",
    desc: "The clinical striker's instinct that delivered 17 goals in 32 games. In tight spaces, under pressure — the finish is always composed.",
  },
  {
    id: 2, category: "Skills", label: "Explosive Pace Run", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["High Sprint Speed", "Beats Defender", "Creates Chance"], color: "#FFD700", icon: "💨",
    desc: "Acceleration off the mark that gives defenders no time to react. Explosive over 5-10m — the hallmark of a high-press striker.",
  },
  {
    id: 3, category: "Assists", label: "Intelligent Lay-Off", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["First Touch", "Hold-Up Play", "5 Assists Season"], color: "#D4AF37", icon: "🅰️",
    desc: "Not just a finisher — 5 assists in the 2024-25 season demonstrate the link-up quality that makes Futkeu a complete attacking option.",
  },
  {
    id: 4, category: "Goals", label: "Long-Range Strike", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["Distance Shot", "Power & Placement", "Goal Scored"], color: "#B8960C", icon: "🚀",
    desc: "From outside the area, with conviction — the type of strike that defines a striker who takes responsibility in big moments.",
  },
  {
    id: 5, category: "Pressing", label: "High Press Ball Win", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["Press Trigger", "Ball Recovered", "Counter Started"], color: "#D4AF37", icon: "⚡",
    desc: "Intense pressing from the front — a modern striker's defensive contribution that Fürth coaching staff highlighted as a key strength.",
  },
  {
    id: 6, category: "Clutch", label: "Match-Winning Goal", time: "Concept",
    match: "🎨 Stylised Showcase",
    stats: ["Decisive Moment", "Season Form", "17 Goals Total"], color: "#FFD700", icon: "👑",
    desc: "17 goals in 32 games is not luck — it is consistency under pressure, built over a full season of elite-level output.",
  },
];

const CATEGORIES = ["All", "Goals", "Skills", "Assists", "Pressing", "Clutch"];

const AI_SUMMARIES = [
  "Documented output: 17 goals and 5 assists in 32 appearances — a goal contribution every 1.8 games.",
  "High-press efficiency: documented as a key tactical asset in Fürth's attacking system, 2024-25.",
  "Clinical finishing: 0.53 goals per game average over the full 2024-25 season — elite striker output.",
];

export default function MatchCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(HIGHLIGHTS[0]);
  const [aiSummary, setAiSummary] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiSummary((prev) => (prev + 1) % AI_SUMMARIES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = activeCategory === "All"
    ? HIGHLIGHTS
    : HIGHLIGHTS.filter((h) => h.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="cinema"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #030303 0%, #0a0a0a 50%, #030303 100%)" }}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-4"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="section-label">
            <span className="font-label">Match Cinema</span>
          </div>
          <h2 className="section-title mb-6">
            THE PLAYER.<br />
            <span style={{ color: "#D4AF37" }}>IN MOTION.</span>
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-white/40 text-sm font-light max-w-xl leading-relaxed">
              Visual showcase of playing style, movement patterns and attacking intelligence — 
              drawn from documented statistical output.
            </p>
            <span className="px-3 py-1 text-xs rounded-full font-semibold"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "rgba(212,175,55,0.7)" }}>
              🎨 Creative Showcase — Stylised Concepts
            </span>
          </div>
        </div>

        {/* AI Stat Ticker */}
        <div className={`mb-10 transition-all duration-1000 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="glass-card p-4 flex items-center gap-4" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ background: "rgba(212,175,55,0.2)" }}>📊</div>
              <span className="font-label text-xs">Verified Output</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div
                key={aiSummary}
                className="text-white/60 text-sm font-light"
                style={{ animation: "fadeInUp 0.5s ease forwards" }}
              >
                {AI_SUMMARIES[aiSummary]}
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200"
              style={{
                background: activeCategory === cat ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                border: activeCategory === cat ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: activeCategory === cat ? "#D4AF37" : "rgba(255,255,255,0.5)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured Card */}
          <div className="lg:col-span-3 reveal">
            <div className="glass-card overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>

              {/* Video Placeholder */}
              <div className="relative h-72 lg:h-80 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">{selected.icon}</div>
                  <div className="px-3 py-1 text-xs rounded-full font-semibold mb-2"
                    style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37" }}>
                    {selected.category}
                  </div>
                  <div className="font-label text-center" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.5)" }}>
                    {selected.match}
                  </div>
                </div>
                <div className="absolute inset-0 blur-2xl text-6xl opacity-30 flex items-center justify-center">
                  {selected.icon}
                </div>
              </div>

              {/* Play button */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(212,175,55,0.15)", border: "1.5px solid rgba(212,175,55,0.4)" }}>
                  <div className="w-0 h-0" style={{
                    borderTop: "10px solid transparent", borderBottom: "10px solid transparent",
                    borderLeft: "16px solid #D4AF37", marginLeft: "3px",
                  }} />
                </div>
              </div>

              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: "linear-gradient(0deg, #030303 0%, transparent 100%)" }} />

              {/* Info Panel */}
              <div className="p-6">
                <div className="font-label mb-1" style={{ color: "rgba(212,175,55,0.7)" }}>Playing Style Profile</div>
                <h3 className="text-xl font-bold text-white mb-2">{selected.label}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-5">{selected.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {selected.stats.map((s) => (
                    <span key={s} className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Reel List */}
          <div className="lg:col-span-2 space-y-3 reveal-right">
            <div className="font-label mb-4">Style Profile Cards</div>
            {filtered.map((h, i) => (
              <div key={h.id} onClick={() => setSelected(h)}
                className="video-card glass-card p-4 cursor-pointer transition-all duration-300 group"
                style={{
                  border: selected.id === h.id ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  background: selected.id === h.id ? "rgba(212,175,55,0.05)" : undefined,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.19,1,0.22,1) ${i * 0.06}s`,
                }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ background: "rgba(212,175,55,0.08)" }}>
                    {h.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold" style={{ color: h.color }}>{h.category}</span>
                      <span className="text-xs font-mono text-white/30">{h.time}</span>
                    </div>
                    <div className="text-white/80 text-sm font-semibold truncate group-hover:text-yellow-400 transition-colors duration-200">
                      {h.label}
                    </div>
                    <div className="text-white/30 text-xs mt-0.5 truncate">{h.match}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Verified Output Card */}
            <div className="glass-card-gold p-5 mt-2" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.2)" }}>📊</div>
                <div>
                  <div className="text-white text-xs font-bold">Verified Season Output</div>
                  <div className="font-label" style={{ fontSize: "0.5rem", color: "rgba(212,175,55,0.6)" }}>
                    ✅ SpVgg Greuther Fürth 2024-25
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-xs font-light leading-relaxed italic">
                &ldquo;17 goals and 5 assists across 32 appearances — a goal contribution rate that
                places Futkeu among the elite young strikers in German football. The numbers
                are not projection. They are the record.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes waveform {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.8); }
        }
      `}</style>
    </section>
  );
}
