"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ══════════════════════════════════════════════════
   STAR RAIN — 20 tiny stars rain from top on page load
   Pure CSS animation, stars are 6-pointed SVG
   ══════════════════════════════════════════════════ */

const BRAND_COLORS = ["#FFD700", "#F02D8A", "#F7941D", "#4A6FCC", "#2DB84B", "#7B3FA0", "#00B5B8", "#E8192C"];

function StarSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.6 8.2L24 9.4L17 15.4L18.8 24L12 19.6L5.2 24L7 15.4L0 9.4L9.4 8.2Z" />
    </svg>
  );
}

export function StarRain() {
  const reduced = useReducedMotion();
  const [stars, setStars] = useState<Array<{
    id: number; left: string; delay: string; duration: string; size: number; color: string;
  }>>([]);

  useEffect(() => {
    if (reduced) return;
    const raf = requestAnimationFrame(() => {
      const s = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        duration: `${4 + Math.random() * 3}s`,
        size: 4 + Math.random() * 4,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
      }));
      setStars(s);
    });
    const timeout = setTimeout(() => setStars([]), 6000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [reduced]);

  if (reduced || stars.length === 0) return null;

  return (
    <div className="star-rain-container" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-rain-particle"
          style={{
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          <StarSVG color={star.color} size={star.size} />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PARTICLE BURST — 12 star/heart particles burst
   outward on CTA click
   ══════════════════════════════════════════════════ */

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
  size: number;
  shape: "star" | "heart";
}

export function useParticleBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const reduced = useReducedMotion();

  const burst = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: cx,
        y: cy,
        color: BRAND_COLORS[i % BRAND_COLORS.length],
        angle: (i * 30) * (Math.PI / 180),
        distance: 60 + Math.random() * 40,
        size: 6 + Math.random() * 4,
        shape: i % 3 === 0 ? "heart" : "star",
      }));

      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);
    },
    [reduced]
  );

  return { burst, particles };
}

export function ParticleBurstLayer({ particles }: { particles: Particle[] }) {
  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {particles.map((p) => {
        const tx = Math.cos(p.angle) * p.distance;
        const ty = Math.sin(p.angle) * p.distance;
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            animate={{ scale: 0, opacity: 0, x: tx, y: ty }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {p.shape === "star" ? (
              <StarSVG color={p.color} size={p.size} />
            ) : (
              <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   WAVE DIVIDER — animated SVG wave between sections
   Breathing ocean effect via CSS d-attribute animation
   ══════════════════════════════════════════════════ */

export function WaveDivider({
  to = "#FFF5F0",
  position = "bottom",
  className = "",
  flip = false,
}: {
  from?: string;
  to?: string;
  position?: "top" | "bottom";
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`wave-divider ${position === "top" ? "top-0" : "bottom-0"} ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
      style={{ zIndex: 5 }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "clamp(40px, 6vw, 80px)", display: "block" }}
      >
        <path
          className="wave-path"
          d="M0,64 C240,100 480,20 720,64 C960,108 1200,20 1440,64 L1440,120 L0,120 Z"
          fill={to}
        />
        <path
          className="wave-path"
          d="M0,80 C180,50 360,100 540,70 C720,40 900,100 1080,70 C1260,40 1350,80 1440,80 L1440,120 L0,120 Z"
          fill={to}
          opacity="0.5"
          style={{ animationDelay: "-2s" }}
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FAN-IN CARD WRAPPER — applies fan-in entrance
   ══════════════════════════════════════════════════ */

export function FanInCard({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      // Use rAF to avoid synchronous setState in effect
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "rotate(0deg) translateY(0)"
          : "rotate(-8deg) translateY(80px)",
        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
