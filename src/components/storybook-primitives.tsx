"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
  useMotionValue,
} from "motion/react";
import { useRef, useCallback, useState } from "react";
import { Sparkles, Shield, BookOpen, Lock, Heart } from "lucide-react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_CINEMATIC: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const SPRING = { type: "spring" as const, stiffness: 300, damping: 25 };
export const SPRING_BOUNCY = { type: "spring" as const, stiffness: 400, damping: 15 };
export const STAGGER_CHILDREN = { staggerChildren: 0.1, delayChildren: 0.12 };

export const CHARACTERS = {
  andy: "/SK_Andy_Intro_Pose-removebg-preview.png",
  libni: "/SK_Libni_Intro_Pose-removebg-preview.png",
  shiloh: "/SK_Shiloh_Intro_Pose-removebg-preview.png",
};
export const SCENES = {
  adventure: "/TGN_SingleFrames+(3).png",
  vibrant: "/TGN_SingleFrames+(7).png",
  group: "/TGN_SingleFrames+(9).png",
  worship: "/TGN_SingleFrames+28229.png",
  landscape: "/TGN_SingleFrames+28329.png",
  cinematic: "/TGN_SingleFrames+28729.png",
};
export const LOGO = "/SK_Logo_FN.png";

export function Reveal({
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

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={{ hidden: {}, visible: STAGGER_CHILDREN }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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

export function MagneticWrap({ children, className = "", strength = 0.3 }: { children: React.ReactNode; className?: string; strength?: number }) {
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

export function PlayfulButton({
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
        <Comp href={href} {...(props as Record<string, string>)} className={`btn-playful font-btn inline-flex items-center gap-3 rounded-full border-2 px-7 py-3.5 text-[15px] tracking-wide transition-shadow duration-150 ${styles[variant]} ${className}`}>
          {icon}
          {children}
        </Comp>
      </motion.div>
    </MagneticWrap>
  );
}

export function SparkleDecor({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <motion.span className={`inline-block text-[#FFD700] ${className}`} animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 0.9, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <Sparkles style={{ width: size, height: size }} />
    </motion.span>
  );
}

export function ChapterDivider({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
      className="relative py-16 sm:py-20 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: EASE_CINEMATIC, delay: 0.1 }}
        className="absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent origin-center"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        className="relative z-10 inline-flex items-center gap-2 bg-[#FFFDF5] px-6 py-2 rounded-full border-2 border-[#FFD700]/30"
      >
        <span className="text-[11px] font-badge text-[#FFD700]/70">{number}</span>
        <span className="w-px h-4 bg-[#FFD700]/20" />
        <span className="text-[13px] font-bold text-[#4A4A4A]/70">{title}</span>
      </motion.span>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
          className="mt-3 font-handwritten text-[16px] text-[#8B7E74]/70 rotate-[-2deg]"
        >
          {subtitle}
        </motion.span>
      )}
    </motion.div>
  );
}

export function CinematicReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const clipPath = useTransform(scrollYProgress, [0, 0.3], ["inset(12% 12% 12% 12% round 24px)", "inset(0% 0% 0% 0% round 20px)"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  return (
    <motion.div ref={ref} style={reduced ? {} : { clipPath, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export function WavyUnderline({ color = "#F02D8A", opacity: op = 0.3 }: { color?: string; opacity?: number }) {
  return (
    <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ color: `${color}`, opacity: op }}>
      <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function HandwrittenNote({ children, className = "", rotate = -3 }: { children: React.ReactNode; className?: string; rotate?: number }) {
  return (
    <motion.span
      className={`inline-block font-handwritten text-[#8B7E74]/70 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      animate={{ rotate: [rotate, rotate + 2, rotate] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

export function StampBadge({ children, color = "#F09EBA", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <span className={`stamp-badge ${className}`} style={{ color, borderColor: color }}>
      {children}
    </span>
  );
}

export function ScrapbookCard({
  children,
  className = "",
  rotate = "0deg",
  bg = "#FFFFFF",
  hoverRotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
  bg?: string;
  hoverRotate?: number;
}) {
  return (
    <motion.div
      className={`relative rounded-[20px] border-3 border-[#F09EBA] shadow-[5px_5px_0_#F09EBA] overflow-hidden ${className}`}
      style={{ backgroundColor: bg, transform: `rotate(${rotate})` }}
      whileHover={{ y: -10, rotate: hoverRotate, scale: 1.02, transition: SPRING_BOUNCY }}
    >
      <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#FFD700]/35 rounded-sm z-10" style={{ transform: "rotate(2deg)" }} />
      {children}
    </motion.div>
  );
}

export function SectionGrain() {
  return <div className="absolute inset-0 z-[1] pointer-events-none film-grain opacity-[0.02]" />;
}

/* ── Parallax Section: scroll-linked Y offset for any content ── */
export function ParallaxLayer({
  children,
  className = "",
  speed = 0.15,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const range = direction === "up" ? [60, -60] : [-60, 60];
  const raw = useTransform(scrollYProgress, [0, 1], range.map((v) => v * speed));
  const y = useSpring(raw, { stiffness: 100, damping: 30 });
  return (
    <motion.div ref={ref} style={reduced ? {} : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Blur + Fade entrance ── */
export function BlurFadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 30, filter: reduced ? "none" : "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale-up on scroll (grows from small) ── */
export function ScrollScale({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  return (
    <motion.div ref={ref} style={reduced ? {} : { scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Horizontal slide-in from left or right on scroll ── */
export function SlideIn({
  children,
  className = "",
  from = "left",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const x = from === "left" ? (reduced ? 0 : -80) : (reduced ? 0 : 80);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating element (continuous gentle float) ── */
export function FloatingElement({
  children,
  className = "",
  amplitude = 12,
  duration = 5,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduced ? {} : { y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Scroll-linked horizontal progress bar ── */
export function ScrollProgress({ className = "", color = "#F02D8A" }: { className?: string; color?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] ${className}`}
      style={{ scaleX, backgroundColor: color }}
    />
  );
}

/* ── Rotate on scroll ── */
export function RotateOnScroll({
  children,
  className = "",
  degrees = 8,
}: {
  children: React.ReactNode;
  className?: string;
  degrees?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -degrees, reduced ? 0 : degrees]);
  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Text reveal word-by-word on scroll ── */
export function WordReveal({
  text,
  className = "",
  highlightWords = [] as string[],
  highlightColor = "#F02D8A",
}: {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          style={highlightWords.includes(word) ? { color: highlightColor } : {}}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Counter animation (number counting up) ── */
export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { duration: duration * 1000 });

  const setCb = useCallback(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);
  setCb();

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{springVal}</motion.span>
      {suffix}
    </motion.span>
  );
}

/* ── Clip-path reveal (wipe in) ── */
export function ClipReveal({
  children,
  className = "",
  direction = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "bottom" | "left" | "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const clips: Record<string, { from: string; to: string }> = {
    bottom: { from: "inset(100% 0 0 0)", to: "inset(0 0 0 0)" },
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0)" },
    center: { from: "inset(50% 50% 50% 50%)", to: "inset(0 0 0 0)" },
  };
  return (
    <motion.div
      ref={ref}
      initial={reduced ? {} : { clipPath: clips[direction].from }}
      animate={inView ? { clipPath: clips[direction].to } : {}}
      transition={{ duration: 1, ease: EASE_CINEMATIC }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Tilt card on hover (3D perspective) ── */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const reduced = useReducedMotion();

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * intensity);
      rotateX.set(-py * intensity);
    },
    [reduced, intensity, rotateX, rotateY]
  );
  const reset = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      transition={SPRING}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   DUAL-LAYER: TRUST BADGES STRIP
   Visible without scrolling — parent trust signal
   ══════════════════════════════════════════════════════════ */

const TRUST_ITEMS = [
  { icon: Shield, label: "100% Ad-Free", color: "#4A6FCC" },
  { icon: Lock, label: "COPPA Safe", color: "#2DB84B" },
  { icon: BookOpen, label: "Scripture-Based", color: "#7B3FA0" },
  { icon: Heart, label: "Parent Approved", color: "#F02D8A" },
];

export function TrustBadgesStrip({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className={`trust-strip py-4 sm:py-5 ${className}`}
    >
      <div className={`mx-auto ${compact ? "max-w-4xl" : "max-w-6xl"} px-6 lg:px-10`}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {TRUST_ITEMS.map((item, i) => (
            <motion.span
              key={item.label}
              className="trust-badge-item"
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
              whileHover={{ y: -2, scale: 1.04 }}
            >
              <item.icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: item.color }} />
              <span className={compact ? "text-[10px]" : "text-[12px]"}>{item.label}</span>
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   DUAL-LAYER: CHARACTER WITH HOVER REACTION
   Interactive element that rewards curiosity
   ══════════════════════════════════════════════════════════ */

export function CharacterReaction({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  reaction = "jump",
  speechBubble,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  reaction?: "jump" | "wave" | "squash" | "peek";
  speechBubble?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const reactionVariants = {
    jump: { y: [0, -25, 0, -10, 0], scale: [1, 1.05, 0.98, 1.02, 1] },
    wave: { rotate: [0, 12, -8, 12, -4, 8, 0], scale: [1, 1.02, 1] },
    squash: { scaleX: [1, 1.1, 0.93, 1.04, 1], scaleY: [1, 0.9, 1.07, 0.96, 1] },
    peek: { x: [0, -10, 5, -3, 0], rotate: [0, -5, 3, -2, 0] },
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={hovered && !reduced ? reactionVariants[reaction] : {}}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
        />
      </motion.div>
      {speechBubble && hovered && !reduced && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border-2 border-[#F09EBA] rounded-full px-4 py-1.5 text-[12px] font-bold text-[#4A4A4A] shadow-[2px_2px_0_#F09EBA] whitespace-nowrap z-20"
        >
          {speechBubble}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#F09EBA] rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   DUAL-LAYER: INLINE TRUST SIGNAL
   Small trust note for parent layer within fun sections
   ══════════════════════════════════════════════════════════ */

export function InlineTrust({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B7E74]/75 ${className}`}>
      <Shield className="h-3 w-3 text-[#4A6FCC]/50" />
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   DUAL-LAYER: CHARACTER CAMEO
   Small character peeking into informational sections
   ══════════════════════════════════════════════════════════ */

export function CharacterCameo({
  character = "andy",
  side = "right",
  className = "",
}: {
  character?: "andy" | "libni" | "shiloh";
  side?: "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`absolute ${side === "right" ? "right-0" : "left-0"} pointer-events-none z-[5] hidden lg:block ${className}`}
      initial={{ opacity: 0, x: side === "right" ? 60 : -60 }}
      animate={inView ? { opacity: 0.15, x: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={CHARACTERS[character]}
          alt=""
          width={120}
          height={120}
          className="object-contain"
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}
