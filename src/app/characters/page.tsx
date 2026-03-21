"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Heart, Star, Music, Leaf, BookOpen, Sparkles } from "lucide-react";
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

const characters = [
  {
    name: "Andy",
    role: "The Brave Leader",
    desc: "A natural-born leader, Andy is a sharp and friendly little boy. Always ready for an adventure, Andy leads the crew through every story with courage, faith, and an unstoppable spirit. He enjoys playtime outside in the garden with his best friend Shiloh.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    color: "#FF6B35",
    bgGradient: "from-[#FFF0E8] to-[#FFE0CC]",
    traits: ["Brave", "Kind", "Leader", "Adventurous"],
    verse: { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    facts: ["Loves exploring the garden with Shiloh", "Always protects his friends", "Dreams of being a shepherd like David"],
    roleIcon: Star,
  },
  {
    name: "Libni",
    role: "The Joyful Singer",
    desc: "Libni is Andy's imaginative, musical, and giggly next-door neighbor. Her voice lights up every song. She finds the bright side of everything and reminds everyone that God's love is everywhere. She spends her days picking flowers, singing, and creating dances.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    color: "#7C3AED",
    bgGradient: "from-[#F3EEFF] to-[#E8DEFF]",
    traits: ["Creative", "Musical", "Joyful", "Imaginative"],
    verse: { text: "Sing to the Lord a new song; sing to the Lord, all the earth.", ref: "Psalm 96:1" },
    facts: ["Makes up songs about everything", "Collects wildflowers from the garden", "Her dances make everyone smile"],
    roleIcon: Music,
  },
  {
    name: "Shiloh",
    role: "The Curious Explorer",
    desc: "Curious, helpful and funny, Shiloh is Andy's pet sheep and best friend. He loves discovering new things and sharing Bible stories. His curiosity turns every day into an adventure of faith. He enjoys basking in sunlight and taking long naps.",
    image: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    color: "#10B981",
    bgGradient: "from-[#ECFDF5] to-[#D1FAE5]",
    traits: ["Curious", "Helpful", "Funny", "Loyal"],
    verse: { text: "The Lord is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    facts: ["Professional nap-taker extraordinaire", "Will do anything for a tasty snack", "Has the softest wool in the garden"],
    roleIcon: Leaf,
  },
];

export default function CharactersPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("chars.badge")}
        badgeIcon={Heart}
        title={t("chars.title")}
        highlight={t("chars.highlight")}
        description={t("chars.desc")}
      />

      {/* Character Sections */}
      <section className="relative bg-[#FFF8F0] overflow-hidden section-grain">
        {characters.map((c, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={c.name} className="py-16 sm:py-20">
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reversed ? "" : ""}`}>
                  {/* Image */}
                  <Reveal className={reversed ? "lg:order-2" : ""}>
                    <div className={`relative rounded-3xl bg-gradient-to-br ${c.bgGradient} p-8 sm:p-12 overflow-hidden border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]`}>
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="max-w-[300px] mx-auto"
                      >
                        <Image src={c.image} alt={c.name} width={500} height={500} className="w-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.12)]" />
                      </motion.div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-[13px] font-bold text-white shadow-lg" style={{ backgroundColor: c.color }}>
                        {c.name} <c.roleIcon className="inline h-3.5 w-3.5 ml-1" />
                      </div>
                    </div>
                  </Reveal>

                  {/* Text */}
                  <Reveal delay={0.15} className={reversed ? "lg:order-1" : ""}>
                    <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: c.color }}>
                      {c.role}
                    </span>
                    <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] text-[#1C4425] leading-[0.92] tracking-tight mb-5">
                      {c.name}
                    </h2>
                    <p className="text-[18px] text-[#64786C] leading-[32px] font-medium mb-6">{c.desc}</p>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.traits.map((t) => (
                        <span key={t} className="rounded-full px-4 py-1.5 text-[12px] font-bold" style={{ backgroundColor: `${c.color}12`, color: c.color }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Verse */}
                    <div className="rounded-2xl p-5 mb-6 border-l-4" style={{ backgroundColor: `${c.color}08`, borderLeftColor: c.color }}>
                      <p className="font-heading text-[16px] text-[#1C4425]/60 leading-[1.6] italic mb-2">
                        &ldquo;{c.verse.text}&rdquo;
                      </p>
                      <span className="text-[12px] font-bold" style={{ color: c.color }}>{c.verse.ref}</span>
                    </div>

                    {/* Fun Facts */}
                    <div>
                      <h4 className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#1C4425]/30 mb-3">Fun Facts</h4>
                      <ul className="space-y-2">
                        {c.facts.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[14px] text-[#64786C]/60">
                            <Star className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: c.color }} fill={c.color} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
