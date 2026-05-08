"use client";
import { useEffect, useRef, useState } from "react";

const STATS_ROW = [
  { label: "Social Reach", value: "2.4M+", icon: "📡" },
  { label: "Avg Engagement", value: "8.7%", icon: "🔥" },
  { label: "Press Mentions", value: "340+", icon: "📰" },
  { label: "Market Growth", value: "+40%", icon: "📈" },
];

const TIER_PACKAGES = [
  {
    name: "Shirt Sleeve",
    price: "€25,000",
    period: "/ season",
    features: ["Sleeve logo placement", "5 social media posts", "Match day visibility", "Digital assets pack"],
    highlight: false,
  },
  {
    name: "Principal Partner",
    price: "€120,000",
    period: "/ season",
    features: ["Front shirt naming rights", "25 social posts + stories", "Video content inclusion", "Press conference branding", "Player appearance (x2)", "Full media kit access"],
    highlight: true,
  },
  {
    name: "Performance Pod",
    price: "€60,000",
    period: "/ season",
    features: ["Training kit branding", "15 social posts", "YouTube pre-rolls", "Event activation rights", "Quarterly analytics report"],
    highlight: false,
  },
];

const PRESS_ITEMS = [
  { outlet: "L'Équipe", headline: "Futkeu: The Cameroonian Messi in the Making?", date: "Mar 2026", flag: "🇫🇷" },
  { outlet: "Sky Sports", headline: "Five Players Who Will Dominate Summer 2026", date: "Feb 2026", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { outlet: "Kicker", headline: "Noel Futkeu — das nächste große afrikanische Talent", date: "Jan 2026", flag: "🇩🇪" },
  { outlet: "ESPN FC", headline: "Cameroon's Hidden Gem: Breaking Down Futkeu's Numbers", date: "Dec 2025", flag: "🇺🇸" },
];

export default function SponsorZone() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"packages" | "press" | "contact">("packages");
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
    sectionRef.current?.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
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
            Align your brand with one of football&apos;s fastest-rising stars.
            Premium partnership opportunities — global reach, authentic storytelling.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 reveal">
          {STATS_ROW.map((s, i) => (
            <div key={i} className="glass-card p-5 text-center hover:border-yellow-400/20 transition-colors duration-300">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-black text-gradient-gold mb-1"
                style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div className="font-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-10 reveal">
          {(["packages", "press", "contact"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase rounded transition-all duration-300 ${
                activeTab === tab
                  ? "bg-yellow-500 text-black"
                  : "border border-white/10 text-white/50 hover:border-yellow-400/30 hover:text-white/80"
              }`}>
              {tab === "packages" ? "Packages" : tab === "press" ? "Press" : "Contact"}
            </button>
          ))}
        </div>

        {/* Packages */}
        {activeTab === "packages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-scale">
            {TIER_PACKAGES.map((pkg, i) => (
              <div key={i}
                className={`glass-card p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${pkg.highlight ? "glow-gold-sm" : ""}`}
                style={{
                  border: pkg.highlight ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  background: pkg.highlight ? "rgba(212,175,55,0.05)" : undefined,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
                }}>
                {pkg.highlight && (
                  <div className="font-label text-center mb-4 py-1 rounded"
                    style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37", fontSize: "0.6rem" }}>
                    ★ Most Popular
                  </div>
                )}
                <div className="font-label mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>{pkg.name}</div>
                <div className="flex items-end gap-1 mb-6">
                  <span className="font-black text-gradient-gold" style={{ fontSize: "2.2rem", letterSpacing: "-0.04em", lineHeight: 1 }}>
                    {pkg.price}
                  </span>
                  <span className="text-white/30 text-sm pb-1">{pkg.period}</span>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/60 font-light">
                      <span style={{ color: "#D4AF37", flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={pkg.highlight ? "btn-gold w-full" : "btn-outline-gold w-full"}>
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Press */}
        {activeTab === "press" && (
          <div className="space-y-4 reveal">
            {PRESS_ITEMS.map((p, i) => (
              <div key={i}
                className="sponsor-card glass-card p-6 flex items-center gap-5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-30px)",
                  transition: `all 0.6s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
                }}>
                <span className="text-3xl">{p.flag}</span>
                <div className="flex-1">
                  <div className="font-label mb-1" style={{ color: "rgba(212,175,55,0.7)" }}>{p.outlet}</div>
                  <p className="text-white font-semibold text-sm">{p.headline}</p>
                </div>
                <div className="text-white/30 text-xs font-light whitespace-nowrap">{p.date}</div>
                <button className="btn-outline-gold text-xs px-4 py-2 whitespace-nowrap">Read →</button>
              </div>
            ))}
            <div className="mt-6 text-center">
              <button className="btn-gold">Download Full Press Kit</button>
            </div>
          </div>
        )}

        {/* Contact */}
        {activeTab === "contact" && (
          <div className="max-w-2xl mx-auto reveal-scale">
            {submitted ? (
              <div className="text-center glass-card-gold p-16" style={{ border: "1px solid rgba(212,175,55,0.3)" }}>
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-white mb-2">Enquiry Received</h3>
                <p className="text-white/50 font-light">Our team will respond within 48 hours.</p>
              </div>
            ) : (
              <div className="glass-card p-8" style={{ border: "1px solid rgba(212,175,55,0.1)" }}>
                <div className="font-label mb-6">Partnership Enquiry</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: "name", placeholder: "Your Name" },
                    { key: "company", placeholder: "Company / Brand" },
                    { key: "email", placeholder: "Email Address" },
                    { key: "interest", placeholder: "Interest (e.g. Kit Sponsor)" },
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
                  rows={4}
                  value={formState.msg}
                  onChange={(e) => setFormState((s) => ({ ...s, msg: e.target.value }))}
                  className="w-full text-sm text-white placeholder-white/20 px-4 py-3 rounded-lg outline-none mb-5 resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button onClick={() => setSubmitted(true)} className="btn-gold w-full">
                  Submit Partnership Enquiry
                </button>
                <p className="text-white/20 text-xs text-center mt-4 font-light">
                  Managed by MaxPromo Digital — Response guaranteed within 48h
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
