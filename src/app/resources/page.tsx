"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Download, FileText, Palette, BookOpen, Music, Sparkles, ArrowRight } from "lucide-react";
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

const resources = [
  { title: "The Good News — Lyrics (EN)", desc: "Complete English lyrics for The Good News", icon: Music, color: "#FF6B35", type: "PDF" },
  { title: "Jesus Me Ama — Lyrics (ES)", desc: "Letras completas en espanol", icon: Music, color: "#7C3AED", type: "PDF" },
  { title: "Andy Coloring Page", desc: "Printable coloring sheet featuring Andy", icon: Palette, color: "#10B981", type: "PDF" },
  { title: "Libni Coloring Page", desc: "Printable coloring sheet featuring Libni", icon: Palette, color: "#F59E0B", type: "PDF" },
  { title: "Shiloh Coloring Page", desc: "Printable coloring sheet featuring Shiloh", icon: Palette, color: "#EC4899", type: "PDF" },
  { title: "Bible Verse Memory Cards", desc: "Printable cards with key verses from our songs", icon: BookOpen, color: "#3B82F6", type: "PDF" },
  { title: "Sunday School Guide", desc: "Complete guide for using Selah Kids in ministry", icon: FileText, color: "#FF6B35", type: "PDF" },
  { title: "Family Worship Guide", desc: "Tips for family worship nights at home", icon: FileText, color: "#7C3AED", type: "PDF" },
  { title: "Worship Together — Lyrics", desc: "Full lyrics for Worship Together", icon: Music, color: "#10B981", type: "PDF" },
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
      />

      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <motion.div
                  className="group cursor-pointer rounded-3xl bg-white p-7 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${r.color}12` }}>
                      <r.icon className="h-5 w-5" style={{ color: r.color }} />
                    </div>
                    <span className="rounded-full bg-[#1C4425]/5 px-3 py-1 text-[10px] font-bold text-[#1C4425]/40 uppercase">{r.type}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1C4425] mb-1.5">{r.title}</h3>
                  <p className="text-[16px] text-[#64786C]/60 leading-[28px] mb-5">{r.desc}</p>
                  <button className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-bold transition-all duration-150 group-hover:shadow-md" style={{ borderColor: `${r.color}25`, color: r.color }}>
                    <Download className="h-3.5 w-3.5" />
                    Download Free
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="rounded-3xl bg-[#F3EEFF] border border-[#7C3AED]/15 p-7 text-center">
              <Sparkles className="h-6 w-6 text-[#7C3AED] mx-auto mb-3" />
              <h3 className="text-[17px] font-bold text-[#1C4425] mb-2">More Resources Coming Soon</h3>
              <p className="text-[14px] text-[#64786C]/55">We are working on new coloring pages, activity sheets, and devotional guides. Stay tuned.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
