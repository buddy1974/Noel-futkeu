"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Goals", value: 34, suffix: "" },
  { label: "Assists", value: 18, suffix: "" },
  { label: "Sprint km/h", value: 36.2, suffix: "" },
  { label: "xG Season", value: 28.7, suffix: "" },
  { label: "Pass Acc", value: 89, suffix: "%" },
  { label: "Dribbles", value: 142, suffix: "" },
];

function useCounter(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(current.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatCounter({ label, value, suffix, started }: {
  label: string; value: number; suffix: string; started: boolean;
}) {
  const count = useCounter(value, 2200, started);
  return (
    <div className="text-center px-4 py-4 glass-card-gold min-w-[100px]">
      <div className="counter-number">
        {Number.isInteger(value) ? Math.floor(count) : count.toFixed(1)}{suffix}
      </div>
      <div className="font-label mt-1" style={{ color: "rgba(212,175,55,0.7)", fontSize: "0.6rem" }}>
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    }> = [];

    const spawn = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 1.5 + 0.5),
        size: Math.random() * 2.5 + 0.5,
        opacity: 0,
        life: 0,
        maxLife: Math.random() * 200 + 150,
      });
    };

    let frame = 0;
    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 4 === 0) spawn();
      frame++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? (1 - progress) / 0.3
            : 1;

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grd.addColorStop(0, `rgba(212,175,55,${p.opacity * 0.8})`);
        grd.addColorStop(1, `rgba(212,175,55,0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    setTimeout(() => { setTextVisible(true); }, 300);
    setTimeout(() => { setStatsStarted(true); }, 1000);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ opacity: 0.7 }}
      />

      {/* Stadium Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        {/* Deep center radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Stadium lights — top corners */}
        <div
          className="absolute top-0 left-0 w-96 h-96"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(212,175,55,0.06) 0%, transparent 70%)",
            animation: "stadiumFlare 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(212,175,55,0.06) 0%, transparent 70%)",
            animation: "stadiumFlare 8s ease-in-out infinite 4s",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 hero-grid-overlay"
          style={{ opacity: 0.4 }}
        />
        {/* Bottom gradient fade to page */}
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background:
              "linear-gradient(0deg, #030303 0%, rgba(3,3,3,0.8) 50%, transparent 100%)",
          }}
        />
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)",
              top: `${30 + i * 30}%`,
              animation: `scanLine ${8 + i * 2}s linear infinite ${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        {/* Country Flag Label */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1) 0.2s",
          }}
        >
          <div className="flex gap-1 items-center">
            <div className="w-4 h-3 rounded-sm overflow-hidden flex flex-col">
              <div className="flex-1" style={{ background: "#007A5E" }} />
              <div className="flex-1" style={{ background: "#CE1126" }} />
              <div className="flex-1" style={{ background: "#FCD116" }} />
            </div>
          </div>
          <span className="font-label" style={{ color: "rgba(212,175,55,0.8)", letterSpacing: "0.3em" }}>
            Cameroon · Professional Footballer
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e", animation: "dotBlink 2s ease-in-out infinite" }}
          />
          <span className="font-label" style={{ color: "#22c55e", fontSize: "0.6rem" }}>Available</span>
        </div>

        {/* Main Title */}
        <div className="overflow-hidden mb-2">
          <h1
            className="font-black leading-none text-white"
            style={{
              fontSize: "clamp(4rem, 14vw, 13rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              opacity: textVisible ? 1 : 0,
              clipPath: textVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: "all 1.2s cubic-bezier(0.19,1,0.22,1) 0.4s",
            }}
          >
            NOEL
          </h1>
        </div>
        <div className="overflow-hidden mb-6">
          <h1
            className="font-black leading-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 13rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8960C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: textVisible ? 1 : 0,
              clipPath: textVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
              transition: "all 1.2s cubic-bezier(0.19,1,0.22,1) 0.6s",
            }}
          >
            FUTKEU
          </h1>
        </div>

        {/* Slogan */}
        <div className="gold-line mb-6" />
        <p
          className="text-xl lg:text-2xl font-light tracking-[0.2em] text-white/50 uppercase mb-8"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1) 0.8s",
          }}
        >
          Built Different.
        </p>

        {/* Tagline */}
        <p
          className="max-w-xl text-base lg:text-lg text-white/40 font-light leading-relaxed mb-12"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1) 1.0s",
          }}
        >
          From the streets of Cameroon to the grand stages of European football —
          a future icon forged through sacrifice, speed, and relentless ambition.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 mb-20"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1) 1.2s",
          }}
        >
          <button
            className="btn-gold"
            onClick={() => document.querySelector("#cinema")?.scrollIntoView({ behavior: "smooth" })}
          >
            ▶ Watch Highlights
          </button>
          <button
            className="btn-outline-gold"
            onClick={() => document.querySelector("#scout")?.scrollIntoView({ behavior: "smooth" })}
          >
            Scout Report
          </button>
          <button
            className="btn-outline-gold"
            onClick={() => document.querySelector("#sponsor")?.scrollIntoView({ behavior: "smooth" })}
          >
            Media Kit
          </button>
        </div>

        {/* Live Stats Bar */}
        <div
          className="flex flex-wrap gap-3"
          style={{
            opacity: statsStarted ? 1 : 0,
            transform: statsStarted ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.19,1,0.22,1)",
          }}
        >
          <div className="font-label flex items-center gap-2 mr-2" style={{ color: "rgba(212,175,55,0.6)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#D4AF37", animation: "dotBlink 1.5s ease-in-out infinite" }}
            />
            Live Stats 2025/26
          </div>
          {STATS.map((s, i) => (
            <StatCounter key={s.label} {...s} started={statsStarted} />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: "opacity 1s 1.5s",
        }}
      >
        <span className="font-label" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.55rem" }}>
          Scroll to Explore
        </span>
        <div className="relative w-5 h-8 border border-white/20 rounded-full flex justify-center">
          <div
            className="absolute top-1.5 w-1 h-1.5 rounded-full"
            style={{
              background: "#D4AF37",
              animation: "floatY 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Position Badge — Top Right */}
      <div
        className="absolute top-28 right-6 lg:right-12 z-20 hidden lg:flex flex-col items-end gap-2"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: "opacity 1s 1.4s",
        }}
      >
        <div className="glass-card-gold px-4 py-3 text-right">
          <div className="font-label mb-1" style={{ fontSize: "0.55rem" }}>Primary Position</div>
          <div className="text-white font-bold text-sm tracking-wider">STRIKER / CAM</div>
        </div>
        <div className="glass-card-gold px-4 py-3 text-right">
          <div className="font-label mb-1" style={{ fontSize: "0.55rem" }}>Market Value</div>
          <div className="text-gradient-gold font-black text-lg">€12M</div>
        </div>
        <div className="glass-card-gold px-4 py-3 text-right">
          <div className="font-label mb-1" style={{ fontSize: "0.55rem" }}>Nationality</div>
          <div className="text-white font-bold text-sm">🇨🇲 Cameroon</div>
        </div>
      </div>
    </section>
  );
}
