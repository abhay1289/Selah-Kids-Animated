"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Shield, BookOpen, Star, Heart, Check, ChevronDown, Music, Clock, Users, Sparkles, ShieldCheck, Baby, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, HandwrittenNote, WavyUnderline, SectionGrain, StampBadge,
  BlurFadeIn, FloatingElement, TiltCard, ParallaxLayer, CharacterCameo,
  EASE, SPRING_BOUNCY, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const trustBadges = [
  { icon: Shield, label: "Ad-Free Content", color: "#F02D8A", emoji: ShieldCheck },
  { icon: BookOpen, label: "Scripture-Based", color: "#4A4A4A", emoji: BookOpen },
  { icon: Clock, label: "Ages 0-8", color: "#00B5B8", emoji: Baby },
  { icon: Heart, label: "Parent Approved", color: "#7B3FA0", emoji: Heart },
];

const sections = [
  {
    title: "What Your Kids Will Learn", icon: Star, color: "#F02D8A", bg: "#FFF0E8",
    items: ["Bible verses through memorable melodies", "The love of God and the Gospel message", "Worship and praise as a joyful practice", "Character traits like kindness, courage, and faith", "Spanish vocabulary through bilingual songs"],
  },
  {
    title: "Our Content Promise", icon: Shield, color: "#4A4A4A", bg: "#E8F5E9",
    items: ["Every lyric reviewed for biblical accuracy", "No ads, no commercials, no sponsored content", "Age-appropriate visuals and storytelling", "Positive, uplifting messages only", "Designed by parents, for parents"],
  },
  {
    title: "How to Use Selah Kids", icon: Music, color: "#7B3FA0", bg: "#FCEEF5",
    items: ["Morning worship routines to start the day with joy", "Car ride sing-alongs for family road trips", "Sunday School classes and children's ministry", "Calming bedtime worship to wind down", "Family worship nights for the whole household"],
  },
];

function AccordionSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `panel-${index}`;
  const headingId = `heading-${index}`;
  return (
    <BlurFadeIn delay={index * 0.1}>
      <TiltCard intensity={3}>
        <motion.div
          className="rounded-[20px] border-3 border-[#F09EBA] overflow-hidden shadow-[5px_5px_0_#F09EBA] transition-all duration-200 border-glow"
          style={{ backgroundColor: open ? section.bg : "#FFFDF5" }}
          whileHover={{ y: -3 }}
          transition={SPRING_BOUNCY}
        >
          <h3 id={headingId}>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={panelId}
              className="w-full flex items-center gap-4 p-6 sm:p-7 text-left focus-ring"
            >
              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-[#F09EBA]"
                style={{ backgroundColor: `${section.color}15` }}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={SPRING_BOUNCY}
              >
                <section.icon className="h-5 w-5" style={{ color: section.color }} />
              </motion.div>
              <span className="flex-1 text-[17px] font-subheading text-[#4A4A4A]">{section.title}</span>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}>
                <ChevronDown className="h-5 w-5 text-[#4A4A4A]/65" />
              </motion.div>
            </button>
          </h3>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="px-6 sm:px-7 pb-7"
            >
              <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                {section.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ii * 0.06, duration: 0.35, ease: EASE }}
                    whileHover={{ x: 4 }}
                  >
                    <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: section.color }} />
                    <span className="text-[14px] text-[#8B7E74] leading-[1.7] font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </TiltCard>
    </BlurFadeIn>
  );
}

export default function ParentsPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("parents.badge")}
        badgeIcon={Shield}
        title={t("parents.title")}
        highlight={t("parents.highlight")}
        description={t("parents.desc")}
        scene={SCENES.landscape}
      />

      {/* Trust Badges */}
      <section className="relative py-16 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustBadges.map((badge, bi) => (
              <StaggerItem key={badge.label}>
                <TiltCard intensity={8}>
                  <motion.div
                    className="flex flex-col items-center text-center gap-3 rounded-[16px] bg-white p-5 border-2 border-[#F09EBA]/50 hover:border-[#F09EBA] hover:shadow-[4px_4px_0_#F09EBA] transition-all duration-200 cursor-default border-glow"
                    whileHover={{ y: -6, rotate: 2 }}
                    transition={SPRING_BOUNCY}
                  >
                    <motion.div
                      className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[#F09EBA]/50"
                      style={{ backgroundColor: `${badge.color}12` }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={SPRING_BOUNCY}
                    >
                      <badge.icon className="h-5 w-5" style={{ color: badge.color }} />
                    </motion.div>
                    <span className="text-[12px] font-bold text-[#4A4A4A]/80">{badge.label}</span>
                    <motion.span
                      className="text-lg"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: bi * 0.5 }}
                    >
                      <badge.emoji className="h-5 w-5" />
                    </motion.span>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none striped-bg" />
        <SectionGrain />
        <CharacterCameo character="libni" side="left" className="bottom-32" />
        <FloatingElement className="absolute top-16 right-[6%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={14} duration={7}><Star className="h-8 w-8" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10">
          <BlurFadeIn className="text-center mb-10">
            <h2 className="font-hero-section text-[clamp(2rem,5vw,3.5rem)]">
              <span style={{ color: "#E8890C" }}>A</span> <span style={{ color: "#4A6FCC" }}>parent&apos;s</span><br />
              <span className="relative inline-block" style={{ color: "#F02D8A" }}>
                guide
                <WavyUnderline color="#F02D8A" />
              </span>
            </h2>
            <HandwrittenNote className="text-[18px] mt-3 block text-[#8B7E74]/70" rotate={-2}>
              ( we&apos;re parents too! <Heart className="h-3 w-3 inline" /> )
            </HandwrittenNote>
          </BlurFadeIn>
          <div className="space-y-4">
            {sections.map((s, i) => (
              <AccordionSection key={s.title} section={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
