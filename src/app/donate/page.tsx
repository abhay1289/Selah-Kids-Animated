"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Sparkles, Music, BookOpen, Users, Clapperboard, Globe, Building, Star, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, HandwrittenNote, WavyUnderline, SectionGrain, StampBadge,
  BlurFadeIn, FloatingElement, TiltCard, ScrollScale, ParallaxLayer, CharacterCameo,
  EASE, SPRING_BOUNCY, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const amounts = [10, 20, 30, 50];
const frequencies = ["One-Time", "Monthly", "Annual"];

const impacts = [
  { amount: "$10", desc: "Funds one day of animation production", icon: Sparkles, color: "#F02D8A", bg: "#FFF0E8", emoji: Clapperboard },
  { amount: "$30", desc: "Translates a song into Spanish", icon: Music, color: "#00B5B8", bg: "#E8F5F8", emoji: Globe },
  { amount: "$50", desc: "Provides resources for 100 Sunday Schools", icon: Users, color: "#4A4A4A", bg: "#E8F5E9", emoji: Building },
];

export default function DonatePage() {
  const { t } = useLanguage();
  const [freq, setFreq] = useState("One-Time");
  const [selected, setSelected] = useState(20);

  return (
    <>
      <PageHero
        badge={t("donate.badge")}
        badgeIcon={Heart}
        title={t("donate.title")}
        highlight={t("donate.highlight")}
        description={t("donate.desc")}
        scene={SCENES.worship}
      />

      <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <CharacterCameo character="andy" side="right" className="top-32" />
        <FloatingElement className="absolute top-20 right-[7%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={14} duration={7}><Heart className="h-8 w-8" /></FloatingElement>
        <FloatingElement className="absolute bottom-28 left-[5%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={10} duration={5} delay={2}><Star className="h-7 w-7" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-10">
          {/* Donation Card */}
          <ScrollScale>
            <TiltCard intensity={3}>
              <div className="group relative rounded-[20px] bg-white p-8 sm:p-10 border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA] border-glow">
                <motion.div className="absolute -top-2 left-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(-3deg)" }} />
                <motion.div className="absolute -top-2 right-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />

                <BlurFadeIn>
                  <HandwrittenNote className="text-[16px] text-[#F02D8A]/50 block text-center mb-6" rotate={-2}>
                    every dollar plants a seed <Heart className="h-3 w-3 inline" />
                  </HandwrittenNote>
                </BlurFadeIn>

                {/* Frequency Toggle */}
                <BlurFadeIn delay={0.1}>
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-full bg-[#FFF5F0] p-1 border-2 border-[#F09EBA]/50">
                      {frequencies.map((f) => (
                        <motion.button
                          key={f}
                          onClick={() => setFreq(f)}
                          whileTap={{ scale: 0.95 }}
                          className={`font-btn rounded-full px-5 py-2.5 text-[13px] transition-all duration-150 ${
                            freq === f
                              ? "bg-[#F02D8A] text-white shadow-[2px_2px_0_#F09EBA] border border-[#F09EBA]"
                              : "text-[#4A4A4A]/70 hover:text-[#4A4A4A]"
                          } focus-ring`}
                        >
                          {f}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </BlurFadeIn>

                {/* Amount Selection */}
                <BlurFadeIn delay={0.2}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {amounts.map((a, ai) => (
                      <motion.button
                        key={a}
                        onClick={() => setSelected(a)}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3 + ai * 0.06, duration: 0.4, ease: EASE }}
                        className={`rounded-[16px] py-5 text-center font-btn text-[22px] border-2 transition-all duration-150 focus-ring ${
                          selected === a
                            ? "bg-[#F02D8A]/10 border-[#F02D8A] text-[#F02D8A] shadow-[3px_3px_0_#F09EBA]"
                            : "bg-white border-[#F09EBA]/50 text-[#4A4A4A]/70 hover:border-[#F09EBA] hover:text-[#4A4A4A]"
                        }`}
                        whileHover={{ y: -4, scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        ${a}
                      </motion.button>
                    ))}
                  </div>
                </BlurFadeIn>

                {/* CTA */}
                <BlurFadeIn delay={0.35}>
                  <motion.button
                    className="w-full font-btn flex items-center justify-center gap-2 rounded-full bg-[#F02D8A] border-2 border-[#F09EBA] py-4.5 text-[16px] text-white shadow-[4px_4px_0_#F09EBA] btn-shimmer focus-ring"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={SPRING_BOUNCY}
                  >
                    <Heart className="h-4.5 w-4.5" fill="currentColor" />
                    Donate ${selected} {freq !== "One-Time" ? freq : ""}
                  </motion.button>
                  <p className="mt-4 text-center text-[11px] text-[#8B7E74]/60 font-medium">
                    Secure payment powered by Stripe. Tax-deductible donation.
                  </p>
                </BlurFadeIn>
              </div>
            </TiltCard>
          </ScrollScale>

          {/* Impact */}
          <BlurFadeIn className="mt-16" delay={0.1}>
            <div className="text-center mb-10">
              <h3 className="font-subheading text-[clamp(1.5rem,3vw,2.2rem)] leading-[0.95]">
                <span style={{ color: "#4A6FCC" }}>See</span> <span style={{ color: "#2DB84B" }}>the</span><br />
                <span className="relative inline-block" style={{ color: "#E8890C" }}>
                  difference
                  <WavyUnderline color="#E8890C" />
                </span>
              </h3>
            </div>
            <StaggerContainer className="grid sm:grid-cols-3 gap-5">
              {impacts.map((imp, ii) => (
                <StaggerItem key={imp.amount}>
                  <TiltCard intensity={7}>
                    <motion.div
                      className="group relative rounded-[20px] border-3 border-[#F09EBA] p-6 text-center shadow-[4px_4px_0_#F09EBA] cursor-default border-glow"
                      style={{ backgroundColor: imp.bg }}
                      whileHover={{ y: -8, rotate: 2 }}
                      transition={SPRING_BOUNCY}
                    >
                      <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(1deg)" }} />
                      <motion.span
                        className="text-2xl block mb-3"
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: ii * 0.6 }}
                      >
                        <imp.emoji className="h-5 w-5" />
                      </motion.span>
                      <div className="font-subheading text-[24px] mb-2" style={{ color: imp.color }}>{imp.amount}</div>
                      <p className="text-[14px] text-[#8B7E74] leading-[1.7] font-medium">{imp.desc}</p>
                    </motion.div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </BlurFadeIn>
        </div>
      </section>
    </>
  );
}
