"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { BookOpen, ArrowRight, Calendar, Heart, Tv, Users, Sparkles, PartyPopper, Clapperboard, Smartphone, Mic, Plus, Star, Music, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, StaggerContainer, StaggerItem, HandwrittenNote, WavyUnderline, SectionGrain,
  BlurFadeIn, FloatingElement, TiltCard, ClipReveal, CharacterCameo,
  ScrollProgress, RotateOnScroll, ParallaxLayer, ScrollScale,
  EASE, SPRING_BOUNCY, SCENES,
} from "@/components/storybook-primitives";
import { WaveDivider } from "@/components/storybook-effects";
import { useLanguage } from "@/context/language";

const categories = [
  { id: "all", label: "All" },
  { id: "parenting", label: "Parenting" },
  { id: "bts", label: "Behind the Scenes" },
  { id: "faith", label: "Faith & Learning" },
  { id: "devotional", label: "Devotional" },
];

const posts = [
  { id: "1", title: "5 Ways to Make Family Worship Fun", excerpt: "Practical tips to bring joyful worship into your home every day, from morning routines to bedtime praise.", category: "parenting", date: "Mar 15, 2026", icon: Users, color: "#F02D8A", bg: "#FFF0E8", emoji: PartyPopper, rotate: "-1deg" },
  { id: "2", title: "Behind the Scenes: Creating The Good News", excerpt: "A look at how our team of animators, musicians, and writers brought our first song to life.", category: "bts", date: "Mar 10, 2026", icon: Tv, color: "#7B3FA0", bg: "#FCEEF5", emoji: Clapperboard, rotate: "1.5deg" },
  { id: "3", title: "Why Kids Need Worship Music", excerpt: "Research-backed insights into how worship music shapes children's faith development and emotional wellbeing.", category: "faith", date: "Mar 5, 2026", icon: BookOpen, color: "#4A4A4A", bg: "#E8F5E9", emoji: BookOpen, rotate: "-0.5deg" },
  { id: "4", title: "A Parent's Guide to Screen Time & Faith", excerpt: "How to make screen time spiritually enriching while maintaining healthy boundaries for your family.", category: "parenting", date: "Feb 28, 2026", icon: Users, color: "#FFD700", bg: "#FEF9E7", emoji: Smartphone, rotate: "1deg" },
  { id: "5", title: "Meet the Voices Behind Andy & Libni", excerpt: "Get to know the talented voice actors who bring our beloved characters to life in every episode.", category: "bts", date: "Feb 20, 2026", icon: Sparkles, color: "#00B5B8", bg: "#E8F5F8", emoji: Mic, rotate: "-1.5deg" },
  { id: "6", title: "Teaching Kids About the Gospel", excerpt: "Age-appropriate ways to share the good news of Jesus with your little ones through story and song.", category: "devotional", date: "Feb 15, 2026", icon: Heart, color: "#F02D8A", bg: "#FFF0E8", emoji: Plus, rotate: "0.5deg" },
];

export default function BlogPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <ScrollProgress />
      <PageHero
        badge={t("blog.badge")}
        badgeIcon={BookOpen}
        title={t("blog.title")}
        highlight={t("blog.highlight")}
        description={t("blog.desc")}
        scene={SCENES.adventure}
      />

      <div className="relative">
        <WaveDivider from="#FFFDF5" to="#FFF5F0" position="bottom" />
      </div>

      <section className="relative py-16 sm:py-24 bg-[#FFF5F0] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none striped-bg" />
        <SectionGrain />
        <ParallaxLayer speed={0.04} className="absolute top-10 right-[5%] w-[200px] h-[200px] rounded-full bg-[#F09EBA]/5 blur-3xl pointer-events-none"><span /></ParallaxLayer>
        <CharacterCameo character="andy" side="right" className="bottom-40" />
        <RotateOnScroll degrees={6}><FloatingElement className="absolute top-24 left-[5%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={14} duration={6}><Star className="h-8 w-8" /></FloatingElement></RotateOnScroll>
        <FloatingElement className="absolute bottom-20 right-[7%] text-[#F02D8A]/8 pointer-events-none z-[2]" amplitude={10} duration={8} delay={2}><Music className="h-7 w-7" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          {/* Filter */}
          <BlurFadeIn className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat, ci) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: ci * 0.06, duration: 0.4, ease: EASE }}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`font-btn rounded-full px-5 py-2.5 text-[13px] border-2 transition-all duration-150 ${
                  filter === cat.id
                    ? "bg-[#F02D8A] text-white border-[#F09EBA] shadow-[3px_3px_0_#F09EBA]"
                    : "bg-[#FFFDF5] text-[#4A4A4A]/70 border-[#F09EBA]/50 hover:border-[#F09EBA] hover:text-[#4A4A4A]"
                } focus-ring`}
              >
                {cat.label}
              </motion.button>
            ))}
          </BlurFadeIn>

          {/* Grid */}
          <ScrollScale>
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <StaggerItem key={post.id}>
                <TiltCard intensity={5}>
                  <motion.article
                    className="group cursor-pointer relative rounded-[20px] border-3 border-[#F09EBA] overflow-hidden shadow-[5px_5px_0_#F09EBA] border-glow"
                    style={{ backgroundColor: post.bg, transform: `rotate(${post.rotate})` }}
                    whileHover={{ y: -10, rotate: 0, scale: 1.02, transition: SPRING_BOUNCY }}
                  >
                    <motion.div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(2deg)" }} />
                    <motion.span className="absolute top-4 right-4 text-2xl z-10 icon-hover-bounce" whileHover={{ scale: 1.3, rotate: 15 }} transition={SPRING_BOUNCY}><post.emoji className="h-5 w-5" /></motion.span>

                    <div className="p-6 pb-0 flex items-center justify-center h-[100px]">
                      <motion.div
                        className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-[#F09EBA]"
                        style={{ backgroundColor: `${post.color}20` }}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={SPRING_BOUNCY}
                      >
                        <post.icon className="h-6 w-6" style={{ color: post.color }} />
                      </motion.div>
                    </div>

                    <div className="p-6 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="rounded-full px-3 py-1 text-[10px] font-badge border-2" style={{ backgroundColor: `${post.color}15`, color: post.color, borderColor: `${post.color}30` }}>
                          {categories.find((c) => c.id === post.category)?.label}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#8B7E74]/60 font-medium">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                      </div>
                      <h3 className="text-[16px] font-subheading text-[#4A4A4A] leading-snug mb-2 group-hover:text-[#F02D8A] transition-colors duration-150">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#8B7E74] leading-[1.75] font-medium mb-4">{post.excerpt}</p>
                      <motion.span
                        className="flex items-center gap-1 text-[12px] font-bold text-[#F02D8A] opacity-0 group-hover:opacity-100 transition-all duration-150"
                        initial={{ x: -5 }}
                        whileHover={{ x: 3 }}
                      >
                        Read more <ArrowRight className="h-3 w-3 arrow-slide" />
                      </motion.span>
                    </div>
                  </motion.article>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          </ScrollScale>
        </div>
      </section>
    </>
  );
}
