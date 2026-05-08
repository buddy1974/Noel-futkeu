"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import actionShot from "@/assets/1.jpg";

/**
 * PERFORMANCE LAB — Noel Futkeu
 * ✅ VERIFIED stats from Transfermarkt (May 2026)
 * 🤖 AI_SIM — projections clearly labeled
 */

const VERIFIED_STATS = [
  { label: "Goals", value: 17, suffix: "", max: 30, verified: true, note: "2. Bundesliga 2025/26" },
  { label: "Assists", value: 5, suffix: "", max: 15, verified: true, note: "2. Bundesliga 2025/26" },
  { label: "Appearances", value: 32, suffix: "", max: 34, verified: true, note: "2. Bundesliga 2025/26" },
  { label: "Starting XI", value: 91, suffix: "%", max: 100, verified: true, note: "91% of games started" },
  { label: "Goal Participation", value: 49, suffix: "%", max: 100, verified: true, note: "49% of team goals" },
  { label: "Yellow Cards", value: 4, suffix: "", max: 10, verified: true, note: "2025/26 season" },
];

const AI_ATTRIBUTES = [
  { label: "Finishing", value: 95, icon: "⚽" },
  { label: "Acceleration", value: 97, icon: "💨" },
  { label: "Positioning", value: 91, icon: "🧠" },
  { label: "Aerial Duel", value: 82, icon: "↑" },
  { label: "Pressing", value: 88, icon: "🔥" },
  { label: "Hold-Up Play", value: 78, icon: "🛡️" },
];

const SEASON_COMPARISON = [
  { league: "2. Bundesliga", season: "2025/26", goals: 17, apps: 32, goalsPerGame: "0.53", verified: true },
];

export default function PerformanceLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"verified" | "ai">("verified");

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

  return (
    <section
      id="performance"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #060606 50%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center">
            <span className="font-label">Analytics</span>
          </div>
          <h2
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            Performance <span className="text-gradient-gold">Lab</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-light">
            Real verified numbers. AI-projected attributes clearly labeled. No blurring the line.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab("verified")}
              className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                background: activeTab === "verified" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeTab === "verified" ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === "verified" ? "#D4AF37" : "rgba(255,255,255,0.4)",
              }}
            >
              ✅ Verified Stats
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                background: activeTab === "ai" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeTab === "ai" ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`,
                color: activeTab === "ai" ? "#D4AF37" : "rgba(255,255,255,0.4)",
              }}
            >
              🤖 AI Attribute Model
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Stats / Attributes */}
          <div className="lg:col-span-2 reveal-left">
            {activeTab === "verified" ? (
              <div className="glass-card p-8 h-full" style={{ border: "1px solid rgba(212,175,55,0.12)" }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="font-label">Season Statistics</div>
                  <div
                    className="px-2 py-1 rounded-full font-label"
                    style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", fontSize: "0.45rem", color: "rgba(212,175,55,0.8)" }}
                  >
                    ✅ SOURCE: TRANSFERMARKT · MAY 2026
                  </div>
                </div>
                <div className="space-y-6">
                  {VERIFIED_STATS.map((stat, i) => (
                    <div key={stat.label}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="text-white/80 text-sm font-semibold">{stat.label}</span>
                          <span className="text-white/25 text-xs ml-2">{stat.note}</span>
                        </div>
                        <span className="text-gradient-gold font-black text-lg">
                          {stat.value}{stat.suffix}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: visible ? `${(stat.value / stat.max) * 100}%` : "0%",
                            background: "linear-gradient(90deg, #D4AF37, #FFD700)",
                            transition: `width 1.4s cubic-bezier(0.19,1,0.22,1) ${i * 0.12}s`,
                            boxShadow: "0 0 8px rgba(212,175,55,0.35)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="font-label mb-1" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.2)" }}>
                    ✅ All stats above sourced from Transfermarkt, fetched May 2026. Club: SpVgg Greuther Fürth · League: 2. Bundesliga · Season: 2025/26
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 h-full" style={{ border: "1px solid rgba(212,175,55,0.12)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="font-label">AI Attribute Model</div>
                  <div
                    className="px-2 py-1 rounded-full font-label"
                    style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)", fontSize: "0.45rem", color: "rgba(212,175,55,0.6)" }}
                  >
                    🤖 AI PROJECTIONS — NOT OFFICIAL
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {AI_ATTRIBUTES.map((attr, i) => (
                    <div key={attr.label}
                      className="p-5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.06)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{attr.icon}</span>
                        <span className="text-white/60 text-xs font-semibold">{attr.label}</span>
                      </div>
                      <div className="font-black text-gradient-gold mb-2" style={{ fontSize: "2rem", letterSpacing: "-0.04em" }}>
                        {attr.value}
                      </div>
                      <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: visible ? `${attr.value}%` : "0%",
                            background: "linear-gradient(90deg, #D4AF37, #FFD700)",
                            transition: `width 1.2s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.1)" }}>
                  <div className="font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
                    🤖 All attribute scores above are AI-generated projections based on play style analysis. They are NOT official club measurements or FIFA/UEFA ratings.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Photo + Key Numbers */}
          <div className="space-y-6 reveal-right">
            {/* Action photo */}
            <div className="relative overflow-hidden rounded-2xl"
              style={{ height: "300px", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
              <Image
                src={actionShot}
                alt="Noel Futkeu — match action"
                fill quality={85}
                sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 30%", filter: "contrast(1.08) saturate(0.8) brightness(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.9) 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "rgba(212,175,55,0.4)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-label" style={{ fontSize: "0.52rem", color: "rgba(212,175,55,0.7)" }}>✅ SpVgg Greuther Fürth · 2. Bundesliga · #9</div>
                <div className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>17 Goals · 32 Games</div>
              </div>
            </div>

            {/* Key metric cards */}
            <div className="glass-card-gold p-6" style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
              <div className="font-label mb-4">Key Performance Metrics</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Goals/Game", value: "0.53", badge: "✅" },
                  { label: "Goal Part.", value: "49%", badge: "✅" },
                  { label: "Minutes %", value: "88%", badge: "✅" },
                  { label: "Start XI %", value: "91%", badge: "✅" },
                ].map((m) => (
                  <div key={m.label} className="text-center p-3 rounded-xl"
                    style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.1)" }}>
                    <div className="font-black text-gradient-gold text-xl" style={{ letterSpacing: "-0.04em" }}>{m.value}</div>
                    <div className="text-white/40 text-xs mt-1">{m.label}</div>
                    <div className="font-label mt-1" style={{ fontSize: "0.4rem", color: "rgba(212,175,55,0.5)" }}>{m.badge} Verified</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.15)" }}>
                ✅ Source: Transfermarkt · SpVgg Greuther Fürth · 2025/26
              </div>
            </div>

            {/* Transfer status */}
            <div className="glass-card p-6" style={{ border: "1px solid rgba(226,0,26,0.2)" }}>
              <div className="font-label mb-3" style={{ color: "rgba(226,0,26,0.8)", fontSize: "0.6rem" }}>📊 Transfer Status</div>
              <div className="text-white font-bold text-base mb-2">Frankfurt Buy-Back Activated</div>
              <p className="text-white/40 text-xs font-light leading-relaxed mb-3">
                Eintracht Frankfurt confirmed buy-back activation. Noel returns to Bundesliga football for 2026/27.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: "#E2001A" }} />
                <span className="font-label" style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.3)" }}>
                  📊 Reported — German football media, May 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
