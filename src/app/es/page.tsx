"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Globe, Play, ArrowRight, Youtube, Music, Heart, Star, Users, Sparkles, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, MagneticWrap, PlayfulButton, CinematicReveal, HandwrittenNote, WavyUnderline, SectionGrain,
  BlurFadeIn, FloatingElement, TiltCard, SlideIn, ScrollScale, ClipReveal, CharacterCameo,
  ScrollProgress, RotateOnScroll, ParallaxLayer,
  SPRING_BOUNCY, EASE, SCENES,
} from "@/components/storybook-primitives";
import { WaveDivider } from "@/components/storybook-effects";
import { useLanguage } from "@/context/language";

const features = [
  { icon: Music, title: "Canciones Originales", desc: "Letras originales basadas en la Biblia que los ninos pueden cantar y recordar.", color: "#F02D8A", bg: "#FFF0E8", emoji: Music, rotate: "-1.5deg" },
  { icon: Star, title: "Animacion de Calidad", desc: "Animacion 3D de nivel cinematografico que cautiva a los mas pequenos.", color: "#7B3FA0", bg: "#FCEEF5", emoji: Sparkles, rotate: "1deg" },
  { icon: Users, title: "Para Toda la Familia", desc: "Musica de adoracion que reune a toda la familia en alabanza gozosa.", color: "#4A4A4A", bg: "#E8F5E9", emoji: Users, rotate: "-0.5deg" },
];

export default function EspanolPage() {
  const { t } = useLanguage();
  return (
    <>
      <ScrollProgress />
      <PageHero
        badge={t("es.badge")}
        badgeIcon={Globe}
        title={t("es.title")}
        highlight={t("es.highlight")}
        description={t("es.desc")}
        scene={SCENES.vibrant}
      />

      {/* Featured Video */}
      <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <RotateOnScroll degrees={6}><FloatingElement className="absolute top-20 right-[6%] text-[#00B5B8]/8 pointer-events-none z-[2]" amplitude={14} duration={7}><Music className="h-8 w-8" /></FloatingElement></RotateOnScroll>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10">
          <ScrollScale>
            <CinematicReveal>
            <TiltCard intensity={3}>
              <div className="group relative rounded-[20px] bg-white p-6 sm:p-8 border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA] border-glow">
                <motion.div className="absolute -top-2 left-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(-2deg)" }} />
                <motion.div className="absolute -top-2 right-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(3deg)" }} />

                <ClipReveal direction="center">
                  <div className="relative overflow-hidden rounded-[16px] mb-6 border-2 border-[#F09EBA]/40 img-hover-zoom">
                    <Image
                      src="/TGN_SingleFrames+(3).png"
                      alt="Jesus Me Ama" width={1200} height={675} className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MagneticWrap strength={0.2}>
                        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }} transition={SPRING_BOUNCY}>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20 pulse-ring">
                            <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                          </div>
                        </motion.div>
                      </MagneticWrap>
                    </div>
                    <motion.span
                      className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#00B5B8] px-4 py-2 text-[11px] font-badge text-white border border-white/20"
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={SPRING_BOUNCY}
                    >
                      <Globe className="h-3 w-3" /> Espanol
                    </motion.span>
                  </div>
                </ClipReveal>

                <BlurFadeIn delay={0.1}>
                  <h3 className="font-subheading text-[clamp(1.5rem,3vw,2rem)] leading-[0.95] mb-3">
                    <span style={{ color: "#E8890C" }}>Jesus</span> <span style={{ color: "#F02D8A" }}>Me</span> <span style={{ color: "#4A6FCC" }}>Ama</span>{" "}
                    <span className="relative inline-block" style={{ color: "#00B5B8" }}>
                      (Good News Espanol)
                      <WavyUnderline color="#00B5B8" opacity={0.3} />
                    </span>
                  </h3>
                </BlurFadeIn>
                <BlurFadeIn delay={0.2}>
                  <p className="text-[15px] text-[#8B7E74] leading-[1.8] font-medium mb-4">
                    Una cancion hermosa que comparte el amor de Dios con los mas pequenos. Disponible ahora en nuestro canal de YouTube.
                  </p>
                  <HandwrittenNote className="text-[16px] text-[#00B5B8]/40 block mb-6" rotate={-2}>
                    — una cancion que toca el corazon <Heart className="h-3 w-3 inline" />
                  </HandwrittenNote>
                </BlurFadeIn>
                <BlurFadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <PlayfulButton
                      href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol"
                      external
                      variant="primary"
                      icon={<Youtube className="h-4 w-4" />}
                      className="btn-shimmer"
                    >
                      Ver en YouTube
                    </PlayfulButton>
                    <PlayfulButton href="/watch" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
                      Ver Todos los Videos
                    </PlayfulButton>
                  </div>
                </BlurFadeIn>
              </div>
            </TiltCard>
            </CinematicReveal>
          </ScrollScale>
        </div>
      </section>

      <div className="relative">
        <WaveDivider from="#FFFDF5" to="#FFF5F0" position="bottom" />
      </div>

      {/* Features */}
      <section className="relative py-16 sm:py-20 bg-[#FFF5F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none striped-bg" />
        <SectionGrain />
        <ParallaxLayer speed={0.04} className="absolute top-10 right-[5%] w-[200px] h-[200px] rounded-full bg-[#F09EBA]/5 blur-3xl pointer-events-none"><span /></ParallaxLayer>
        <CharacterCameo character="shiloh" side="right" className="top-20" />
        <FloatingElement className="absolute bottom-20 left-[5%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={10} duration={6} delay={1}><Star className="h-7 w-7" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <TiltCard intensity={6}>
                  <motion.div
                    className="group relative rounded-[20px] border-3 border-[#F09EBA] p-7 text-center shadow-[5px_5px_0_#F09EBA] cursor-default border-glow"
                    style={{ backgroundColor: f.bg, transform: `rotate(${f.rotate})` }}
                    whileHover={{ y: -10, rotate: 0, scale: 1.02, transition: SPRING_BOUNCY }}
                  >
                    <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />
                    <motion.span className="absolute top-4 right-4 text-2xl z-10 icon-hover-bounce" whileHover={{ scale: 1.3, rotate: 15 }} transition={SPRING_BOUNCY}><f.emoji className="h-5 w-5" /></motion.span>
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#F09EBA] mx-auto mb-4"
                      style={{ backgroundColor: `${f.color}15` }}
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={SPRING_BOUNCY}
                    >
                      <f.icon className="h-5 w-5" style={{ color: f.color }} />
                    </motion.div>
                    <h3 className="text-[16px] font-subheading text-[#4A4A4A] mb-2">{f.title}</h3>
                    <p className="text-[14px] text-[#8B7E74] leading-[1.75] font-medium">{f.desc}</p>
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
