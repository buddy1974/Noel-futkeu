"use client";
import { useEffect, useRef, useState } from "react";

const TROPHIES = [
  { icon: "🏆", title: "Top Scorer", subtitle: "National League 2024/25", year: "2025" },
  { icon: "⚽", title: "34 Goals", subtitle: "Single Season Record", year: "2025" },
  { icon: "🌟", title: "Player of the Year", subtitle: "Domestic League Award", year: "2025" },
  { icon: "🇨🇲", title: "Cameroon Cap", subtitle: "Youngest Scorer on Debut", year: "2016" },
  { icon: "⚡", title: "Sprint Champion", subtitle: "36.2 km/h — Top 3% Global", year: "2025" },
  { icon: "👑", title: "Breakthrough Award", subtitle: "Europe Debut Season", year: "2022" },
];

const QUOTES = [
  {
    text: "Every sacrifice made sense the moment I put on the shirt.",
    context: "Post-Match Interview, 2025",
  },
  {
    text: "I don't play for records. I play for the people back home who couldn't be here.",
    context: "L'Équipe Feature, 2024",
  },
  {
    text: "Built different? No. Built by everything I've been through. That's the difference.",
    context: "Sky Sports Documentary, 2025",
  },
];

const CAREER_MAP = [
  { city: "Yaoundé", country: "Cameroon", years: "2001–2018", role: "Origins", dot: "#007A5E" },
  { city: "Douala", country: "Cameroon", years: "2012–2019", role: "Academy", dot: "#FCD116" },
  { city: "Europe", country: "First Club", years: "2019–2022", role: "Debut", dot: "#D4AF37" },
  { city: "Current Club", country: "Europe", years: "2022–Now", role: "Elite", dot: "#FFD700" },
];

const MILESTONES = [
  { n: "34", label: "Goals This Season" },
  { n: "18", label: "Assists This Season" },
  { n: "142", label: "Career Dribbles Won" },
  { n: "€12M", label: "Market Value" },
  { n: "Top 3%", label: "Sprint Speed Global" },
  { n: "87", label: "Overall FIFA Rating" },
];

export default function LegacyWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
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
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="legacy" ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #080808 40%, #030303 100%)",
        paddingTop: "clamp(80px,12vw,160px)",
        paddingBottom: "clamp(80px,12vw,160px)",
      }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center">
            <span className="font-label">The Museum</span>
          </div>
          <h2 className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
            Legacy <span className="text-gradient-gold">Wall</span>
          </h2>
          <div className="gold-line-full max-w-xs mx-auto mb-5" />
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            Every milestone, trophy, and moment preserved forever.
            This is not the end — this is the foundation.
          </p>
        </div>

        {/* Trophy Cabinet */}
        <div className="mb-20 reveal">
          <div className="font-label text-center mb-10">Trophy Cabinet</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {TROPHIES.map((t, i) => (
              <div key={i}
                className="trophy-item glass-card p-6 text-center group"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.08}s`,
                }}>
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {t.icon}
                </div>
                <div className="text-gradient-gold font-black text-sm mb-1 group-hover:text-glow">{t.title}</div>
                <div className="text-white/50 text-xs font-light mb-2">{t.subtitle}</div>
                <div className="font-label" style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.55rem" }}>{t.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones + Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Milestones */}
          <div className="reveal-left">
            <div className="font-label mb-8">Career Milestones</div>
            <div className="grid grid-cols-2 gap-4">
              {MILESTONES.map((m, i) => (
                <div key={i} className="glass-card-gold p-5 text-center"
                  style={{
                    border: "1px solid rgba(212,175,55,0.15)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.9)",
                    transition: `all 0.6s cubic-bezier(0.19,1,0.22,1) ${i * 0.07}s`,
                  }}>
                  <div className="counter-number mb-1">{m.n}</div>
                  <div className="font-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rotating Quote */}
          <div className="reveal-right flex flex-col justify-center">
            <div className="font-label mb-6">Words That Define Him</div>
            <div className="glass-card-gold p-10"
              style={{ border: "1px solid rgba(212,175,55,0.25)", borderRadius: "20px" }}>
              <div className="text-6xl font-serif leading-none mb-5"
                style={{ color: "rgba(212,175,55,0.25)" }}>&ldquo;</div>
              <blockquote
                className="text-xl lg:text-2xl font-bold text-white leading-snug mb-6"
                style={{
                  letterSpacing: "-0.02em",
                  opacity: quoteVisible ? 1 : 0,
                  transform: quoteVisible ? "translateY(0)" : "translateY(10px)",
                  transition: "all 0.6s cubic-bezier(0.19,1,0.22,1)",
                }}>
                {QUOTES[quoteIndex].text}
              </blockquote>
              <div className="gold-line mb-4" />
              <cite className="font-label not-italic" style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.6rem" }}>
                — {QUOTES[quoteIndex].context}
              </cite>
              <div className="flex gap-2 mt-5">
                {QUOTES.map((_, i) => (
                  <button key={i} onClick={() => { setQuoteIndex(i); setQuoteVisible(true); }}
                    className="w-6 h-1 rounded-full transition-all duration-300"
                    style={{ background: i === quoteIndex ? "#D4AF37" : "rgba(255,255,255,0.15)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Career Map */}
        <div className="mb-16 reveal">
          <div className="font-label text-center mb-10">The Journey — Career Map</div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {CAREER_MAP.map((stop, i) => (
                <div key={i} className="relative text-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.7s cubic-bezier(0.19,1,0.22,1) ${i * 0.12}s`,
                  }}>
                  <div className="glass-card p-5 hover:border-yellow-400/20 transition-all duration-300 hover:-translate-y-1 group">
                    <div className="w-4 h-4 rounded-full mx-auto mb-4"
                      style={{ background: stop.dot, boxShadow: `0 0 16px ${stop.dot}80` }} />
                    <div className="font-black text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors">
                      {stop.city}
                    </div>
                    <div className="text-white/40 text-xs mb-2">{stop.country}</div>
                    <div className="font-label" style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.55rem" }}>
                      {stop.years}
                    </div>
                    <div className="mt-2 text-xs px-2 py-0.5 rounded-full inline-block"
                      style={{ background: "rgba(212,175,55,0.08)", color: "#D4AF37" }}>
                      {stop.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center reveal">
          <div className="gold-line-full mb-12" />
          <div className="inline-block glass-card-gold px-16 py-12 max-w-3xl"
            style={{ border: "1px solid rgba(212,175,55,0.3)", borderRadius: "20px" }}>
            <div className="font-label mb-4">This is Only the Beginning</div>
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-3 text-glow"
              style={{ letterSpacing: "-0.04em" }}>
              The Legacy Is Still Being Written.
            </h3>
            <p className="text-white/40 font-light mb-8 max-w-xl mx-auto">
              Scouts. Sponsors. Fans. The world is watching. Get in before the story peaks.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-gold"
                onClick={() => document.querySelector("#scout")?.scrollIntoView({ behavior: "smooth" })}>
                View Scout Report
              </button>
              <button className="btn-outline-gold"
                onClick={() => document.querySelector("#sponsor")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Management
              </button>
            </div>
            <div className="mt-8 font-label text-center" style={{ color: "rgba(212,175,55,0.4)", fontSize: "0.55rem" }}>
              Platform by MaxPromo Digital — maxpromo.digital
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
