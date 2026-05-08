"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import lifestyleShot from "@/assets/5.png";
import { PLAYER, CLUBS, SEASON_STATS_2526, MARKET_VALUE } from "@/config/player";

/**
 * FAN IMMERSION — AI chatbot + fan wall + wallpapers
 * Chatbot responses built from verified player.ts config data
 * All AI responses clearly labeled as simulated
 */

// Chatbot responses — facts sourced from player.ts config at build time
const buildResponses = () => ({
  default: `Hey! I'm an AI assistant for ${PLAYER.fullName}'s platform. Ask me about his career, clubs, or stats. I'm an AI — always verify with official sources.`,
  goals: `${PLAYER.firstName} scored ${SEASON_STATS_2526.goals} goals in ${SEASON_STATS_2526.appearances} appearances during the ${SEASON_STATS_2526.source === "Transfermarkt" ? "2025/26" : "2025/26"} season at ${CLUBS.loanClub.shortName} — a goals-per-game ratio of ${(SEASON_STATS_2526.goals / SEASON_STATS_2526.appearances).toFixed(2)}. He participated in ${SEASON_STATS_2526.goalParticipationPct}% of the team's goals. Stats: Transfermarkt.`,
  speed: `${PLAYER.firstName} has the profile of an explosive striker — acceleration over short distances is a key strength per our AI scout model. Actual GPS/sprint data would need to be verified from the club directly.`,
  cameroon: `Cameroonian heritage is central to ${PLAYER.firstName}'s identity. Born in ${PLAYER.placeOfBirth} with ${PLAYER.secondNationality} roots — dual identity is what makes THE RISE narrative so powerful. Germany raised him; Cameroon shaped him.`,
  frankfurt: `${PLAYER.firstName} is returning to ${CLUBS.parentClub.name} for the 2026/27 ${CLUBS.parentClub.league} season — ${CLUBS.parentClub.name} activated their buy-back clause after his dominant ${SEASON_STATS_2526.goals}-goal season at ${CLUBS.loanClub.shortName}.`,
  furth: `${PLAYER.firstName} wore the #${CLUBS.loanClub.shirtNumber} shirt for ${CLUBS.loanClub.name} (joined ${CLUBS.loanClub.joined}). In 2025/26 he scored ${SEASON_STATS_2526.goals} goals in ${SEASON_STATS_2526.appearances} ${SEASON_STATS_2526.league} appearances.`,
  scout: `For scouts and clubs: ${PLAYER.firstName} returns to ${CLUBS.parentClub.name} (${CLUBS.parentClub.league}) for 2026/27. Previously #${CLUBS.loanClub.shirtNumber} at ${CLUBS.loanClub.name} (${CLUBS.loanClub.league}). Contact management via maxpromo.digital. Agent: ${PLAYER.agent}.`,
  contact: `To reach ${PLAYER.firstName}'s management (agent: ${PLAYER.agent}) or MaxPromo Digital agency, use the Sponsor & Media Zone on this platform, or visit maxpromo.digital.`,
  value: `Last verified market value: ${MARKET_VALUE.value} (${MARKET_VALUE.source}, ${MARKET_VALUE.lastUpdated}). ${MARKET_VALUE.note}`,
});

type Responses = ReturnType<typeof buildResponses>;

function getAIResponse(input: string, responses: Responses): string {
  const lower = input.toLowerCase();
  if (lower.includes("goal") || lower.includes("scor") || lower.includes("stat")) return responses.goals;
  if (lower.includes("speed") || lower.includes("fast") || lower.includes("pace")) return responses.speed;
  if (lower.includes("cameroon") || lower.includes("africa") || lower.includes("heritage")) return responses.cameroon;
  if (lower.includes("frankfurt") || lower.includes("eintracht") || lower.includes("bundesliga")) return responses.frankfurt;
  if (lower.includes("furth") || lower.includes("fürth") || lower.includes("loan")) return responses.furth;
  if (lower.includes("scout") || lower.includes("transfer") || lower.includes("sign")) return responses.scout;
  if (lower.includes("contact") || lower.includes("agent") || lower.includes("sponsor")) return responses.contact;
  if (lower.includes("value") || lower.includes("worth") || lower.includes("market")) return responses.value;
  return responses.default;
}

