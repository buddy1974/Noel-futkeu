"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import celebrationImg from "@/assets/2.webp";
import lifestyleImg from "@/assets/5.png";

/**
 * LEGACY WALL — Noel Futkeu
 * ✅ VERIFIED milestones only — no fabricated trophies or invented records
 * 🎨 NARRATIVE — brand storytelling (clearly labeled)
 */

const VERIFIED_MILESTONES = [
  {
    icon: "🦅",
    title: "Eintracht Frankfurt",
    subtitle: "Parent Club · Bundesliga",
    desc: "Signed professional contract with Eintracht Frankfurt — Bundesliga football, European history, global reach.",
    type: "verified",
    badge: "✅ VERIFIED",
  },
  {
    icon: "🟢",
    title: "SpVgg Greuther Fürth — #9",
    subtitle: "Loan · 2. Bundesliga · 2024–2026",
    desc: "Development loan to Fürth. Wore the #9 shirt. Delivered one of the strongest striker seasons in the 2. Bundesliga.",
    type: "verified",
    badge: "✅ VERIFIED",
  },
  {
    icon: "👑",
    title: "17 Goals · 32 Games",
    subtitle: "2025/26 · 2. Bundesliga",
    desc: "Top scorer candidate in Germany's second division. 49% of Fürth's goals directly involved. Dominant. Season-defining.",
    type: "verified",
    badge: "✅ VERIFIED — Transfermarkt",
  },
  {
    icon: "📈",
    title: "Frankfurt Buy-Back Activated",
    subtitle: "Summer 2026 · Bundesliga Return",
    desc: "Eintracht Frankfurt activated the buy-back clause. The loanee returns as the main man. Multiple Bundesliga clubs had interest.",
    type: "reported",
    badge: "📊 REPORTED — German media, May 2026",
  },
  {
    icon: "🌍",
    title: "Cameroonian Heritage",
    subtitle: "Dual Identity · German-Cameroonian",
    desc: "Born in Essen to Cameroonian family. Dual German-Cameroonian citizenship. A player with European precision and African passion.",
    type: "verified",
    badge: "✅ VERIFIED — Transfermarkt",
  },
  {
    icon: "🏭",
    title: "Ruhr Valley Roots",
    subtitle: "TuRa · SW Essen · Rot-Weiss Essen",
    desc: "Three youth clubs, all in Essen. The city that forges steel and footballers. The foundation of his character and style.",
    type: "verified",
    badge: "✅ VERIFIED — Transfermarkt youth data",
  },
];

const IDENTITY_FACTS = [
  { label: "Birthplace", value: "Essen, Germany", badge: "✅" },
  { label: "Date of Birth", value: "06 Dec 2002", badge: "✅" },
  { label: "Height", value: "1.83 m", badge: "✅" },
  { label: "Position", value: "Centre-Forward", badge: "✅" },
  { label: "Foot", value: "Right", badge: "✅" },
  { label: "Agent", value: "Sports360 GmbH", badge: "✅" },
];

const QUOTES = [
  {
    text: "From the Ruhr Valley to the Bundesliga. Every game, every goal, every step was earned.",
    type: "narrative",
    label: "🎨 Brand narrative — not a verified player quote",
  },
  {
    text: "17 goals don't lie. The numbers tell the story better than any words can.",
    type: "narrative",
    label: "🎨 Brand narrative — not a verified player quote",
  },
  {
    text: "Cameroon gave me the passion. Germany gave me the discipline. Football gave me the purpose.",
    type: "narrative",
    label: "🎨 Brand narrative — not a verified player quote",
  },
];

export default function LegacyWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

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
    if (!visible) return;
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      id="legacy"
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
            <span className="font-label">The Record</span>
          </div>
          <h2
            className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            Legacy <span className="text-gradient-gold">Wall</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-light">
            Milestones earned, not invented. Every item verified or clearly labeled.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Photos + Quote */}
          <div className="space-y-6 reveal-left">
            {/* Celebration photo */}
            <div className="relative overflow-hidden rounded-2xl"
              style={{ height: "260px", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
              <Image
                src={celebrationImg}
                alt="Noel Futkeu — goal celebration"
                fill quality={85}
                sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 20%", filter: "contrast(1.08) saturate(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(3,3,3,0.9) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-white font-black text-lg" style={{ letterSpacing: "-0.02em" }}>THE RISE</div>
                <div className="font-label" style={{ fontSize: "0.5rem", color: "rgba(212,175,55,0.6)" }}>17 Goals · 2025/26 Season</div>
              </div>
            </div>

            {/* Lifestyle photo */}
            <div className="relative overflow-hidden rounded-2xl"
              style={{ height: "220px", border: "1px solid rgba(212,175,55,0.1)" }}>
              <Image
                src={lifestyleImg}
                alt="Noel Futkeu — lifestyle portrait"
                fill quality={85}
                sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 10%", filter: "contrast(1.05) saturate(0.8) brightness(0.85)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.85) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white font-bold text-sm">Noel Futkeu</div>
                <div className="text-white/40 text-xs">Eintracht Frankfurt · Bundesliga</div>
              </div>
            </div>

            {/* Quote rotator */}
            <div className="glass-card p-6" style={{ border: "1px solid rgba(212,175,55,0.1)", minHeight: "160px" }}>
              <div className="font-label mb-4" style={{ fontSize: "0.55rem" }}>THE RISE — In Words</div>
              <blockquote
                className="text-white/70 text-sm font-light leading-relaxed italic"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "all 0.6s cubic-bezier(0.19,1,0.22,1)",
                }}
              >
                &ldquo;{QUOTES[quoteIndex].text}&rdquo;
              </blockquote>
              <div className="gold-line mb-3 mt-4" />
              <div className="font-label" style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.2)" }}>
                {QUOTES[quoteIndex].label}
              </div>
            </div>
          </div>

          {/* Center + Right: Milestones */}
          <div className="lg:col-span-2 reveal-right">
            <div className="glass-card p-8 h-full" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
              <div className="font-label mb-8">Career Milestones</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {VERIFIED_MILESTONES.map((m, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: m.type === "verified" ? "rgba(212,175,55,0.04)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${m.type === "verified" ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.06)"}`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.08}s`,
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-sm leading-tight">{m.title}</div>
                        <div className="text-white/40 text-xs mt-0.5">{m.subtitle}</div>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs font-light leading-relaxed mb-3">{m.desc}</p>
                    <div
                      className="px-2 py-1 rounded-full inline-block font-label"
                      style={{
                        background: m.type === "verified" ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${m.type === "verified" ? "rgba(212,175,55,0.2)" : "rgba(255,255,255,0.08)"}`,
                        fontSize: "0.42rem",
                        color: m.type === "verified" ? "rgba(212,175,55,0.7)" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {m.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Identity facts bar */}
        <div className="mt-12 reveal">
          <div className="glass-card-gold p-8" style={{ border: "1px solid rgba(212,175,55,0.15)" }}>
            <div className="text-center mb-6">
              <div className="font-label" style={{ color: "rgba(212,175,55,0.8)" }}>Player Identity — Verified</div>
              <div className="font-label mt-1" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
                ✅ All data below sourced from Transfermarkt · fetched May 2026
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              {IDENTITY_FACTS.map((f) => (
                <div key={f.label}>
                  <div className="text-white font-bold text-sm mb-1">{f.value}</div>
                  <div className="text-white/40 text-xs">{f.label}</div>
                  <div className="font-label mt-1" style={{ fontSize: "0.4rem", color: "rgba(212,175,55,0.5)" }}>{f.badge} Verified</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
