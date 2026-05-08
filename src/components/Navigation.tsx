"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Performance", href: "#performance" },
  { label: "Scout", href: "#scout" },
  { label: "Cinema", href: "#cinema" },
  { label: "Fans", href: "#fans" },
  { label: "Legacy", href: "#legacy" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-scrolled border-b border-transparent" : ""
        }`}
        style={{
          background: scrolled ? "rgba(3,3,3,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.1)" : "1px solid transparent",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10">
              <div
                className="absolute inset-0 rounded-full border border-yellow-500/30 group-hover:border-yellow-500/60 transition-colors duration-300"
                style={{ background: "rgba(212,175,55,0.05)" }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center font-black text-sm text-gradient-gold tracking-wider"
                style={{ fontWeight: 900 }}
              >
                NF
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm tracking-widest leading-none">NOEL</p>
              <p className="text-gradient-gold font-black text-xs tracking-[0.25em] leading-none mt-0.5">FUTKEU</p>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  activeSection === link.href.replace("#", "")
                    ? "text-yellow-400"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-yellow-400 transition-all duration-300 ${
                    activeSection === link.href.replace("#", "") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollTo("#sponsor")}
              className="btn-outline-gold text-xs"
            >
              For Scouts
            </button>
            <button
              onClick={() => scrollTo("#fans")}
              className="btn-gold text-xs"
            >
              Fan Zone
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white/60 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white/40 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(3,3,3,0.97)", backdropFilter: "blur(30px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-3xl font-black tracking-wider text-white/80 hover:text-yellow-400 transition-colors duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-4 mt-8">
            <button onClick={() => scrollTo("#sponsor")} className="btn-outline-gold">
              For Scouts
            </button>
            <button onClick={() => scrollTo("#fans")} className="btn-gold">
              Fan Zone
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
