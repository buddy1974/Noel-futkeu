"use client";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "📸" },
  { label: "TikTok", href: "#", icon: "🎵" },
  { label: "YouTube", href: "#", icon: "▶️" },
  { label: "Twitter/X", href: "#", icon: "🐦" },
];

const NAV_COLS = [
  {
    title: "Platform",
    links: ["Story", "Performance Lab", "AI Scout", "Match Cinema", "Fan Zone", "Legacy Wall"],
  },
  {
    title: "For Scouts",
    links: ["Scout Report", "League Fit", "Market Value", "Contact Agent", "Media Kit", "Press Assets"],
  },
  {
    title: "MaxPromo",
    links: ["About Agency", "Portfolio", "Services", "Contact", "Case Studies", "maxpromo.digital"],
  },
];

export default function Footer() {
  const scrollTo = (section: string) => {
    const el = document.getElementById(section.toLowerCase().replace(/ /g, "-").replace("ai scout", "scout").replace("match cinema", "cinema").replace("fan zone", "fans").replace("legacy wall", "legacy").replace("performance lab", "performance").replace("scout report", "scout"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#030303",
        borderTop: "1px solid rgba(212,175,55,0.1)",
      }}
    >
      {/* Top Footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <span
                  className="font-black text-sm"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #FFD700)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NF
                </span>
              </div>
              <div>
                <p className="text-white font-black text-base tracking-widest">NOEL FUTKEU</p>
                <p className="font-label" style={{ fontSize: "0.6rem", color: "#D4AF37" }}>
                  Official Platform
                </p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-8 max-w-sm">
              The digital home of a future global football icon. Elite performance,
              cinematic storytelling, and AI-powered fan engagement — all in one place.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  aria-label={s.label}
                >
                  <span className="text-base">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Cols */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <div className="font-label mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="text-white/40 text-sm font-light hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="gold-line-full" />

      {/* Bottom Footer */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-xs font-light">
          © 2026 Noel Futkeu. All rights reserved. Platform by{" "}
          <a
            href="https://maxpromo.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400/50 hover:text-yellow-400 transition-colors"
          >
            MaxPromo Digital
          </a>
        </p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/20 text-xs font-light hover:text-white/50 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
