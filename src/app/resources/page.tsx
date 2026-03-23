"use client";

import { motion } from "motion/react";
import { Download, FileText, Palette, BookOpen, Music, Sparkles, ArrowRight, Globe, Pencil, Heart, Building, Home, Music2, Star, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, PlayfulButton, HandwrittenNote, WavyUnderline, SectionGrain,
  BlurFadeIn, FloatingElement, TiltCard, ScrollScale, ParallaxLayer, CharacterCameo,
  SPRING_BOUNCY, EASE, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const resources = [
  { title: "The Good News — Lyrics (EN)", desc: "Complete English lyrics for The Good News", icon: Music, color: "#F02D8A", bg: "#FFF0E8", emoji: Music, rotate: "-1deg", type: "PDF" },
  { title: "Jesus Me Ama — Lyrics (ES)", desc: "Letras completas en espanol", icon: Music, color: "#00B5B8", bg: "#E8F5F8", emoji: Globe, rotate: "1.5deg", type: "PDF" },
  { title: "Andy Coloring Page", desc: "Printable coloring sheet featuring Andy", icon: Palette, color: "#4A4A4A", bg: "#E8F5E9", emoji: Pencil, rotate: "-0.5deg", type: "PDF" },
  { title: "Libni Coloring Page", desc: "Printable coloring sheet featuring Libni", icon: Palette, color: "#7B3FA0", bg: "#FCEEF5", emoji: Palette, rotate: "1deg", type: "PDF" },
  { title: "Shiloh Coloring Page", desc: "Printable coloring sheet featuring Shiloh", icon: Palette, color: "#FFD700", bg: "#FEF9E7", emoji: Heart, rotate: "-1.5deg", type: "PDF" },
  { title: "Bible Verse Memory Cards", desc: "Printable cards with key verses from our songs", icon: BookOpen, color: "#4A4A4A", bg: "#E8F5E9", emoji: BookOpen, rotate: "0.5deg", type: "PDF" },
  { title: "Sunday School Guide", desc: "Complete guide for using Selah Kids in ministry", icon: FileText, color: "#F02D8A", bg: "#FFF0E8", emoji: Building, rotate: "-1deg", type: "PDF" },
  { title: "Family Worship Guide", desc: "Tips for family worship nights at home", icon: FileText, color: "#7B3FA0", bg: "#FCEEF5", emoji: Home, rotate: "1deg", type: "PDF" },
  { title: "Worship Together — Lyrics", desc: "Full lyrics for Worship Together", icon: Music, color: "#00B5B8", bg: "#E8F5F8", emoji: Music2, rotate: "-0.5deg", type: "PDF" },
];

export default function ResourcesPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("resources.badge")}
        badgeIcon={Download}
        title={t("resources.title")}
        highlight={t("resources.highlight")}
        description={t("resources.desc")}
        scene={SCENES.group}
      />

      <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none striped-bg" />
        <SectionGrain />
        <CharacterCameo character="shiloh" side="right" className="top-40" />
        <FloatingElement className="absolute top-16 right-[5%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={14} duration={7}><Star className="h-8 w-8" /></FloatingElement>
        <FloatingElement className="absolute bottom-24 left-[4%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={10} duration={6} delay={2}><Music className="h-7 w-7" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <StaggerItem key={r.title}>
                <TiltCard intensity={5}>
                  <motion.div
                    className="group cursor-pointer relative rounded-[20px] border-3 border-[#F09EBA] p-7 shadow-[5px_5px_0_#F09EBA] border-glow"
                    style={{ backgroundColor: r.bg, transform: `rotate(${r.rotate})` }}
                    whileHover={{ y: -10, rotate: 0, scale: 1.02, transition: SPRING_BOUNCY }}
                  >
                    <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />
                    <motion.span className="absolute top-4 right-4 text-2xl z-10 icon-hover-bounce" whileHover={{ scale: 1.3, rotate: 15 }} transition={SPRING_BOUNCY}><r.emoji className="h-5 w-5" /></motion.span>

                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#F09EBA]"
                        style={{ backgroundColor: `${r.color}15` }}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={SPRING_BOUNCY}
                      >
                        <r.icon className="h-5 w-5" style={{ color: r.color }} />
                      </motion.div>
                      <span className="rounded-full bg-[#F09EBA]/10 border border-[#F09EBA]/30 px-3 py-1 text-[10px] font-badge text-[#4A4A4A]/70">{r.type}</span>
                    </div>
                    <h3 className="text-[16px] font-subheading text-[#4A4A4A] mb-1.5">{r.title}</h3>
                    <p className="text-[14px] text-[#8B7E74] leading-[1.75] font-medium mb-5">{r.desc}</p>
                    <motion.button
                      className="font-btn flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-[13px] transition-all duration-150 group-hover:shadow-[3px_3px_0_#F09EBA] focus-ring"
                      style={{ borderColor: `${r.color}40`, color: r.color }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={SPRING_BOUNCY}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Free
                    </motion.button>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollScale className="mt-16">
            <ParallaxLayer speed={0.05}>
              <div className="group relative rounded-[20px] border-3 border-[#F09EBA] p-7 text-center bg-[#FCEEF5] shadow-[5px_5px_0_#F09EBA] border-glow" style={{ transform: "rotate(-0.5deg)" }}>
                <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(1deg)" }} />
                <motion.span
                  className="text-3xl block mb-3"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="h-7 w-7" />
                </motion.span>
                <h3 className="text-[17px] font-subheading mb-2"><span style={{ color: "#E8890C" }}>More</span> <span style={{ color: "#4A6FCC" }}>Resources</span> <span style={{ color: "#F02D8A" }}>Coming</span> <span style={{ color: "#2DB84B" }}>Soon</span></h3>
                <p className="text-[14px] text-[#8B7E74] font-medium">We are working on new coloring pages, activity sheets, and devotional guides. Stay tuned.</p>
                <HandwrittenNote className="text-[16px] mt-3 block text-[#7B3FA0]/40" rotate={-2}>
                  — so many fun things ahead! <Music className="h-3 w-3 inline" />
                </HandwrittenNote>
              </div>
            </ParallaxLayer>
          </ScrollScale>
        </div>
      </section>
    </>
  );
}
