"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Newspaper, Download, Users, Palette, Image as ImageIcon, FileText, Sparkles, Moon, User, Star, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, PlayfulButton, HandwrittenNote, WavyUnderline, SectionGrain, StampBadge,
  BlurFadeIn, FloatingElement, TiltCard, SlideIn, ScrollScale, ParallaxLayer, CharacterCameo,
  SPRING_BOUNCY, EASE, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const quickFacts = [
  { label: "Founded", value: "2024" },
  { label: "Content", value: "Original Bible songs + 3D animation" },
  { label: "Target Audience", value: "Children ages 0-8 and their families" },
  { label: "Languages", value: "English & Spanish" },
  { label: "Characters", value: "Andy, Libni & Shiloh" },
  { label: "Contact", value: "info.selahkids@gmail.com" },
];

const brandAssets = [
  { title: "Primary Logo", icon: ImageIcon, color: "#F02D8A", bg: "#FFF0E8", emoji: Palette },
  { title: "Logo on Dark", icon: ImageIcon, color: "#4A4A4A", bg: "#E8F5E9", emoji: Moon },
  { title: "Character Pack", icon: Users, color: "#7B3FA0", bg: "#FCEEF5", emoji: User },
  { title: "Color Palette", icon: Palette, color: "#FFD700", bg: "#FEF9E7", emoji: Palette },
];

export default function PressPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("press.badge")}
        badgeIcon={Newspaper}
        title={t("press.title")}
        highlight={t("press.highlight")}
        description={t("press.desc")}
        scene={SCENES.cinematic}
      />

      <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <CharacterCameo character="andy" side="left" className="top-32" />
        <FloatingElement className="absolute top-20 left-[6%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={12} duration={7}><Star className="h-8 w-8" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
          {/* Press Kit + Partnership */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <SlideIn from="left">
              <TiltCard intensity={5}>
                <motion.div
                  className="relative rounded-[20px] border-3 border-[#F09EBA] p-8 shadow-[5px_5px_0_#F09EBA] h-full flex flex-col bg-[#FFF0E8]"
                  style={{ transform: "rotate(-1deg)" }}
                  whileHover={{ y: -8, rotate: 0, transition: SPRING_BOUNCY }}
                >
                  <motion.div className="absolute -top-2 left-6 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10" style={{ transform: "rotate(-2deg)" }} />
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#F09EBA] mb-5"
                    style={{ backgroundColor: "#F02D8A15" }}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={SPRING_BOUNCY}
                  >
                    <FileText className="h-5 w-5 text-[#F02D8A]" />
                  </motion.div>
                  <h3 className="text-[18px] font-subheading mb-2"><span style={{ color: "#F02D8A" }}>Press</span> <span style={{ color: "#4A6FCC" }}>Kit</span></h3>
                  <p className="text-[14px] text-[#8B7E74] leading-[1.75] font-medium mb-6 flex-1">
                    Download our complete press kit including brand overview, founder bios, high-resolution imagery, and key talking points.
                  </p>
                  <PlayfulButton href="#" variant="primary" icon={<Download className="h-3.5 w-3.5" />} className="text-[13px] px-5 py-2.5 self-start">
                    Download Press Kit
                  </PlayfulButton>
                </motion.div>
              </TiltCard>
            </SlideIn>
            <SlideIn from="right" delay={0.1}>
              <TiltCard intensity={5}>
                <motion.div
                  className="relative rounded-[20px] border-3 border-[#F09EBA] p-8 shadow-[5px_5px_0_#F09EBA] h-full flex flex-col bg-[#FCEEF5]"
                  style={{ transform: "rotate(1deg)" }}
                  whileHover={{ y: -8, rotate: 0, transition: SPRING_BOUNCY }}
                >
                  <motion.div className="absolute -top-2 right-6 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10" style={{ transform: "rotate(3deg)" }} />
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#F09EBA] mb-5"
                    style={{ backgroundColor: "#7B3FA015" }}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={SPRING_BOUNCY}
                  >
                    <Users className="h-5 w-5 text-[#7B3FA0]" />
                  </motion.div>
                  <h3 className="text-[18px] font-subheading mb-2"><span style={{ color: "#E8890C" }}>Partner</span><span style={{ color: "#2DB84B" }}>ships</span></h3>
                  <p className="text-[14px] text-[#8B7E74] leading-[1.75] font-medium mb-6 flex-1">
                    Interested in using Selah Kids in your church, school, or ministry? We would love to work with you to bring faith-filled music to more families.
                  </p>
                  <PlayfulButton href="mailto:info.selahkids@gmail.com" variant="secondary" icon={<Sparkles className="h-3.5 w-3.5" />} className="text-[13px] px-5 py-2.5 self-start">
                    Partner With Us
                  </PlayfulButton>
                </motion.div>
              </TiltCard>
            </SlideIn>
          </div>

          {/* Brand Assets */}
          <BlurFadeIn className="text-center mb-10">
            <h3 className="font-subheading text-[clamp(1.5rem,3vw,2.2rem)] leading-[0.95]">
              <span style={{ color: "#4A6FCC" }}>Our</span><br />
              <span className="relative inline-block" style={{ color: "#E8890C" }}>
                Brand
                <WavyUnderline color="#E8890C" />
              </span>
            </h3>
          </BlurFadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {brandAssets.map((a) => (
              <StaggerItem key={a.title}>
                <TiltCard intensity={8}>
                  <motion.div
                    className="rounded-[16px] border-2 border-[#F09EBA]/50 p-5 text-center cursor-pointer hover:border-[#F09EBA] hover:shadow-[4px_4px_0_#F09EBA] transition-all duration-200"
                    style={{ backgroundColor: a.bg }}
                    whileHover={{ y: -6, rotate: 2 }}
                    transition={SPRING_BOUNCY}
                  >
                    <motion.span className="text-2xl block mb-3" whileHover={{ scale: 1.3 }} transition={SPRING_BOUNCY}><a.emoji className="h-5 w-5" /></motion.span>
                    <div className="h-14 rounded-lg mb-3 flex items-center justify-center border border-[#F09EBA]/30" style={{ backgroundColor: `${a.color}08` }}>
                      <a.icon className="h-6 w-6" style={{ color: `${a.color}50` }} />
                    </div>
                    <span className="text-[13px] font-bold text-[#4A4A4A]/80">{a.title}</span>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Quick Facts */}
          <ScrollScale>
            <ParallaxLayer speed={0.05}>
              <div className="relative rounded-[20px] border-3 border-[#F09EBA] p-8 bg-[#FEF9E7] shadow-[5px_5px_0_#F09EBA]" style={{ transform: "rotate(-0.5deg)" }}>
                <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#FFD700]/35 rounded-sm z-10" style={{ transform: "rotate(1deg)" }} />
                <h3 className="text-[16px] font-subheading mb-5 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#E8890C]" /> <span style={{ color: "#E8890C" }}>Quick</span> <span style={{ color: "#F02D8A" }}>Facts</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {quickFacts.map((f, fi) => (
                    <motion.div
                      key={f.label}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: fi * 0.06, duration: 0.4 }}
                    >
                      <span className="text-[13px] font-extrabold text-[#F02D8A] whitespace-nowrap">{f.label}:</span>
                      <span className="text-[13px] text-[#8B7E74] font-medium">{f.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ParallaxLayer>
          </ScrollScale>
        </div>
      </section>
    </>
  );
}
