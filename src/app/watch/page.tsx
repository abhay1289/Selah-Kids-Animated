"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Play, ArrowRight, Youtube, Tv, Music, Sparkles, Star, Globe, Flame, Film } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, MagneticWrap, PlayfulButton, HandwrittenNote, WavyUnderline,
  CinematicReveal, ScrapbookCard, SectionGrain, ParallaxLayer, BlurFadeIn, FloatingElement, SlideIn,
  ClipReveal, TiltCard, ScrollScale, CharacterCameo,
  EASE, SPRING_BOUNCY, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const categories = [
  { id: "all", label: "All Videos", icon: Sparkles },
  { id: "music", label: "Music Videos", icon: Music },
  { id: "singalong", label: "Sing-Alongs", icon: Tv },
  { id: "sensory", label: "Sensory Videos", icon: Star },
];

const videos = [
  {
    id: "the-good-news", title: "The Good News", desc: "Sharing God's love with the world",
    thumbnail: "/TGN_SingleFrames+28229.png",
    date: "Jun 26, 2025", category: "music", lang: "EN", tag: "Newest", tagIcon: Flame, tagColor: "#F02D8A",
  },
  {
    id: "jesus-me-ama", title: "Jesus Me Ama", desc: "A beautiful Spanish worship song",
    thumbnail: "/TGN_SingleFrames+(3).png",
    date: "Jun 27, 2025", category: "music", lang: "ES", tag: "Espanol", tagIcon: Globe, tagColor: "#00B5B8",
  },
  {
    id: "worship-together", title: "Worship Together", desc: "Joyful family praise & worship",
    thumbnail: "/TGN_SingleFrames+(7).png",
    date: "Jun 27, 2025", category: "singalong", lang: "EN", tag: "Popular", tagIcon: Star, tagColor: "#00B5B8",
  },
  {
    id: "gods-love", title: "God's Love", desc: "Learning about God's endless love",
    thumbnail: "/TGN_SingleFrames+28329.png",
    date: "Jun 26, 2025", category: "music", lang: "EN", tag: "Featured", tagIcon: Sparkles, tagColor: "#FFD700",
  },
  {
    id: "andys-adventure", title: "Andy & Shiloh's Adventure", desc: "A faith-filled journey through the garden",
    thumbnail: "/SK_Andy_Intro_Pose-removebg-preview.png",
    date: "Jun 25, 2025", category: "sensory", lang: "EN", tag: "Fan Favorite", tagIcon: Star, tagColor: "#F02D8A",
  },
  {
    id: "libnis-song", title: "Libni's Worship Song", desc: "A joyful melody straight from the heart",
    thumbnail: "/SK_Libni_Intro_Pose-removebg-preview.png",
    date: "Jun 25, 2025", category: "music", lang: "EN", tag: "New", tagIcon: Sparkles, tagColor: "#7B3FA0",
  },
];

