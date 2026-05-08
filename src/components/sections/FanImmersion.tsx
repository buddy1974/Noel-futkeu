"use client";
import { useEffect, useRef, useState } from "react";

const AI_RESPONSES: Record<string, string> = {
  default: "Hey! I'm Noel's AI — ask me anything about his game, stats, career journey, or how to get in touch. What's on your mind?",
  goals: "This season Noel has scored 34 goals across all competitions — including 12 in Europe. His left foot is lethal but don't sleep on the right. 3 headers too.",
  speed: "Noel clocked 36.2 km/h in the last Bundesliga match — that puts him in the top 3% of all professional footballers in tracked competitions.",
  cameroon: "Cameroon is everything. Noel grew up in Yaoundé, left at 17 for the academy. He carries the flag everywhere he plays — every goal is for his people.",
  scout: "For scouts: Noel fits best in high-press systems like Bundesliga or Premier League clubs. Best formation: 4-3-3 as CF. Market value: €12M, projected +40% in 18 months.",
  contact: "To reach Noel's management team, use the Sponsor & Media Zone below, or email via maxpromo.digital. Response within 48 hours guaranteed.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("goal") || lower.includes("scor")) return AI_RESPONSES.goals;
  if (lower.includes("speed") || lower.includes("fast") || lower.includes("pace")) return AI_RESPONSES.speed;
  if (lower.includes("cameroon") || lower.includes("africa") || lower.includes("home")) return AI_RESPONSES.cameroon;
  if (lower.includes("scout") || lower.includes("transfer") || lower.includes("value") || lower.includes("sign")) return AI_RESPONSES.scout;
  if (lower.includes("contact") || lower.includes("agent") || lower.includes("sponsor")) return AI_RESPONSES.contact;
  return AI_RESPONSES.default;
}

const FAN_CARDS = [
  { name: "Marco T.", country: "🇩🇪", msg: "Been watching Noel since the academy days. The next big thing — no question.", time: "2h ago" },
  { name: "Amara K.", country: "🇨🇲", msg: "Cameroon pride! Every match he plays, we play with him. BUILT DIFFERENT 🔥", time: "4h ago" },
  { name: "Lucas B.", country: "🇫🇷", msg: "That bicycle kick in the CL quarter-final broke the internet. Pure art.", time: "6h ago" },
  { name: "Jamal R.", country: "🇬🇧", msg: "Scouts are sleeping. This player is ready for the top 5 leagues RIGHT NOW.", time: "8h ago" },
];

const WALLPAPERS = [
  { title: "Gold Portrait", desc: "Ultra-HD poster", accent: "#D4AF37" },
  { title: "Cameroon Edition", desc: "Flag color variant", accent: "#007A5E" },
  { title: "Stadium Night", desc: "Dark atmosphere", accent: "#444" },
  { title: "Champion Mode", desc: "Trophy overlay", accent: "#FFD700" },
];

type Message = { role: "user" | "ai"; text: string };

export default function FanImmersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: AI_RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

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
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: getAIResponse(userMsg) }]);
    }, 1200);
  };

  return (
    <section
      id="fans"
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #030303 0%, #0A0A0A 50%, #030303 100%)",
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
      }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center">
            <span className="font-label">AI-Powered Experience</span>
          </div>
          <h2 className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
            Fan <span className="text-gradient-gold">Immersion</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-light">
            Not just a fanpage. A living, breathing connection between Noel and the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chatbot */}
          <div className="lg:col-span-2 reveal-left">
            <div className="glass-card h-full flex flex-col"
              style={{ border: "1px solid rgba(212,175,55,0.12)", minHeight: "520px" }}>
              {/* Header */}
              <div className="flex items-center gap-4 p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "rgba(212,175,55,0.12)", border: "1.5px solid rgba(212,175,55,0.3)" }}>
                    ⚽
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                    style={{ background: "#22c55e", borderColor: "#030303" }} />
                </div>
                <div>
                  <div className="text-white font-bold">Noel AI</div>
                  <div className="font-label" style={{ fontSize: "0.55rem", color: "#22c55e" }}>
                    Online · Trained on Noel&apos;s brand
                  </div>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 bg-yellow-400 rounded-full opacity-60"
                      style={{ height: `${6 + i * 3}px`, animation: `waveform 1.2s ease-in-out infinite ${i * 0.2}s` }} />
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4"
                style={{ maxHeight: "320px", scrollbarWidth: "none" }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-sm px-4 py-3 text-sm font-light leading-relaxed ${
                      msg.role === "user" ? "chat-bubble-user text-white" : "chat-bubble-ai text-white/80"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-ai px-4 py-3 flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-2 h-2 rounded-full" style={{
                          background: "#D4AF37", animation: `dotBlink 1s ease-in-out infinite ${i * 0.2}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about goals, transfer value, Cameroon roots..."
                    className="flex-1 text-sm text-white placeholder-white/20 px-4 py-3 rounded-lg outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                  <button onClick={sendMessage} className="btn-gold px-5 text-xs">Send</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Goals this season?", "How fast is he?", "Best league fit?"].map((q) => (
                    <button key={q} onClick={() => { setInput(q); }}
                      className="text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
                      style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "rgba(212,175,55,0.8)" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fan Wall + Wallpapers */}
          <div className="space-y-5 reveal-right">
            {/* Fan Messages */}
            <div className="glass-card p-6">
              <div className="font-label mb-5">Fan Wall — Live</div>
              <div className="space-y-4">
                {FAN_CARDS.map((fan, i) => (
                  <div key={i} className="flex gap-3 items-start"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(16px)",
                      transition: `all 0.6s cubic-bezier(0.19,1,0.22,1) ${i * 0.1}s`,
                    }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                      {fan.country}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-xs font-semibold">{fan.name}</span>
                        <span className="text-white/20 text-xs">{fan.time}</span>
                      </div>
                      <p className="text-white/50 text-xs font-light leading-relaxed">{fan.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Wallpapers */}
            <div className="glass-card p-6">
              <div className="font-label mb-4">AI-Generated Wallpapers</div>
              <div className="grid grid-cols-2 gap-3">
                {WALLPAPERS.map((w, i) => (
                  <div key={i}
                    className="relative overflow-hidden rounded-xl cursor-pointer group hover:scale-105 transition-transform duration-300"
                    style={{ aspectRatio: "9/16", maxHeight: "120px", background: `linear-gradient(135deg, #030303, ${w.accent}22)`, border: `1px solid ${w.accent}33` }}>
                    <div className="absolute inset-0 flex flex-col justify-end p-2">
                      <div className="text-white text-xs font-bold leading-tight">{w.title}</div>
                      <div className="font-label" style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>{w.desc}</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                      <div className="text-3xl">⚽</div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(212,175,55,0.8)" }}>
                        <span className="text-black text-xs font-bold">↓</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-outline-gold w-full mt-4 text-xs">Generate My Fan Card</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
