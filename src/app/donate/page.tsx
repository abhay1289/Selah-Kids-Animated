"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Heart, Sparkles, Music, BookOpen, Users } from "lucide-react";
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

const amounts = [10, 20, 30, 50];
const frequencies = ["One-Time", "Monthly", "Annual"];

const impacts = [
  { amount: "$10", desc: "Funds one day of animation production", icon: Sparkles, color: "#FF6B35" },
  { amount: "$30", desc: "Translates a song into Spanish", icon: Music, color: "#7C3AED" },
  { amount: "$50", desc: "Provides resources for 100 Sunday Schools", icon: Users, color: "#10B981" },
];

export default function DonatePage() {
  const { t } = useLanguage();
  const [freq, setFreq] = useState("One-Time");
  const [selected, setSelected] = useState(20);

  return (
    <>
      <PageHero
        badge={t("donate.badge")}
        badgeIcon={Heart}
        title={t("donate.title")}
        highlight={t("donate.highlight")}
        description={t("donate.desc")}
      />

      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {/* Donation Card */}
          <Reveal>
            <div className="rounded-3xl bg-white p-8 sm:p-10 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              {/* Frequency Toggle */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-full bg-[#F5F0EB] p-1">
                  {frequencies.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFreq(f)}
                      className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-150 ${
                        freq === f
                          ? "bg-[#FF6B35] text-white shadow-md"
                          : "text-[#1C4425]/40 hover:text-[#1C4425]"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {amounts.map((a) => (
                  <motion.button
                    key={a}
                    onClick={() => setSelected(a)}
                    className={`rounded-2xl py-5 text-center font-bold text-[20px] border transition-all duration-150 ${
                      selected === a
                        ? "bg-[#FF6B35]/8 border-[#FF6B35]/30 text-[#FF6B35] shadow-[0_4px_16px_rgba(255,107,53,0.12)]"
                        : "bg-white border-[#E7E5E4] text-[#1C4425]/40 hover:border-[#FF6B35]/15 hover:text-[#1C4425]"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ${a}
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F50] py-4.5 text-[16px] font-bold text-white shadow-[0_8px_30px_rgba(255,107,53,0.3)] transition-all duration-200"
                whileHover={{ y: -2, boxShadow: "0 12px 40px rgba(255,107,53,0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="h-4.5 w-4.5" fill="currentColor" />
                Donate ${selected} {freq !== "One-Time" ? freq : ""}
              </motion.button>

              <p className="mt-4 text-center text-[11px] text-[#64786C]/25 font-medium">
                Secure payment powered by Stripe. Tax-deductible donation.
              </p>
            </div>
          </Reveal>

          {/* Impact */}
          <Reveal className="mt-14" delay={0.1}>
            <h3 className="font-heading text-[clamp(1.125rem,2vw,1.5rem)] text-[#1C4425] leading-[0.95] tracking-tight text-center mb-8">
              Your <span className="italic text-[#FF6B35]">Impact</span>
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {impacts.map((imp, i) => (
                <Reveal key={imp.amount} delay={0.15 + i * 0.06}>
                  <div className="rounded-2xl bg-white p-6 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl mx-auto mb-3" style={{ backgroundColor: `${imp.color}12` }}>
                      <imp.icon className="h-5 w-5" style={{ color: imp.color }} />
                    </div>
                    <div className="text-[22px] font-bold mb-1" style={{ color: imp.color }}>{imp.amount}</div>
                    <p className="text-[16px] text-[#64786C]/60 leading-[28px]">{imp.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
