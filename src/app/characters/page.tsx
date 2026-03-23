"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Heart, Star, Music, Leaf, BookOpen, Sparkles, Crown, Mic, Compass, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, ScrapbookCard, HandwrittenNote, WavyUnderline, StaggerContainer, StaggerItem, SectionGrain,
  ParallaxLayer, BlurFadeIn, FloatingElement, SlideIn, ClipReveal, TiltCard,
  CinematicReveal, ScrollProgress, RotateOnScroll, ScrollScale,
  EASE, SPRING_BOUNCY, CHARACTERS, SCENES,
} from "@/components/storybook-primitives";
import { WaveDivider } from "@/components/storybook-effects";
import { useLanguage } from "@/context/language";

const characters = [
  {
    name: "Andy", role: "The Brave Leader",
    desc: "A natural-born leader, Andy is a sharp and friendly little boy. Always ready for an adventure, Andy leads the crew through every story with courage, faith, and an unstoppable spirit. He enjoys playtime outside in the garden with his best friend Shiloh.",
    image: CHARACTERS.andy, color: "#F02D8A", bg: "#FFF0E8", rotate: "-2deg", emoji: Crown,
    traits: ["Brave", "Kind", "Leader", "Adventurous"],
    verse: { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    facts: ["Loves exploring the garden with Shiloh", "Always protects his friends", "Dreams of being a shepherd like David"],
    roleIcon: Star, scene: SCENES.adventure,
  },
  {
    name: "Libni", role: "The Joyful Singer",
    desc: "Libni is Andy's imaginative, musical, and giggly next-door neighbor. Her voice lights up every song. She finds the bright side of everything and reminds everyone that God's love is everywhere. She spends her days picking flowers, singing, and creating dances.",
    image: CHARACTERS.libni, color: "#7B3FA0", bg: "#FCEEF5", rotate: "1.5deg", emoji: Mic,
    traits: ["Creative", "Musical", "Joyful", "Imaginative"],
    verse: { text: "Sing to the Lord a new song; sing to the Lord, all the earth.", ref: "Psalm 96:1" },
    facts: ["Makes up songs about everything", "Collects wildflowers from the garden", "Her dances make everyone smile"],
    roleIcon: Music, scene: SCENES.vibrant,
  },
  {
    name: "Shiloh", role: "The Curious Explorer",
    desc: "Curious, helpful and funny, Shiloh is Andy's pet sheep and best friend. He loves discovering new things and sharing Bible stories. His curiosity turns every day into an adventure of faith. He enjoys basking in sunlight and taking long naps.",
    image: CHARACTERS.shiloh, color: "#4A4A4A", bg: "#E8F5E9", rotate: "-1deg", emoji: Compass,
    traits: ["Curious", "Helpful", "Funny", "Loyal"],
    verse: { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    facts: ["Professional nap-taker extraordinaire", "Will do anything for a tasty snack", "Has the softest wool in the garden"],
    roleIcon: Leaf, scene: SCENES.group,
  },
];

export default function CharactersPage() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  return (
    <>
      <ScrollProgress />
      <PageHero
        badge={t("chars.badge")}
        badgeIcon={Heart}
        title={t("chars.title")}
        highlight={t("chars.highlight")}
        description={t("chars.desc")}
        scene={SCENES.group}
      />

      <section className="relative bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <ParallaxLayer speed={0.04} className="absolute top-20 left-[5%] w-[200px] h-[200px] rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none"><span /></ParallaxLayer>
        <RotateOnScroll degrees={6}><FloatingElement className="absolute top-32 right-[5%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={18} duration={8}><Star className="h-10 w-10" /></FloatingElement></RotateOnScroll>
        <FloatingElement className="absolute bottom-40 left-[4%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={12} duration={6} delay={3}><Music className="h-8 w-8" /></FloatingElement>

        {characters.map((c, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={c.name} className="relative py-14 sm:py-20">
              {i > 0 && (
                <motion.div
                  className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#FFD700]/25 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE }}
                />
              )}
              <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
                <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}>
                  {/* Character card */}
                  <SlideIn from={reversed ? "right" : "left"} className="flex-1 w-full">
                    <TiltCard intensity={6}>
                      <ScrapbookCard rotate={c.rotate} bg={c.bg}>
                        <div className="p-8 sm:p-10 pt-10">
                          <motion.span
                            className="absolute top-4 right-4 text-3xl z-20"
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            transition={SPRING_BOUNCY}
                          >
                            <c.emoji className="h-5 w-5" />
                          </motion.span>

                          <ClipReveal direction="center">
                            <CinematicReveal>
                            <div className="relative rounded-[16px] overflow-hidden border-2 border-[#F09EBA]/40 mb-6 aspect-[4/3] img-hover-zoom">
                              <Image src={c.scene} alt={`${c.name}'s world`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                              <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.15)" }} />
                              <FloatingElement className="absolute bottom-0 right-[10%] w-[45%] z-10" amplitude={8} duration={4.5} delay={i * 0.4}>
                                <Image src={c.image} alt={c.name} width={400} height={400} className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.3)]" />
                              </FloatingElement>
                            </div>
                            </CinematicReveal>
                          </ClipReveal>

                          <div className="flex items-center gap-3 mb-2">
                            <motion.span
                              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-badge text-white border border-white/20"
                              style={{ backgroundColor: c.color }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                            >
                              <c.roleIcon className="h-3.5 w-3.5" /> {c.role}
                            </motion.span>
                          </div>
                          <h2 className="font-hero-section text-[clamp(2rem,4vw,3rem)]" style={{ color: c.color }}>{c.name}</h2>
                        </div>
                      </ScrapbookCard>
                    </TiltCard>

                    <HandwrittenNote className={`text-[16px] mt-3 block ${reversed ? "text-right" : "text-left"}`} rotate={reversed ? 3 : -3}>
                      {c.name === "Andy" && <>the bravest kid! <Heart className="h-3 w-3 inline" /></>}
                      {c.name === "Libni" && <>she sings so beautifully! <Music className="h-3 w-3 inline" /></>}
                      {c.name === "Shiloh" && <>the cutest sheep ever! <Heart className="h-3 w-3 inline" /></>}
                    </HandwrittenNote>
                  </SlideIn>

                  {/* Text content */}
                  <SlideIn from={reversed ? "left" : "right"} delay={0.15} className="flex-1">
                    <BlurFadeIn delay={0.1}>
                      <p className="text-[17px] text-[#8B7E74] leading-[1.85] font-medium mb-6">{c.desc}</p>
                    </BlurFadeIn>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.traits.map((trait, ti) => (
                        <motion.span
                          key={trait}
                          className="font-btn rounded-full px-4 py-1.5 text-[12px] border-2"
                          style={{ backgroundColor: `${c.color}12`, color: c.color, borderColor: `${c.color}25` }}
                          initial={{ opacity: 0, scale: 0.7, y: 10 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + ti * 0.08, duration: 0.4, ease: EASE }}
                          whileHover={{ scale: 1.08, y: -2, rotate: 2 }}
                        >
                          {trait}
                        </motion.span>
                      ))}
                    </div>

                    {/* Verse */}
                    <BlurFadeIn delay={0.3}>
                      <ParallaxLayer speed={0.05}>
                        <div className="group rounded-[16px] p-5 mb-6 border-2 border-[#F09EBA]/30 bg-[#FEF9E7] border-glow" style={{ transform: "rotate(-0.5deg)" }}>
                          <motion.div className="absolute -top-2 right-6 w-10 h-5 bg-[#FFD700]/35 rounded-sm tape-wiggle" style={{ transform: "rotate(3deg)" }} />
                          <p className="font-serif text-[15px] text-[#4A4A4A]/60 leading-[1.7] italic mb-2">
                            &ldquo;{c.verse.text}&rdquo;
                          </p>
                          <span className="text-[12px] font-extrabold" style={{ color: c.color }}>{c.verse.ref}</span>
                        </div>
                      </ParallaxLayer>
                    </BlurFadeIn>

                    {/* Fun Facts */}
                    <BlurFadeIn delay={0.4}>
                      <h4 className="text-[13px] font-badge text-[#4A4A4A]/60 mb-3 flex items-center gap-2">
                        <Sparkles className="h-3 w-3" /> Fun Facts
                      </h4>
                      <ul className="space-y-2">
                        {c.facts.map((f, fi) => (
                          <motion.li
                            key={f}
                            className="flex items-start gap-2 text-[14px] text-[#8B7E74]/60"
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + fi * 0.1, duration: 0.4 }}
                            whileHover={{ x: 4 }}
                          >
                            <Star className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: c.color }} fill={c.color} />
                            {f}
                          </motion.li>
                        ))}
                      </ul>
                    </BlurFadeIn>
                  </SlideIn>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
