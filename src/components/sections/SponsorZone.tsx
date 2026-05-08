"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import lifestyleShot from "@/assets/5.png";
import { PLAYER, CLUBS, SEASON_STATS_2526, MARKET_VALUE, BRAND } from "@/config/player";

/**
 * SPONSOR ZONE — Partner & Media section
 * ✅ All stats sourced from player.ts config (Transfermarkt verified)
 * 🎨 Sponsorship packages are illustrative — not confirmed contracts
 * ❌ No fabricated social reach, press coverage, or engagement stats
 */

// ✅ VERIFIED — Transfermarkt May 2026
const VERIFIED_PLATFORM_STATS = [
  { label: "Goals This Season", value: `${SEASON_STATS_2526.goals}`, sub: "2. Bundesliga 2025/26", badge: "✅ VERIFIED" },
  { label: "Appearances", value: `${SEASON_STATS_2526.appearances}`, sub: "2025/26 season", badge: "✅ VERIFIED" },
  { label: "Goal Participation", value: `${SEASON_STATS_2526.goalParticipationPct}%`, sub: "of team goals", badge: "✅ VERIFIED" },
  { label: "Market Value", value: MARKET_VALUE.value, sub: `Transfermarkt ${MARKET_VALUE.lastUpdated}`, badge: "✅ VERIFIED" },
];

// 🎨 ILLUSTRATIVE — sponsorship package concepts, not confirmed contracts
const TIER_PACKAGES = [
  {
    name: "Rising Star Package",
    label: "Digital Partner",
    features: ["Social media content inclusion", "Digital asset placement", "Access to media kit", "Quarterly performance reports"],
    highlight: false,
    note: "🎨 Illustrative — enquire for custom terms",
  },
  {
    name: "Principal Partner",
    label: "Headline Sponsor",
    features: ["Primary brand association", "Content creation inclusion", "Press conference presence", "Event activation rights", "Direct management access", "Custom analytics reports"],
    highlight: true,
    note: "🎨 Illustrative — enquire for custom terms",
  },
  {
    name: "Performance Pod",
    label: "Associate Partner",
    features: ["Training content branding", "Social media exposure", "Platform placement", "Campaign integration", "Season-long activation"],
    highlight: false,
    note: "🎨 Illustrative — enquire for custom terms",
  },
];

const NAV_TABS = ["packages", "contact"] as const;
type Tab = typeof NAV_TABS[number];

