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
} from "motion/react";
import { useRef, useState, useEffect } from "react";
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
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPRING = { type: "spring" as const, stiffness: 300, damping: 25 };

const IMG = {
  andy: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
  libni: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
  shiloh: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
};

/* ── Reveal ── */
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
    up: { initial: { opacity: 0, y: reduced ? 0 : 40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: reduced ? 0 : -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: reduced ? 0 : 40 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: reduced ? 1 : 0.88 }, animate: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div ref={ref} initial={v[direction].initial} animate={inView ? v[direction].animate : {}} transition={{ duration: 0.7, ease: EASE, delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Counter ── */
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

/* ═══════════════════════════════════════════════════════════
   1. HERO — Warm storybook opening
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const charY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-[#1A3A2A]">
      {/* Subtle warm glow — NOT gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 30% 80%, rgba(232,185,49,0.12) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(232,102,58,0.08) 0%, transparent 60%)",
      }} />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,248,240,0.5) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-28 sm:pt-32 pb-16 min-h-[100svh] flex flex-col justify-center">
        {/* Stamp badge */}
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={ready ? { opacity: 1, rotate: -2 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 border-2 border-[#E8B931] rounded px-4 py-2 text-[11px] font-extrabold tracking-[0.15em] uppercase text-[#E8B931]" style={{ transform: "rotate(-2deg)" }}>
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Faith-Powered Kids Music
          </span>
        </motion.div>

        {/* Main heading — BIG editorial type */}
        <motion.h1
          className="font-heading leading-[0.88] tracking-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
        >
          <span className="block text-[clamp(3.5rem,10vw,8rem)] text-[#FFF8F0]">Songs that</span>
          <span className="block text-[clamp(3.8rem,11vw,8.5rem)] text-[#E8B931]" style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.15)" }}>
            plant seeds
          </span>
          <span className="block text-[clamp(2rem,5vw,3.5rem)] text-[#FFF8F0]/40 font-semibold mt-2">
            of faith forever.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
          className="mt-8 max-w-lg text-[16px] sm:text-[18px] text-[#FFF8F0]/45 leading-[1.8]"
        >
          Original Bible songs with <span className="text-[#E8B931] font-bold">cinema-quality 3D animation</span> that
          get your little ones singing, dancing &amp; falling in love with God&apos;s word.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5, ease: EASE }}
          className="mt-10 flex flex-col sm:flex-row items-start gap-4"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link href="/watch" className="inline-flex items-center gap-3 rounded-full bg-[#E8663A] px-8 py-4 text-[15px] font-bold text-white shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Play className="h-4 w-4 ml-0.5" fill="currentColor" aria-hidden="true" />
              </span>
              Watch Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <a href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border-2 border-[#FFF8F0]/15 px-7 py-4 text-[15px] font-bold text-[#FFF8F0]/50 hover:text-[#FFF8F0] hover:border-[#FFF8F0]/30 transition-colors duration-150"
            >
              <Youtube className="h-5 w-5 text-red-400" aria-hidden="true" />
              Subscribe Free
            </a>
          </motion.div>
        </motion.div>

        {/* Characters — floating at bottom right on desktop */}
        <motion.div
          style={{ y: charY }}
          className="mt-12 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 xl:right-16 flex items-end justify-center lg:justify-end"
        >
          <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
            {/* Andy center */}
            <motion.div
              className="relative z-[3] mx-auto w-[70%]"
              initial={{ y: 80, opacity: 0 }}
              animate={ready ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 60, damping: 14 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -8 }} transition={SPRING} className="cursor-pointer">
                <Image src={IMG.andy} alt="Andy - The Brave Leader" width={800} height={800} className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]" priority />
              </motion.div>
            </motion.div>
            {/* Libni left */}
            <motion.div
              className="absolute bottom-0 left-[-12%] w-[48%] z-[2]"
              initial={{ x: -60, opacity: 0 }}
              animate={ready ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 55, damping: 14 }}
            >
              <motion.div whileHover={{ scale: 1.06, y: -6 }} transition={SPRING} className="cursor-pointer">
                <Image src={IMG.libni} alt="Libni - The Joyful Singer" width={640} height={640} className="drop-shadow-[0_16px_32px_rgba(0,0,0,0.25)]" priority />
              </motion.div>
            </motion.div>
            {/* Shiloh right */}
            <motion.div
              className="absolute bottom-0 right-[-12%] w-[48%] z-[2]"
              initial={{ x: 60, opacity: 0 }}
              animate={ready ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8, type: "spring", stiffness: 55, damping: 14 }}
            >
              <motion.div whileHover={{ scale: 1.06, y: -6 }} transition={SPRING} className="cursor-pointer">
                <Image src={IMG.shiloh} alt="Shiloh - The Curious Explorer" width={640} height={640} className="drop-shadow-[0_16px_32px_rgba(0,0,0,0.25)]" priority />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div animate={reduced ? {} : { y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#FFF8F0]/20">Scroll</span>
            <ArrowDown className="h-4 w-4 text-[#FFF8F0]/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. RUNNING TICKER — Marquee strip
   ═══════════════════════════════════════════════════════════ */
function TickerStrip() {
  const items = ["50,000+ Happy Families", "20+ Original Songs", "2M+ YouTube Views", "100% Bible Based", "English & Espanol", "Ages 0-8"];
  return (
    <section className="relative py-5 bg-[#E8663A] overflow-hidden">
      <div className="marquee-container">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mx-8 text-[14px] sm:text-[15px] font-extrabold text-white/90 flex items-center gap-3">
              <Star className="h-3.5 w-3.5 text-[#E8B931]" fill="#E8B931" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. FEATURED VIDEO — Film poster style
   ═══════════════════════════════════════════════════════════ */
function FeaturedVideo() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#FFF8F0] overflow-hidden paper-texture">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Video card with chunky border */}
          <Reveal direction="left" className="flex-1 w-full">
            <div className="relative">
              {/* Tape decoration */}
              <div className="absolute -top-3 left-[20%] w-20 h-7 bg-[#E8B931]/30 rounded-sm z-10" style={{ transform: "rotate(-3deg)" }} />
              <div className="relative rounded-[20px] overflow-hidden border-3 border-[#2D2A26] shadow-[6px_6px_0_#2D2A26] group cursor-pointer">
                <div className="relative aspect-video bg-[#2D2A26]">
                  <Image src={IMG.andy} alt="The Good News - Selah Kids" width={1920} height={1080} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                      <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#E8663A] shadow-[4px_4px_0_rgba(0,0,0,0.2)] group-hover:bg-[#FF6B35] transition-colors">
                        <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white ml-1" fill="currentColor" aria-hidden="true" />
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded bg-[#E8B931] text-[#2D2A26] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider">
                      New Release
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — Editorial text */}
          <Reveal delay={0.1} className="flex-1">
            <span className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#E8663A] mb-4">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Now Streaming
            </span>
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-[#2D2A26] leading-[0.92] tracking-tight">
              Watch the<br />newest episode
            </h2>
            <p className="mt-5 text-[16px] text-[#6B6560] leading-[1.8] max-w-md">
              Join Andy, Libni &amp; Shiloh in <em className="text-[#2D2A26] font-semibold not-italic">&ldquo;The Good News&rdquo;</em> — a cinematic worship experience your kids will replay endlessly.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/watch" className="inline-flex items-center gap-2 rounded-full bg-[#2D2A26] text-[#FFF8F0] px-6 py-3 text-[14px] font-bold shadow-[3px_3px_0_rgba(0,0,0,0.15)] hover:shadow-[5px_5px_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-150">
                All Videos <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. WHY SELAH — Magazine editorial with numbered blocks
   ═══════════════════════════════════════════════════════════ */
function WhySection() {
  const pillars = [
    {
      num: "01",
      badge: "Scripture First",
      title: "Every lyric rooted in God\u2019s word",
      desc: "Our songs are built on real Bible verses, turning scripture into melodies your kids can\u2019t stop singing. Faith grows through music they carry in their hearts all day.",
      icon: BookOpen,
      color: "#1A3A2A",
      bg: "#E8F5E9",
      image: IMG.libni,
    },
    {
      num: "02",
      badge: "Cinema Quality",
      title: "Animation that rivals the big studios",
      desc: "Every frame is crafted by world-class animators. Vibrant 3D worlds that captivate tiny eyes and spark boundless imagination \u2014 this isn\u2019t your average kids channel.",
      icon: Palette,
      color: "#E8663A",
      bg: "#FFF0E8",
      image: IMG.andy,
    },
    {
      num: "03",
      badge: "Family Worship",
      title: "Songs the whole family will love",
      desc: "Dance parties, car rides, bedtime worship \u2014 moments that bring everyone together. Music that parents genuinely enjoy singing alongside their kids.",
      icon: Heart,
      color: "#B8336A",
      bg: "#FCEEF5",
      image: IMG.shiloh,
    },
  ];

  return (
    <section className="relative py-24 sm:py-36 bg-[#F5E6D3] overflow-hidden">
      {/* Diagonal striped background */}
      <div className="absolute inset-0 pointer-events-none striped-bg" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-20">
          <span className="stamp-badge text-[#1A3A2A] border-[#1A3A2A] mb-6">
            <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" /> What makes us different
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2.2rem,5.5vw,4rem)] text-[#2D2A26] leading-[0.88] tracking-tight">
            More than just<br />kids music
          </h2>
        </Reveal>

        <div className="space-y-16 sm:space-y-24">
          {pillars.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={p.num} className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10 lg:gap-16`}>
                <Reveal direction={isEven ? "left" : "right"} className="flex-1 w-full">
                  <div className="relative">
                    {/* Chunky card image */}
                    <div className="relative rounded-[20px] overflow-hidden border-3 border-[#2D2A26] shadow-[6px_6px_0_#2D2A26] aspect-[4/3] flex items-end justify-center group" style={{ backgroundColor: p.bg }}>
                      <Image src={p.image} alt={p.badge} width={600} height={600} className="relative z-10 w-[65%] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2" />
                    </div>
                    {/* Scrapbook rotation */}
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full border-3 border-[#2D2A26] flex items-center justify-center font-heading text-[18px] z-10 shadow-[3px_3px_0_#2D2A26]" style={{ backgroundColor: p.bg, color: p.color }}>
                      {p.num}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.1} className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#2D2A26]" style={{ backgroundColor: p.bg }}>
                      <p.icon className="h-5 w-5" style={{ color: p.color }} aria-hidden="true" />
                    </div>
                    <span className="text-[12px] font-extrabold tracking-[0.12em] uppercase" style={{ color: p.color }}>{p.badge}</span>
                  </div>
                  <h3 className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] text-[#2D2A26] leading-[1.08] tracking-tight mb-4">{p.title}</h3>
                  <p className="text-[16px] text-[#6B6560] leading-[1.8]">{p.desc}</p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. CHARACTERS — Scrapbook cards on warm background
   ═══════════════════════════════════════════════════════════ */
function CharactersSection() {
  const chars = [
    { name: "Andy", role: "The Brave Leader", desc: "Leads every adventure with courage and unstoppable faith. Always first to step up and inspire the crew.", image: IMG.andy, color: "#E8663A", bg: "#FFF0E8", rotate: "-2deg" },
    { name: "Libni", role: "The Joyful Singer", desc: "Her voice lights up every song. She finds the bright side in everything and reminds everyone of God\u2019s love.", image: IMG.libni, color: "#B8336A", bg: "#FCEEF5", rotate: "1.5deg" },
    { name: "Shiloh", role: "The Curious Explorer", desc: "Loves discovering new things and sharing Bible stories. Turns every day into an unforgettable faith adventure.", image: IMG.shiloh, color: "#1A3A2A", bg: "#E8F5E9", rotate: "-1deg" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#FFF8F0] overflow-hidden paper-texture">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="stamp-badge text-[#B8336A] border-[#B8336A] mb-6">
            <Heart className="h-3 w-3" fill="currentColor" aria-hidden="true" /> Meet the Stars
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2.2rem,5.5vw,4rem)] text-[#2D2A26] leading-[0.88] tracking-tight">
            Your kids&apos; new<br />best friends
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {chars.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <motion.div
                className="relative rounded-[20px] p-6 sm:p-8 overflow-hidden border-3 border-[#2D2A26] shadow-[5px_5px_0_#2D2A26] cursor-default group"
                style={{ backgroundColor: c.bg, transform: `rotate(${c.rotate})` }}
                whileHover={{ y: -8, rotate: 0, transition: SPRING }}
              >
                {/* Tape at top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E8B931]/35 rounded-sm z-10" style={{ transform: "rotate(2deg)" }} />
                <div className="relative w-full aspect-square max-w-[180px] mx-auto mb-6 mt-4">
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
                    <Image src={c.image} alt={c.name} width={500} height={500} className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-transform duration-200 group-hover:scale-105" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-extrabold tracking-[0.12em] uppercase" style={{ color: c.color }}>{c.role}</span>
                  <h3 className="mt-1 font-heading text-[clamp(1.5rem,3vw,2rem)] text-[#2D2A26] leading-[1] tracking-tight">{c.name}</h3>
                  <p className="mt-3 text-[14px] text-[#6B6560] leading-[1.7]">{c.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="text-center mt-10">
          <Link href="/characters" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#E8663A] hover:text-[#2D2A26] transition-colors">
            Meet all characters <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. VIDEO GALLERY — Postcard grid
   ═══════════════════════════════════════════════════════════ */
function VideoGallery() {
  const videos = [
    { title: "The Good News", desc: "Sharing God\u2019s love with the world", thumb: IMG.andy, tag: "Newest", tagColor: "#E8B931" },
    { title: "Jesus Me Ama", desc: "A beautiful Spanish worship song", thumb: IMG.libni, tag: "Espanol", tagColor: "#4A90A4" },
    { title: "Worship Together", desc: "Joyful family praise & worship", thumb: IMG.shiloh, tag: "Popular", tagColor: "#4A7C5C" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#1A3A2A] overflow-hidden">
      {/* Dot overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,248,240,0.5) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#E8B931] mb-4">
              <Play className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" /> The Collection
            </span>
            <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-[#FFF8F0] leading-[0.9] tracking-tight">Watch &amp; Worship</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/watch" className="inline-flex items-center gap-2 rounded-full bg-[#E8663A] text-white px-6 py-3 text-[13px] font-bold shadow-[3px_3px_0_rgba(0,0,0,0.2)] hover:shadow-[5px_5px_0_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-150">
              See all videos <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <motion.div className="group cursor-pointer" whileHover={{ y: -6, transition: SPRING }}>
                <div className="relative rounded-[16px] overflow-hidden border-3 border-[#FFF8F0]/15 bg-[#FFF8F0]/5 hover:border-[#FFF8F0]/30 transition-colors duration-200">
                  <div className="relative overflow-hidden">
                    <Image src={v.thumb} alt={v.title} width={800} height={600} className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#1A3A2A]/0 group-hover:bg-[#1A3A2A]/30 transition-colors duration-200" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8663A] shadow-lg scale-75 group-hover:scale-100 transition-transform duration-200">
                        <Play className="h-6 w-6 text-white ml-0.5" fill="currentColor" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 rounded px-3 py-1 text-[11px] font-extrabold text-[#2D2A26]" style={{ backgroundColor: v.tagColor }}>
                      {v.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[16px] font-bold text-[#FFF8F0] group-hover:text-[#E8B931] transition-colors duration-150">{v.title}</h3>
                    <p className="mt-1 text-[13px] text-[#FFF8F0]/35">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. TRUST — Parent approval, warm style
   ═══════════════════════════════════════════════════════════ */
function TrustSection() {
  const items = [
    { icon: Shield, title: "Ad-Free & Safe", desc: "No ads, no distractions. Just wholesome content you can trust for your kids.", color: "#1A3A2A" },
    { icon: BookOpen, title: "Scripture-Based", desc: "Every lyric reviewed for biblical accuracy and doctrinal integrity.", color: "#E8663A" },
    { icon: Globe, title: "English & Spanish", desc: "Bilingual worship so every family can praise together in their language.", color: "#4A90A4" },
    { icon: Volume2, title: "Ages 0-8", desc: "Age-appropriate content designed specifically for little hearts and minds.", color: "#B8336A" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#FFF8F0] overflow-hidden paper-texture">
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="stamp-badge text-[#1A3A2A] border-[#1A3A2A] mb-5">
              <Shield className="h-3 w-3" aria-hidden="true" /> Parent Approved
            </span>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] text-[#2D2A26] leading-[0.9] tracking-tight">
              Content you<br />can trust completely
            </h2>
            <p className="mt-5 text-[16px] text-[#6B6560] leading-[1.8] max-w-lg">
              We&apos;re parents too. Every song, every frame, every word is created with the same care we&apos;d want for our own children.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <motion.div
                  className="rounded-[16px] bg-white border-2 border-[#E8DDD0] p-6 hover:border-[#2D2A26] hover:shadow-[4px_4px_0_#2D2A26] transition-all duration-200"
                  whileHover={{ y: -4, transition: SPRING }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#E8DDD0] mb-4">
                    <item.icon className="h-5 w-5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-bold text-[#2D2A26] mb-1">{item.title}</h3>
                  <p className="text-[13px] text-[#6B6560] leading-[1.6]">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. TESTIMONIALS — Stacked notes
   ═══════════════════════════════════════════════════════════ */
function Testimonials() {
  const items = [
    { text: "My kids sing these songs ALL day long. Finally, worship music they actually love and I enjoy too!", author: "Sarah M.", role: "Mom of 3", rotate: "-1.5deg", bg: "#FFF0E8" },
    { text: "The animation quality is incredible. My kids are learning scripture without even realizing it.", author: "David R.", role: "Dad of 2", rotate: "1deg", bg: "#E8F5E9" },
    { text: "Selah Kids has made worship time the highlight of our week. A true blessing for our family.", author: "Maria L.", role: "Mom of 4", rotate: "-0.5deg", bg: "#FCEEF5" },
    { text: "The Spanish songs are amazing! My bilingual family loves worshipping together in both languages.", author: "Isabella R.", role: "Mom of 2", rotate: "1.5deg", bg: "#FEF9E7" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#F5E6D3] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none striped-bg" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <span className="stamp-badge text-[#D4A843] border-[#D4A843] mb-5">
            <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" /> Loved by Families
          </span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] text-[#2D2A26] leading-[0.9] tracking-tight">
            What parents are saying
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div
                className="relative rounded-[16px] border-2 border-[#2D2A26] p-6 h-full flex flex-col justify-between shadow-[4px_4px_0_#2D2A26]"
                style={{ backgroundColor: t.bg, transform: `rotate(${t.rotate})` }}
                whileHover={{ rotate: 0, y: -4, transition: SPRING }}
              >
                {/* Tape */}
                <div className="absolute -top-2 right-6 w-12 h-5 bg-[#E8B931]/35 rounded-sm z-10" />
                <div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 text-[#D4A843]" fill="#D4A843" aria-hidden="true" />)}
                  </div>
                  <p className="text-[14px] text-[#2D2A26] leading-[1.75] font-medium">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mt-5 pt-4 border-t-2 border-[#2D2A26]/10">
                  <div className="text-[14px] font-bold text-[#2D2A26]">{t.author}</div>
                  <div className="text-[12px] text-[#6B6560] font-medium">{t.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. CTA — Bold warm call to action
   ═══════════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#E8663A]">
      {/* Decorative circles */}
      <div className="absolute top-[-15%] right-[-8%] w-[400px] h-[400px] rounded-full border-[6px] border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-5%] w-[300px] h-[300px] rounded-full border-[6px] border-white/10 pointer-events-none" />

      <div className="relative z-10 py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-[clamp(2.2rem,6vw,4rem)] text-white leading-[0.88] tracking-tight" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.1)" }}>
              Start the adventure<br />today
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-[16px] sm:text-[18px] text-white/60 leading-relaxed max-w-lg mx-auto">
              Subscribe to our YouTube channel and be the first to see new songs, characters, and worship videos.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#2D2A26] px-8 py-4 text-[15px] font-bold text-[#FFF8F0] shadow-[4px_4px_0_rgba(0,0,0,0.2)]"
                whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <Youtube className="h-5 w-5 text-red-400" aria-hidden="true" />
                Subscribe Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                <Link href="/donate" className="inline-flex items-center gap-3 rounded-full border-2 border-white/25 px-7 py-4 text-[15px] font-bold text-white/70 hover:text-white hover:border-white/50 transition-colors">
                  <Heart className="h-4 w-4 text-[#E8B931]" fill="currentColor" aria-hidden="true" />
                  Support Our Mission
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#E8663A] z-[9999] origin-left" style={{ scaleX }} />;
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <TickerStrip />
      <FeaturedVideo />
      <WhySection />
      <CharactersSection />
      <VideoGallery />
      <TrustSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
