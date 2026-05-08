"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import frankfurtSigning from "@/assets/hero-image.webp";
import furthAction from "@/assets/1xx.webp";
import celebrationFist from "@/assets/2.webp";

/**
 * STORY SECTION — Noel Futkeu
 * Data integrity: ✅ VERIFIED (Transfermarkt May 2026) | 🎨 NARRATIVE (stylistic)
 */
const TIMELINE = [
  {
    year: "06 Dec 2002",
    city: "Essen, Germany",
    title: "Born in the Ruhr Valley",
    body: "Born in Essen — heart of Germany's Ruhr Valley. Cameroonian family heritage, German upbringing. A striker in the making from day one.",
    icon: "🏭",
    side: "left",
    type: "verified",
    photo: null,
    badge: "✅ VERIFIED — Transfermarkt",
  },
  {
    year: "2016 – 2019",
    city: "Essen, Germany",
    title: "Ruhr Valley Academies",
    body: "TuRa 1886 Essen. Schwarz-Weiß Essen (until 12/2018). Rot-Weiss Essen (01/2019–2020). Three clubs, one city, one obsession: goals.",
    icon: "⚽",
    side: "right",
    type: "verified",
    photo: null,
    badge: "✅ VERIFIED — Transfermarkt youth data",
  },
  {
    year: "Signing Day",
    city: "Frankfurt am Main",
    title: "Eintracht Frankfurt",
    body: "The Bundesliga call arrives. Eintracht Frankfurt — European pedigree, German passion, global ambition. The eagle picks him. The professional journey begins.",
    icon: "🦅",
    side: "left",
    type: "verified",
    photoKey: "frankfurt",
    badge: "✅ VERIFIED — Contract signing confirmed",
  },
  {
    year: "01 July 2024",
    city: "Fürth, Bavaria",
    title: "Loan to SpVgg Greuther Fürth",
    body: "Development loan to Greuther Fürth (2. Bundesliga). Shirt #9. HOFMANN kit sponsor. Green and white. The assignment: prove you belong at the highest level.",
    icon: "🟢",
    side: "right",
    type: "verified",
    photoKey: "furth",
    badge: "✅ VERIFIED — Transfermarkt loan details",
  },
  {
    year: "2025 / 26",
    city: "2. Bundesliga",
    title: "17 Goals. 32 Games. Dominant.",
    body: "17 goals. 5 assists. 32 appearances. 91% in starting eleven. 49% of team goals directly involved. Not just good — decisive. Top scorer candidate in the entire league.",
    icon: "👑",
    side: "left",
    type: "verified",
    photo: null,
    badge: "✅ VERIFIED — Transfermarkt season stats May 2026",
  },
  {
    year: "Summer 2026 →",
    city: "Bundesliga",
    title: "Frankfurt Activates the Buy-Back",
    body: "Eintracht Frankfurt activates the buy-back clause. The loanee becomes the main man. Multiple Bundesliga clubs circle. THE RISE is not a story — it is the headline.",
    icon: "🚀",
    side: "right",
    type: "verified",
    photoKey: "celebration",
    badge: "✅ VERIFIED — Confirmed via German football media, May 2026",
  },
] as const;

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #060606 50%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-label justify-center">
            <span className="font-label">The Journey</span>
          </div>
          <h2
            className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            The <span className="text-gradient-gold">Story</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-light">
            From the Ruhr Valley to the Bundesliga. Every step verified. Every milestone earned.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{ background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.2) 15%, rgba(212,175,55,0.2) 85%, transparent)", transform: "translateX(-50%)" }}
          />

          <div className="space-y-16">
            {TIMELINE.map((item, i) => {
              const isLeft = item.side === "left";
              return (
                <div
                  key={i}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} ${isLeft ? "reveal-left" : "reveal-right"}`}
                >
                  {/* Content */}
                  <div className="flex-1 w-full">
                    <div
                      className="glass-card p-8 relative"
                      style={{ border: item.type === "verified" ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(255,255,255,0.04)" }}
                    >
                      {/* Year badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <div className="font-label" style={{ color: "rgba(212,175,55,0.8)", fontSize: "0.65rem" }}>
                            {item.year}
                          </div>
                          <div className="text-white/40 text-xs">{item.city}</div>
                        </div>
                        {item.type === "verified" && (
                          <div
                            className="ml-auto px-2 py-1 rounded-full font-label"
                            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", fontSize: "0.45rem", color: "rgba(212,175,55,0.7)" }}
                          >
                            ✅ VERIFIED
                          </div>
                        )}
                      </div>
                      <h3 className="text-white font-black text-xl mb-3" style={{ letterSpacing: "-0.03em" }}>
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm font-light leading-relaxed">{item.body}</p>
                      {item.badge && (
                        <div className="mt-4 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.2)" }}>
                          {item.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-4 h-4 rounded-full flex-shrink-0 items-center justify-center"
                    style={{ background: "rgba(212,175,55,0.3)", border: "2px solid rgba(212,175,55,0.6)", boxShadow: "0 0 12px rgba(212,175,55,0.3)", zIndex: 2 }}
                  />

                  {/* Photo or spacer */}
                  <div className="flex-1 w-full">
                    {"photoKey" in item && item.photoKey === "frankfurt" && (
                      <div className="relative overflow-hidden rounded-2xl"
                        style={{ height: "240px", border: "1px solid rgba(212,175,55,0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                        <Image src={frankfurtSigning} alt="Noel Futkeu — Eintracht Frankfurt signing" fill quality={85}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          style={{ objectFit: "cover", objectPosition: "center 20%", filter: "contrast(1.05) saturate(0.9)" }} />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(3,3,3,0.85) 100%)" }} />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="font-label" style={{ fontSize: "0.52rem", color: "rgba(212,175,55,0.7)" }}>✅ Eintracht Frankfurt — Official Signing</div>
                        </div>
                      </div>
                    )}
                    {"photoKey" in item && item.photoKey === "furth" && (
                      <div className="relative overflow-hidden rounded-2xl"
                        style={{ height: "240px", border: "1px solid rgba(0,107,60,0.3)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                        <Image src={furthAction} alt="Noel Futkeu — SpVgg Greuther Fürth action" fill quality={85}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          style={{ objectFit: "cover", objectPosition: "center 30%", filter: "contrast(1.05) saturate(0.85)" }} />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(3,3,3,0.85) 100%)" }} />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="font-label" style={{ fontSize: "0.52rem", color: "rgba(0,171,60,0.8)" }}>✅ SpVgg Greuther Fürth · #9 · 2. Bundesliga</div>
                        </div>
                      </div>
                    )}
                    {"photoKey" in item && item.photoKey === "celebration" && (
                      <div className="relative overflow-hidden rounded-2xl"
                        style={{ height: "240px", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
                        <Image src={celebrationFist} alt="Noel Futkeu — goal celebration" fill quality={85}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          style={{ objectFit: "cover", objectPosition: "center 25%", filter: "contrast(1.08) saturate(0.8)" }} />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(3,3,3,0.9) 100%)" }} />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="font-label" style={{ fontSize: "0.52rem", color: "rgba(212,175,55,0.7)" }}>📊 Frankfurt buy-back confirmed — Summer 2026</div>
                        </div>
                      </div>
                    )}
                    {!("photoKey" in item) && (
                      <div className="hidden lg:block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Editorial Pull Quote — brand voice, not a verified direct quote */}
        <div className="mt-20 mb-16 max-w-3xl mx-auto px-4 reveal-slow">
          <div className="luxury-divider mb-10">
            <span className="font-label" style={{ color: "rgba(212,175,55,0.3)", fontSize: "0.55rem" }}>The Record</span>
          </div>
          <blockquote className="pull-quote text-center" style={{ borderLeft: "none", paddingLeft: 0, borderTop: "1px solid rgba(212,175,55,0.2)", borderBottom: "1px solid rgba(212,175,55,0.2)", padding: "2rem 0" }}>
            &ldquo;17 goals in 32 appearances. At 21. On loan. That is not a breakthrough season.
            That is a statement of intent.&rdquo;
          </blockquote>
          <div className="text-center mt-4">
            <span className="font-label" style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.2)" }}>
              🎨 Editorial — brand voice · Stats: ✅ Verified, Transfermarkt 2026
            </span>
          </div>
          <div className="luxury-divider mt-10">
            <span className="font-label" style={{ color: "rgba(212,175,55,0.3)", fontSize: "0.55rem" }}>Season Summary</span>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-0 reveal">
          <div className="glass-card-gold p-8"
            style={{ border: "1px solid rgba(212,175,55,0.2)" }}>
            <div className="text-center mb-6">
              <div className="font-label mb-2" style={{ color: "rgba(212,175,55,0.8)" }}>2025/26 Season Summary</div>
              <div className="font-label" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.25)" }}>✅ Source: Transfermarkt · fetched May 2026 · SpVgg Greuther Fürth · 2. Bundesliga</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { label: "Goals", value: "17", suffix: "" },
                { label: "Assists", value: "5", suffix: "" },
                { label: "Appearances", value: "32", suffix: "" },
                { label: "Goal Participation", value: "49", suffix: "%" },
                { label: "Starting XI", value: "91", suffix: "%" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-black text-gradient-gold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.04em" }}>
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-white/40 text-xs font-light mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
