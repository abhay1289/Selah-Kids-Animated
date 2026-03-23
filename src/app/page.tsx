"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import {
  Play,
  ArrowRight,
  Youtube,
  Star,
  Heart,
  Sparkles,
  BookOpen,
  Users,
  ChevronRight,
  Shield,
  Globe,
  Volume2,
  Palette,
  ArrowDown,
  Music,
  Eye,
  Zap,
  Crown,
  Film,
  Lock,
  Compass,
  ShieldCheck,
  Baby,
} from "lucide-react";
import { WaveDivider, useParticleBurst, ParticleBurstLayer } from "@/components/storybook-effects";
import { useLanguage } from "@/context/language";

const StarRain = dynamic(() => import("@/components/storybook-effects").then(m => ({ default: m.StarRain })), { ssr: false });

/* ── Animation Constants ── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_CINEMATIC: [number, number, number, number] = [0.76, 0, 0.24, 1];
const SPRING = { type: "spring" as const, stiffness: 300, damping: 25 };
const SPRING_BOUNCY = { type: "spring" as const, stiffness: 400, damping: 15 };
const SPRING_SLOW = { type: "spring" as const, stiffness: 80, damping: 20 };
const STAGGER_CHILDREN = { staggerChildren: 0.1, delayChildren: 0.12 };

/* ── Local Assets ── */
const CHARACTERS = {
  andy: "/SK_Andy_Intro_Pose-removebg-preview.png",
  libni: "/SK_Libni_Intro_Pose-removebg-preview.png",
  shiloh: "/SK_Shiloh_Intro_Pose-removebg-preview.png",
};
const SCENES = {
  adventure: "/TGN_SingleFrames+(3).png",
  vibrant: "/TGN_SingleFrames+(7).png",
  group: "/TGN_SingleFrames+(9).png",
  worship: "/TGN_SingleFrames+28229.png",
  landscape: "/TGN_SingleFrames+28329.png",
  cinematic: "/TGN_SingleFrames+28729.png",
};

const HERO_PARTICLE_COLORS = ["#FFD93D", "#FF6B9D", "#4A6FCC", "#2DB84B", "#F7941D", "#7B3FA0"];
const HERO_PARTICLES = [
  { id: 0, left: "12%", top: "18%", dur: 8, delay: 0.2, size: 7, color: HERO_PARTICLE_COLORS[0] },
  { id: 1, left: "78%", top: "22%", dur: 10, delay: 1.1, size: 9, color: HERO_PARTICLE_COLORS[1] },
  { id: 2, left: "45%", top: "8%", dur: 7, delay: 0.8, size: 6, color: HERO_PARTICLE_COLORS[2] },
  { id: 3, left: "88%", top: "55%", dur: 9, delay: 2.5, size: 8, color: HERO_PARTICLE_COLORS[3] },
  { id: 4, left: "25%", top: "72%", dur: 11, delay: 1.8, size: 5, color: HERO_PARTICLE_COLORS[4] },
  { id: 5, left: "62%", top: "85%", dur: 8, delay: 3.2, size: 7, color: HERO_PARTICLE_COLORS[5] },
  { id: 6, left: "8%", top: "50%", dur: 10, delay: 0.5, size: 6, color: HERO_PARTICLE_COLORS[0] },
  { id: 7, left: "92%", top: "38%", dur: 7, delay: 2.0, size: 8, color: HERO_PARTICLE_COLORS[1] },
  { id: 8, left: "55%", top: "30%", dur: 12, delay: 3.5, size: 9, color: HERO_PARTICLE_COLORS[3] },
  { id: 9, left: "72%", top: "65%", dur: 10, delay: 2.8, size: 6, color: HERO_PARTICLE_COLORS[5] },
];

/* Paint Splatter Blobs — 5 soft blurred circles, z-1 */
const HERO_SPLATTERS = [
  { color: "#FF6B35", x: "2%", y: "15%", w: 180, h: 180, opacity: 0.06 },
  { color: "#7C3AED", x: "78%", y: "8%", w: 200, h: 160, opacity: 0.05 },
  { color: "#10B981", x: "5%", y: "65%", w: 160, h: 200, opacity: 0.05 },
  { color: "#F59E0B", x: "82%", y: "55%", w: 220, h: 180, opacity: 0.04 },
  { color: "#EC4899", x: "40%", y: "85%", w: 250, h: 150, opacity: 0.04 },
];

/* Morph Blobs — 2 radial-gradient blobs with morphing border-radius, z-2 */
const HERO_MORPH_BLOBS: { bg: string; top?: string; left?: string; bottom?: string; right?: string; w: number; opacity: number }[] = [
  { bg: "radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)", top: "15%", left: "8%", w: 200, opacity: 0.4 },
  { bg: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)", bottom: "20%", right: "10%", w: 260, opacity: 0.3 },
];

/* ════════════════════════════════════════════════════════════
   REUSABLE CINEMATIC PRIMITIVES
   ════════════════════════════════════════════════════════════ */

function Reveal({
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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const v: Record<string, { initial: Record<string, number>; animate: Record<string, number> }> = {
    up: { initial: { opacity: 0, y: reduced ? 0 : 50 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: reduced ? 0 : -50 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: reduced ? 0 : 50 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: reduced ? 1 : 0.85 }, animate: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial={v[direction].initial}
      animate={inView ? v[direction].animate : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ hidden: {}, visible: STAGGER_CHILDREN }} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.6, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function MagneticWrap({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduced = useReducedMotion();
  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [reduced, strength, x, y]
  );
  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} style={{ x, y }} transition={SPRING} className={className}>
      {children}
    </motion.div>
  );
}

function PlayfulButton({
  children, href, external = false, variant = "primary", className = "", icon,
}: {
  children: React.ReactNode; href: string; external?: boolean; variant?: "primary" | "secondary" | "ghost"; className?: string; icon?: React.ReactNode;
}) {
  const styles = {
    primary: "bg-[#F02D8A] text-white border-[#F09EBA] shadow-[4px_4px_0_#F09EBA] hover:shadow-[6px_6px_0_#F09EBA]",
    secondary: "bg-[#4A6FCC] text-white border-[#4A6FCC]/60 shadow-[4px_4px_0_rgba(74,111,204,0.3)] hover:shadow-[6px_6px_0_rgba(74,111,204,0.3)]",
    ghost: "bg-transparent text-[#4A4A4A] border-[#F09EBA]/50 hover:text-[#F02D8A] hover:border-[#F02D8A]/50",
  };
  const Comp = external ? "a" : Link;
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <MagneticWrap strength={0.12}>
      <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.96, y: 0 }} transition={SPRING_BOUNCY}>
        <Comp href={href} {...props} className={`btn-playful font-btn inline-flex items-center gap-3 rounded-full border-2 px-7 py-3.5 text-[15px] tracking-wide transition-shadow duration-150 ${styles[variant]} ${className}`}>
          {icon}
          {children}
        </Comp>
      </motion.div>
    </MagneticWrap>
  );
}

function SparkleDecor({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <motion.span className={`inline-block text-[#FFD700] ${className}`} animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <Sparkles style={{ width: size, height: size }} />
    </motion.span>
  );
}

