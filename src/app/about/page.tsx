"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { BookOpen, Tv, Heart, Star, Shield, Smile, Sparkles, Plus, ShieldCheck, Palette, Music, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, CinematicReveal, HandwrittenNote, WavyUnderline, ScrapbookCard,
  SectionGrain, ParallaxLayer, BlurFadeIn, FloatingElement, SlideIn, ClipReveal, TiltCard, ScrollScale,
  CharacterCameo,
  SPRING_BOUNCY, EASE, SCENES, CHARACTERS,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const values = [
  { icon: Star, title: "Christ-Centered", desc: "Jesus is at the center of every story, every song, and every adventure we create.", color: "#F02D8A", bg: "#FFF0E8", emoji: Plus, rotate: "-1.5deg" },
  { icon: Shield, title: "Kid-First Design", desc: "Age-appropriate, screen-time conscious content designed specifically for little hearts and minds.", color: "#7B3FA0", bg: "#FCEEF5", emoji: ShieldCheck, rotate: "1deg" },
  { icon: BookOpen, title: "Theologically Sound", desc: "Every lyric is carefully reviewed for biblical accuracy and doctrinal integrity.", color: "#4A4A4A", bg: "#E8F5E9", emoji: BookOpen, rotate: "-0.5deg" },
  { icon: Smile, title: "Joyful & Inclusive", desc: "Reflecting the beautiful diversity of God's creation in every character and story.", color: "#FFD700", bg: "#FEF9E7", emoji: Palette, rotate: "1.5deg" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const darkRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: darkProgress } = useScroll({ target: darkRef, offset: ["start end", "end start"] });
  const darkImgY = useTransform(darkProgress, [0, 1], [0, reduced ? 0 : -50]);

  return (
    <>
      <PageHero
        badge={t("about.badge")}
        badgeIcon={Heart}
        title={t("about.title")}
        highlight={t("about.highlight")}
        description={t("about.desc")}
        scene={SCENES.vibrant}
      />

      {/* Mission Section */}
      <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <FloatingElement className="absolute top-20 right-[6%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={16} duration={7}><Star className="h-10 w-10" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <SlideIn from="left" className="flex-1 w-full">
              <BlurFadeIn delay={0.1}>
                <h2 className="font-hero-section text-[clamp(2rem,4.5vw,3.2rem)]">
                  <span style={{ color: "#E8890C" }}>Teaching</span> <span style={{ color: "#4A6FCC" }}>Biblical</span> <span style={{ color: "#2DB84B" }}>Principles</span><br />
                  <span className="relative inline-block" style={{ color: "#F02D8A" }}>
                    Through Song
                    <WavyUnderline color="#F02D8A" />
                  </span>
                </h2>
              </BlurFadeIn>
              <BlurFadeIn delay={0.2}>
                <p className="mt-6 text-[17px] text-[#8B7E74] leading-[1.85] font-medium">
                  Our songs teach biblical principles in a way that kids can connect with. Each song is carefully crafted to be catchy, fun, and grounded in scripture so that children learn God&apos;s word through music and movement.
                </p>
              </BlurFadeIn>
              <BlurFadeIn delay={0.3}>
                <p className="mt-4 text-[17px] text-[#8B7E74] leading-[1.85] font-medium">
                  We believe that worship should be joyful, and our mission is to bring families closer to God through the power of music.
                </p>
                <HandwrittenNote className="text-[18px] mt-4 block text-[#F02D8A]/40" rotate={-3}>
                  — music changes everything <Music className="h-3 w-3 inline" />
                </HandwrittenNote>
              </BlurFadeIn>
            </SlideIn>
            <SlideIn from="right" delay={0.15} className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                <ClipReveal direction="left">
                  <TiltCard intensity={6}>
                    <div className="rounded-[20px] overflow-hidden border-3 border-[#F09EBA] shadow-[5px_5px_0_#F09EBA] border-glow img-hover-zoom">
                      <Image src={SCENES.vibrant} alt="Selah Kids Animation" width={400} height={400} className="w-full h-full object-cover" />
                    </div>
                  </TiltCard>
                </ClipReveal>
                <ClipReveal direction="right">
                  <TiltCard intensity={6}>
                    <div className="mt-8 rounded-[20px] overflow-hidden border-3 border-[#F09EBA] shadow-[5px_5px_0_#F09EBA] border-glow img-hover-zoom">
                      <Image src={SCENES.adventure} alt="Selah Kids Characters" width={400} height={400} className="w-full h-full object-cover" />
                    </div>
                  </TiltCard>
                </ClipReveal>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Animation Quality — Cinematic dark section */}
      <section ref={darkRef} className="relative py-16 sm:py-24 bg-[#FFF0E8] overflow-hidden">
        <motion.div className="absolute inset-0 z-0 opacity-[0.08]" style={{ y: darkImgY }}>
          <Image src={SCENES.cinematic} alt="" fill className="object-cover" sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 z-[1] pointer-events-none film-grain opacity-[0.03]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <SlideIn from="left" className="flex-1 w-full order-2 lg:order-1">
              <ScrollScale>
                <TiltCard intensity={5}>
                  <div className="relative rounded-[20px] overflow-hidden border-3 border-white/10 img-hover-zoom">
                    <Image src={SCENES.worship} alt="Stunning Animation" width={800} height={600} className="w-full object-cover" />
                    <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.3)" }} />
                  </div>
                </TiltCard>
              </ScrollScale>
            </SlideIn>
            <SlideIn from="right" delay={0.15} className="flex-1 order-1 lg:order-2">
              <BlurFadeIn>
                <span className="inline-flex items-center gap-2 text-[12px] font-badge text-[#FFD700] mb-4">
                  <Tv className="h-3.5 w-3.5" /> Cinema Quality
                </span>
              </BlurFadeIn>
              <BlurFadeIn delay={0.1}>
                <h2 className="font-hero-section text-[clamp(2rem,4.5vw,3.2rem)]">
                  <span style={{ color: "#4A6FCC" }}>Stunning</span><br />
                  <span className="relative inline-block" style={{ color: "#E8890C" }}>
                    Animation
                    <WavyUnderline color="#E8890C" opacity={0.4} />
                  </span>
                </h2>
              </BlurFadeIn>
              <BlurFadeIn delay={0.2}>
                <p className="mt-6 text-[17px] text-[#4A4A4A]/80 leading-[1.85] font-medium">
                  Our videos are crafted by top-tier animators from around the world. Every frame is designed to captivate tiny eyes and spark boundless imagination.
                </p>
              </BlurFadeIn>
              <BlurFadeIn delay={0.3}>
                <p className="mt-4 text-[17px] text-[#4A4A4A]/80 leading-[1.85] font-medium">
                  This is not another low-budget YouTube channel. Every scene is a masterpiece designed to rival major animation studios.
                </p>
                <HandwrittenNote className="text-[18px] mt-4 block text-[#FFD700]/30" rotate={-2}>
                  — yes, it&apos;s really this good <Star className="h-3 w-3 inline" />
                </HandwrittenNote>
              </BlurFadeIn>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values — Scrapbook cards */}
      <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none striped-bg" />
        <SectionGrain />
        <CharacterCameo character="shiloh" side="right" className="top-24" />
        <FloatingElement className="absolute bottom-24 left-[5%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={14} duration={6} delay={1}><Music className="h-8 w-8" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <BlurFadeIn className="text-center mb-12">
            <h2 className="font-hero-section text-[clamp(2.2rem,5.5vw,4rem)]">
              <span style={{ color: "#E8890C" }}>Our</span> <span style={{ color: "#4A6FCC" }}>Core</span><br />
              <span className="relative inline-block" style={{ color: "#F02D8A" }}>
                Values
                <WavyUnderline color="#F02D8A" />
              </span>
            </h2>
          </BlurFadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {values.map((v, vi) => (
              <StaggerItem key={v.title}>
                <TiltCard intensity={5}>
                  <motion.div
                    className="group relative rounded-[20px] border-3 border-[#F09EBA] p-7 shadow-[5px_5px_0_#F09EBA] cursor-default border-glow"
                    style={{ backgroundColor: v.bg, transform: `rotate(${v.rotate})` }}
                    whileHover={{ y: -8, rotate: 0, scale: 1.02, transition: SPRING_BOUNCY }}
                  >
                    <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />
                    <motion.span className="absolute top-4 right-4 text-2xl icon-hover-bounce" whileHover={{ scale: 1.3, rotate: 15 }} transition={SPRING_BOUNCY}><v.emoji className="h-5 w-5" /></motion.span>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#F09EBA]"
                        style={{ backgroundColor: `${v.color}15` }}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={SPRING_BOUNCY}
                      >
                        <v.icon className="h-5 w-5" style={{ color: v.color }} />
                      </motion.div>
                      <span className="text-[12px] font-badge" style={{ color: v.color }}>{v.title}</span>
                    </div>
                    <p className="text-[15px] text-[#8B7E74] leading-[1.8] font-medium">{v.desc}</p>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
