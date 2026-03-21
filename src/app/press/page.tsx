"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Newspaper, Download, Users, Palette, Image as ImageIcon, FileText, Sparkles } from "lucide-react";
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

const quickFacts = [
  { label: "Founded", value: "2024" },
  { label: "Content", value: "Original Bible songs + 3D animation" },
  { label: "Target Audience", value: "Children ages 0-8 and their families" },
  { label: "Languages", value: "English & Spanish" },
  { label: "Characters", value: "Andy, Libni & Shiloh" },
  { label: "Contact", value: "info.selahkids@gmail.com" },
];

const brandAssets = [
  { title: "Primary Logo", icon: ImageIcon, color: "#FF6B35" },
  { title: "Logo on Dark", icon: ImageIcon, color: "#7C3AED" },
  { title: "Character Pack", icon: Users, color: "#10B981" },
  { title: "Color Palette", icon: Palette, color: "#F59E0B" },
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
      />

      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Press Kit + Partnership */}
          <div className="grid sm:grid-cols-2 gap-6 mb-14">
            <Reveal>
              <div className="rounded-3xl bg-white p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B35]/10 mb-5">
                  <FileText className="h-5 w-5 text-[#FF6B35]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#1C4425] mb-2">Press Kit</h3>
                <p className="text-[14px] text-[#64786C]/55 leading-[1.7] mb-6 flex-1">
                  Download our complete press kit including brand overview, founder bios, high-resolution imagery, and key talking points.
                </p>
                <button className="flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg self-start">
                  <Download className="h-3.5 w-3.5" /> Download Press Kit
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] h-full flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/10 mb-5">
                  <Users className="h-5 w-5 text-[#7C3AED]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#1C4425] mb-2">Partnerships</h3>
                <p className="text-[14px] text-[#64786C]/55 leading-[1.7] mb-6 flex-1">
                  Interested in using Selah Kids in your church, school, or ministry? We would love to work with you to bring faith-filled music to more families.
                </p>
                <a href="mailto:info.selahkids@gmail.com" className="flex items-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg self-start">
                  <Sparkles className="h-3.5 w-3.5" /> Partner With Us
                </a>
              </div>
            </Reveal>
          </div>

          {/* Brand Assets */}
          <Reveal>
            <h3 className="font-heading text-[clamp(1.125rem,2vw,1.5rem)] text-[#1C4425] leading-[0.95] tracking-tight text-center mb-8">
              Brand <span className="italic text-[#FF6B35]">Assets</span>
            </h3>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {brandAssets.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <div className="rounded-2xl bg-white p-5 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <div className="h-20 rounded-xl mb-3 flex items-center justify-center" style={{ backgroundColor: `${a.color}08` }}>
                    <a.icon className="h-8 w-8" style={{ color: `${a.color}40` }} />
                  </div>
                  <span className="text-[13px] font-bold text-[#1C4425]/50">{a.title}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Quick Facts */}
          <Reveal>
            <div className="rounded-3xl bg-[#FFF0E8] border border-[#FF6B35]/12 p-8">
              <h3 className="text-[16px] font-bold text-[#1C4425] mb-5">Quick Facts</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickFacts.map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <span className="text-[13px] font-bold text-[#FF6B35] whitespace-nowrap">{f.label}:</span>
                    <span className="text-[13px] text-[#64786C]/60">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