/* Chapter divider — storytelling thread */
/* Cinematic parallax image reveal */
function CinematicReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["inset(12% 12% 12% 12% round 24px)", "inset(0% 0% 0% 0% round 20px)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? {} : { clipPath, scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Typewriter text effect */
function TypewriterText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState("");
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setDisplayText(text); return; }
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayText(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 45);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, text, delay, reduced]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {inView && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   INTERACTIVE CHARACTER — hover makes them react
   ════════════════════════════════════════════════════════════ */

function HeroCharacter({
  src, alt, floatDelay, reduced, speech, reaction = "jump",
}: {
  src: string; alt: string; floatDelay: number; reduced: boolean | null;
  speech?: string; reaction?: "jump" | "wave" | "squash";
}) {
  const [hovered, setHovered] = useState(false);
  const reactionVariants = {
    jump: { y: [0, -25, 0, -10, 0], scale: [1, 1.06, 0.97, 1.02, 1] },
    wave: { rotate: [0, 12, -8, 12, -4, 8, 0] },
    squash: { scaleX: [1, 1.12, 0.92, 1.04, 1], scaleY: [1, 0.88, 1.08, 0.96, 1] },
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <motion.div
        animate={
          hovered && !reduced
            ? reactionVariants[reaction]
            : reduced
              ? {}
              : { y: [0, -6, 0] }
        }
        transition={
          hovered
            ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
            : { duration: 4.5 + floatDelay, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
        }
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={600}
          className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          priority
        />
      </motion.div>
      <AnimatePresence>
        {speech && hovered && !reduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-2 border-[#F09EBA] rounded-full px-4 py-1.5 text-[12px] font-bold text-[#4A4A4A] shadow-[2px_2px_0_#F09EBA] whitespace-nowrap z-20"
          >
            {speech}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#F09EBA] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Interactive character inside cards with speech bubble on hover */
function CharacterCardInteractive({
  src, alt, speech, reaction = "jump", delay = 0,
}: {
  src: string; alt: string; speech?: string; reaction?: "jump" | "wave" | "squash"; delay?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const reactionVariants = {
    jump: { y: [0, -20, 0, -8, 0], scale: [1, 1.05, 0.97, 1.02, 1] },
    wave: { rotate: [0, 10, -6, 10, -3, 6, 0] },
    squash: { scaleX: [1, 1.1, 0.93, 1.04, 1], scaleY: [1, 0.9, 1.07, 0.96, 1] },
  };
  return (
    <div
      className="relative w-full aspect-square max-w-[180px] mx-auto mb-6 mt-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={
          hovered && !reduced
            ? reactionVariants[reaction]
            : reduced ? {} : { y: [0, -10, 0] }
        }
        transition={
          hovered
            ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }
        }
      >
        <Image src={src} alt={alt} width={500} height={500} loading="lazy" sizes="(max-width: 768px) 60vw, 250px" className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]" />
      </motion.div>
      <AnimatePresence>
        {speech && hovered && !reduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-[#F09EBA] rounded-full px-3 py-1 text-[11px] font-bold text-[#4A4A4A] shadow-[2px_2px_0_#F09EBA] whitespace-nowrap z-20"
          >
            {speech}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-[#F09EBA] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   1. HERO — Storybook Opening / Layered Scene
   ════════════════════════════════════════════════════════════ */

/* Narrator intro line — handwritten text that fades and rises like a book being opened */
function NarratorLine({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [chars, setChars] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setChars(text.length); return; }
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setChars(i);
        if (i >= text.length) clearInterval(iv);
      }, 55);
      return () => clearInterval(iv);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay, reduced]);

  return (
    <span ref={ref} className={`font-handwritten ${className}`}>
      {text.slice(0, chars)}
      {inView && chars < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity }}
          className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

/* Split text into individual letter spans for per-letter animation */
function SplitLetters({
  text, color, delay, ready,
}: {
  text: string; color: string; delay: number; ready: boolean;
}) {
  return (
    <>
      {text.split("").map((char, ci) => (
        <motion.span
          key={ci}
          className="inline-block"
          style={{ color }}
          initial={{ opacity: 0, y: 40, scale: 0.5, rotate: -8 }}
          animate={ready ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
          transition={{
            delay: delay + ci * 0.035,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], y: -4, transition: { duration: 0.3 } }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    if (reduced) return;
    const el = sectionRef.current;
    const spot = spotlightRef.current;
    if (!el || !spot) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      spot.style.setProperty("--mx", `${px}%`);
      spot.style.setProperty("--my", `${py}%`);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduced]);

  useEffect(() => {
    const onLoadingDone = () => {
      requestAnimationFrame(() => setReady(true));
    };
    window.addEventListener("loading-complete", onLoadingDone);
    /* Fallback if loading screen already finished or was skipped */
    const fallback = setTimeout(() => setReady(true), 3500);
    return () => {
      window.removeEventListener("loading-complete", onLoadingDone);
      clearTimeout(fallback);
    };
  }, []);

  /* 2-line layout: "Where Faith" / "meets Fun!" */

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[100vh] flex flex-col">
      {/* Layer 1: Aurora gradient background — z-0 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: reduced ? 0 : bgY }}
      >
        <div className="absolute inset-0 aurora-bg" />
      </motion.div>

      {/* Layer 2: Paint Splatter Blobs — z-[1] */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {HERO_SPLATTERS.map((s, i) => (
          <div
            key={i}
            className="splatter absolute"
            style={{
              left: s.x,
              top: s.y,
              width: s.w,
              height: s.h,
              background: s.color,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Morphing Blob Circles — z-[2] */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {HERO_MORPH_BLOBS.map((blob, i) => (
          <div
            key={i}
            className="morph-blob blob-float absolute"
            style={{
              top: blob.top,
              left: blob.left,
              bottom: blob.bottom,
              right: blob.right,
              width: blob.w,
              height: blob.w,
              background: blob.bg,
              opacity: blob.opacity,
            }}
          />
        ))}
      </div>

      {/* Layer 4: Noise texture overlay — z-[3] */}
      <div className="absolute inset-0 z-[3] pointer-events-none noise-overlay" />

      {/* Layer 4.5: Light rays — z-[4] */}
      {!reduced && <div className="hero-rays z-[4]" />}

      {/* Layer 4.6: Animated gradient orbs — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          <div className="hero-orb absolute w-[300px] h-[300px] top-[10%] left-[5%]" style={{ background: "radial-gradient(circle, rgba(240,45,138,0.12), transparent 70%)", animationDelay: "0s" }} />
          <div className="hero-orb absolute w-[250px] h-[250px] top-[60%] right-[8%]" style={{ background: "radial-gradient(circle, rgba(74,111,204,0.10), transparent 70%)", animationDelay: "-3s", animationDuration: "8s, 25s" }} />
          <div className="hero-orb absolute w-[200px] h-[200px] bottom-[15%] left-[40%]" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.08), transparent 70%)", animationDelay: "-6s", animationDuration: "7s, 18s" }} />
        </div>
      )}

      {/* Layer 4.7: Dot grid — z-[4] */}
      {!reduced && <div className="absolute inset-0 z-[4] hero-dot-grid opacity-60" />}

      {/* Layer 4.8: Floating doodles — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          {[
            { Icon: Star, x: "6%", y: "12%", size: 16, color: "rgba(255,215,0,0.12)", delay: "0s", dur: "14s" },
            { Icon: Heart, x: "90%", y: "20%", size: 14, color: "rgba(240,45,138,0.10)", delay: "-3s", dur: "16s" },
            { Icon: Music, x: "15%", y: "78%", size: 18, color: "rgba(247,148,29,0.09)", delay: "-7s", dur: "12s" },
            { Icon: Sparkles, x: "82%", y: "68%", size: 12, color: "rgba(45,184,75,0.10)", delay: "-5s", dur: "18s" },
            { Icon: Star, x: "50%", y: "5%", size: 10, color: "rgba(123,63,160,0.08)", delay: "-2s", dur: "15s" },
            { Icon: Heart, x: "35%", y: "88%", size: 13, color: "rgba(74,111,204,0.09)", delay: "-9s", dur: "17s" },
            { Icon: Zap, x: "72%", y: "42%", size: 11, color: "rgba(255,215,0,0.07)", delay: "-4s", dur: "13s" },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute hero-doodle"
              style={{ left: d.x, top: d.y, color: d.color, animationDelay: d.delay, animationDuration: d.dur }}
            >
              <d.Icon style={{ width: d.size, height: d.size }} />
            </div>
          ))}
        </div>
      )}

      {/* Layer 4.9: Twinkle stars — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          {[
            { x: "8%", y: "25%", size: 4, delay: "0s" },
            { x: "92%", y: "15%", size: 3, delay: "-1.2s" },
            { x: "22%", y: "65%", size: 5, delay: "-2.5s" },
            { x: "78%", y: "80%", size: 3, delay: "-0.8s" },
            { x: "55%", y: "12%", size: 4, delay: "-3.2s" },
            { x: "40%", y: "45%", size: 3, delay: "-1.8s" },
            { x: "68%", y: "35%", size: 5, delay: "-2.1s" },
            { x: "18%", y: "90%", size: 4, delay: "-0.5s" },
            { x: "85%", y: "55%", size: 3, delay: "-3.8s" },
            { x: "30%", y: "20%", size: 4, delay: "-1.5s" },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute hero-twinkle rounded-full bg-white"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: `${3 + (i % 3)}s` }}
            />
          ))}
        </div>
      )}

      {/* Layer 4.91: Bokeh circles — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          {[
            { x: "10%", y: "20%", size: 120, color: "rgba(240,45,138,0.07)", blur: 25, dur: 14 },
            { x: "75%", y: "15%", size: 90, color: "rgba(255,215,0,0.06)", blur: 20, dur: 18 },
            { x: "85%", y: "65%", size: 140, color: "rgba(74,111,204,0.05)", blur: 30, dur: 16 },
            { x: "20%", y: "70%", size: 100, color: "rgba(45,184,75,0.05)", blur: 22, dur: 20 },
            { x: "50%", y: "40%", size: 80, color: "rgba(247,148,29,0.04)", blur: 18, dur: 12 },
            { x: "60%", y: "85%", size: 110, color: "rgba(123,63,160,0.05)", blur: 28, dur: 15 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute hero-bokeh"
              style={{
                left: b.x, top: b.y,
                width: b.size, height: b.size,
                background: b.color,
                "--bokeh-blur": `${b.blur}px`,
                "--bokeh-dur": `${b.dur}s`,
                "--bokeh-o": "1",
                animationDelay: `${-i * 2.5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Layer 4.92: Shooting stars — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          <div className="hero-shooting-star" style={{ top: "15%", left: "10%", "--shoot-dur": "8s" } as React.CSSProperties} />
          <div className="hero-shooting-star" style={{ top: "35%", left: "55%", "--shoot-dur": "12s", animationDelay: "-4s" } as React.CSSProperties} />
          <div className="hero-shooting-star" style={{ top: "60%", left: "25%", "--shoot-dur": "15s", animationDelay: "-9s" } as React.CSSProperties} />
        </div>
      )}

      {/* Layer 4.93: Animated brushstrokes — z-[4] */}
      {!reduced && (
        <svg className="absolute inset-0 w-full h-full z-[4] pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path className="hero-brushstroke" d="M-50,200 Q200,100 400,250 T800,180 T1050,220" fill="none" stroke="#F02D8A" strokeWidth="3" strokeLinecap="round" style={{ "--brush-dur": "12s" } as React.CSSProperties} />
          <path className="hero-brushstroke" d="M-50,400 Q150,350 350,420 T700,370 T1050,410" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" style={{ "--brush-dur": "15s", animationDelay: "-5s" } as React.CSSProperties} />
          <path className="hero-brushstroke" d="M-50,100 Q250,50 500,130 T900,80 T1050,120" fill="none" stroke="#4A6FCC" strokeWidth="2" strokeLinecap="round" style={{ "--brush-dur": "18s", animationDelay: "-10s" } as React.CSSProperties} />
        </svg>
      )}

      {/* Layer 4.94: Drifting clouds — z-[4] */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          <div className="hero-cloud absolute w-[400px] h-[120px]" style={{ top: "8%", background: "rgba(255,255,255,0.5)", "--cloud-o": "0.035", "--cloud-dur": "40s" } as React.CSSProperties} />
          <div className="hero-cloud absolute w-[300px] h-[80px]" style={{ top: "55%", background: "rgba(255,220,240,0.4)", "--cloud-o": "0.03", "--cloud-dur": "50s", animationDelay: "-15s" } as React.CSSProperties} />
          <div className="hero-cloud absolute w-[350px] h-[100px]" style={{ top: "30%", background: "rgba(240,235,255,0.5)", "--cloud-o": "0.025", "--cloud-dur": "45s", animationDelay: "-25s" } as React.CSSProperties} />
        </div>
      )}

      {/* Layer 4.95: Mouse-reactive spotlight — z-[4] */}
      {!reduced && <div ref={spotlightRef} className="absolute inset-0 z-[4] hero-spotlight" />}

      {/* Layer 5: Rainbow Arcs — z-[5] */}
      {!reduced && (
        <svg
          viewBox="0 0 1000 400"
          fill="none"
          className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[140%] h-[65%] z-[5] pointer-events-none"
        >
          {[
            { r: 390, color: "#FF6B35", opacity: 0.08, width: 14 },
            { r: 360, color: "#F59E0B", opacity: 0.07, width: 12 },
            { r: 330, color: "#10B981", opacity: 0.06, width: 12 },
            { r: 300, color: "#3B82F6", opacity: 0.06, width: 10 },
            { r: 270, color: "#7C3AED", opacity: 0.07, width: 12 },
            { r: 240, color: "#EC4899", opacity: 0.06, width: 10 },
          ].map((arc, i) => (
            <motion.circle
              key={i}
              cx="500"
              cy="0"
              r={arc.r}
              stroke={arc.color}
              strokeWidth={arc.width}
              fill="none"
              opacity={arc.opacity}
              initial={{ pathLength: 0 }}
              animate={ready ? { pathLength: 0.5 } : { pathLength: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 1.8, ease: "easeOut" }}
              strokeDasharray="1 1"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}

      {/* Main content — parallax foreground */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center mx-auto max-w-7xl w-full px-6 lg:px-10 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20"
        style={{ y: reduced ? 0 : fgY }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 w-full">
          {/* Left column: Badge + Headline + Subtitle + CTAs + Stats */}
          <div className="flex-1 max-w-2xl lg:pr-8 text-center lg:text-left">

            {/* 6. Badge pill — dashed border with icon wiggle */}
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.8 }}
              animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.05, duration: 0.5, ease: EASE }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[#F02D8A]/20 bg-gradient-to-r from-[#FFF0F5] to-[#FFEBD9] backdrop-blur-sm px-5 py-2.5 text-[11px] font-badge text-[#F02D8A] cursor-default shadow-[0_2px_12px_rgba(240,45,138,0.1)]"
            >
              <motion.span
                animate={reduced ? {} : { rotate: [0, 15, -15, 0], scale: [1, 1.2, 0.9, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </motion.span>
              {t("home.badge")}
            </motion.div>

            {/* Headline: 2 lines — "Where Faith" / "meets Fun!" */}
            <h1 className="font-hero">
              {/* Line 1: "Where Faith" — slight upward tilt */}
              <motion.span
                className="block"
                style={{ transform: "rotate(-1.5deg)" }}
                initial={{ opacity: 0, y: 50 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.span
                  className="inline-block mr-[0.15em]"
                  style={{ color: "#E8890C" }}
                  initial={{ opacity: 0, y: 40, scale: 0.7 }}
                  animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08, rotate: -3, transition: { duration: 0.2 } }}
                >
                  {t("home.hero.line1").split(" ")[0]}&nbsp;
                </motion.span>
                <SplitLetters text={t("home.hero.line1").split(" ").slice(1).join(" ")} color="#FF6B9D" delay={0.3} ready={ready} />
              </motion.span>

              {/* Line 2 */}
              <motion.span
                className="block"
                style={{ transform: "rotate(1.5deg)" }}
                initial={{ opacity: 0, y: 50 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.span
                  className="inline-block mr-[0.15em]"
                  style={{ color: "#4A6FCC", textShadow: "0 2px 15px rgba(74,111,204,0.2)" }}
                  initial={{ opacity: 0, y: 40, scale: 0.7 }}
                  animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.55, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08, rotate: 3, transition: { duration: 0.2 } }}
                >
                  {t("home.hero.line2").split(" ")[0]}&nbsp;
                </motion.span>
                <SplitLetters text={t("home.hero.line2").split(" ").slice(1).join(" ")} color="#E8890C" delay={0.65} ready={ready} />
              </motion.span>
            </h1>

            {/* Hand-drawn SVG scribble underline beneath "Fun!" */}
            <motion.div
              className="relative -mt-3 mb-2 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={ready ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
              style={{ originX: 0 }}
            >
              <svg width="220" height="18" viewBox="0 0 220 18" fill="none" className="ml-1">
                <motion.path
                  d="M3 12C25 5 50 15 75 9C100 3 125 16 150 8C175 2 200 13 217 9"
                  stroke="#F7941D"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={ready ? { pathLength: 1, opacity: 0.6 } : {}}
                  transition={{ delay: 1.0, duration: 1.2, ease: EASE }}
                />
              </svg>
            </motion.div>

            {/* Subtitle with trust signal */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
              className="mt-4 text-[15px] sm:text-[17px] text-[#4A4A4A]/55 leading-[1.8] font-medium max-w-lg font-serif italic mx-auto lg:mx-0"
            >
              {t("home.hero.subtitle1")}{" "}
              <motion.span
                className="text-[#4A6FCC] font-bold not-italic relative cursor-default"
                whileHover={{ color: "#FF6B9D" }}
                transition={{ duration: 0.3 }}
              >
                {t("home.hero.subtitle2")}
              </motion.span>{" "}
              {t("home.hero.subtitle3")}.
            </motion.p>
            {/* 7. CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              {/* Primary: gradient + shimmer sweep */}
              <MagneticWrap strength={0.12}>
                <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.96, y: 0 }} transition={SPRING_BOUNCY}>
                  <Link
                    href="/watch"
                    className="hero-cta-primary btn-playful font-btn inline-flex items-center gap-3 rounded-full text-white border-3 border-[#F09EBA] shadow-[4px_4px_0_#F09EBA] hover:shadow-[6px_6px_0_#F09EBA] px-7 py-3.5 text-[15px] tracking-wide transition-shadow duration-150"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Play className="h-4 w-4 ml-0.5" fill="currentColor" aria-hidden="true" />
                    </span>
                    {t("home.hero.cta1")}
                  </Link>
                </motion.div>
              </MagneticWrap>
              {/* Secondary: outline/ghost */}
              <MagneticWrap strength={0.12}>
                <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.96, y: 0 }} transition={SPRING_BOUNCY}>
                  <a
                    href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-playful font-btn inline-flex items-center gap-3 rounded-full bg-white/80 text-[#4A4A4A] border-3 border-[#F09EBA]/50 hover:border-[#F02D8A]/50 px-7 py-3.5 text-[15px] tracking-wide transition-all duration-150"
                  >
                    <Youtube className="h-5 w-5 text-[#E8192C]" aria-hidden="true" />
                    {t("home.hero.cta2")}
                  </a>
                </motion.div>
              </MagneticWrap>
            </motion.div>

            {/* Stats row with hover micro-interactions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 flex-wrap"
            >
              {[
                { target: 2, suffix: "M+", label: "views", color: "#E8192C" },
                { target: 50, suffix: "K+", label: "families", color: "#4A6FCC" },
                { target: 20, suffix: "+", label: "songs", color: "#2DB84B" },
              ].map((stat, si) => (
                <motion.div
                  key={stat.label}
                  className="flex items-baseline gap-1.5 cursor-default group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.45 + si * 0.1, duration: 0.5, ease: EASE }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  <span className="text-[22px] sm:text-[26px] font-heading tabular-nums group-hover:drop-shadow-sm transition-all" style={{ color: stat.color, fontWeight: 700 }}>
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-[10px] text-[#4A4A4A]/65 font-bold tracking-[0.12em] uppercase group-hover:text-[#4A4A4A] transition-colors">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Characters with hover reactions — spring up from bottom at 1.5s */}
          <div className="relative w-[280px] sm:w-[320px] lg:w-[400px] xl:w-[440px] flex-shrink-0">
            {/* Glow ring behind characters */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full z-[0] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,107,157,0.08) 0%, rgba(255,217,61,0.05) 50%, transparent 70%)" }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.3, duration: 1.2, ease: EASE }}
            />
            {/* Ground glow */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[15%] z-[0]"
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <div className="w-full h-full rounded-[50%] bg-[#F7941D]/15 blur-[30px]" />
            </motion.div>

            <motion.div
              className="relative z-[3] mx-auto w-[65%] cursor-pointer"
              initial={{ y: 120, opacity: 0, scale: 0.4 }}
              animate={ready ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 80, damping: 14 }}
            >
              <MagneticWrap strength={0.06}>
                <HeroCharacter src={CHARACTERS.andy} alt="Andy — The Brave Leader" floatDelay={0} reduced={reduced} speech="Let's worship!" />
              </MagneticWrap>
            </motion.div>

            <motion.div
              className="absolute bottom-[5%] left-[-8%] w-[45%] z-[2] cursor-pointer"
              initial={{ y: 100, opacity: 0, scale: 0.4 }}
              animate={ready ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 80, damping: 14 }}
            >
              <HeroCharacter src={CHARACTERS.libni} alt="Libni — The Joyful Singer" floatDelay={0.5} reduced={reduced} speech="Sing with me!" reaction="wave" />
            </motion.div>

            <motion.div
              className="absolute bottom-[5%] right-[-8%] w-[45%] z-[2] cursor-pointer"
              initial={{ y: 100, opacity: 0, scale: 0.4 }}
              animate={ready ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.7, duration: 0.8, type: "spring", stiffness: 80, damping: 14 }}
            >
              <HeroCharacter src={CHARACTERS.shiloh} alt="Shiloh — The Curious Explorer" floatDelay={1} reduced={reduced} speech="Baaaa! Hi!" reaction="squash" />
            </motion.div>

            {/* Floating decorative elements drift in from edges at 1.3s */}
            {!reduced && (
              <>
                <motion.span
                  className="absolute top-[5%] right-[8%] font-handwritten text-2xl z-[4]"
                  style={{ color: "rgba(255,217,61,0.5)" }}
                  initial={{ opacity: 0, x: 40 }}
                  animate={ready ? { opacity: 1, x: 0, y: [0, -15, 0], rotate: [0, 20, 0] } : {}}
                  transition={{ delay: 1.3, duration: 5, repeat: Infinity, ease: "easeInOut" }}
                ><Music className="h-6 w-6" /></motion.span>
                <motion.span
                  className="absolute top-[2%] left-[12%] z-[4]"
                  style={{ color: "rgba(255,107,157,0.4)" }}
                  initial={{ opacity: 0, x: -40 }}
                  animate={ready ? { opacity: 1, x: 0, y: [0, -12, 0], rotate: [0, -15, 0] } : {}}
                  transition={{ delay: 1.3, duration: 6, repeat: Infinity, ease: "easeInOut" }}
                ><Music className="h-5 w-5" /></motion.span>
                <motion.span
                  className="absolute bottom-[20%] right-[3%] text-lg z-[4]"
                  style={{ color: "rgba(74,111,204,0.3)" }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={ready ? { opacity: 1, x: 0, y: [0, -10, 0] } : {}}
                  transition={{ delay: 1.4, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Star className="h-4 w-4" fill="currentColor" />
                </motion.span>
              </>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
          className="hidden lg:flex mt-6 justify-center"
        >
          <motion.div
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[11px] font-handwritten text-[#4A4A4A]/60 tracking-wider">Scroll to explore</span>
            <ArrowDown className="h-4 w-4 text-[#4A4A4A]/80" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 8. Wavy SVG divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-[8] pointer-events-none" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: "clamp(50px, 7vw, 90px)", display: "block" }}>
          <path
            className="wave-path"
            d="M0,50 C240,90 480,10 720,50 C960,90 1200,10 1440,50 L1440,100 L0,100 Z"
            fill="#FFF0F5"
          />
          <path
            className="wave-path"
            d="M0,65 C180,40 360,85 540,55 C720,25 900,80 1080,55 C1260,30 1350,65 1440,60 L1440,100 L0,100 Z"
            fill="#FFF0F5"
            opacity="0.5"
            style={{ animationDelay: "-3s" }}
          />
        </svg>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   2. TICKER
   ════════════════════════════════════════════════════════════ */
/* Trust badges strip — visible without scrolling */
function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const trustItems = [
    { icon: Shield, label: "100% Ad-Free", color: "#4A6FCC" },
    { icon: Lock, label: "COPPA Safe", color: "#2DB84B" },
    { icon: BookOpen, label: "Scripture-Based", color: "#7B3FA0" },
    { icon: Heart, label: "Parent Approved", color: "#F02D8A" },
  ];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="trust-strip py-4 sm:py-5"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {trustItems.map((item, i) => (
            <motion.span
              key={item.label}
              className="trust-badge-item"
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
              whileHover={{ y: -2, scale: 1.04 }}
            >
              <item.icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: item.color }} />
              <span className="text-[12px]">{item.label}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TickerStrip() {
  const items = [
    { text: "50,000+ Happy Families", color: "#F02D8A" },
    { text: "20+ Original Songs", color: "#F7941D" },
    { text: "2M+ YouTube Views", color: "#E8192C" },
    { text: "100% Bible Based", color: "#2DB84B" },
    { text: "English & Espanol", color: "#4A6FCC" },
    { text: "Ages 0–8", color: "#7B3FA0" },
    { text: "Cinema-Quality Animation", color: "#00B5B8" },
  ];
  return (
    <section className="relative py-4 bg-[#FFF0F5] overflow-hidden border-y-4 border-[#F09EBA]">
      <div className="marquee-container">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mx-8 text-[14px] sm:text-[15px] font-extrabold text-[#F02D8A] flex items-center gap-3">
              <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3. SCENE SHOWCASE — Cinematic scroll reveal
   ════════════════════════════════════════════════════════════ */
function SceneShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.82, 1, 1]);

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
      {/* Ambient section particles */}
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="section-mesh w-[300px] h-[300px] top-[10%] left-[-5%]" style={{ background: "rgba(240,45,138,0.15)", "--mesh-dur": "10s" } as React.CSSProperties} />
          <div className="section-mesh w-[250px] h-[250px] bottom-[5%] right-[-3%]" style={{ background: "rgba(74,111,204,0.12)", "--mesh-dur": "12s", animationDelay: "-4s" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#F02D8A]" style={{ left: "8%", top: "20%", "--amb-dur": "8s", "--amb-o": "0.08" } as React.CSSProperties} />
          <div className="section-particle w-1.5 h-1.5 bg-[#FFD700]" style={{ left: "85%", top: "40%", "--amb-dur": "11s", "--amb-o": "0.06", animationDelay: "-3s" } as React.CSSProperties} />
          <div className="section-particle w-2.5 h-2.5 bg-[#4A6FCC]" style={{ left: "45%", top: "75%", "--amb-dur": "9s", "--amb-o": "0.05", animationDelay: "-6s" } as React.CSSProperties} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Cinematic video card */}
          <Reveal direction="left" className="flex-1 w-full">
            <CinematicReveal>
              <div className="relative rounded-[20px] overflow-hidden border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA] card-shadow-glow group cursor-pointer">
                <div className="relative aspect-video bg-[#FFF0E8]">
                  <Image src={SCENES.worship} alt="The Good News - Worship scene" width={1920} height={1080} loading="lazy" sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Cinematic vignette */}
                  <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.3)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MagneticWrap strength={0.2}>
                      <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }} transition={SPRING_BOUNCY}>
                        <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 group-hover:bg-white/25 transition-all duration-300">
                          <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" fill="currentColor" aria-hidden="true" />
                          {/* Pulse ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white/20"
                            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    </MagneticWrap>
                  </div>
                  <div className="absolute top-4 left-4">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD700] text-[#4A4A4A] px-3 py-1.5 text-[11px] font-badge"
                    >
                      <Zap className="h-3 w-3" fill="currentColor" /> New Release
                    </motion.span>
                  </div>
                  {/* Film timestamp overlay */}
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#4A4A4A]/65 tracking-wider">03:24</div>
                </div>
              </div>
            </CinematicReveal>
            {/* Scene strip thumbnails */}
            <div className="flex gap-2 mt-4 justify-center">
              {[SCENES.adventure, SCENES.vibrant, SCENES.landscape].map((src, idx) => (
                <motion.div
                  key={idx}
                  className="relative w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 border-[#F09EBA]/40 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                  whileHover={{ y: -5, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_BOUNCY}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Right — Narrative text */}
          <Reveal delay={0.15} className="flex-1">
            <span className="inline-flex items-center gap-2 text-[12px] font-badge text-[#F02D8A] mb-4">
              <Film className="h-3.5 w-3.5" /> {t("home.scene.badge")}
            </span>
            <h2 className="font-hero-section text-[clamp(2rem,5vw,3.5rem)]">
              <span style={{ color: "#E8890C" }}>{t("home.scene.title1")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.scene.title2")}</span><br />
              <span className="relative" style={{ color: "#F02D8A" }}>
                {t("home.scene.highlight")}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD700]/40 wavy-draw" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mt-6 text-[16px] text-[#8B7E74] leading-[1.85] max-w-md font-medium">
              {t("home.scene.desc")}{" "}
              <em className="text-[#4A4A4A] font-extrabold not-italic">&ldquo;{t("home.scene.quote")}&rdquo;</em>
            </p>
            <motion.span
              className="inline-block mt-3 text-[18px] font-handwritten text-[#F02D8A]/60 rotate-[-3deg]"
              animate={{ rotate: [-3, -1, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("home.scene.note")} <Heart className="h-3 w-3 inline" />
            </motion.span>
            <div className="mt-8">
              <PlayfulButton href="/watch" variant="secondary" icon={<Play className="h-4 w-4" fill="currentColor" />}>
                {t("home.scene.btn")} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </PlayfulButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   4. WHY SELAH — Storytelling pillars with cinematic images
   ════════════════════════════════════════════════════════════ */
function WhySection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const pillars = [
    {
      num: "01", badge: t("home.why.p1.badge"), title: t("home.why.p1.title"),
      desc: t("home.why.p1.desc"),
      icon: BookOpen, color: "#2DB84B", bg: "#EAFAF0", scene: SCENES.landscape, character: CHARACTERS.libni, handNote: "Real verses!",
    },
    {
      num: "02", badge: t("home.why.p2.badge"), title: t("home.why.p2.title"),
      desc: t("home.why.p2.desc"),
      icon: Palette, color: "#F7941D", bg: "#FFF5E6", scene: SCENES.vibrant, character: CHARACTERS.andy, handNote: "So beautiful!",
    },
    {
      num: "03", badge: t("home.why.p3.badge"), title: t("home.why.p3.title"),
      desc: t("home.why.p3.desc"),
      icon: Heart, color: "#F02D8A", bg: "#FFF0F6", scene: SCENES.adventure, character: CHARACTERS.shiloh, handNote: "Family time!",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none striped-bg" />
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="section-mesh w-[350px] h-[350px] top-[20%] right-[-8%]" style={{ background: "rgba(247,148,29,0.12)", "--mesh-dur": "14s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "12%", top: "15%", "--sparkle-color": "#FFD700", "--sparkle-dur": "6s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "88%", top: "60%", "--sparkle-color": "#F02D8A", "--sparkle-dur": "8s", animationDelay: "-3s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "50%", top: "85%", "--sparkle-color": "#4A6FCC", "--sparkle-dur": "7s", animationDelay: "-5s" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#2DB84B]" style={{ left: "5%", top: "50%", "--amb-dur": "12s", "--amb-o": "0.07" } as React.CSSProperties} />
          <div className="section-particle w-1.5 h-1.5 bg-[#F7941D]" style={{ left: "92%", top: "30%", "--amb-dur": "10s", "--amb-o": "0.06", animationDelay: "-4s" } as React.CSSProperties} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-10">
          <h2 className="font-hero-section text-[clamp(2.2rem,5.5vw,4rem)]">
            <span style={{ color: "#4A6FCC" }}>{t("home.why.title1")}</span> <span style={{ color: "#E8890C" }}>{t("home.why.title2")}</span> <span style={{ color: "#2DB84B" }}>{t("home.why.title3")}</span><br />
            <span className="relative inline-block" style={{ color: "#F02D8A" }}>
              {t("home.why.highlight")}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F02D8A]/30 wavy-draw" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <motion.p
            className="mt-4 text-[20px] font-handwritten text-[#8B7E74]/60 rotate-[-2deg]"
            animate={{ rotate: [-2, 0, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >( {t("home.why.note")} )</motion.p>
        </Reveal>

        <div className="space-y-20 sm:space-y-28">
          {pillars.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={p.num} className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}>
                <Reveal direction={isEven ? "left" : "right"} className="flex-1 w-full">
                  <CinematicReveal>
                    <motion.div
                      className="relative rounded-[20px] overflow-hidden border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA] aspect-[4/3] group cursor-pointer"
                      whileHover={{ y: -8, transition: SPRING }}
                    >
                      <Image src={p.scene} alt={p.badge} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {/* Cinematic vignette */}
                      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.2)" }} />
                      <motion.div
                        className="absolute bottom-0 right-[10%] w-[45%] z-10"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                      >
                        <Image src={p.character} alt="" width={400} height={400} loading="lazy" sizes="(max-width: 1024px) 40vw, 20vw" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)]" />
                      </motion.div>
                    </motion.div>
                  </CinematicReveal>
                  <motion.span
                    className={`absolute -top-4 ${isEven ? "right-4" : "left-4"} font-handwritten text-[16px] z-10`}
                    style={{ color: p.color, transform: `rotate(${isEven ? "-4deg" : "3deg"})` }}
                    animate={{ rotate: isEven ? [-4, -2, -4] : [3, 5, 3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {p.handNote}
                  </motion.span>
                </Reveal>
                <Reveal delay={0.12} className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#F09EBA]"
                      style={{ backgroundColor: p.bg }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={SPRING_BOUNCY}
                    >
                      <p.icon className="h-5 w-5 icon-idle" style={{ color: p.color }} aria-hidden="true" />
                    </motion.div>
                    <span className="text-[12px] font-badge" style={{ color: p.color }}>{p.badge}</span>
                  </div>
                  <h3 className="font-subheading text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.08] mb-4" style={{ color: p.color }}>{p.title}</h3>
                  <p className="text-[16px] text-[#8B7E74] leading-[1.85] font-medium">{p.desc}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   5. CHARACTERS — Interactive scrapbook + cinematic entrance
   ════════════════════════════════════════════════════════════ */
function CharactersSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const chars = [
    { name: "Andy", role: "The Brave Leader", desc: "Leads every adventure with courage and unstoppable faith. Always first to step up!", image: CHARACTERS.andy, color: "#F7941D", bg: "#FFF5E6", rotate: "-3deg", emoji: Crown, speech: "Be brave!", reaction: "jump" as const },
    { name: "Libni", role: "The Joyful Singer", desc: "Her voice lights up every song. She finds the bright side in everything!", image: CHARACTERS.libni, color: "#F02D8A", bg: "#FFF0F6", rotate: "2deg", emoji: Music, speech: "Sing with me!", reaction: "wave" as const },
    { name: "Shiloh", role: "The Curious Explorer", desc: "Loves discovering new things and sharing Bible stories with everyone!", image: CHARACTERS.shiloh, color: "#4A6FCC", bg: "#EEF2FF", rotate: "-1.5deg", emoji: Compass, speech: "Baaaa!", reaction: "squash" as const },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="section-mesh w-[280px] h-[280px] top-[5%] left-[50%] -translate-x-1/2" style={{ background: "rgba(255,215,0,0.10)", "--mesh-dur": "9s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "20%", top: "10%", "--sparkle-color": "#F7941D", "--sparkle-dur": "5s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "75%", top: "80%", "--sparkle-color": "#F02D8A", "--sparkle-dur": "7s", animationDelay: "-2s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "40%", top: "90%", "--sparkle-color": "#4A6FCC", "--sparkle-dur": "6s", animationDelay: "-4s" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#F02D8A]" style={{ left: "90%", top: "15%", "--amb-dur": "11s", "--amb-o": "0.07" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#FFD700]" style={{ left: "3%", top: "70%", "--amb-dur": "9s", "--amb-o": "0.06", animationDelay: "-5s" } as React.CSSProperties} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-12">
          <h2 className="font-hero-section text-[clamp(2.2rem,5.5vw,4rem)]">
            <span style={{ color: "#F7941D" }}>{t("home.chars.title1")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.chars.title2")}</span> <span style={{ color: "#2DB84B" }}>{t("home.chars.title3")}</span><br />
            <span className="relative inline-block" style={{ color: "#F02D8A" }}>
              {t("home.chars.highlight")}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F02D8A]/30 wavy-draw" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </Reveal>

        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {chars.map((c, i) => (
            <StaggerItem key={c.name}>
              <motion.div
                className="relative rounded-[20px] p-6 sm:p-8 overflow-hidden border-3 border-[#F09EBA] shadow-[5px_5px_0_#F09EBA] card-shadow-glow cursor-default group"
                style={{ backgroundColor: c.bg, transform: `rotate(${c.rotate})` }}
                whileHover={{ y: -12, rotate: 0, scale: 1.03, transition: SPRING_BOUNCY }}
              >
                <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />
                <motion.span className="absolute top-4 right-4 z-10" style={{ color: c.color }} whileHover={{ scale: 1.3, rotate: 15 }} transition={SPRING_BOUNCY}><c.emoji className="h-5 w-5" /></motion.span>
                <CharacterCardInteractive
                  src={c.image}
                  alt={c.name}
                  speech={c.speech}
                  reaction={c.reaction}
                  delay={i * 0.4}
                />
                <div className="text-center">
                  <span className="text-[11px] font-badge" style={{ color: c.color }}>{c.role}</span>
                  <h3 className="mt-1 font-subheading text-[clamp(1.6rem,3vw,2.2rem)] leading-[1]" style={{ color: c.color }}>{c.name}</h3>
                  <p className="mt-3 text-[14px] text-[#8B7E74] leading-[1.75] font-medium">{c.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.3} className="text-center mt-12">
          <motion.div whileHover={{ x: 5 }} transition={SPRING}>
            <Link href="/characters" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#F02D8A] hover:text-[#4A4A4A] transition-colors bouncy-link">
              <span className="font-handwritten text-[18px] rotate-[-3deg] mr-1">→</span>
              {t("home.chars.link")} <ChevronRight className="h-4 w-4 arrow-slide" aria-hidden="true" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   6. IMMERSIVE SCENE — Full-bleed cinematic scroll storytelling
   ════════════════════════════════════════════════════════════ */
function ImmersiveScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.8, 0.5, 0.7]);
  const textY = useTransform(scrollYProgress, [0.1, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[80vh] sm:h-[90vh] overflow-hidden">
      {/* Full-bleed background */}
      <motion.div className="absolute inset-0 z-0" style={{ scale: reduced ? 1 : imgScale }}>
        <Image src={SCENES.group} alt="The Selah Kids world" fill className="object-cover" sizes="100vw" />
      </motion.div>
      <motion.div className="absolute inset-0 z-[1] bg-[#FFF0F5]" style={{ opacity: reduced ? 0.6 : overlayOpacity }} />

      {/* Film grain */}
      <div className="absolute inset-0 z-[2] pointer-events-none film-grain opacity-[0.03]" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.5)" }} />

      {/* Center text */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-6"
        style={{ y: reduced ? 0 : textY, opacity: reduced ? 1 : textOpacity }}
      >
        <div className="text-center max-w-3xl">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
            className="w-16 h-px bg-[#FFD700]/50 mx-auto mb-8 origin-center"
          />
          <h2 className="font-hero-section text-[clamp(2.5rem,7vw,5rem)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
            <span style={{ color: "#E8890C" }}>{t("home.immersive.title1")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.immersive.title2")}</span><br /><span style={{ color: "#F02D8A" }}>{t("home.immersive.highlight")}</span>
          </h2>
          <p className="mt-6 text-[16px] sm:text-[18px] text-white leading-[1.85] font-medium max-w-lg mx-auto font-serif italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            &ldquo;{t("home.immersive.quote")}&rdquo;
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_CINEMATIC, delay: 0.3 }}
            className="w-16 h-px bg-[#FFD700]/50 mx-auto mt-8 origin-center"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   7. VIDEO GALLERY — Cinematic cards
   ════════════════════════════════════════════════════════════ */
function VideoGallery() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const videos = [
    { title: "The Good News", desc: "Sharing God\u2019s love with the world", thumb: SCENES.worship, tag: "Newest", tagColor: "#FFD700", tagIcon: Zap },
    { title: "Jesus Me Ama", desc: "A beautiful Spanish worship song", thumb: SCENES.group, tag: "Espanol", tagColor: "#00B5B8", tagIcon: Globe },
    { title: "Worship Together", desc: "Joyful family praise & worship", thumb: SCENES.adventure, tag: "Popular", tagColor: "#2DB84B", tagIcon: Crown },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFF0F5] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <Image src={SCENES.landscape} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none film-grain opacity-[0.02]" />
      {!reduced && (
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <div className="section-mesh w-[400px] h-[400px] top-[-10%] right-[-10%]" style={{ background: "rgba(240,45,138,0.08)", "--mesh-dur": "11s" } as React.CSSProperties} />
          <div className="section-mesh w-[300px] h-[300px] bottom-[-5%] left-[-5%]" style={{ background: "rgba(255,215,0,0.07)", "--mesh-dur": "13s", animationDelay: "-5s" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#E8192C]" style={{ left: "10%", top: "25%", "--amb-dur": "10s", "--amb-o": "0.08" } as React.CSSProperties} />
          <div className="section-particle w-1.5 h-1.5 bg-[#FFD700]" style={{ left: "80%", top: "70%", "--amb-dur": "8s", "--amb-o": "0.07", animationDelay: "-3s" } as React.CSSProperties} />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[12px] font-badge text-[#F7941D] mb-4">
              <Film className="h-3.5 w-3.5" /> {t("home.video.badge")}
            </span>
            <h2 className="font-hero-section text-[clamp(2rem,5vw,3.5rem)]"><span style={{ color: "#E8890C" }}>{t("home.video.title1")}</span> <span style={{ color: "#F02D8A" }}>{t("home.video.title2")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.video.title3")}</span></h2>
            <span className="font-handwritten text-[18px] text-[#4A4A4A]/65 ml-2 inline-block rotate-[-2deg]">( {t("home.video.note")} )</span>
          </Reveal>
          <Reveal delay={0.1}>
            <PlayfulButton href="/watch" variant="primary" className="text-[13px] px-6 py-3">
              {t("home.video.btn")} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </PlayfulButton>
          </Reveal>
        </div>

        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {videos.map((v) => (
            <StaggerItem key={v.title}>
              <motion.div className="group cursor-pointer" whileHover={{ y: -10, transition: SPRING_BOUNCY }}>
                <div className="relative rounded-[16px] overflow-hidden border-2 border-white/8 bg-white/5 hover:border-white/20 transition-colors duration-200">
                  <div className="relative overflow-hidden">
                    <Image src={v.thumb} alt={v.title} width={800} height={600} loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    {/* Vignette on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.4)" }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div initial={{ scale: 0.5 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={SPRING_BOUNCY} className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                        <Play className="h-6 w-6 text-white ml-0.5" fill="currentColor" aria-hidden="true" />
                      </motion.div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <motion.span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-badge text-[#4A4A4A]" style={{ backgroundColor: v.tagColor }} whileHover={{ scale: 1.1 }} transition={SPRING_BOUNCY}>
                        <v.tagIcon className="h-3 w-3" fill="currentColor" />{v.tag}
                      </motion.span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[16px] font-subheading text-[#4A4A4A] group-hover:text-[#FFD700] transition-colors duration-200">{v.title}</h3>
                    <p className="mt-1 text-[13px] text-[#4A4A4A]/70 font-medium">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   8. TRUST — Parent approval
   ════════════════════════════════════════════════════════════ */
function TrustSection() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const items = [
    { icon: Shield, title: t("home.trust.adfree"), desc: t("home.trust.adfree.desc"), color: "#4A6FCC", emoji: ShieldCheck },
    { icon: BookOpen, title: t("home.trust.scripture"), desc: t("home.trust.scripture.desc"), color: "#2DB84B", emoji: BookOpen },
    { icon: Globe, title: t("home.trust.bilingual"), desc: t("home.trust.bilingual.desc"), color: "#00B5B8", emoji: Globe },
    { icon: Volume2, title: t("home.trust.ages"), desc: t("home.trust.ages.desc"), color: "#7B3FA0", emoji: Baby },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="section-mesh w-[320px] h-[320px] top-[15%] left-[-8%]" style={{ background: "rgba(45,184,75,0.10)", "--mesh-dur": "10s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "85%", top: "20%", "--sparkle-color": "#2DB84B", "--sparkle-dur": "6s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "15%", top: "75%", "--sparkle-color": "#7B3FA0", "--sparkle-dur": "8s", animationDelay: "-3s" } as React.CSSProperties} />
          <div className="section-particle w-2 h-2 bg-[#4A6FCC]" style={{ left: "92%", top: "50%", "--amb-dur": "9s", "--amb-o": "0.06" } as React.CSSProperties} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="font-hero-section text-[clamp(2rem,4.5vw,3.2rem)]">
              <span style={{ color: "#2DB84B" }}>{t("home.trust.title1")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.trust.title2")}</span><br />
              <span className="relative inline-block" style={{ color: "#F02D8A" }}>
                {t("home.trust.highlight")}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#4A4A4A]/55 wavy-draw" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="mt-5 text-[16px] text-[#8B7E74] leading-[1.85] max-w-lg font-medium">
              {t("home.trust.desc")}
            </p>
            <motion.span
              className="inline-block mt-3 font-handwritten text-[18px] text-[#8B7E74]/70 rotate-[-2deg]"
              animate={{ rotate: [-2, 0, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >-- {t("home.trust.note")} <Heart className="h-3 w-3 inline" fill="currentColor" /></motion.span>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="rounded-[16px] bg-white border-2 border-[#F09EBA]/50 p-6 hover:border-[#F09EBA] card-shadow-glow transition-all duration-200 group cursor-default"
                  whileHover={{ y: -6, rotate: 1, transition: SPRING_BOUNCY }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#F09EBA]/50 border-animate group-hover:border-[#F09EBA] transition-colors" whileHover={{ rotate: 15, scale: 1.15 }} transition={SPRING_BOUNCY}>
                      <item.icon className="h-5 w-5 icon-idle" style={{ color: item.color }} aria-hidden="true" />
                    </motion.div>
                    <item.emoji className="h-5 w-5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-subheading text-[#4A4A4A] mb-1">{item.title}</h3>
                  <p className="text-[13px] text-[#8B7E74] leading-[1.7] font-medium">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   9. TESTIMONIALS — Stacked notes
   ════════════════════════════════════════════════════════════ */
function Testimonials() {
  const reduced = useReducedMotion();
  const { t } = useLanguage();
  const items = [
    { text: "My kids sing these songs ALL day long. Finally, worship music they actually love!", author: "Sarah M.", role: "Mom of 3", rotate: "-2deg", bg: "#FFF5E6" },
    { text: "The animation quality is incredible. My kids are learning scripture without even realizing it.", author: "David R.", role: "Dad of 2", rotate: "1.5deg", bg: "#EAFAF0" },
    { text: "Selah Kids has made worship time the highlight of our week. A true blessing!", author: "Maria L.", role: "Mom of 4", rotate: "-1deg", bg: "#FFF0F6" },
    { text: "The Spanish songs are amazing! My bilingual family loves worshipping in both languages.", author: "Isabella R.", role: "Mom of 2", rotate: "2deg", bg: "#EEF2FF" },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none striped-bg" />
      {!reduced && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="section-mesh w-[250px] h-[250px] top-[10%] right-[5%]" style={{ background: "rgba(247,148,29,0.08)", "--mesh-dur": "11s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "5%", top: "30%", "--sparkle-color": "#FFD700", "--sparkle-dur": "5s" } as React.CSSProperties} />
          <div className="section-sparkle" style={{ left: "95%", top: "70%", "--sparkle-color": "#F02D8A", "--sparkle-dur": "7s", animationDelay: "-2s" } as React.CSSProperties} />
          <div className="section-particle w-1.5 h-1.5 bg-[#2DB84B]" style={{ left: "50%", top: "90%", "--amb-dur": "10s", "--amb-o": "0.06" } as React.CSSProperties} />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-10">
          <h2 className="font-hero-section text-[clamp(2rem,5vw,3.5rem)]">
            <span style={{ color: "#E8890C" }}>{t("home.testimonials.title1")}</span> <span style={{ color: "#4A6FCC" }}>{t("home.testimonials.title2")}</span> <span style={{ color: "#2DB84B" }}>{t("home.testimonials.title3")}</span><br />
            <span className="relative inline-block" style={{ color: "#F02D8A" }}>
              {t("home.testimonials.highlight")}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFD700]/40 wavy-draw" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="relative rounded-[16px] border-2 border-[#F09EBA] p-6 h-full flex flex-col justify-between shadow-[4px_4px_0_#F09EBA] card-shadow-glow cursor-default"
                style={{ backgroundColor: t.bg, transform: `rotate(${t.rotate})` }}
                whileHover={{ rotate: 0, y: -8, scale: 1.03, transition: SPRING_BOUNCY }}
              >
                <div className="absolute -top-2 right-6 w-12 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" />

                <div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <motion.span key={j} whileHover={{ scale: 1.3, rotate: 15, y: -3 }} transition={SPRING_BOUNCY}>
                        <Star className="h-3.5 w-3.5 text-[#FFD700]" fill="#FFD700" aria-hidden="true" />
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-[14px] text-[#4A4A4A] leading-[1.75] font-semibold">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mt-5 pt-4 border-t-2 border-[#F09EBA]/30">
                  <div className="text-[14px] font-extrabold text-[#4A4A4A]">{t.author}</div>
                  <div className="text-[12px] text-[#8B7E74] font-semibold">{t.role}</div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   10. CTA — Cinematic finale
   ════════════════════════════════════════════════════════════ */
function CTASection({ onCtaClick }: { onCtaClick?: (e: React.MouseEvent) => void }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: reduced ? 0 : bgY, scale: reduced ? 1 : bgScale }}>
        <Image src={SCENES.vibrant} alt="" fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-[#7B3FA0]/85" />
      <div className="absolute inset-0 z-[2] pointer-events-none film-grain opacity-[0.025]" />

      {/* Decorative circles */}
      {!reduced && (
        <>
          <motion.div
            className="absolute z-[3] top-[-10%] right-[-5%] w-[350px] h-[350px] rounded-full border-[4px] border-white/8 pointer-events-none"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute z-[3] bottom-[-15%] left-[-3%] w-[250px] h-[250px] rounded-full border-[4px] border-white/8 pointer-events-none"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <div className="relative z-10 py-16 sm:py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <motion.span
              className="inline-block font-handwritten text-[22px] sm:text-[26px] text-white/90 mb-4 rotate-[-3deg]"
              animate={{ rotate: [-3, -1, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >{t("home.cta.note")} <Music className="h-4 w-4 inline" /></motion.span>
            <h2 className="font-hero-section text-[clamp(2.2rem,6vw,4rem)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              <span style={{ color: "#FFB347" }}>{t("home.cta.title1")}</span> <span style={{ color: "#FF69B4" }}>{t("home.cta.title2")}</span><br />
              <span className="relative inline-block text-white">
                {t("home.cta.title3")}
                <SparkleDecor className="absolute -top-3 -right-6" size={20} />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[16px] sm:text-[18px] text-white/90 leading-relaxed max-w-lg mx-auto font-medium font-serif italic">
              &ldquo;{t("home.cta.quote")}&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticWrap strength={0.12}>
                <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.96, y: 0 }} transition={SPRING_BOUNCY}>
                  <a
                    href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onCtaClick}
                    className="btn-playful btn-shimmer font-btn anim-pulse-glow inline-flex items-center gap-3 rounded-full border-2 px-7 py-3.5 text-[15px] tracking-wide bg-[#F02D8A] text-white border-[#F09EBA] shadow-[4px_4px_0_#F09EBA] hover:shadow-[6px_6px_0_#F09EBA]"
                  >
                    <Youtube className="h-5 w-5 text-red-400" aria-hidden="true" />
                    {t("home.cta.btn")} <ArrowRight className="h-4 w-4 arrow-slide" aria-hidden="true" />
                  </a>
                </motion.div>
              </MagneticWrap>
              <PlayfulButton
                href="/donate"
                variant="ghost"
                icon={<Heart className="h-4 w-4 text-[#FFD700]" fill="currentColor" aria-hidden="true" />}
              >
                {t("home.cta.btn2")}
              </PlayfulButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ════════════════════════════════════════════════════════════ */
const ScrollProgress = memo(function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8192C] via-[#F7941D] via-[#FFD700] via-[#2DB84B] via-[#4A6FCC] to-[#F02D8A] z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
});

/* ════════════════════════════════════════════════════════════
   PAGE — Cinematic Story Flow
   ════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { burst, particles } = useParticleBurst();

  return (
    <>
      <StarRain />
      <ParticleBurstLayer particles={particles} />
      <ScrollProgress />
      <HeroSection />

      <div className="relative cv-auto">
        <SceneShowcase />
        <WaveDivider from="#FFFDF5" to="#FFF5F0" position="bottom" />
      </div>

      <div className="relative cv-auto">
        <WhySection />
        <WaveDivider from="#FFF5F0" to="#FFFDF5" position="bottom" />
      </div>

      <div className="cv-auto">
        <CharactersSection />
      </div>

      <div className="relative cv-auto">
        <WaveDivider from="#FFFDF5" to="#FFF0F5" position="bottom" />
      </div>
      <div className="cv-auto">
        <ImmersiveScene />
      </div>

      <div className="relative cv-auto">
        <VideoGallery />
        <WaveDivider from="#FFF0F5" to="#FFFDF5" position="bottom" flip />
      </div>

      <div className="cv-auto">
        <TrustSection />
      </div>
      <div className="relative cv-auto">
        <WaveDivider from="#FFFDF5" to="#FFF5F0" position="bottom" />
      </div>
      <div className="cv-auto">
        <Testimonials />
      </div>
      <CTASection onCtaClick={burst} />
    </>
  );
}
