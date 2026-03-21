"use client";

import { motion, useInView, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PageHero({
  badge,
  title,
  highlight,
  description,
  badgeIcon: BadgeIcon,
}: {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0.96]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 min-h-[50vh] flex items-center">
      <motion.div className="absolute inset-0 z-0 aurora-bg" style={{ y: bgY }} />
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[8%] w-[200px] h-[200px] rounded-full morph-blob opacity-40"
          style={{ background: "radial-gradient(circle, rgba(255,107,53,0.15), transparent 70%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-[260px] h-[260px] rounded-full morph-blob opacity-30"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)" }}
          animate={prefersReducedMotion ? {} : { x: [0, -25, 0], y: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      <div className="absolute inset-0 z-[2] noise-overlay" />

      <motion.div style={{ y: contentY, scale }} className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center w-full">
        <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.4, ease: EASE }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1C4425]/8 border-2 border-[#1C4425]/12 px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase text-[#1C4425]/70 mb-7">
            {BadgeIcon && <BadgeIcon className="h-3.5 w-3.5" />}
            {badge}
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] text-[#1C4425]"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.08, duration: 0.5, ease: EASE }}
        >
          {title}
          {highlight && <><br /><span className="text-[#FF6B35]">{highlight}</span></>}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl mx-auto text-[16px] sm:text-[18px] leading-[1.7] font-medium text-[#64786C]"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.5, ease: EASE }}
        >
          {description}
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0, zIndex: 3 }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-auto">
          <path d="M0,64 C288,120 480,0 720,64 C960,128 1152,0 1440,64 L1440,120 L0,120 Z" fill="#FFF8F0" />
        </svg>
      </div>
    </section>
  );
}
