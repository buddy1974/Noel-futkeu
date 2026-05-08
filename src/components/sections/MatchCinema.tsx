"use client";
import { useEffect, useRef, useState } from "react";

const HIGHLIGHTS = [
  {
    id: 1, category: "Goals", label: "Bicycle Kick vs Monaco", time: "87'", match: "Champions League QF",
    stats: ["Top Corner", "25m Distance", "0.94 xG"], color: "#D4AF37", icon: "⚽",
    desc: "An acrobatic overhead kick in the dying minutes. Pure instinct. Pure class.",
  },
  {
    id: 2, category: "Skills", label: "Elastico vs 3 Defenders", time: "62'", match: "Ligue 1 Week 28",
    stats: ["3 Players Beaten", "7.2m Covered", "Elite Dribble"], color: "#FFD700", icon: "💨",
    desc: "Trapped by three defenders in a tight corridor — and emerged the other side like it was nothing.",
  },
  {
    id: 3, category: "Assists", label: "No-Look Through Ball", time: "34'", match: "Europa League SF",
    stats: ["42m Pass", "98% Accuracy", "2nd Assist"],  color: "#D4AF37", icon: "🅰️",
    desc: "The pass nobody in the stadium saw coming. Instinctive vision at its finest.",
  },
  {
    id: 4, category: "Goals", label: "Long-Range Screamer", time: "12'", match: "Bundesliga R16",
    stats: ["28m Shot", "Top Corner", "0.04 xG"], color: "#B8960C", icon: "🚀",
    desc: "From distance, with power — a shot that left the goalkeeper completely rooted.",
  },
  {
    id: 5, category: "Pressing", label: "High Press Intercept", time: "55'", match: "Derby Match",
    stats: ["8.3m Sprint", "Ball Won", "Goal Scored"], color: "#D4AF37", icon: "⚡",
    desc: "Pressed the centre-back into a mistake at 36 km/h and converted in one touch.",
  },
  {
    id: 6, category: "Clutch", label: "93rd Minute Winner", time: "90+3'", match: "Title Decider",
    stats: ["Last Touch", "Title Won", "Top Scorer"], color: "#FFD700", icon: "👑",
    desc: "When the title was on the line. One chance. One touch. History made.",
  },
];

const CATEGORIES = ["All", "Goals", "Skills", "Assists", "Pressing", "Clutch"];

const AI_SUMMARIES = [
  "Dominant performance — 3 key chances created, 89% pass accuracy in final third.",
  "Top-press efficiency: 4 ball recoveries in opposition half, triggering 2 counter-attacks.",
  "Clinical finishing: 2 goals from 2 shots on target. xG overperformance: +1.06.",
];

export default function MatchCinema() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(HIGHLIGHTS[0]);
  const [aiSummary, setAiSummary] = useState(0);
  const [summaryVisible, setSummaryVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
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
    sectionRef.current?.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visible]);

  useEffect(() => {
    const t = setInterval(() => {
      setSummaryVisible(false);
      setTimeout(() => {
        setAiSummary((i) => (i + 1) % AI_SUMMARIES.length);
        setSummaryVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const filtered = activeCategory === "All"
    ? HIGHLIGHTS
    : HIGHLIGHTS.filter((h) => h.category === activeCategory);

  return (
    <section
      id="cinema"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #080808 60%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 reveal">
          <div>
            <div className="section-label">
              <span className="font-label">Netflix-Style</span>
            </div>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
              Match <span className="text-gradient-gold">Cinema</span>
            </h2>
          </div>
          {/* AI Summary Ticker */}
          <div className="mt-6 lg:mt-0 glass-card-gold px-5 py-3 max-w-sm"
            style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e", animation: "dotBlink 1.5s ease-in-out infinite" }} />
              <span className="font-label" style={{ fontSize: "0.55rem", color: "#22c55e" }}>AI Match Summary — Live</span>
            </div>
            <p className="text-white/70 text-xs font-light leading-relaxed"
              style={{ opacity: summaryVisible ? 1 : 0, transition: "opacity 0.4s ease" }}>
              {AI_SUMMARIES[aiSummary]}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10 reveal">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-yellow-500 text-black"
                  : "border border-white/10 text-white/40 hover:border-yellow-400/30 hover:text-white/70"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Feature Panel */}
          <div className="lg:col-span-3 reveal-left">
            <div className="glass-card overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
              {/* Simulated Video Screen */}
              <div className="relative aspect-video"
                style={{ background: "linear-gradient(135deg, #050505 0%, #0a0a0a 100%)" }}>
                {/* Stadium light simulation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: "300px", height: "300px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
                  }} />
                </div>
                {/* Pitch lines */}
                <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 16 9" preserveAspectRatio="xMidYMid meet">
                  <rect x="0.5" y="0.5" width="15" height="8" fill="none" stroke="white" strokeWidth="0.05"/>
                  <line x1="8" y1="0.5" x2="8" y2="8.5" stroke="white" strokeWidth="0.03"/>
                  <circle cx="8" cy="4.5" r="1.5" fill="none" stroke="white" strokeWidth="0.03"/>
                  <rect x="0.5" y="2.5" width="2" height="4" fill="none" stroke="white" strokeWidth="0.03"/>
                  <rect x="13.5" y="2.5" width="2" height="4" fill="none" stroke="white" strokeWidth="0.03"/>
                </svg>
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "rgba(212,175,55,0.9)", color: "#030303" }}>
                  {selected.category}
                </div>
                {/* Time */}
                <div className="absolute top-4 right-4 font-mono text-sm font-bold"
                  style={{ color: "#D4AF37", textShadow: "0 0 20px rgba(212,175,55,0.8)" }}>
                  {selected.time}
                </div>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="text-7xl animate-float">{selected.icon}</div>
                    <div className="absolute inset-0 blur-2xl text-6xl opacity-30 flex items-center justify-center">
                      {selected.icon}
                    </div>
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
              </div>

              {/* Info Panel */}
              <div className="p-6">
                <div className="font-label mb-1" style={{ color: "rgba(212,175,55,0.7)" }}>{selected.match}</div>
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
            <div className="font-label mb-4">Highlight Reel</div>
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

            {/* AI Commentator Card */}
            <div className="glass-card-gold p-5 mt-2" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.2)" }}>🤖</div>
                <div>
                  <div className="text-white text-xs font-bold">AI Commentator</div>
                  <div className="font-label" style={{ fontSize: "0.5rem", color: "rgba(212,175,55,0.6)" }}>Auto-Generated</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 rounded-full"
                      style={{
                        height: `${8 + i * 4}px`, background: "#D4AF37",
                        animation: `waveform 1s ease-in-out infinite ${i * 0.15}s`,
                      }} />
                  ))}
                </div>
              </div>
              <p className="text-white/60 text-xs font-light leading-relaxed italic">
                &ldquo;Futkeu accelerates past two defenders with explosive pace — and finishes with
                the composure of someone who&apos;s been here a thousand times before.
                That&apos;s the mark of a future world-class player.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
