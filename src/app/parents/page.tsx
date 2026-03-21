"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Shield, BookOpen, Star, Heart, Check, ChevronDown, Music, Clock, Users, Sparkles } from "lucide-react";
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

const trustBadges = [
  { icon: Shield, label: "Ad-Free Content", color: "#FF6B35" },
  { icon: BookOpen, label: "Scripture-Based", color: "#7C3AED" },
  { icon: Clock, label: "Ages 0-8", color: "#10B981" },
  { icon: Heart, label: "Parent Approved", color: "#F59E0B" },
];

const sections = [
  {
    title: "What Your Kids Will Learn",
    icon: Star,
    color: "#FF6B35",
    items: ["Bible verses through memorable melodies", "The love of God and the Gospel message", "Worship and praise as a joyful practice", "Character traits like kindness, courage, and faith", "Spanish vocabulary through bilingual songs"],
  },
  {
    title: "Our Content Promise",
    icon: Shield,
    color: "#7C3AED",
    items: ["Every lyric reviewed for biblical accuracy", "No ads, no commercials, no sponsored content", "Age-appropriate visuals and storytelling", "Positive, uplifting messages only", "Designed by parents, for parents"],
  },
  {
    title: "How to Use Selah Kids",
    icon: Music,
    color: "#10B981",
    items: ["Morning worship routines to start the day with joy", "Car ride sing-alongs for family road trips", "Sunday School classes and children's ministry", "Calming bedtime worship to wind down", "Family worship nights for the whole household"],
  },
];

function AccordionSection({ section, index }: { section: typeof sections[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `panel-${section.title.replace(/\s+/g, "-").toLowerCase()}`;
  const headingId = `heading-${section.title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <Reveal delay={index * 0.08}>
      <div className="rounded-3xl bg-white border border-[rgba(0,0,0,0.06)] overflow-hidden shadow-layered-sm transition-all duration-200 hover:shadow-layered">
        <h3 id={headingId}>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            className="w-full flex items-center gap-4 p-6 sm:p-7 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${section.color}12` }}>
              <section.icon className="h-5 w-5" style={{ color: section.color }} />
            </div>
            <span className="flex-1 text-[17px] font-bold text-[#1C4425]">{section.title}</span>
            <ChevronDown className={`h-5 w-5 text-[#1C4425]/20 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
          </button>
        </h3>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 sm:px-7 pb-7"
          >
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: section.color }} aria-hidden="true" />
                  <span className="text-[14px] text-[#64786C]/60 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </Reveal>
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
      />

      {/* Trust Badges */}
      <section className="relative py-14 bg-[#FFF8F0] overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <Reveal key={badge.label} delay={i * 0.06}>
                <div className="flex flex-col items-center text-center gap-3 rounded-2xl bg-white p-5 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${badge.color}12` }}>
                    <badge.icon className="h-5 w-5" style={{ color: badge.color }} />
                  </div>
                  <span className="text-[12px] font-bold text-[#1C4425]/50">{badge.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-4">
          {sections.map((s, i) => (
            <AccordionSection key={s.title} section={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
