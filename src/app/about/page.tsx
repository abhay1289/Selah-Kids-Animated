"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { BookOpen, Tv, Heart, Users, Sparkles, Star, Shield, Smile } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useLanguage } from "@/context/language";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, ease: EASE, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const values = [
  { icon: Star, title: "Christ-Centered", desc: "Jesus is at the center of every story, every song, and every adventure we create.", color: "#FF6B35" },
  { icon: Shield, title: "Kid-First Design", desc: "Age-appropriate, screen-time conscious content designed specifically for little hearts and minds.", color: "#7C3AED" },
  { icon: BookOpen, title: "Theologically Sound", desc: "Every lyric is carefully reviewed for biblical accuracy and doctrinal integrity.", color: "#10B981" },
  { icon: Smile, title: "Joyful & Inclusive", desc: "Reflecting the beautiful diversity of God's creation in every character and story.", color: "#F59E0B" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("about.badge")}
        badgeIcon={Heart}
        title={t("about.title")}
        highlight={t("about.highlight")}
        description={t("about.desc")}
      />

      {/* Mission Section */}
      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <span className="sticker inline-flex items-center gap-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/20 px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#FF6B35] mb-5">
                <BookOpen className="h-3 w-3" /> Our Mission
              </span>
              <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] text-[#1C4425] leading-[0.95] tracking-tight mb-6">
                Teaching Biblical Principles<br />
                <span className="italic text-[#FF6B35]">Through Song</span>
              </h2>
              <p className="text-[18px] text-[#64786C] leading-[32px] font-medium mb-4">
                Our songs teach biblical principles in a way that kids can connect with. Each song is carefully crafted to be catchy, fun, and grounded in scripture so that children learn God&apos;s word through music and movement.
              </p>
              <p className="text-[18px] text-[#64786C] leading-[32px] font-medium">
                We believe that worship should be joyful, and our mission is to bring families closer to God through the power of music.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png"
                    alt="Selah Kids Animation" width={400} height={400} className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-8 overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                  <Image
                    src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/9e08b001-db62-4ef2-871c-6b4bf4219b82/TGN_SingleFrames+%2813%29.png"
                    alt="Selah Kids Characters" width={400} height={400} className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Animation Quality */}
      <section className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-3xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png"
                  alt="Stunning Animation" width={800} height={600} className="w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="order-1 lg:order-2">
              <span className="sticker inline-flex items-center gap-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase text-[#7C3AED] mb-5">
                <Tv className="h-3 w-3" /> Cinema Quality
              </span>
              <h2 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] text-[#1C4425] leading-[0.95] tracking-tight mb-6">
                Stunning<br />
                <span className="italic text-[#7C3AED]">Animation</span>
              </h2>
              <p className="text-[18px] text-[#64786C] leading-[32px] font-medium mb-4">
                Our videos are crafted by top-tier animators from around the world. Every frame is designed to captivate tiny eyes and spark boundless imagination.
              </p>
              <p className="text-[18px] text-[#64786C] leading-[32px] font-medium">
                This is not another low-budget YouTube channel. Every scene is a masterpiece designed to rival major animation studios.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <span className="sticker inline-flex items-center gap-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 px-5 py-2.5 text-[12px] font-bold tracking-[0.12em] uppercase text-[#10B981] mb-5">
              <Sparkles className="h-3.5 w-3.5" /> What We Believe
            </span>
            <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] text-[#1C4425] leading-[0.92] tracking-tight">
              Our Core<br /><span className="italic text-[#FF6B35]">Values</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="flex gap-5 rounded-3xl bg-white p-7 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${v.color}12` }}>
                    <v.icon className="h-5 w-5" style={{ color: v.color }} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#1C4425] mb-1">{v.title}</h3>
                    <p className="text-[16px] text-[#64786C]/70 leading-[28px]">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
