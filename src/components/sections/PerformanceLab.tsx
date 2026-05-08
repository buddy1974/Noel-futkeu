"use client";
import { useEffect, useRef, useState } from "react";

const PERFORMANCE_STATS = [
  { label: "Pace", value: 95, color: "#D4AF37" },
  { label: "Shooting", value: 88, color: "#FFD700" },
  { label: "Dribbling", value: 91, color: "#D4AF37" },
  { label: "Passing", value: 79, color: "#B8960C" },
  { label: "Physical", value: 84, color: "#D4AF37" },
  { label: "Defending", value: 62, color: "#888888" },
];

const SEASON_STATS = [
  { label: "Goals", value: 34, icon: "⚽", color: "#D4AF37" },
  { label: "Assists", value: 18, icon: "🅰️", color: "#B8960C" },
  { label: "Apps", value: 38, icon: "📋", color: "#D4AF37" },
  { label: "Shots on Target", value: 112, icon: "🎯", color: "#FFD700" },
  { label: "Key Passes", value: 89, icon: "🔑", color: "#D4AF37" },
  { label: "Dribbles Won", value: 142, icon: "💨", color: "#B8960C" },
  { label: "xG", value: 28.7, icon: "📊", color: "#D4AF37" },
  { label: "Minutes", value: 3240, icon: "⏱️", color: "#888888" },
];

const HEATMAP_DOTS = [
  { x: 72, y: 25, size: 32, opacity: 0.9 },
  { x: 65, y: 45, size: 28, opacity: 0.85 },
  { x: 78, y: 50, size: 24, opacity: 0.7 },
  { x: 58, y: 30, size: 20, opacity: 0.6 },
  { x: 82, y: 65, size: 18, opacity: 0.5 },
  { x: 70, y: 70, size: 16, opacity: 0.4 },
  { x: 55, y: 55, size: 14, opacity: 0.35 },
  { x: 85, y: 35, size: 12, opacity: 0.3 },
  { x: 60, y: 20, size: 10, opacity: 0.25 },
];

const MONTHLY_GOALS = [
  { month: "Aug", goals: 3, assists: 1 },
  { month: "Sep", goals: 5, assists: 2 },
  { month: "Oct", goals: 4, assists: 3 },
  { month: "Nov", goals: 6, assists: 4 },
  { month: "Dec", goals: 3, assists: 2 },
  { month: "Jan", goals: 4, assists: 1 },
  { month: "Feb", goals: 5, assists: 3 },
  { month: "Mar", goals: 4, assists: 2 },
];

