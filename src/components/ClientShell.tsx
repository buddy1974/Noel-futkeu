"use client";
import { useEffect } from "react";
import Cursor from "./Cursor";

export default function ClientShell() {
  useEffect(() => {
    // Global IntersectionObserver for scroll-reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger children if present
            const delay = entry.target.getAttribute("data-delay") || "0";
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, parseInt(delay));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <Cursor />;
}
