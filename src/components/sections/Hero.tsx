"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import tunnelPortrait from "@/assets/4.png";
import matchActionJpg from "@/assets/1.jpg";
import celebrationArms from "@/assets/3.webp";

// ✅ VERIFIED STATS — Transfermarkt, May 2026 (2025/26 season, 2. Bundesliga)
const VERIFIED_STATS = [
  { label: "Goals 25/26", value: "17", verified: true },
  { label: "Assists", value: "5", verified: true },
  { label: "Appearances", value: "32", verified: true },
  { label: "Goal Participation", value: "49%", verified: true },
  { label: "Starting XI", value: "91%", verified: true },
];

// ✅ VERIFIED IDENTITY BADGES
const VERIFIED_BADGES = [
  { label: "Parent Club", value: "Eintracht Frankfurt", icon: "🦅" },
  { label: "Current (Loan)", value: "SpVgg Greuther Fürth", icon: "🟢" },
  { label: "Born", value: "Essen, Germany", icon: "🏭" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const particles: Array<{x:number;y:number;vx:number;vy:number;size:number;opacity:number;life:number;maxLife:number}> = [];
    const spawn = () => particles.push({ x:Math.random()*canvas.width, y:canvas.height+10, vx:(Math.random()-0.5)*0.4, vy:-(Math.random()*1.5+0.5), size:Math.random()*2+0.5, opacity:0, life:0, maxLife:Math.random()*180+140 });
    let frame = 0; let raf: number;
    const animate = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if (frame%5===0) spawn(); frame++;
      for (let i=particles.length-1;i>=0;i--) {
        const p=particles[i]; p.life++; p.x+=p.vx; p.y+=p.vy;
        const prog=p.life/p.maxLife;
        p.opacity=prog<0.2?prog/0.2:prog>0.7?(1-prog)/0.3:1;
        const grd=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3);
        grd.addColorStop(0,`rgba(212,175,55,${p.opacity*0.6})`); grd.addColorStop(1,"rgba(212,175,55,0)");
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size*3,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill();
        if (p.life>=p.maxLife) particles.splice(i,1);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    setTimeout(()=>setTextVisible(true), 400);
    setTimeout(()=>setStatsStarted(true), 1200);
    return () => { window.removeEventListener("resize",resize); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{background:"#030303"}}>

      {/* Background: match action photo */}
      <div className="absolute inset-0 z-0">
        <Image src={matchActionJpg} alt="" fill priority quality={75} sizes="100vw"
          style={{ objectFit:"cover", objectPosition:"center 30%", filter:"brightness(0.18) saturate(0.6)", transform:"scale(1.05)" }} />
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 100% 80% at 50% 60%, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.9) 100%)"}} />
        <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 60% 40% at 30% 60%, rgba(212,175,55,0.06) 0%, transparent 70%)"}} />
        <div className="absolute bottom-0 left-0 right-0 h-80" style={{background:"linear-gradient(0deg, #030303 0%, rgba(3,3,3,0.7) 60%, transparent 100%)"}} />
      </div>

      {/* Scan lines */}
      {[...Array(3)].map((_,i)=>(
        <div key={i} className="absolute left-0 right-0 h-px pointer-events-none" style={{top:`${25+i*28}%`,zIndex:5,
          background:"linear-gradient(90deg, transparent, rgba(212,175,55,0.06), transparent)",
          animation:`scanLine ${9+i*2}s linear infinite ${i*2.5}s`}} />
      ))}

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" style={{opacity:0.8}} />

      <div className="relative z-20 max-w-screen-xl mx-auto px-6 lg:px-12 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">

          {/* LEFT — Typography */}
          <div>
            {/* Heritage badge */}
            <div className="flex items-center gap-3 mb-8"
              style={{opacity:textVisible?1:0,transform:textVisible?"translateY(0)":"translateY(20px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1) 0.2s"}}>
              <div className="w-5 h-4 rounded-sm overflow-hidden flex flex-col border border-white/10">
                <div className="flex-1" style={{background:"#007A5E"}} />
                <div className="flex-1" style={{background:"#CE1126"}} />
                <div className="flex-1" style={{background:"#FCD116"}} />
              </div>
              <span className="font-label" style={{color:"rgba(212,175,55,0.8)",letterSpacing:"0.3em",fontSize:"0.65rem"}}>
                ESSEN · CAMEROON ROOTS · 2. BUNDESLIGA
              </span>
              <span className="w-2 h-2 rounded-full" style={{background:"#22c55e",animation:"dotBlink 2s ease-in-out infinite"}} />
              <span className="font-label" style={{color:"#22c55e",fontSize:"0.6rem"}}>Active</span>
            </div>

            {/* THE RISE label */}
            <div style={{opacity:textVisible?1:0,transition:"opacity 0.6s ease 0.3s"}} className="mb-1">
              <span className="font-label tracking-[0.5em]" style={{color:"rgba(212,175,55,0.5)",fontSize:"0.7rem"}}>THE RISE</span>
            </div>

            {/* Name */}
            <div className="overflow-hidden mb-1">
              <h1 className="font-black leading-none text-white" style={{fontSize:"clamp(3.5rem,11vw,10rem)",letterSpacing:"-0.04em",lineHeight:0.9,
                opacity:textVisible?1:0,clipPath:textVisible?"inset(0 0 0 0)":"inset(0 100% 0 0)",
                transition:"all 1.2s cubic-bezier(0.19,1,0.22,1) 0.4s"}}>NOEL</h1>
            </div>
            <div className="overflow-hidden mb-6">
              <h1 className="font-black leading-none" style={{fontSize:"clamp(3.5rem,11vw,10rem)",letterSpacing:"-0.04em",lineHeight:0.9,
                background:"linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8960C 100%)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                opacity:textVisible?1:0,clipPath:textVisible?"inset(0 0 0 0)":"inset(0 100% 0 0)",
                transition:"all 1.2s cubic-bezier(0.19,1,0.22,1) 0.6s"}}>FUTKEU</h1>
            </div>

            <div className="gold-line mb-6" />

            {/* Tagline */}
            <p className="text-lg lg:text-xl font-light tracking-[0.15em] text-white/50 uppercase mb-3"
              style={{opacity:textVisible?1:0,transform:textVisible?"translateY(0)":"translateY(16px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1) 0.8s"}}>
              17 Goals. 32 Games. One Destination.
            </p>
            <p className="max-w-lg text-sm text-white/35 font-light leading-relaxed mb-10"
              style={{opacity:textVisible?1:0,transform:textVisible?"translateY(0)":"translateY(16px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1) 1.0s"}}>
              Born in Essen. Signed by Eintracht Frankfurt. Dominated the 2. Bundesliga on loan at Fürth.
              Now returning to the Bundesliga. The rise is not coming — it is here.
            </p>

            {/* Verified badges */}
            <div className="flex flex-wrap gap-2 mb-8"
              style={{opacity:textVisible?1:0,transform:textVisible?"translateY(0)":"translateY(16px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1) 1.1s"}}>
              {VERIFIED_BADGES.map((b)=>(
                <div key={b.label} className="glass-card px-3 py-2 flex items-center gap-2" style={{borderColor:"rgba(212,175,55,0.2)"}}>
                  <span>{b.icon}</span>
                  <div>
                    <div className="font-label" style={{fontSize:"0.5rem",color:"rgba(212,175,55,0.5)"}}>{b.label} ✅</div>
                    <div className="text-white text-xs font-semibold">{b.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4"
              style={{opacity:textVisible?1:0,transform:textVisible?"translateY(0)":"translateY(16px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1) 1.2s"}}>
              <button className="btn-gold" onClick={()=>document.querySelector("#cinema")?.scrollIntoView({behavior:"smooth"})}>▶ Watch Highlights</button>
              <button className="btn-outline-gold" onClick={()=>document.querySelector("#scout")?.scrollIntoView({behavior:"smooth"})}>AI Scout Report</button>
              <button className="btn-outline-gold" onClick={()=>document.querySelector("#sponsor")?.scrollIntoView({behavior:"smooth"})}>Media Kit</button>
            </div>
          </div>

          {/* RIGHT — Portrait */}
          <div className="relative hidden lg:flex items-center justify-center"
            style={{opacity:textVisible?1:0,transform:textVisible?"translateX(0)":"translateX(60px)",
              transition:"all 1.4s cubic-bezier(0.19,1,0.22,1) 0.5s",height:"620px"}}>

            <div className="absolute" style={{width:"340px",height:"340px",borderRadius:"50%",
              background:"radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)",
              filter:"blur(20px)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"goldPulse 4s ease-in-out infinite"}} />

            <div className="relative" style={{width:"300px",height:"460px",borderRadius:"16px",overflow:"hidden",
              border:"1px solid rgba(212,175,55,0.25)",
              boxShadow:"0 0 60px rgba(212,175,55,0.15), 0 40px 80px rgba(0,0,0,0.8)"}}>
              <Image src={tunnelPortrait} alt="Noel Futkeu — portrait" fill priority quality={90} sizes="300px"
                style={{objectFit:"cover",objectPosition:"center top",filter:"contrast(1.1) saturate(0.85) brightness(0.95)"}} />
              <div className="absolute inset-0" style={{background:"linear-gradient(180deg, transparent 50%, rgba(3,3,3,0.7) 100%)"}} />
              <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{background:"linear-gradient(180deg, transparent, rgba(212,175,55,0.6), transparent)"}} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-label" style={{fontSize:"0.5rem",color:"rgba(212,175,55,0.6)"}}>NOEL FUTKEU · #9</div>
                <div className="text-white/60 text-xs">CF · SpVgg Greuther Fürth (loan from Frankfurt)</div>
              </div>
            </div>

            <div className="absolute" style={{width:"140px",height:"180px",bottom:"40px",right:"-20px",borderRadius:"12px",overflow:"hidden",
              border:"1px solid rgba(212,175,55,0.2)",boxShadow:"0 20px 40px rgba(0,0,0,0.7)",animation:"floatY 5s ease-in-out infinite 1s"}}>
              <Image src={celebrationArms} alt="Noel Futkeu celebrating" fill quality={80} sizes="140px"
                style={{objectFit:"cover",objectPosition:"center top",filter:"brightness(0.85) contrast(1.1) saturate(0.9)"}} />
              <div className="absolute inset-0" style={{background:"linear-gradient(180deg, transparent 30%, rgba(3,3,3,0.6) 100%)"}} />
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:"rgba(212,175,55,0.5)"}} />
            </div>

            <div className="absolute glass-card-gold px-3 py-2 text-center"
              style={{top:"30px",right:"-10px",animation:"floatY 6s ease-in-out infinite",minWidth:"110px"}}>
              <div className="font-label" style={{fontSize:"0.45rem",color:"rgba(212,175,55,0.5)"}}>2025/26 · 2. BUNDESLIGA ✅</div>
              <div className="text-white font-black text-xl" style={{letterSpacing:"-0.03em"}}>17</div>
              <div className="font-label" style={{fontSize:"0.5rem",color:"rgba(212,175,55,0.7)"}}>GOALS</div>
            </div>
          </div>
        </div>

        {/* Verified Stats Bar */}
        <div className="mt-6 pt-6 border-t"
          style={{borderColor:"rgba(212,175,55,0.1)",opacity:statsStarted?1:0,transform:statsStarted?"translateY(0)":"translateY(20px)",transition:"all 0.8s cubic-bezier(0.19,1,0.22,1)"}}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{background:"#22c55e",animation:"dotBlink 1.5s ease-in-out infinite"}} />
              <span className="font-label" style={{fontSize:"0.6rem",color:"rgba(34,197,94,0.7)",letterSpacing:"0.2em"}}>
                ✅ VERIFIED STATS — Transfermarkt · 2025/26 Season
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {VERIFIED_STATS.map((s)=>(
                <div key={s.label} className="text-center px-3 py-3 glass-card-gold min-w-[90px] relative"
                  style={{borderColor:"rgba(34,197,94,0.2)"}}>
                  <div className="absolute top-1 right-1 font-label" style={{fontSize:"0.4rem",color:"rgba(34,197,94,0.5)"}}>✅</div>
                  <div className="counter-number" style={{fontSize:"1.6rem"}}>{s.value}</div>
                  <div className="font-label mt-1" style={{color:"rgba(212,175,55,0.7)",fontSize:"0.55rem"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2 font-label" style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.2)"}}>
            Source: Transfermarkt · fetched May 2026 · SpVgg Greuther Fürth loan · 2. Bundesliga
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{opacity:textVisible?1:0,transition:"opacity 1s 1.6s"}}>
        <span className="font-label" style={{color:"rgba(255,255,255,0.25)",fontSize:"0.5rem"}}>EXPLORE THE RISE</span>
        <div className="relative w-5 h-8 border border-white/15 rounded-full flex justify-center">
          <div className="absolute top-1.5 w-1 h-1.5 rounded-full" style={{background:"#D4AF37",animation:"floatY 2s ease-in-out infinite"}} />
        </div>
      </div>
    </section>
  );
}
