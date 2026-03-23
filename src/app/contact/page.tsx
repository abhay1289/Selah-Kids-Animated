"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Youtube, Send, Users, Newspaper, Instagram, Music, Handshake, Heart, Star, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  Reveal, HandwrittenNote, WavyUnderline, SectionGrain,
  BlurFadeIn, FloatingElement, TiltCard, SlideIn, ScrollScale, CharacterCameo,
  EASE, SPRING_BOUNCY, SCENES,
} from "@/components/storybook-primitives";
import { useLanguage } from "@/context/language";

const contactTypes = [
  { icon: Mail, title: "General Inquiries", email: "info.selahkids@gmail.com", color: "#F02D8A", bg: "#FFF0E8", emoji: Mail },
  { icon: Users, title: "Partnership & Ministry", email: "info.selahkids@gmail.com", color: "#7B3FA0", bg: "#FCEEF5", emoji: Handshake },
  { icon: Newspaper, title: "Press & Media", email: "info.selahkids@gmail.com", color: "#4A4A4A", bg: "#E8F5E9", emoji: Newspaper },
];

const socials = [
  { href: "https://www.youtube.com/@SelahKidsWorship", icon: Youtube, label: "YouTube", color: "#FF0000" },
  { href: "https://www.instagram.com/selahkidsworship", icon: Instagram, label: "Instagram", color: "#E4405F" },
  { href: "https://open.spotify.com", icon: Music, label: "Spotify", color: "#1DB954" },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        badge={t("contact.badge")}
        badgeIcon={Mail}
        title={t("contact.title")}
        highlight={t("contact.highlight")}
        description={t("contact.desc")}
        scene={SCENES.landscape}
      />

      <section className="relative py-16 sm:py-24 bg-[#FFFDF5] overflow-hidden paper-texture">
        <SectionGrain />
        <CharacterCameo character="libni" side="left" className="bottom-24" />
        <FloatingElement className="absolute top-24 right-[5%] text-[#FFD700]/8 pointer-events-none z-[2]" amplitude={14} duration={7}><Star className="h-8 w-8" /></FloatingElement>

        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <SlideIn from="left" className="lg:col-span-3">
              <TiltCard intensity={2}>
                <div className="group relative rounded-[20px] bg-white p-7 sm:p-9 border-3 border-[#F09EBA] shadow-[6px_6px_0_#F09EBA] border-glow">
                  <motion.div className="absolute -top-2 left-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(-2deg)" }} />
                  <motion.div className="absolute -top-2 right-8 w-14 h-5 bg-[#FFD700]/35 rounded-sm z-10 tape-wiggle" style={{ transform: "rotate(3deg)" }} />

                  {submitted ? (
                    <div className="flex flex-col items-center py-16 text-center">
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-[#F09EBA] mb-5"
                        style={{ backgroundColor: "#E8F5E9" }}
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Send className="h-7 w-7 text-[#4A4A4A]" />
                      </motion.div>
                      <BlurFadeIn delay={0.2}>
                        <h3 className="font-subheading text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[0.95] mb-3">
                          <span style={{ color: "#2DB84B" }}>Message</span> <span style={{ color: "#F02D8A" }}>Sent!</span>
                        </h3>
                        <HandwrittenNote className="text-[18px] text-[#4A4A4A]/70 mb-6 block" rotate={-2}>
                          we&apos;ll get back to you soon <Heart className="h-3 w-3 inline" />
                        </HandwrittenNote>
                      </BlurFadeIn>
                      <motion.button
                        onClick={() => setSubmitted(false)}
                        className="font-btn rounded-full border-2 border-[#F09EBA]/50 px-6 py-2.5 text-[13px] text-[#4A4A4A]/70 hover:border-[#F09EBA] hover:text-[#4A4A4A] transition-all focus-ring"
                        whileHover={{ y: -2 }}
                        transition={SPRING_BOUNCY}
                      >
                        Send Another Message
                      </motion.button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                      <BlurFadeIn>
                        <h3 className="text-[18px] font-subheading mb-1"><span style={{ color: "#E8890C" }}>Send</span> <span style={{ color: "#4A6FCC" }}>a</span> <span style={{ color: "#F02D8A" }}>Message</span></h3>
                        <HandwrittenNote className="text-[14px] text-[#F02D8A]/40 block mb-4" rotate={-1}>
                          we&apos;d love to hear from you!
                        </HandwrittenNote>
                      </BlurFadeIn>
                      <BlurFadeIn delay={0.1}>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-[12px] font-badge text-[#4A4A4A]/70 mb-1.5">Name</label>
                            <input id="name" required aria-required="true" className="w-full rounded-[12px] border-2 border-[#F09EBA]/50 bg-[#FFFDF5] px-4 py-3 text-[14px] text-[#4A4A4A] outline-none transition-all duration-150 focus:border-[#F02D8A] focus:shadow-[3px_3px_0_rgba(239,123,91,0.15)] border-glow focus-ring" placeholder="Your name" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-[12px] font-badge text-[#4A4A4A]/70 mb-1.5">Email</label>
                            <input id="email" type="email" required aria-required="true" autoComplete="email" className="w-full rounded-[12px] border-2 border-[#F09EBA]/50 bg-[#FFFDF5] px-4 py-3 text-[14px] text-[#4A4A4A] outline-none transition-all duration-150 focus:border-[#F02D8A] focus:shadow-[3px_3px_0_rgba(239,123,91,0.15)] border-glow focus-ring" placeholder="you@example.com" />
                          </div>
                        </div>
                      </BlurFadeIn>
                      <BlurFadeIn delay={0.15}>
                        <div>
                          <label htmlFor="subject" className="block text-[12px] font-badge text-[#4A4A4A]/70 mb-1.5">Subject</label>
                          <input id="subject" required className="w-full rounded-[12px] border-2 border-[#F09EBA]/50 bg-[#FFFDF5] px-4 py-3 text-[14px] text-[#4A4A4A] outline-none transition-all focus:border-[#F02D8A] focus:shadow-[3px_3px_0_rgba(239,123,91,0.15)] border-glow focus-ring" placeholder="What is this about?" />
                        </div>
                      </BlurFadeIn>
                      <BlurFadeIn delay={0.2}>
                        <div>
                          <label htmlFor="message" className="block text-[12px] font-badge text-[#4A4A4A]/70 mb-1.5">Message</label>
                          <textarea id="message" rows={5} required className="w-full rounded-[12px] border-2 border-[#F09EBA]/50 bg-[#FFFDF5] px-4 py-3 text-[14px] text-[#4A4A4A] outline-none transition-all resize-none focus:border-[#F02D8A] focus:shadow-[3px_3px_0_rgba(239,123,91,0.15)] border-glow focus-ring" placeholder="Tell us what's on your heart..." />
                        </div>
                      </BlurFadeIn>
                      <BlurFadeIn delay={0.25}>
                        <motion.button
                          type="submit"
                          className="w-full font-btn flex items-center justify-center gap-2 rounded-full bg-[#F02D8A] border-2 border-[#F09EBA] py-4 text-[15px] text-white shadow-[4px_4px_0_#F09EBA] btn-shimmer focus-ring"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98, y: 0 }}
                          transition={SPRING_BOUNCY}
                        >
                          <Send className="h-4 w-4" />
                          Send Message
                        </motion.button>
                      </BlurFadeIn>
                    </form>
                  )}
                </div>
              </TiltCard>
            </SlideIn>

            {/* Sidebar */}
            <SlideIn from="right" delay={0.15} className="lg:col-span-2">
              <div className="space-y-4">
                {contactTypes.map((ct, i) => (
                  <BlurFadeIn key={ct.title} delay={i * 0.1}>
                    <TiltCard intensity={6}>
                      <motion.div
                        className="relative rounded-[16px] border-2 border-[#F09EBA]/40 p-5 hover:border-[#F09EBA] hover:shadow-[4px_4px_0_#F09EBA] transition-all duration-200 cursor-default border-glow"
                        style={{ backgroundColor: ct.bg }}
                        whileHover={{ y: -4, rotate: 1 }}
                        transition={SPRING_BOUNCY}
                      >
                        <div className="flex items-start gap-3.5">
                          <motion.div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[#F09EBA]/40"
                            style={{ backgroundColor: `${ct.color}15` }}
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={SPRING_BOUNCY}
                          >
                            <ct.icon className="h-4.5 w-4.5" style={{ color: ct.color }} />
                          </motion.div>
                          <div>
                            <h4 className="text-[14px] font-subheading text-[#4A4A4A] mb-0.5">{ct.title}</h4>
                            <a href={`mailto:${ct.email}`} className="text-[13px] font-medium link-underline" style={{ color: ct.color }}>{ct.email}</a>
                          </div>
                          <motion.span
                            className="ml-auto text-lg"
                            animate={{ rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 0.8 }}
                          >
                            <ct.emoji className="h-5 w-5" />
                          </motion.span>
                        </div>
                      </motion.div>
                    </TiltCard>
                  </BlurFadeIn>
                ))}

                <BlurFadeIn delay={0.35}>
                  <div className="relative rounded-[16px] border-2 border-[#F09EBA]/50 p-5 bg-[#FEF9E7] hover:border-[#F09EBA] hover:shadow-[4px_4px_0_#F09EBA] transition-all duration-200">
                    <h4 className="text-[13px] font-badge text-[#4A4A4A]/70 mb-3">Follow Us</h4>
                    <div className="flex gap-2">
                      {socials.map((s, si) => (
                        <motion.a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#F09EBA]/50 bg-white text-[#4A4A4A]/65 hover:border-[#F09EBA] transition-all duration-150 focus-ring icon-hover-bounce"
                          aria-label={s.label}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + si * 0.08, duration: 0.4 }}
                          whileHover={{ y: -4, rotate: 5, scale: 1.1, color: s.color }}
                        >
                          <s.icon className="h-4.5 w-4.5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </BlurFadeIn>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </>
  );
}
