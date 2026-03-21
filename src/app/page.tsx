"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  ArrowRight,
  Youtube,
  Star,
  Heart,
  Music,
  Sparkles,
  BookOpen,
  Users,
  Tv,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Shared Components ─────────────────────────────────── */

function WaveDivider({
  flip = false,
  color = "#FFF8F0",
  className = "",
}: {
  flip?: boolean;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`wave-divider ${flip ? "top-0 rotate-180" : "bottom-0"} ${className}`}
      style={{ zIndex: 2 }}
    >
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,64 C288,120 480,0 720,64 C960,128 1152,0 1440,64 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

function SectionBadge({ children, color = "#7C3AED" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="sticker inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold tracking-[0.12em] uppercase mb-6"
      style={{ backgroundColor: `${color}15`, color, border: `2px dashed ${color}30` }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-heading text-[clamp(2.5rem,6vw,4.5rem)] text-[#2D1B69] leading-[0.92] tracking-tight heading-shadow ${className}`}>
      {children}
    </h2>
  );
}

function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initialVariants = {
    up: { opacity: 0, y: 40, scale: 0.98 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    scale: { opacity: 0, scale: 0.9 },
  };

  const animateVariants = {
    up: { opacity: 1, y: 0, scale: 1 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial={initialVariants[direction]}
      animate={isInView ? animateVariants[direction] : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO v16 — Bright Playful World
   Confetti, doodles, stickers, splatters, candy gradients,
   rainbow arcs, characters as central stars, wobble text
   ══════════════════════════════════════════════════════════ */

function useMousePosition() {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  useEffect(() => {
    const update = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, [x, y]);
  return { mx: x, my: y };
}

/* Wobble-interactive split text */
function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  revealed,
}: {
  text: string;
  className?: string;
  delay?: number;
  revealed: boolean;
}) {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          initial={{ opacity: 0, y: 80, rotate: -15, scale: 0.5 }}
          animate={revealed ? {
            opacity: 1,
            y: 0,
            rotate: hoveredChar === i ? [0, -8, 8, -4, 0] : 0,
            scale: hoveredChar === i ? 1.2 : 1,
          } : {}}
          transition={{
            delay: delay + i * 0.06,
            type: "spring",
            stiffness: 150,
            damping: 12,
          }}
          onMouseEnter={() => setHoveredChar(i)}
          onMouseLeave={() => setHoveredChar(null)}
          style={{ display: char === " " ? "inline" : "inline-block" }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* Confetti pieces */
function HeroConfetti({ revealed }: { revealed: boolean }) {
  const confetti = [
    { x: "5%", y: "10%", color: "#FF6B35", size: 10, shape: "circle", delay: 1.5, dur: 4 },
    { x: "15%", y: "25%", color: "#7C3AED", size: 14, shape: "rect", delay: 1.7, dur: 5 },
    { x: "85%", y: "15%", color: "#F59E0B", size: 12, shape: "circle", delay: 1.6, dur: 4.5 },
    { x: "90%", y: "30%", color: "#10B981", size: 8, shape: "triangle", delay: 1.8, dur: 3.5 },
    { x: "10%", y: "70%", color: "#EC4899", size: 11, shape: "rect", delay: 2.0, dur: 5 },
    { x: "20%", y: "85%", color: "#3B82F6", size: 9, shape: "circle", delay: 1.9, dur: 4 },
    { x: "75%", y: "75%", color: "#FF6B35", size: 13, shape: "triangle", delay: 2.1, dur: 4.5 },
    { x: "92%", y: "60%", color: "#7C3AED", size: 10, shape: "rect", delay: 1.8, dur: 5 },
    { x: "50%", y: "8%", color: "#F59E0B", size: 8, shape: "circle", delay: 2.2, dur: 3 },
    { x: "60%", y: "90%", color: "#10B981", size: 12, shape: "rect", delay: 2.0, dur: 4.5 },
    { x: "30%", y: "5%", color: "#EC4899", size: 7, shape: "triangle", delay: 2.3, dur: 4 },
    { x: "70%", y: "12%", color: "#3B82F6", size: 11, shape: "circle", delay: 1.7, dur: 5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {confetti.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.x, top: c.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={revealed ? { opacity: 0.6, scale: 1, rotate: 360 } : {}}
          transition={{ delay: c.delay, type: "spring", stiffness: 120, damping: 10 }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === "circle" ? "50%" : c.shape === "rect" ? "2px" : "0",
              clipPath: c.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* Hand-drawn doodle lines */
function HeroDoodles({ revealed }: { revealed: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
      {/* Squiggly line top-left */}
      <motion.svg
        className="absolute top-[12%] left-[3%] w-[120px] h-[40px]"
        viewBox="0 0 120 40"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={revealed ? { opacity: 0.15 } : {}}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.path
          d="M5,20 C15,5 25,35 35,20 C45,5 55,35 65,20 C75,5 85,35 95,20 C105,5 115,35 115,20"
          stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}}
          transition={{ delay: 2.5, duration: 1.5, ease: "easeOut" }}
        />
      </motion.svg>
      {/* Star doodle top-right */}
      <motion.svg
        className="absolute top-[8%] right-[8%] w-[50px] h-[50px]"
        viewBox="0 0 50 50"
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 0.2, scale: 1, rotate: 15 } : {}}
        transition={{ delay: 2.8, type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.path
          d="M25,2 L30,18 L48,18 L34,28 L39,45 L25,35 L11,45 L16,28 L2,18 L20,18 Z"
          stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}}
          transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
        />
      </motion.svg>
      {/* Heart doodle bottom-left */}
      <motion.svg
        className="absolute bottom-[25%] left-[6%] w-[45px] h-[45px]"
        viewBox="0 0 50 50"
        initial={{ opacity: 0, scale: 0 }}
        animate={revealed ? { opacity: 0.2, scale: 1, rotate: -10 } : {}}
        transition={{ delay: 3.0, type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.path
          d="M25,45 C15,35 2,28 2,16 C2,8 8,2 16,2 C20,2 23,4 25,8 C27,4 30,2 34,2 C42,2 48,8 48,16 C48,28 35,35 25,45 Z"
          stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}}
          transition={{ delay: 3.0, duration: 1.2, ease: "easeOut" }}
        />
      </motion.svg>
      {/* Spiral doodle bottom-right */}
      <motion.svg
        className="absolute bottom-[20%] right-[5%] w-[60px] h-[60px]"
        viewBox="0 0 60 60"
        initial={{ opacity: 0 }}
        animate={revealed ? { opacity: 0.12 } : {}}
        transition={{ delay: 3.2, duration: 1 }}
      >
        <motion.path
          d="M30,30 C30,25 35,20 40,20 C45,20 50,25 50,30 C50,40 40,50 30,50 C15,50 5,40 5,25 C5,10 15,0 30,0"
          stroke="#7C3AED" strokeWidth="2" fill="none" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}}
          transition={{ delay: 3.2, duration: 1.5, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
}

/* Sticker-style floating labels */
function HeroStickers({ revealed }: { revealed: boolean }) {
  const stickers = [
    { text: "🎵", x: "8%", y: "35%", rotate: -12, delay: 2.0, color: "#FF6B35" },
    { text: "✨", x: "88%", y: "40%", rotate: 8, delay: 2.2, color: "#7C3AED" },
    { text: "🌟", x: "12%", y: "55%", rotate: 15, delay: 2.4, color: "#F59E0B" },
    { text: "💜", x: "85%", y: "65%", rotate: -8, delay: 2.6, color: "#EC4899" },
    { text: "🎶", x: "5%", y: "80%", rotate: 10, delay: 2.8, color: "#10B981" },
    { text: "⭐", x: "93%", y: "80%", rotate: -15, delay: 2.3, color: "#3B82F6" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
      {stickers.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0, scale: 0, rotate: s.rotate + 45 }}
          animate={revealed ? { opacity: 0.7, scale: 1, rotate: s.rotate } : {}}
          transition={{ delay: s.delay, type: "spring", stiffness: 200, damping: 12 }}
        >
          <motion.span
            animate={{ y: [0, -8, 0], rotate: [s.rotate, s.rotate + 5, s.rotate] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            className="block"
          >
            {s.text}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/* Paint splatter blobs */
function HeroSplatters({ revealed }: { revealed: boolean }) {
  const splatters = [
    { x: "2%", y: "15%", w: 180, h: 180, color: "#FF6B35", opacity: 0.06, delay: 1.2 },
    { x: "78%", y: "8%", w: 200, h: 160, color: "#7C3AED", opacity: 0.05, delay: 1.4 },
    { x: "5%", y: "65%", w: 160, h: 200, color: "#10B981", opacity: 0.05, delay: 1.6 },
    { x: "82%", y: "55%", w: 220, h: 180, color: "#F59E0B", opacity: 0.04, delay: 1.8 },
    { x: "40%", y: "85%", w: 250, h: 150, color: "#EC4899", opacity: 0.04, delay: 2.0 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
      {splatters.map((s, i) => (
        <motion.div
          key={i}
          className="absolute blob"
          style={{
            left: s.x, top: s.y,
            width: s.w, height: s.h,
            backgroundColor: s.color,
            filter: "blur(60px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={revealed ? { opacity: s.opacity, scale: 1 } : {}}
          transition={{ delay: s.delay, duration: 2, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { mx, my } = useMousePosition();
  const [revealed, setRevealed] = useState(false);
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const smoothMx = useSpring(mx, { stiffness: 35, damping: 30 });
  const smoothMy = useSpring(my, { stiffness: 35, damping: 30 });

  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.92]);
  const charLeftX = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const charRightX = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const charCenterY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const charY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const overlayOp = useTransform(scrollYProgress, [0.2, 0.5], [0, 0.3]);

  const fgX = useTransform(smoothMx, [0, 1], [-25, 25]);
  const fgY = useTransform(smoothMy, [0, 1], [-12, 12]);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 200);
    const t2 = setTimeout(() => setPhase(1), 400);
    const t3 = setTimeout(() => setPhase(2), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[110svh] overflow-hidden">
      {/* Candy gradient background */}
      <div className="absolute inset-0 z-[0]" style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 30%, #FFF8F0 0%, #FFEBD9 25%, #FFE0CC 45%, #FFF0E8 60%, #F3EEFF 80%, #FFF8F0 100%)"
      }} />

      {/* 6 rainbow arcs */}
      <motion.div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 2 }}
      >
        <svg className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[140%] h-[65%]" viewBox="0 0 1000 400" fill="none">
          {[
            { r: 390, color: "#FF6B35", opacity: 0.08, width: 14 },
            { r: 360, color: "#F59E0B", opacity: 0.07, width: 12 },
            { r: 330, color: "#10B981", opacity: 0.06, width: 12 },
            { r: 300, color: "#3B82F6", opacity: 0.06, width: 10 },
            { r: 270, color: "#7C3AED", opacity: 0.07, width: 12 },
            { r: 240, color: "#EC4899", opacity: 0.06, width: 10 },
          ].map((arc, i) => (
            <motion.circle key={i} cx="500" cy="0" r={arc.r} stroke={arc.color}
              strokeWidth={arc.width} fill="none" opacity={arc.opacity}
              initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 0.5 } : {}}
              transition={{ delay: 0.8 + i * 0.15, duration: 1.8, ease: "easeOut" }}
              strokeDasharray="1 1" strokeLinecap="round"
            />
          ))}
        </svg>
      </motion.div>

      {/* Paint splatters */}
      <HeroSplatters revealed={revealed} />

      {/* Confetti */}
      <HeroConfetti revealed={revealed} />

      {/* Hand-drawn doodles */}
      <HeroDoodles revealed={revealed} />

      {/* Emoji stickers */}
      <HeroStickers revealed={revealed} />

      {/* Cinematic letterbox reveal */}
      <motion.div className="absolute top-0 left-0 right-0 z-[60] bg-[#FFF8F0]"
        initial={{ height: "50vh" }} animate={phase >= 1 ? { height: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div className="absolute bottom-0 left-0 right-0 z-[60] bg-[#FFF8F0]"
        initial={{ height: "50vh" }} animate={phase >= 1 ? { height: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* CENTER CHARACTER — Andy with name sticker */}
      <motion.div
        style={{ y: charCenterY }}
        className="absolute bottom-[0%] left-1/2 -translate-x-1/2 z-[22] w-[220px] sm:w-[360px] lg:w-[500px]"
      >
        <motion.div
          initial={{ y: 200, opacity: 0, scale: 0.5 }}
          animate={revealed ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.4, type: "spring", stiffness: 50, damping: 14 }}
        >
          <motion.div
            style={{ x: fgX, y: fgY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="cursor-pointer relative"
          >
            <Image
              src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png"
              alt="Andy - The Brave Leader"
              width={800}
              height={800}
              className="drop-shadow-[0_30px_80px_rgba(255,107,53,0.3)]"
              priority
            />
            <div className="absolute -inset-10 rounded-full bg-gradient-to-b from-[#FF6B35]/12 to-transparent blur-[50px] -z-10" />
            {/* Name sticker */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-[11px] sm:text-[13px] font-bold px-4 py-1.5 rounded-full shadow-lg hand-drawn"
              initial={{ opacity: 0, scale: 0 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 12 }}
            >
              Andy ⭐
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* LEFT CHARACTER — Libni with name sticker */}
      <motion.div
        style={{ x: charLeftX, y: charY }}
        className="absolute bottom-[2%] left-[0%] sm:left-[2%] lg:left-[5%] z-[20] w-[140px] sm:w-[240px] lg:w-[340px]"
      >
        <motion.div
          initial={{ x: -120, opacity: 0, scale: 0.6, rotate: -10 }}
          animate={revealed ? { x: 0, opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 1.0, duration: 1.2, type: "spring", stiffness: 55, damping: 14 }}
        >
          <motion.div
            style={{ x: fgX, y: fgY }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06, y: -10, rotate: -3 }}
            className="cursor-pointer relative"
          >
            <Image
              src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png"
              alt="Libni - The Joyful Singer"
              width={640}
              height={640}
              className="drop-shadow-[0_24px_60px_rgba(124,58,237,0.25)]"
              priority
            />
            <div className="absolute -inset-6 rounded-full bg-[#7C3AED]/10 blur-[35px] -z-10" />
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-[10px] sm:text-[12px] font-bold px-3 py-1 rounded-full shadow-lg hand-drawn"
              initial={{ opacity: 0, scale: 0 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.7, type: "spring", stiffness: 200, damping: 12 }}
            >
              Libni 🎵
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT CHARACTER — Shiloh with name sticker */}
      <motion.div
        style={{ x: charRightX, y: charY }}
        className="absolute bottom-[2%] right-[0%] sm:right-[2%] lg:right-[5%] z-[20] w-[140px] sm:w-[240px] lg:w-[340px]"
      >
        <motion.div
          initial={{ x: 120, opacity: 0, scale: 0.6, rotate: 10 }}
          animate={revealed ? { x: 0, opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 1.2, duration: 1.2, type: "spring", stiffness: 55, damping: 14 }}
        >
          <motion.div
            style={{
              x: useTransform(smoothMx, [0, 1], [20, -20]),
              y: fgY,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.06, y: -10, rotate: 3 }}
            className="cursor-pointer relative"
          >
            <Image
              src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png"
              alt="Shiloh - The Curious Explorer"
              width={640}
              height={640}
              className="drop-shadow-[0_24px_60px_rgba(16,185,129,0.25)]"
              priority
            />
            <div className="absolute -inset-6 rounded-full bg-[#10B981]/10 blur-[35px] -z-10" />
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] sm:text-[12px] font-bold px-3 py-1 rounded-full shadow-lg hand-drawn"
              initial={{ opacity: 0, scale: 0 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.9, type: "spring", stiffness: 200, damping: 12 }}
            >
              Shiloh 💚
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* CENTER CONTENT */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-[30] flex h-[100svh] flex-col items-center justify-center px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          className="mb-8"
        >
          <span className="sticker inline-flex items-center gap-2.5 rounded-full bg-[#7C3AED]/12 border-2 border-dashed border-[#7C3AED]/25 px-5 py-2.5 text-[11px] sm:text-[13px] font-bold tracking-[0.12em] uppercase text-[#7C3AED]">
            <Music className="h-3.5 w-3.5" />
            Bible Songs for Kids
            <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
          </span>
        </motion.div>

        {/* Headline — stacked playful layout */}
        <div className="text-center">
          <h1 className="font-heading leading-[0.85] tracking-tight">
            <motion.span
              className="block text-[clamp(1.6rem,4.5vw,2.8rem)] text-[#7C3AED] font-bold mb-2"
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotate: -2 } : {}}
              transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            >
              Where
            </motion.span>
            <span className="block text-[clamp(4rem,13vw,11rem)] text-[#2D1B69]">
              <SplitTextReveal text="Faith" revealed={phase >= 2} delay={0.25} />
            </span>
            <motion.span
              className="block text-[clamp(1.4rem,4vw,2.4rem)] text-[#FF6B35] font-bold -mt-1 mb-1"
              initial={{ opacity: 0, scale: 0.5, rotate: 5 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1, rotate: 3 } : {}}
              transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
            >
              meets
            </motion.span>
            <span className="relative block text-[clamp(4.5rem,15vw,12rem)]">
              <span className="font-heading italic">
                <SplitTextReveal
                  text="Fun!"
                  className="gradient-text"
                  revealed={phase >= 2}
                  delay={0.65}
                />
              </span>
              {/* Hand-drawn underline scribble */}
              <svg className="absolute -bottom-2 sm:-bottom-4 left-[5%] w-[90%] h-[14px] sm:h-[24px]" viewBox="0 0 500 20" preserveAspectRatio="none">
                <motion.path
                  d="M2,10 C60,4 120,16 200,8 C280,0 360,14 498,10"
                  stroke="url(#scribbleGrad16)" strokeWidth="4" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={phase >= 2 ? { pathLength: 1, opacity: 0.7 } : {}}
                  transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scribbleGrad16" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 1, ease: EASE }}
          className="mt-8 max-w-xl text-center text-[15px] sm:text-[18px] text-[#2D1B69]/55 leading-[1.8] font-medium"
        >
          Original Bible songs with <span className="text-[#FF6B35] font-bold">stunning 3D animation</span> that
          get your little ones up, moving &amp; falling in love with <span className="text-[#7C3AED] font-bold">God&apos;s word</span> 🎉
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/videos"
              className="hero-btn-primary group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F50] px-9 py-4.5 text-[15px] font-bold text-white shadow-[0_8px_30px_rgba(255,107,53,0.35)] transition-all duration-400 hover:shadow-[0_16px_48px_rgba(255,107,53,0.45)]"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
              </span>
              Watch Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.96 }}>
            <a
              href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full border-2 border-dashed border-[#7C3AED]/20 bg-white/60 backdrop-blur-xl px-7 py-4 text-[15px] font-bold text-[#2D1B69] shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-400 hover:bg-white hover:border-[#7C3AED]/30 hover:shadow-[0_12px_40px_rgba(45,27,105,0.1)]"
            >
              <Youtube className="h-5 w-5 text-red-500 transition-transform duration-300 group-hover:scale-110" />
              Subscribe Free 🎉
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[35]"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#2D1B69]/20">Scroll ↓</span>
          <div className="w-6 h-10 rounded-full border-2 border-dashed border-[#2D1B69]/12 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]/50"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll overlay */}
      <motion.div style={{ opacity: overlayOp }} className="absolute inset-0 z-[25] bg-[#2D1B69] pointer-events-none" />

      <WaveDivider color="#FFF8F0" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   STORY MARQUEE — Tilted infinite scroll strip
   ══════════════════════════════════════════════════════════ */
function StoryMarquee() {
  const items = [
    { text: "Bible Songs", icon: BookOpen, emoji: "📖" },
    { text: "3D Animation", icon: Tv, emoji: "🎬" },
    { text: "Family Worship", icon: Users, emoji: "👨‍👩‍👧‍👦" },
    { text: "Scripture Memory", icon: Star, emoji: "⭐" },
    { text: "Joyful Music", icon: Music, emoji: "🎵" },
    { text: "Faith Adventures", icon: Heart, emoji: "💜" },
  ];

  return (
    <section className="relative py-5 bg-[#2D1B69] overflow-hidden z-10 -rotate-1 shadow-[0_4px_20px_rgba(45,27,105,0.3)]">
      <div className="marquee-container">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 group/m cursor-default">
              <span className="text-lg transition-transform duration-300 group-hover/m:scale-125">{item.emoji}</span>
              <span className="text-[14px] sm:text-[17px] font-bold text-white/85 tracking-wide transition-colors duration-300 group-hover/m:text-[#FF6B35]">
                {item.text}
              </span>
              <span className="text-[#FF6B35] text-lg transition-transform duration-500 group-hover/m:rotate-90">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   STORY INTRO — Word-by-word scroll reveal
   ══════════════════════════════════════════════════════════ */
function StoryIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const words = [
    "We", "believe", "every", "child", "deserves",
    "music", "that", "lifts", "their", "spirit,",
    "fills", "their", "heart,", "and", "plants",
    "God's", "word", "deep", "inside", "them.", "✨"
  ];

  const highlightWords = new Set(["child", "music", "spirit,", "heart,", "God's"]);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden section-grain">
      {/* Decorative side accent */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-10 w-1 h-24 rounded-full bg-gradient-to-b from-[#FF6B35]/20 via-[#7C3AED]/15 to-transparent hidden lg:block" />
      <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 w-1 h-24 rounded-full bg-gradient-to-b from-[#7C3AED]/20 via-[#FF6B35]/15 to-transparent hidden lg:block" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-[0.4em] gap-y-3">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start * 0.55, Math.min(end * 0.55 + 0.06, 0.6)], [0.06, 1]);
            const y = useTransform(scrollYProgress, [start * 0.55, Math.min(end * 0.55 + 0.06, 0.6)], [12, 0]);

            return (
              <motion.span
                key={i}
                style={{ opacity, y }}
                className={`font-heading text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.15] tracking-tight heading-shadow transition-colors duration-300 ${
                  highlightWords.has(word) ? "text-[#FF6B35]" : "text-[#2D1B69]"
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURED VIDEO — "The Good News" Cinematic Premiere
   Floating particles, 3D tilt card, animated ring pulses,
   sticker badges, character peek-ins, filmstrip decoration
   ══════════════════════════════════════════════════════════ */

function VideoParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: `${5 + Math.random() * 90}%`,
    y: `${5 + Math.random() * 90}%`,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    dur: 4 + Math.random() * 6,
    color: ["#FF6B35", "#7C3AED", "#F59E0B", "#10B981", "#EC4899", "#3B82F6"][i % 6],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FilmstripDecor({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute top-[15%] ${side === "left" ? "left-0 sm:left-4" : "right-0 sm:right-4"} hidden lg:flex flex-col gap-2 z-[3] opacity-[0.07]`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-6 h-8 rounded-sm border-2 border-white bg-white/5" />
      ))}
    </div>
  );
}

function FeaturedVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.92]);
  const videoRotateX = useTransform(scrollYProgress, [0, 0.2], [6, 0]);
  const videoRotateY = useTransform(scrollYProgress, [0.4, 0.6], [-1, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  // Title uses useInView animations on children — no scroll-driven opacity needed

  return (
    <section
      ref={containerRef}
      className="relative min-h-[160vh]"
      style={{ background: "linear-gradient(165deg, #2D1B69 0%, #1A0B2E 40%, #0F0520 100%)" }}
    >
      <WaveDivider flip color="#FFF8F0" />

      {/* Floating particles */}
      <VideoParticles />

      {/* Filmstrip decoration */}
      <FilmstripDecor side="left" />
      <FilmstripDecor side="right" />

      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 sm:px-10">
        {/* Animated glow rings behind the video */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FF6B35]/10 blur-[140px]" />
          <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-[#7C3AED]/8 blur-[110px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#F59E0B]/6 blur-[90px]" />
          {/* Pulsing concentric rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] rounded-[3rem] border border-[#FF6B35]/[0.06]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] rounded-[3rem] border border-[#7C3AED]/[0.04]"
            animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        {/* Section heading above video */}
        <div
          className="relative z-[10] text-center mb-8 sm:mb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          >
            <span className="sticker inline-flex items-center gap-2 rounded-full bg-[#FF6B35]/15 border-2 border-dashed border-[#FF6B35]/25 px-5 py-2.5 text-[11px] sm:text-[13px] font-bold tracking-[0.12em] uppercase text-[#FF6B35] mb-5">
              <Sparkles className="h-3.5 w-3.5" /> World Premiere ✨
            </span>
          </motion.div>
          <motion.h2
            className="font-heading text-[clamp(2rem,5.5vw,4rem)] text-white leading-[0.92] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          >
            Now Showing<br />
            <span className="italic text-[#FF6B35]">&ldquo;The Good News&rdquo;</span> 🎬
          </motion.h2>
        </div>

        {/* 3D tilting video card */}
        <motion.div
          style={{ scale: videoScale, rotateX: videoRotateX, rotateY: videoRotateY, perspective: "1400px" }}
          className="relative w-full max-w-5xl z-[5]"
        >
          {/* Decorative floating stickers around the video */}
          <motion.div
            className="absolute -top-6 -left-4 sm:-top-8 sm:-left-8 z-[15]"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={sectionInView ? { opacity: 1, scale: 1, rotate: -12 } : {}}
            transition={{ delay: 1.0, type: "spring", stiffness: 150, damping: 10 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-12, -8, -12] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="sticker bg-[#F59E0B] text-white text-[10px] sm:text-[12px] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl hand-drawn shadow-lg"
            >
              🌟 Brand New!
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-3 sm:-top-6 sm:-right-6 z-[15]"
            initial={{ opacity: 0, scale: 0, rotate: 20 }}
            animate={sectionInView ? { opacity: 1, scale: 1, rotate: 8 } : {}}
            transition={{ delay: 1.2, type: "spring", stiffness: 150, damping: 10 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [8, 12, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="sticker bg-[#7C3AED] text-white text-[10px] sm:text-[12px] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl hand-drawn shadow-lg"
            >
              🎵 Original Song
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute -bottom-5 left-[10%] sm:-bottom-7 z-[15]"
            initial={{ opacity: 0, scale: 0, rotate: 10 }}
            animate={sectionInView ? { opacity: 1, scale: 1, rotate: -5 } : {}}
            transition={{ delay: 1.4, type: "spring", stiffness: 150, damping: 10 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0], rotate: [-5, -2, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="sticker bg-[#10B981] text-white text-[10px] sm:text-[12px] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl hand-drawn shadow-lg"
            >
              ✨ 3D Animated
            </motion.div>
          </motion.div>

          {/* Character peek-in — left side */}
          <motion.div
            className="absolute -left-8 sm:-left-16 lg:-left-24 bottom-[15%] z-[12] w-[60px] sm:w-[90px] lg:w-[130px]"
            initial={{ x: -60, opacity: 0 }}
            animate={sectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 1, type: "spring", stiffness: 60, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png"
                alt="Libni peeking"
                width={200}
                height={200}
                className="drop-shadow-[0_8px_24px_rgba(124,58,237,0.25)]"
              />
            </motion.div>
          </motion.div>

          {/* Character peek-in — right side */}
          <motion.div
            className="absolute -right-8 sm:-right-16 lg:-right-24 bottom-[15%] z-[12] w-[60px] sm:w-[90px] lg:w-[130px]"
            initial={{ x: 60, opacity: 0 }}
            animate={sectionInView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 1.8, duration: 1, type: "spring", stiffness: 60, damping: 14 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png"
                alt="Shiloh peeking"
                width={200}
                height={200}
                className="drop-shadow-[0_8px_24px_rgba(16,185,129,0.25)] -scale-x-100"
              />
            </motion.div>
          </motion.div>

          {/* The video card itself */}
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(255,107,53,0.15),0_0_160px_rgba(124,58,237,0.1)] border-2 border-dashed border-white/10">
            {/* Animated gradient border glow */}
            <div className="absolute -inset-[2px] rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-[#FF6B35]/20 via-[#7C3AED]/20 to-[#F59E0B]/20 -z-10 blur-[1px]" />

            <div className="relative aspect-video bg-[#0A0515]">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png"
                alt="The Good News - Selah Kids"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority
              />

              {/* Cinematic vignette overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,5,21,0.4)_100%)]" />

              {/* Play button — animated multi-ring */}
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} className="relative">
                  {/* Outer ring pulse 1 */}
                  <motion.div
                    className="absolute -inset-8 rounded-full border-2 border-white/10"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                  />
                  {/* Outer ring pulse 2 */}
                  <motion.div
                    className="absolute -inset-5 rounded-full border-2 border-[#FF6B35]/15"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                  />
                  {/* Glow behind button */}
                  <div className="absolute -inset-6 rounded-full bg-[#FF6B35]/20 blur-[30px]" />
                  {/* Main button */}
                  <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-[#FFF0E8]" />
                    <Play className="relative h-8 w-8 sm:h-10 sm:w-10 text-[#FF6B35] ml-1" fill="currentColor" />
                  </div>
                  {/* "Play" text below button */}
                  <motion.span
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 whitespace-nowrap"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Tap to Play
                  </motion.span>
                </motion.div>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0A0515]/90 via-[#0A0515]/50 to-transparent p-6 sm:p-8 pt-24">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="sticker inline-flex items-center gap-1.5 rounded-full bg-[#FF6B35] px-3.5 py-1.5 text-[10px] font-bold text-white uppercase tracking-wide">
                        <Sparkles className="h-3 w-3" /> New Release
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white/70 uppercase tracking-wide">
                        <Music className="h-3 w-3" /> Original Song
                      </span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                      The Good News
                    </h3>
                    <p className="mt-1.5 text-[13px] sm:text-[14px] text-white/35 font-medium max-w-md">
                      Join Andy, Libni &amp; Shiloh as they share the greatest story ever told through song and adventure
                    </p>
                  </div>
                  <Link
                    href="/videos"
                    className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 border border-dashed border-white/15 px-5 py-3 text-[13px] font-bold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white hover:-translate-y-0.5"
                  >
                    All Videos 🎬 <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Playful progress bar decoration */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F59E0B]"
                      initial={{ width: "0%" }}
                      animate={sectionInView ? { width: "35%" } : {}}
                      transition={{ delay: 2, duration: 2, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white/20 tracking-wider">3:24</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <WaveDivider color="#FFF8F0" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FEATURES — Playful philosophy cards with number watermarks
   ══════════════════════════════════════════════════════════ */
const features = [
  {
    num: "01",
    label: "Scripture First",
    title: "Every lyric rooted in God\u2019s word",
    desc: "Each song is carefully crafted around real Bible verses, helping little hearts memorize scripture through melodies they can\u2019t stop singing.",
    icon: BookOpen,
    color: "#FF6B35",
    bgColor: "#FFF0E8",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    emoji: "📖",
  },
  {
    num: "02",
    label: "Cinema Quality",
    title: "Breathtaking 3D animation worlds",
    desc: "Animation that rivals major studios. Every frame is a masterpiece designed to captivate tiny eyes and spark boundless imagination.",
    icon: Tv,
    color: "#7C3AED",
    bgColor: "#F3EEFF",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    emoji: "🎬",
  },
  {
    num: "03",
    label: "Family Worship",
    title: "Bringing everyone together in joy",
    desc: "Songs that gather the whole family in joyful praise. Living room dance parties, car ride sing-alongs \u2014 worship made unforgettably fun.",
    icon: Users,
    color: "#10B981",
    bgColor: "#ECFDF5",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    emoji: "👨‍👩‍👧‍👦",
  },
];

function FeaturesSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden section-grain">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-10 sm:mb-14">
          <SectionBadge color="#7C3AED">
            <Sparkles className="h-3.5 w-3.5" /> What makes us special ✨
          </SectionBadge>
          <SectionHeading>
            More than just<br />
            <span className="italic text-[#FF6B35]">kids music</span> 🎵
          </SectionHeading>
        </RevealOnScroll>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <RevealOnScroll key={f.num} delay={i * 0.12}>
              <motion.div
                className="group relative overflow-hidden rounded-3xl p-8 sm:p-9 border-2 border-dashed transition-all duration-500 cursor-default"
                style={{ backgroundColor: f.bgColor, borderColor: `${f.color}25` }}
                whileHover={{ y: -8, rotate: 0.5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {/* Number watermark with hover shift */}
                <motion.span
                  className="absolute -top-4 -right-2 font-heading text-[8rem] leading-none font-bold pointer-events-none select-none transition-all duration-700"
                  style={{ color: `${f.color}06` }}
                >
                  {f.num}
                </motion.span>

                {/* Hover glow */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 16px 48px ${f.color}15, 0 0 0 1px ${f.color}10` }}
                />

                <div className="relative flex items-center gap-3 mb-6">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl hand-drawn transition-shadow duration-500 group-hover:shadow-lg"
                    style={{ backgroundColor: `${f.color}15` }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </motion.div>
                  <span
                    className="text-[12px] font-bold tracking-[0.15em] uppercase tracking-hover"
                    style={{ color: f.color }}
                  >
                    {f.label} {f.emoji}
                  </span>
                </div>

                <h3 className="relative font-heading text-[clamp(1.6rem,3.2vw,2.2rem)] text-[#2D1B69] leading-[1.05] tracking-tight mb-3 heading-shadow">
                  {f.title}
                </h3>

                <p className="relative text-[14px] text-[#5C4A82]/55 leading-[1.8] mb-7">
                  {f.desc}
                </p>

                <div className="relative h-[180px] sm:h-[220px] overflow-hidden rounded-2xl hand-drawn">
                  <Image
                    src={f.image}
                    alt={f.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Image overlay gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${f.color}15, transparent)` }}
                  />
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   VIDEO GALLERY — Interactive hover reveals
   ══════════════════════════════════════════════════════════ */
const videoItems = [
  {
    title: "The Good News",
    desc: "Sharing God\u2019s love with the world",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    tag: "Newest 🔥",
    tagColor: "#FF6B35",
  },
  {
    title: "Jesus Me Ama",
    desc: "A beautiful Spanish worship song",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    tag: "Espa\u00f1ol 🇪🇸",
    tagColor: "#7C3AED",
  },
  {
    title: "Worship Together",
    desc: "Joyful family praise & worship",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    tag: "Popular ⭐",
    tagColor: "#10B981",
  },
];

function VideoGallery() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden section-grain">
      {/* Background decoration blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-[#FF6B35]/[0.03] blur-[80px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-[#7C3AED]/[0.03] blur-[80px]" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <RevealOnScroll>
            <SectionBadge color="#FF6B35">
              <Play className="h-3.5 w-3.5" fill="currentColor" /> The collection 🎬
            </SectionBadge>
            <SectionHeading>Watch &amp; Worship 🙌</SectionHeading>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <Link
              href="/videos"
              className="group/btn hidden sm:flex items-center gap-2 rounded-full bg-[#2D1B69] px-6 py-3 text-[14px] font-bold text-white transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(45,27,105,0.25)] hover:bg-[#3D2B79]"
            >
              See all videos <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {videoItems.map((v, i) => (
            <RevealOnScroll key={v.title} delay={i * 0.1}>
              <motion.div
                className="group cursor-pointer"
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-dashed border-[#E7E5E4] transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] group-hover:border-[#E7E5E4]/60">
                  <div className="relative overflow-hidden">
                    <Image
                      src={v.thumbnail}
                      alt={v.title}
                      width={800}
                      height={600}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover dark overlay */}
                    <div className="absolute inset-0 bg-[#2D1B69]/0 group-hover:bg-[#2D1B69]/20 transition-all duration-500" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400">
                        <Play className="h-6 w-6 text-[#FF6B35] ml-0.5" fill="currentColor" />
                      </div>
                    </motion.div>
                    <div
                      className="sticker absolute top-3 left-3 rounded-full px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-wide"
                      style={{ backgroundColor: v.tagColor }}
                    >
                      {v.tag}
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-white/80">
                      3:24
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[17px] font-bold text-[#2D1B69] group-hover:text-[#FF6B35] transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#5C4A82]/45 font-medium">{v.desc}</p>
                    {/* Hover arrow */}
                    <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ color: v.tagColor }}>
                      Watch now <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-[14px] font-bold text-white shadow-md"
          >
            See all videos 🎬 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CHARACTERS — Horizontal scroll carousel with bigger images
   ══════════════════════════════════════════════════════════ */
const characters = [
  {
    name: "Andy",
    role: "The Brave Leader",
    desc: "Always ready for an adventure. Andy leads the crew through every story with courage, faith, and an unstoppable spirit.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    color: "#FF6B35",
    bgGradient: "from-[#FFF0E8] to-[#FFE0CC]",
    emoji: "⭐",
  },
  {
    name: "Libni",
    role: "The Joyful Singer",
    desc: "Her voice lights up every song. Libni finds the bright side of everything and reminds everyone that God\u2019s love is everywhere.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    color: "#7C3AED",
    bgGradient: "from-[#F3EEFF] to-[#E8DEFF]",
    emoji: "🎵",
  },
  {
    name: "Shiloh",
    role: "The Curious Explorer",
    desc: "Loves discovering new things and sharing Bible stories. Shiloh\u2019s curiosity turns every day into an adventure of faith.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    color: "#10B981",
    bgGradient: "from-[#ECFDF5] to-[#D1FAE5]",
    emoji: "💚",
  },
];

function CharactersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
    scrollRef.current.scrollBy({ left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
    setActiveIndex(Math.min(Math.round(scrollRef.current.scrollLeft / (cardWidth + 24)), characters.length - 1));
  }, []);

  return (
    <section className="relative py-16 sm:py-20 bg-[#2D1B69] overflow-hidden">
      <WaveDivider flip color="#FFF8F0" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <RevealOnScroll>
            <SectionBadge color="#FF6B35">
              <Heart className="h-3.5 w-3.5" fill="currentColor" /> Meet the stars 🌟
            </SectionBadge>
            <SectionHeading className="text-white">
              Your kids&apos; new<br />
              <span className="italic text-[#FF6B35]">best friends</span> 💜
            </SectionHeading>
          </RevealOnScroll>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => scrollTo("left")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/6 border border-dashed border-white/10 text-white/40 hover:bg-white/12 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("right")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6B35] text-white hover:bg-[#FF8F6B] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </motion.button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-6 px-6"
        >
          {characters.map((c, i) => (
            <RevealOnScroll
              key={c.name}
              delay={i * 0.12}
              className="flex-shrink-0 w-[82vw] sm:w-[68vw] lg:w-[400px] snap-center"
            >
              <motion.div
                className={`relative rounded-3xl bg-gradient-to-br ${c.bgGradient} p-8 sm:p-9 overflow-hidden border-2 border-dashed border-white/25 transition-all duration-500 cursor-default group/char`}
                whileHover={{ y: -10, rotate: 0.5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                {/* Hover glow ring */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-0 group-hover/char:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 20px_60px ${c.color}20` }}
                />

                <div className="relative w-full aspect-square max-w-[240px] mx-auto mb-6">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover/char:drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    />
                  </motion.div>
                </div>

                <div className="text-center">
                  <span
                    className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase tracking-hover"
                    style={{ color: c.color }}
                  >
                    {c.role} {c.emoji}
                  </span>
                  <h3 className="mt-1.5 font-heading text-[clamp(2.2rem,5vw,3.5rem)] text-[#2D1B69] leading-[0.92] tracking-tight heading-shadow">
                    {c.name}
                  </h3>
                  <p className="mt-2.5 text-[14px] text-[#5C4A82]/55 leading-[1.75] font-medium">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-7">
          {characters.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: activeIndex === i ? 28 : 8,
                backgroundColor: activeIndex === i ? "#FF6B35" : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>

      <WaveDivider color="#FFF8F0" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   STATS — Animated counters with icon boxes
   ══════════════════════════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { value: 50, suffix: "K+", label: "Happy Families", color: "#FF6B35", icon: Heart, emoji: "👨‍👩‍👧‍👦" },
    { value: 20, suffix: "+", label: "Worship Songs", color: "#7C3AED", icon: Music, emoji: "🎵" },
    { value: 2, suffix: "", label: "Languages", color: "#10B981", icon: Star, emoji: "🌍" },
    { value: 100, suffix: "%", label: "Bible Based", color: "#F59E0B", icon: BookOpen, emoji: "📖" },
  ];

  return (
    <section className="relative py-14 sm:py-18 bg-[#FFF8F0] overflow-hidden">
      {/* Subtle gradient divider line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-md h-px bg-gradient-to-r from-transparent via-[#E7E5E4] to-transparent" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <RevealOnScroll key={s.label} delay={i * 0.08} className="text-center">
              <motion.div whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 15 } }} className="cursor-default">
                <div className="relative inline-block mb-4 mx-auto">
                  <div
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl hand-drawn"
                    style={{ backgroundColor: `${s.color}12` }}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                  </div>
                  {/* Subtle glow ring */}
                  <div
                    className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${s.color}08, transparent 70%)` }}
                  />
                </div>
                <div
                  className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-tight heading-shadow"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[12px] font-bold tracking-[0.15em] uppercase text-[#5C4A82]/40">
                  {s.label}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Subtle gradient divider line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] max-w-md h-px bg-gradient-to-r from-transparent via-[#E7E5E4] to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TESTIMONIALS — Cards with rotation and dashed borders
   ══════════════════════════════════════════════════════════ */
const testimonials = [
  {
    text: "My kids sing these songs ALL day long. Finally, worship music they actually love and I enjoy too!",
    author: "Sarah M.",
    role: "Mom of 3",
    color: "#FF6B35",
    rotate: -1,
  },
  {
    text: "The animation quality is incredible. My kids are learning scripture without even realizing it.",
    author: "David R.",
    role: "Dad of 2",
    color: "#7C3AED",
    rotate: 0.5,
  },
  {
    text: "Selah Kids has made worship time the highlight of our week. A true blessing for our family.",
    author: "Maria L.",
    role: "Mom of 4",
    color: "#10B981",
    rotate: -0.5,
  },
  {
    text: "The Spanish songs are amazing! My bilingual family loves worshipping together in both languages.",
    author: "Isabella R.",
    role: "Mom of 2",
    color: "#3B82F6",
    rotate: 1,
  },
];

function TestimonialsSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden section-grain">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-10">
          <SectionBadge color="#10B981">
            <Star className="h-3.5 w-3.5" fill="currentColor" /> Loved by families 💜
          </SectionBadge>
          <SectionHeading>
            What parents<br />
            <span className="italic text-[#FF6B35]">are saying</span> 🥰
          </SectionHeading>
        </RevealOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <motion.div
                className="relative rounded-3xl bg-white p-7 border-2 border-dashed transition-all duration-500 h-full flex flex-col justify-between cursor-default group/card"
                style={{
                  borderColor: `${t.color}20`,
                  rotate: `${t.rotate}deg`,
                }}
                whileHover={{
                  y: -8,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-px rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `0 16px_48px ${t.color}12` }}
                />

                <div>
                  {/* Quote icon with breathing animation on hover */}
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold text-white mb-4 transition-transform duration-500 group-hover/card:scale-110"
                    style={{ backgroundColor: t.color }}
                  >
                    <Quote className="h-4 w-4" fill="currentColor" />
                  </div>

                  {/* Star rating */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3 w-3" style={{ color: "#F59E0B" }} fill="#F59E0B" />
                    ))}
                  </div>

                  <p className="text-[14px] text-[#44403C] leading-[1.8] font-medium italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-dashed transition-colors duration-500 group-hover/card:border-opacity-30" style={{ borderColor: `${t.color}15` }}>
                  <div className="text-[15px] font-bold text-[#2D1B69]">{t.author}</div>
                  <div className="text-[11px] font-bold tracking-wide" style={{ color: t.color }}>
                    {t.role}
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   CTA — Bold atmospheric call to action
   ══════════════════════════════════════════════════════════ */
function CTAParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    x: `${10 + Math.random() * 80}%`,
    y: `${10 + Math.random() * 80}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    dur: 5 + Math.random() * 5,
    color: ["#FF6B35", "#7C3AED", "#F59E0B", "#10B981"][i % 4],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, backgroundColor: p.color }}
          animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#2D1B69]">
      <WaveDivider flip color="#FFF8F0" />

      <CTAParticles />

      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6B35]/8 blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#7C3AED]/6 blur-[100px]" />
        {/* Extra ambient glow */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-[#F59E0B]/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 py-20 sm:py-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <h2 className="font-heading text-[clamp(2.8rem,7vw,5.5rem)] text-white leading-[0.9] tracking-tight" style={{ textShadow: "0 4px 60px rgba(255,107,53,0.15)" }}>
              Start the
              <br />
              <span className="italic text-[#FF6B35]">adventure</span> 🚀
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <p className="mt-7 text-[16px] sm:text-[18px] text-white/45 leading-relaxed max-w-lg mx-auto font-medium">
              Subscribe to our YouTube channel and be the first to see new songs,
              characters, and worship videos your family will love 🎉
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.14}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full bg-[#FF6B35] px-9 py-4.5 text-[16px] font-bold text-white shadow-[0_6px_30px_rgba(255,107,53,0.3)] transition-all duration-400"
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(255,107,53,0.45)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Youtube className="h-5 w-5" />
                Subscribe Now 🎵
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
              <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/about"
                  className="flex items-center gap-2 rounded-full border-2 border-dashed border-white/12 bg-white/5 px-8 py-4 text-[15px] font-bold text-white/50 transition-all duration-300 hover:bg-white/10 hover:text-white/70 hover:border-white/20"
                >
                  Our Story 💜
                </Link>
              </motion.div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   FOOTER — Playful with decorative SVGs
   ══════════════════════════════════════════════════════════ */
function PageFooter() {
  return (
    <footer className="relative bg-[#1A0B2E] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FF6B35]/3 blur-[120px] pointer-events-none" />

      {/* Decorative star SVG */}
      <svg className="absolute top-6 right-8 w-[40px] h-[40px] text-white/[0.03]" viewBox="0 0 50 50" fill="currentColor">
        <path d="M25,2 L30,18 L48,18 L34,28 L39,45 L25,35 L11,45 L16,28 L2,18 L20,18 Z" />
      </svg>
      <svg className="absolute bottom-8 left-10 w-[30px] h-[30px] text-white/[0.03]" viewBox="0 0 50 50" fill="currentColor">
        <circle cx="25" cy="25" r="20" />
      </svg>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-3 group/logo cursor-default">
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6B35] hand-drawn"
                whileHover={{ rotate: -10, scale: 1.1 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </motion.div>
              <span className="text-[17px] font-bold text-white tracking-tight transition-colors duration-300 group-hover/logo:text-[#FF6B35]">Selah Kids ✨</span>
            </div>
            <p className="mt-4 text-[13px] text-white/25 max-w-xs leading-relaxed">
              Faith-based kids music with stunning 3D animation.
              Original Bible songs the whole family will love 🎵
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: "/about", label: "About" },
              { href: "/videos", label: "Videos" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-bold text-white/25 hover:text-[#FF6B35] transition-colors duration-300 underline-reveal"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.youtube.com/@SelahKidsWorship"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-white/25 hover:text-[#FF6B35] transition-colors duration-300 underline-reveal"
            >
              YouTube
            </a>
          </nav>
        </div>

        <div className="mt-12 pt-7 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[11px] text-white/15 font-medium">
            &copy; {new Date().getFullYear()} Selah Kids. All rights reserved.
          </p>
          <p className="text-[11px] text-white/8 font-medium">
            Made with 💜 for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 9999,
        transformOrigin: "0%",
        background: "linear-gradient(90deg, #FF6B35, #7C3AED, #10B981)",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   CURSOR GLOW (desktop only)
   ══════════════════════════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998] hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, rgba(124,58,237,0.02) 40%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <HeroSection />
      <StoryMarquee />
      <StoryIntro />
      <FeaturedVideo />
      <FeaturesSection />
      <VideoGallery />
      <CharactersSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <PageFooter />
    </>
  );
}
