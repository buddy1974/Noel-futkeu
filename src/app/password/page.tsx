"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{id:number;x:number;y:number;size:number;opacity:number}>>([]);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    // Subtle particle field
    const ps = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(ps);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#030303" }}
    >
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size * 4}px`,
              height: `${p.size * 4}px`,
              background: `radial-gradient(circle, rgba(212,175,55,${p.opacity}) 0%, transparent 70%)`,
              animation: `goldPulse ${4 + p.id * 0.3}s ease-in-out infinite ${p.id * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 hero-grid-overlay pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.5 }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-auto px-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 0 40px rgba(212,175,55,0.1)",
            }}
          >
            <span
              className="font-black text-lg"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NF
            </span>
          </div>
          <div className="text-center">
            <p
              className="font-label mb-1"
              style={{ fontSize: "0.6rem", color: "rgba(212,175,55,0.5)", letterSpacing: "0.4em" }}
            >
              PREVIEW ACCESS
            </p>
            <h1
              className="font-black text-white"
              style={{ fontSize: "clamp(1.8rem,6vw,2.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              NOEL <span style={{
                background: "linear-gradient(135deg,#D4AF37,#FFD700)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>FUTKEU</span>
            </h1>
            <p className="text-white/30 text-xs font-light mt-2 tracking-widest uppercase">
              Official Platform — Private Preview
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,transparent,rgba(212,175,55,0.2))" }} />
          <span className="font-label" style={{ fontSize: "0.5rem", color: "rgba(212,175,55,0.4)" }}>ENTER PASSWORD</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg,rgba(212,175,55,0.2),transparent)" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter preview password"
              autoFocus
              autoComplete="current-password"
              className="w-full px-5 py-4 text-white text-sm font-light rounded-lg outline-none transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: error
                  ? "1px solid rgba(239,68,68,0.5)"
                  : "1px solid rgba(212,175,55,0.2)",
                letterSpacing: password ? "0.3em" : "normal",
                caretColor: "#D4AF37",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "rgba(212,175,55,0.5)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "rgba(212,175,55,0.2)";
              }}
            />
          </div>

          {error && (
            <div
              className="text-center py-2 px-4 rounded-lg text-xs font-light"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(239,68,68,0.8)" }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="btn-gold w-full py-4 text-xs tracking-widest uppercase relative overflow-hidden"
            style={{ opacity: loading || !password.trim() ? 0.6 : 1 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-current border-t-transparent"
                  style={{ animation: "spin 0.8s linear infinite" }}
                />
                Verifying
              </span>
            ) : (
              "Enter Platform"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-white/15 text-xs font-light">
            Confidential preview — MaxPromo Digital © 2026
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