const FAN_CARDS = [
  { name: "Marco T.", country: "🇩🇪", msg: `Been following since his time at Fürth. ${SEASON_STATS_2526.goals} goals in one season — that's elite level. Can't wait to see what he does at Frankfurt.`, time: "2h ago" },
  { name: "Amara K.", country: "🇨🇲", msg: "Cameroon pride! Every match he plays, the whole community watches. THE RISE is real 🔥", time: "4h ago" },
  { name: "Sophie L.", country: "🇫🇷", msg: "That movement in the box is something else. A striker's striker. Frankfurt is just the beginning.", time: "6h ago" },
  { name: "Jamal R.", country: "🇬🇧", msg: "From Essen to the Bundesliga — this is what football is about. Numbers don't lie. 🏴󠁧󠁢󠁥󠁮󠁧󠁿", time: "8h ago" },
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
  const [responses] = useState(() => buildResponses());
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "ai", text: buildResponses().default },
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
      setMessages((m) => [...m, { role: "ai", text: getAIResponse(userMsg, responses) }]);
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
        <div className="text-center mb-16 reveal">
          <div className="section-label justify-center">
            <span className="font-label">AI-Powered Experience</span>
          </div>
          <h2 className="font-black text-white leading-none mb-4"
            style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.04em" }}>
            Fan <span className="text-gradient-gold">Immersion</span>
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto font-light">
            A living connection between {PLAYER.firstName} and the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chatbot */}
          <div className="lg:col-span-2 reveal-left">
            <div className="glass-card h-full flex flex-col"
              style={{ border: "1px solid rgba(212,175,55,0.12)", minHeight: "520px" }}>
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
                  <div className="text-white font-bold">{PLAYER.firstName} AI</div>
                  <div className="font-label" style={{ fontSize: "0.55rem", color: "#22c55e" }}>
                    Online · Trained on {PLAYER.firstName}&apos;s verified profile
                  </div>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1 bg-yellow-400 rounded-full opacity-60"
                      style={{ height: `${6 + i * 3}px`, animation: `waveform 1.2s ease-in-out infinite ${i * 0.2}s` }} />
                  ))}
                </div>
              </div>

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
                        <div key={i} className="w-2 h-2 rounded-full"
                          style={{ background: "#D4AF37", animation: `dotBlink 1s ease-in-out infinite ${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex gap-3">
                  <input
                    type="text" value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder={`Ask about goals, clubs, ${PLAYER.secondNationality} roots...`}
                    className="flex-1 text-sm text-white placeholder-white/20 px-4 py-3 rounded-lg outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                  <button onClick={sendMessage} className="btn-gold px-5 text-xs">Send</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    "How many goals this season?",
                    `Frankfurt transfer?`,
                    `${PLAYER.secondNationality} heritage?`,
                    "Contact the team?"
                  ].map((q) => (
                    <button key={q} onClick={() => setInput(q)}
                      className="text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
                      style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)", color: "rgba(212,175,55,0.8)" }}>
                      {q}
                    </button>
                  ))}
                </div>
                <p className="mt-2 font-label" style={{ fontSize: "0.42rem", color: "rgba(255,255,255,0.18)" }}>
                  🤖 AI assistant — responses are simulated, not official player statements
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5 reveal-right">
            <div className="relative overflow-hidden rounded-xl"
              style={{ height: "280px", border: "1px solid rgba(212,175,55,0.2)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
              <Image src={lifestyleShot} alt={`${PLAYER.fullName} — lifestyle portrait`}
                fill quality={85} sizes="(max-width: 1024px) 100vw, 33vw"
                style={{ objectFit: "cover", objectPosition: "center 10%", filter: "contrast(1.05) saturate(0.85) brightness(0.88)" }}
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 45%, rgba(3,3,3,0.85) 100%)" }} />
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "rgba(212,175,55,0.3)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-label" style={{ fontSize: "0.55rem", color: "rgba(212,175,55,0.7)" }}>
                  ✅ {PLAYER.fullName} — Official Editorial
                </div>
                <div className="text-white font-bold text-lg" style={{ letterSpacing: "-0.02em" }}>THE RISE</div>
                <div className="text-white/40 text-xs">{CLUBS.parentClub.name} · {CLUBS.parentClub.league}</div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="font-label mb-5">Fan Wall</div>
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
