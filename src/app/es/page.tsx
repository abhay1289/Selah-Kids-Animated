"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Globe, Play, ArrowRight, Youtube, Music, Heart, Star, Users } from "lucide-react";
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

const features = [
  { icon: Music, title: "Canciones Originales", desc: "Letras originales basadas en la Biblia que los ninos pueden cantar y recordar.", color: "#FF6B35" },
  { icon: Star, title: "Animacion de Calidad", desc: "Animacion 3D de nivel cinematografico que cautiva a los mas pequenos.", color: "#7C3AED" },
  { icon: Users, title: "Para Toda la Familia", desc: "Musica de adoracion que reune a toda la familia en alabanza gozosa.", color: "#10B981" },
];

export default function EspanolPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        badge={t("es.badge")}
        badgeIcon={Globe}
        title={t("es.title")}
        highlight={t("es.highlight")}
        description={t("es.desc")}
      />

      {/* Featured Video */}
      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <Image
                  src="https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png"
                  alt="Jesus Me Ama" width={1200} height={675} className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#1C4425]/10">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-lg">
                    <Play className="h-8 w-8 text-[#FF6B35] ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="sticker absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#7C3AED] px-4 py-2 text-[11px] font-bold text-white uppercase">
                  <Globe className="h-3 w-3" /> Espanol
                </div>
              </div>
              <h3 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] text-[#1C4425] leading-[0.95] tracking-tight mb-3">
                Jesus Me Ama <span className="italic text-[#7C3AED]">(Good News Espanol)</span>
              </h3>
              <p className="text-[15px] text-[#64786C]/55 leading-[1.7] mb-6">
                Una cancion hermosa que comparte el amor de Dios con los mas pequenos. Disponible ahora en nuestro canal de YouTube.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-[14px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5">
                  <Youtube className="h-4 w-4" /> Ver en YouTube
                </a>
                <Link href="/watch"
                  className="flex items-center justify-center gap-2 rounded-full border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] px-7 py-3 text-[14px] font-bold text-[#1C4425]/50 transition-all hover:text-[#1C4425] hover:border-[#1C4425]/15">
                  Ver Todos los Videos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-16 sm:py-20 bg-[#FFF8F0] overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="rounded-3xl bg-white p-7 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mx-auto mb-4" style={{ backgroundColor: `${f.color}12` }}>
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-[16px] font-bold text-[#1C4425] mb-2">{f.title}</h3>
                  <p className="text-[16px] text-[#64786C]/60 leading-[28px]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