export default function PerformanceLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "heatmap" | "chart">("stats");

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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visible]);

  const maxGoals = Math.max(...MONTHLY_GOALS.map((m) => m.goals));

  return (
    <section
      id="performance"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #0D0D0D 50%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 reveal">
          <div>
            <div className="section-label">
              <span className="font-label">AI-Powered</span>
            </div>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
            >
              Performance{" "}
              <span className="text-gradient-gold">Lab</span>
            </h2>
          </div>
          <div className="mt-6 lg:mt-0 flex gap-2">
            {(["stats", "heatmap", "chart"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-yellow-500 text-black"
                    : "border border-white/10 text-white/50 hover:border-yellow-400/30 hover:text-white/80"
                }`}
              >
                {tab === "stats" ? "Radar" : tab === "heatmap" ? "Heatmap" : "Goals"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Radar / Heatmap / Chart */}
          <div className="reveal-left">
            {/* RADAR STATS */}
            {activeTab === "stats" && (
              <div className="glass-card p-8 h-full">
                <div className="font-label mb-6">Player Attributes — 2025/26</div>
                <div className="space-y-5">
                  {PERFORMANCE_STATS.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/70 text-sm font-medium">{stat.label}</span>
                        <span
                          className="font-black text-lg"
                          style={{ color: stat.color, letterSpacing: "-0.02em" }}
                        >
                          {stat.value}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: visible ? `${stat.value}%` : "0%",
                            background: `linear-gradient(90deg, ${stat.color}, ${stat.color}cc)`,
                            transitionDelay: `${i * 0.1}s`,
                            boxShadow: `0 0 12px ${stat.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Rating */}
                <div
                  className="mt-8 text-center py-6 rounded-xl"
                  style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <div className="font-label mb-1" style={{ fontSize: "0.6rem" }}>Overall Rating</div>
                  <div
                    className="font-black text-gradient-gold"
                    style={{ fontSize: "5rem", letterSpacing: "-0.05em", lineHeight: 1 }}
                  >
                    87
                  </div>
                  <div className="font-label mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Elite Tier — Top 5%
                  </div>
                </div>
              </div>
            )}

            {/* HEATMAP */}
            {activeTab === "heatmap" && (
              <div className="glass-card p-8 h-full">
                <div className="font-label mb-4">Position Heatmap — Attack Zones</div>
                <div
                  className="relative mx-auto"
                  style={{
                    width: "100%", paddingBottom: "70%",
                    background: "linear-gradient(180deg, #0a1a0a 0%, #0d200d 100%)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px", overflow: "hidden",
                  }}
                >
                  {/* Pitch Markings */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 70"
                    preserveAspectRatio="none"
                  >
                    {/* Outline */}
                    <rect x="1" y="1" width="98" height="68" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                    {/* Centre */}
                    <line x1="50" y1="1" x2="50" y2="69" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                    <circle cx="50" cy="35" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                    {/* Penalty areas */}
                    <rect x="1" y="20" width="17" height="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                    <rect x="82" y="20" width="17" height="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
                    {/* Goals */}
                    <rect x="1" y="29" width="5" height="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                    <rect x="94" y="29" width="5" height="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                  </svg>
                  {/* Heatmap Dots */}
                  {HEATMAP_DOTS.map((dot, i) => (
                    <div
                      key={i}
                      className="heatmap-dot"
                      style={{
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        opacity: visible ? dot.opacity : 0,
                        transition: `opacity 0.8s ease ${i * 0.1}s`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                  {/* Label */}
                  <div className="absolute bottom-2 left-2 font-label" style={{ fontSize: "0.5rem", color: "rgba(212,175,55,0.5)" }}>
                    Primary Operating Zone: Final Third
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="glass-card-gold p-3 text-center">
                    <div className="font-label mb-1" style={{ fontSize: "0.55rem" }}>Shots in Box</div>
                    <div className="text-gradient-gold font-black text-xl">78%</div>
                  </div>
                  <div className="glass-card-gold p-3 text-center">
                    <div className="font-label mb-1" style={{ fontSize: "0.55rem" }}>Attack Zone Touch</div>
                    <div className="text-gradient-gold font-black text-xl">64%</div>
                  </div>
                </div>
              </div>
            )}

            {/* GOALS CHART */}
            {activeTab === "chart" && (
              <div className="glass-card p-8 h-full">
                <div className="font-label mb-6">Monthly Goal Contribution — 2025/26</div>
                <div className="flex items-end gap-3 h-48 mb-4">
                  {MONTHLY_GOALS.map((m, i) => (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                      {/* Assists */}
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: visible ? `${(m.assists / maxGoals) * 80}px` : "0px",
                          background: "rgba(184,150,12,0.4)",
                          transition: `height 0.8s var(--ease-luxury) ${i * 0.08}s`,
                        }}
                      />
                      {/* Goals */}
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: visible ? `${(m.goals / maxGoals) * 120}px` : "0px",
                          background: "linear-gradient(0deg, #D4AF37, #FFD700)",
                          transition: `height 0.8s var(--ease-luxury) ${i * 0.08 + 0.1}s`,
                          boxShadow: "0 -4px 12px rgba(212,175,55,0.3)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  {MONTHLY_GOALS.map((m) => (
                    <div key={m.month} className="flex-1 text-center">
                      <span className="font-label" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>
                        {m.month}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "#D4AF37" }} />
                    <span className="font-label" style={{ fontSize: "0.6rem" }}>Goals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: "rgba(184,150,12,0.4)" }} />
                    <span className="font-label" style={{ fontSize: "0.6rem" }}>Assists</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Season Stats Grid */}
          <div className="space-y-4 reveal-right">
            <div className="font-label mb-2">Season Statistics 2025/26</div>
            <div className="grid grid-cols-2 gap-4">
              {SEASON_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card p-5 hover:border-yellow-400/20 transition-all duration-300 group"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s var(--ease-luxury) ${i * 0.08}s`,
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className="font-black mb-1"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                      letterSpacing: "-0.03em",
                      color: stat.color,
                    }}
                  >
                    {typeof stat.value === "number" && !Number.isInteger(stat.value)
                      ? stat.value.toFixed(1)
                      : stat.value.toLocaleString()}
                  </div>
                  <div className="font-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Sprint Speed Card */}
            <div
              className="glass-card-gold p-6"
              style={{ border: "1px solid rgba(212,175,55,0.25)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-label mb-1" style={{ fontSize: "0.6rem" }}>Max Sprint Speed</div>
                  <div
                    className="font-black text-gradient-gold"
                    style={{ fontSize: "3rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    36.2 km/h
                  </div>
                </div>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "conic-gradient(#D4AF37 0% 82%, rgba(255,255,255,0.05) 82% 100%)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "#0D0D0D" }}
                  >
                    <span className="font-black text-sm text-gradient-gold">Top<br />5%</span>
                  </div>
                </div>
              </div>
              <div className="font-label" style={{ color: "rgba(255,255,255,0.4)" }}>
                Faster than 95% of professional footballers in tracked competitions
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Strip */}
        <div className="mt-12 reveal">
          <div className="gold-line-full mb-8" />
          <div className="font-label mb-4 text-center">Goals Per 90 Minutes — Benchmark Comparison</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Noel Futkeu", val: 0.89, highlight: true },
              { name: "League Average", val: 0.34, highlight: false },
              { name: "Top 10 Average", val: 0.71, highlight: false },
              { name: "Elite Target", val: 0.75, highlight: false },
            ].map((item) => (
              <div
                key={item.name}
                className={`p-5 text-center rounded-xl ${
                  item.highlight ? "glow-gold-sm" : ""
                }`}
                style={{
                  background: item.highlight ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${item.highlight ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <div
                  className={`font-black text-3xl mb-1 ${item.highlight ? "text-gradient-gold" : "text-white/60"}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {item.val}
                </div>
                <div className="font-label" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)" }}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
