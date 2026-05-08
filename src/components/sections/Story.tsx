"use client";
import { useEffect, useRef } from "react";

const TIMELINE = [
  {
    year: "2001",
    city: "Yaoundé, Cameroon",
    title: "The Beginning",
    body: "Born in Yaoundé to a family where football was more than a sport — it was identity. The streets of Cameroon became his first training ground, where bare feet and raw talent forged the foundation of greatness.",
    icon: "🌍",
    side: "left",
  },
  {
    year: "2012",
    city: "Douala Academy",
    title: "The Calling",
    body: "At age 11, Noel was selected by a regional academy after catching the eye of scouts during a youth tournament. He left home for the first time, carrying nothing but a bag and an unbreakable will.",
    icon: "⚽",
    side: "right",
  },
  {
    year: "2016",
    city: "National Youth Team",
    title: "Cameroon Colours",
    body: "First call-up to the Cameroon U17 national team. He scored on debut, the youngest player in the squad — a moment that put him on the continental radar and confirmed what everyone who had seen him already knew.",
    icon: "🏆",
    side: "left",
  },
  {
    year: "2019",
    city: "Europe Beckons",
    title: "The Leap",
    body: "The sacrifices paid off. A transfer to European football — leaving his country, his family, and everything familiar behind. The pressure was immense. His response? Pure performance.",
    icon: "✈️",
    side: "right",
  },
  {
    year: "2022",
    city: "Professional Debut",
    title: "Breaking Through",
    body: "Full professional debut season. 18 goals, 9 assists. Named breakthrough player of the season. The football world started paying attention — clubs, scouts, and sponsors beginning to circle.",
    icon: "⚡",
    side: "left",
  },
  {
    year: "2024",
    city: "Elite Level",
    title: "The Ascent",
    body: "A defining campaign: 34 goals, 18 assists across all competitions. Top scorer. Fan favourite. Match-winner. The numbers don't lie. The era has officially begun.",
    icon: "👑",
    side: "right",
  },
  {
    year: "2026",
    city: "The Next Chapter",
    title: "Legacy In Motion",
    body: "Operating at elite global brand level. Targeted by top European clubs, sought by international sponsors, beloved by fans worldwide. This is not the peak — this is just the launchpad.",
    icon: "🚀",
    side: "left",
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #030303 0%, #080808 50%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2"
          style={{
            width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24 reveal">
          <div className="section-label justify-center">
            <span className="font-label">Chapter One</span>
          </div>
          <h2
            className="font-black text-white leading-none mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
          >
            The{" "}
            <span className="text-gradient-gold">Story</span>
          </h2>
          <div className="gold-line-full max-w-sm mx-auto mb-6" />
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Not a biography. A journey. From dusty streets to stadium lights —
            every chapter forged by sacrifice, talent, and an unshakeable dream.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line (desktop) */}
          <div
            className="absolute top-0 bottom-0 hidden lg:block"
            style={{
              left: "50%",
              width: "1px",
              transform: "translateX(-50%)",
              background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.4), transparent)",
            }}
          />

          <div className="flex flex-col gap-16 lg:gap-20">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 ${
                  item.side === "right" ? "lg:flex-row-reverse" : ""
                } ${item.side === "right" ? "reveal-right" : "reveal-left"}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${item.side === "right" ? "lg:text-right" : ""}`}>
                  <div className="glass-card p-8 hover:border-yellow-400/20 transition-colors duration-500 group">
                    {/* Year */}
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        item.side === "right" ? "lg:justify-end" : ""
                      }`}
                    >
                      <span className="text-4xl">{item.icon}</span>
                      <div>
                        <div
                          className="font-black text-gradient-gold"
                          style={{ fontSize: "1.75rem", letterSpacing: "-0.03em" }}
                        >
                          {item.year}
                        </div>
                        <div className="font-label" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>
                          {item.city}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed font-light">{item.body}</p>
                    {/* Gold accent line */}
                    <div
                      className={`mt-5 h-px`}
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
                        animation: "lineGrow 1s ease-out forwards",
                        width: "0%",
                        transition: "width 1s var(--ease-luxury)",
                      }}
                    />
                  </div>
                </div>

                {/* Center Dot (desktop) */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div
                    className="relative w-5 h-5 rounded-full border-2 z-10"
                    style={{
                      background: "#D4AF37",
                      borderColor: "#030303",
                      boxShadow: "0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.2)",
                    }}
                  />
                </div>

                {/* Spacer (desktop) */}
                <div className="hidden lg:block w-5/12" />

                {/* Mobile Left Border */}
                <div
                  className="lg:hidden absolute left-0 top-0 bottom-0 w-px"
                  style={{ background: "rgba(212,175,55,0.3)" }}
                />
                <div
                  className="lg:hidden absolute left-0 top-8 w-3 h-3 rounded-full -translate-x-1.5"
                  style={{
                    background: "#D4AF37",
                    boxShadow: "0 0 10px rgba(212,175,55,0.8)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mt-28 text-center reveal">
          <div
            className="inline-block glass-card-gold px-12 py-10 max-w-3xl"
            style={{ borderColor: "rgba(212,175,55,0.3)" }}
          >
            <div className="text-5xl text-yellow-400/30 font-serif leading-none mb-4">"</div>
            <blockquote
              className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Every sacrifice made sense the moment I put on the shirt.
            </blockquote>
            <div className="gold-line mx-auto mb-4" />
            <cite className="font-label not-italic" style={{ color: "rgba(212,175,55,0.8)" }}>
              Noel Futkeu — Post-Match Interview, 2025
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