export default function SponsorZone() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("packages");
  const [formState, setFormState] = useState({ name: "", company: "", email: "", interest: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

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
    sectionRef.current?.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale,.reveal-slow")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [visible]);

  return (
    <section id="sponsor" ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #080808 50%, #030303 100%)",
        paddingTop: "clamp(80px,12vw,160px)",
        paddingBottom: "clamp(80px,12vw,160px)",
      }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 reveal">
          <div>
            <div className="section-label">
              <span className="font-label">Brands &amp; Media</span>
            </div>
            <h2 className="font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
              Sponsor &amp; <span className="text-gradient-gold">Media Zone</span>
            </h2>
          </div>
          <p className="mt-4 lg:mt-0 text-white/40 max-w-sm text-sm font-light leading-relaxed">
            Align your brand with one of football&apos;s fastest-rising strikers.
            Partnership opportunities built around authentic storytelling and verified performance.
          </p>
        </div>

        {/* ✅ Verified Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 reveal">
          {VERIFIED_PLATFORM_STATS.map((s, i) => (
            <div key={i} className="glass-card p-5 text-center luxury-lift"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
              }}>
              <div className="font-black text-gradient-gold mb-2"
                style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div className="text-white/70 text-xs font-semibold mb-1">{s.label}</div>
              <div className="text-white/30 text-xs font-light mb-2">{s.sub}</div>
              <div className="badge-verified mx-auto">{s.badge}</div>
            </div>
          ))}
        </div>

        {/* Two-panel layout: packages left, lifestyle photo right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Packages / Contact — 2/3 width */}
          <div className="lg:col-span-2">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-8 reveal">
              {NAV_TABS.map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded transition-all duration-300"
                  style={{
                    background: activeTab === tab ? "rgba(212,175,55,0.15)" : "transparent",
                    border: `1px solid ${activeTab === tab ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: activeTab === tab ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  }}>
                  {tab === "packages" ? "Partnership Packages" : "Contact Us"}
                </button>
              ))}
            </div>

            {activeTab === "packages" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal-slow">
                {TIER_PACKAGES.map((pkg, i) => (
                  <div key={i} className="glass-card p-6 flex flex-col luxury-lift"
                    style={{
                      border: pkg.highlight ? "1px solid rgba(212,175,55,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      background: pkg.highlight ? "rgba(212,175,55,0.04)" : undefined,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(24px)",
                      transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.12}s`,
                    }}>
                    {pkg.highlight && (
                      <div className="font-label text-center mb-4 py-1 rounded"
                        style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37", fontSize: "0.55rem" }}>
                        ★ Most Comprehensive
                      </div>
                    )}
                    <div className="font-label mb-1" style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.55rem" }}>{pkg.label}</div>
                    <div className="text-white font-bold text-base mb-5 leading-tight">{pkg.name}</div>
                    <ul className="space-y-2.5 flex-1 mb-6">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-xs text-white/55 font-light">
                          <span style={{ color: "#D4AF37", flexShrink: 0 }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={pkg.highlight ? "btn-gold w-full" : "btn-outline-gold w-full"}
                      onClick={() => setActiveTab("contact")}>
                      Enquire
                    </button>
                    <div className="mt-3 text-center font-label"
                      style={{ fontSize: "0.38rem", color: "rgba(255,255,255,0.2)" }}>
                      {pkg.note}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="reveal-scale">
                {submitted ? (
                  <div className="text-center glass-card-gold p-16"
                    style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Enquiry Received</h3>
                    <p className="text-white/50 font-light text-sm">
                      Managed by {BRAND.agencyName} — we aim to respond within 48 hours.
                    </p>
                  </div>
                ) : (
                  <div className="glass-card p-8" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
                    <div className="font-label mb-6">Partnership Enquiry</div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      {[
                        { key: "name", placeholder: "Your Name" },
                        { key: "company", placeholder: "Company / Brand" },
                        { key: "email", placeholder: "Email Address" },
                        { key: "interest", placeholder: "Area of Interest" },
                      ].map(({ key, placeholder }) => (
                        <input key={key} type="text" placeholder={placeholder}
                          value={formState[key as keyof typeof formState]}
                          onChange={(e) => setFormState((s) => ({ ...s, [key]: e.target.value }))}
                          className="w-full text-sm text-white placeholder-white/20 px-4 py-3 rounded-lg outline-none"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        />
                      ))}
                    </div>
                    <textarea placeholder="Tell us about your brand and partnership vision..."
                      rows={4} value={formState.msg}
                      onChange={(e) => setFormState((s) => ({ ...s, msg: e.target.value }))}
                      className="w-full text-sm text-white placeholder-white/20 px-4 py-3 rounded-lg outline-none mb-5 resize-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    />
                    <button onClick={() => setSubmitted(true)} className="btn-gold w-full">
                      Submit Partnership Enquiry
                    </button>
                    <p className="text-white/20 text-xs text-center mt-4 font-light">
                      Managed by {BRAND.agencyName} — response within 48h
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Lifestyle photo + player info */}
          <div className="reveal-right">
            <div className="cinematic-frame rounded-2xl h-full" style={{ minHeight: "400px" }}>
              <div className="gold-top-line" />
              <Image
                src={lifestyleShot}
                alt={`${PLAYER.fullName} — brand editorial`}
                fill quality={85}
                sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 10%", filter: "contrast(1.05) saturate(0.82) brightness(0.87)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(3,3,3,0.9) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="font-label mb-2" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.7)" }}>
                  ✅ {PLAYER.fullName} · Official Editorial
                </div>
                <div className="text-white font-bold text-lg mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {SEASON_STATS_2526.goals} Goals · {SEASON_STATS_2526.appearances} Games
                </div>
                <div className="text-white/40 text-xs mb-4">
                  {CLUBS.loanClub.name} → {CLUBS.parentClub.name}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="badge-verified">Bundesliga Ready</div>
                  <div className="badge-verified">Rising Market Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent contact strip */}
        <div className="glass-card-gold p-6 text-center reveal"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
          <div className="font-label mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>Management Contact</div>
          <p className="text-white/50 text-sm font-light mb-4">
            Agent: <span className="text-white font-semibold">{PLAYER.agent}</span> ·
            Platform: <span className="text-white font-semibold">{BRAND.agencyName}</span>
          </p>
          <div className="flex justify-center gap-4">
            <a href={BRAND.agencyUrl} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs">
              Visit {BRAND.agencyName}
            </a>
            <button onClick={() => setActiveTab("contact")} className="btn-outline-gold text-xs">
              Send Enquiry
            </button>
          </div>
          <div className="mt-4 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
            ✅ Agent: {PLAYER.agent} · Source: Transfermarkt · May 2026
          </div>
        </div>
      </div>
    </section>
  );
}
