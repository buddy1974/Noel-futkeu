"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // Skip on touch devices

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, dotX, 0.12);
      ringY = lerp(ringY, dotY, 0.12);

      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`;
        dotRef.current.style.top = `${dotY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMove, { passive: true });

    // Hover effects
    const handleEnter = () => ringRef.current?.classList.add("expanded");
    const handleLeave = () => ringRef.current?.classList.remove("expanded");

    const interactives = document.querySelectorAll("a, button, [role='button'], .video-card, .sponsor-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
