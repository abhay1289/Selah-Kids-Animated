"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Star, Music, Sparkles } from "lucide-react";
import { EASE, EASE_CINEMATIC, SCENES } from "./storybook-primitives";

export function PageHero({
  badge,
  title,
  highlight,
  description,
  badgeIcon: BadgeIcon,
  scene,
}: {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
  scene?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]), { stiffness: 100, damping: 30 });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.15]);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]), { stiffness: 100, damping: 30 });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);

  const bgImage = scene || SCENES.landscape;

  const titleWords = title.split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 min-h-[55vh] flex items-center bg-black">
      {/* Background scene image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <Image src={bgImage} alt="" fill className="object-cover object-center" sizes="100vw" priority loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Film grain */}
      <div className="absolute inset-0 z-[2] pointer-events-none film-grain opacity-[0.03]" />

      {/* Cinematic vignette that deepens on scroll */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.4)" }}
      />

      {/* Drifting particles */}
      {!reduced && (
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          {[
            { Icon: Star, x: "10%", y: "15%", dur: 7, color: "rgba(255,215,0,0.2)", size: 14 },
            { Icon: Music, x: "85%", y: "25%", dur: 9, color: "rgba(240,45,138,0.18)", size: 16 },
            { Icon: Sparkles, x: "45%", y: "70%", dur: 6, color: "rgba(247,148,29,0.15)", size: 12 },
            { Icon: Music, x: "70%", y: "60%", dur: 8, color: "rgba(0,181,184,0.12)", size: 18 },
            { Icon: Star, x: "25%", y: "80%", dur: 10, color: "rgba(45,184,75,0.1)", size: 10 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ left: p.x, top: p.y, color: p.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? {
                opacity: [0, 0.6, 0.3, 0.6, 0],
                y: [0, -30, -15, -30, 0],
                x: [0, 10, -5, 8, 0],
                scale: [0.5, 1, 0.8, 1, 0.5],
                rotate: [0, 15, -10, 15, 0],
              } : {}}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            >
              <p.Icon style={{ width: p.size, height: p.size }} />
            </motion.span>
          ))}
        </div>
      )}

      <motion.div style={{ y: contentY, opacity: reduced ? 1 : contentOpacity }} className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center w-full">
        {/* Badge — drops in with bounce */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE, type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-[12px] font-badge text-[#FFD700] mb-7 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-105 cursor-default">
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
            {badge}
          </span>
        </motion.div>

        {/* Title — Fredoka hero font with logo-outline stroke, rotating colors */}
        <h1 className="font-hero drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {titleWords.map((word, i) => {
            const heroColors = ["#FFB347", "#FF69B4", "#6B9FFF"];
            return (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em] cursor-default"
                style={{ color: heroColors[i % heroColors.length] }}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)", rotateX: 40 }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: EASE }}
                whileHover={{ scale: 1.08, y: -3, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              >
                {word}
              </motion.span>
            );
          })}
          {highlight && (
            <>
              <br />
              <motion.span
                className="relative inline-block"
                style={{ color: "#FFB347" }}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ delay: 0.1 + titleWords.length * 0.06, duration: 0.8, ease: EASE }}
              >
                {highlight}
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full h-3 overflow-visible"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,8 Q50,0 100,8 T200,8"
                    fill="none"
                    stroke="rgba(242,181,65,0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ delay: 0.8, duration: 1.2, ease: EASE }}
                  />
                </motion.svg>
              </motion.span>
            </>
          )}
        </h1>

        {/* Description with blur-in */}
        <motion.p
          className="mt-6 max-w-2xl mx-auto text-[16px] sm:text-[18px] leading-[1.8] font-medium text-white/85 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        >
          {description}
        </motion.p>

        {/* Scroll cue with pulsing glow */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.button
            className="font-handwritten text-[15px] text-white/60 cursor-pointer hover:text-white/80 transition-colors"
            animate={reduced ? {} : { y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              const next = ref.current?.nextElementSibling;
              if (next) next.scrollIntoView({ behavior: "smooth" });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ↓ scroll to explore ↓
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative gold lines — twin lines with staggered reveal */}
      <motion.div
        className="absolute bottom-0 left-[10%] right-[10%] h-px z-[5]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 1.4, ease: EASE_CINEMATIC }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(242,181,65,0.3), transparent)" }}
      />
      <motion.div
        className="absolute bottom-[3px] left-[20%] right-[20%] h-px z-[5]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.7, duration: 1.2, ease: EASE_CINEMATIC }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(242,181,65,0.15), transparent)" }}
      />
    </section>
  );
}