export default function WatchPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? videos : videos.filter((v) => v.category === filter);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const stripeBgY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  return (
    <>
      <PageHero
        badge={t("watch.badge")}
        badgeIcon={Tv}
        title={t("watch.title")}
        highlight={t("watch.highlight")}
        description={t("watch.desc")}
        scene={SCENES.worship}
      />

      {/* Filter + Grid */}
      <section ref={sectionRef} className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
        <motion.div className="absolute inset-0 pointer-events-none striped-bg" style={{ y: stripeBgY }} />
        <SectionGrain />

        {/* Floating decorative elements */}
        <FloatingElement className="absolute top-20 left-[8%] text-[#FFD700]/10 pointer-events-none z-[2]" amplitude={15} duration={7}><Music className="h-8 w-8" /></FloatingElement>
        <FloatingElement className="absolute bottom-32 right-[6%] text-[#F02D8A]/10 pointer-events-none z-[2]" amplitude={10} duration={6} delay={2}><Star className="h-7 w-7" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          {/* Filter bar */}
          <BlurFadeIn className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`font-btn flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] border-2 transition-all duration-150 ${
                  filter === cat.id
                    ? "bg-[#F02D8A] text-white border-[#F09EBA] shadow-[3px_3px_0_#F09EBA]"
                    : "bg-[#FFFDF5] text-[#4A4A4A]/70 border-[#F09EBA]/50 hover:border-[#F09EBA] hover:text-[#4A4A4A]"
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </motion.button>
            ))}
          </BlurFadeIn>

          {/* Video Grid */}
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <StaggerItem key={v.id}>
                <TiltCard intensity={5}>
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ y: -8, rotate: 0.5 }}
                    transition={SPRING_BOUNCY}
                  >
                    <div className="relative overflow-hidden rounded-[20px] bg-[#FFFDF5] border-3 border-[#F09EBA] shadow-[5px_5px_0_#F09EBA] transition-all duration-200 group-hover:shadow-[7px_7px_0_#F09EBA]">
                      {/* Tape mark */}
                      <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-20" style={{ transform: "rotate(1deg)" }} />
                      <ClipReveal direction="bottom">
                        <div className="relative overflow-hidden">
                          <Image src={v.thumbnail} alt={v.title} width={800} height={600} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.08]" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.2)" }} />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <MagneticWrap strength={0.2}>
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }} transition={SPRING_BOUNCY}>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                                  <Play className="h-7 w-7 text-white ml-0.5" fill="currentColor" />
                                </div>
                              </motion.div>
                            </MagneticWrap>
                          </div>
                          <div className="absolute top-3 left-3">
                            <motion.span
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-badge text-[#4A4A4A] border border-[#F09EBA]/40"
                              style={{ backgroundColor: v.tagColor + "cc" }}
                              whileHover={{ scale: 1.1, rotate: 3 }}
                              transition={SPRING_BOUNCY}
                            >
                              <v.tagIcon className="h-3 w-3" fill="currentColor" /> {v.tag}
                            </motion.span>
                          </div>
                          <div className="absolute top-3 right-3 bg-[#FFFDF5] rounded-full px-2.5 py-1 text-[10px] font-bold text-[#4A4A4A]/60 uppercase border border-[#F09EBA]/30">
                            {v.lang}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-white/70 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-[#4A4A4A]/60 font-mono">
                            3:24
                          </div>
                        </div>
                      </ClipReveal>
                      <div className="p-5">
                        <h3 className="text-[16px] font-subheading text-[#4A4A4A] group-hover:text-[#F02D8A] transition-colors duration-150">{v.title}</h3>
                        <p className="mt-1 text-[13px] text-[#8B7E74]/60 font-medium">{v.desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[11px] text-[#8B7E74]/60 font-medium">{v.date}</span>
                          <motion.span
                            className="flex items-center gap-1 text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-150 text-[#F02D8A]"
                            initial={{ x: -5 }}
                            whileHover={{ x: 3 }}
                          >
                            Watch <ArrowRight className="h-3 w-3" />
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* YouTube CTA */}
          <ScrollScale className="mt-20">
            <div className="relative rounded-[20px] overflow-hidden border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA]">
              <div className="absolute inset-0 z-0">
                <ParallaxLayer speed={0.1} className="absolute inset-0">
                  <Image src={SCENES.cinematic} alt="" fill className="object-cover" sizes="100vw" />
                </ParallaxLayer>
                <div className="absolute inset-0 bg-[#F09EBA]/105" />
              </div>
              <div className="absolute inset-0 z-[1] pointer-events-none film-grain opacity-[0.03]" />
              <div className="relative z-10 p-8 sm:p-12 text-center">
                <BlurFadeIn>
                  <HandwrittenNote className="text-[20px] text-[#FFD700]/40 mb-3 block" rotate={-2}>
                    don&apos;t miss a single episode! <Music className="h-3 w-3 inline" />
                  </HandwrittenNote>
                </BlurFadeIn>
                <BlurFadeIn delay={0.15}>
                  <h3 className="font-subheading text-[clamp(1.5rem,3vw,2.2rem)] leading-[0.95] mb-4">
                    <span style={{ color: "#E8890C" }}>Subscribe</span> <span style={{ color: "#4A6FCC" }}>on</span>{" "}
                    <span className="relative inline-block" style={{ color: "#F02D8A" }}>
                      YouTube
                      <WavyUnderline color="#F02D8A" opacity={0.4} />
                    </span>
                  </h3>
                </BlurFadeIn>
                <BlurFadeIn delay={0.25}>
                  <p className="text-[15px] text-[#4A4A4A]/80 max-w-md mx-auto mb-8 font-medium">
                    Be the first to see new songs, characters, and worship videos.
                  </p>
                </BlurFadeIn>
                <BlurFadeIn delay={0.35}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <PlayfulButton
                      href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                      external
                      variant="primary"
                      icon={<Youtube className="h-4 w-4" />}
                    >
                      English Channel
                    </PlayfulButton>
                    <PlayfulButton
                      href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol?sub_confirmation=1"
                      external
                      variant="ghost"
                      icon={<Globe className="h-4 w-4" />}
                      className="text-[#4A4A4A]/80 border-[#F09EBA]/30 hover:text-[#4A4A4A]/700 hover:border-[#F09EBA]/60"
                    >
                      Canal en Espanol
                    </PlayfulButton>
                  </div>
                </BlurFadeIn>
              </div>
            </div>
          </ScrollScale>
        </div>
      </section>
    </>
  );
}
