"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Play, ArrowRight, Youtube, Tv, Music, Sparkles, Star, Globe, Flame } from "lucide-react";
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

const categories = [
  { id: "all", label: "All Videos", icon: Sparkles },
  { id: "music", label: "Music Videos", icon: Music },
  { id: "singalong", label: "Sing-Alongs", icon: Tv },
  { id: "sensory", label: "Sensory Videos", icon: Star },
];

const videos = [
  {
    id: "the-good-news", title: "The Good News", desc: "Sharing God's love with the world",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/6ca859c4-a380-41e6-854e-57cf764fe6a9/TGN_SingleFrames+%282%29.png",
    date: "Jun 26, 2025", category: "music", lang: "EN", tag: "Newest", tagIcon: Flame, tagColor: "#FF6B35",
  },
  {
    id: "jesus-me-ama", title: "Jesus Me Ama", desc: "A beautiful Spanish worship song",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/7ab0e946-8af6-421e-8273-2780d960ad77/TGN_SingleFrames+%283%29.png",
    date: "Jun 27, 2025", category: "music", lang: "ES", tag: "Espanol", tagIcon: Globe, tagColor: "#7C3AED",
  },
  {
    id: "worship-together", title: "Worship Together", desc: "Joyful family praise & worship",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/ee53d250-5a7d-4c65-9e45-69d732337873/TGN_SingleFrames+%287%29.png",
    date: "Jun 27, 2025", category: "singalong", lang: "EN", tag: "Popular", tagIcon: Star, tagColor: "#10B981",
  },
  {
    id: "gods-love", title: "God's Love", desc: "Learning about God's endless love",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/9e08b001-db62-4ef2-871c-6b4bf4219b82/TGN_SingleFrames+%2813%29.png",
    date: "Jun 26, 2025", category: "music", lang: "EN", tag: "Featured", tagIcon: Sparkles, tagColor: "#F59E0B",
  },
  {
    id: "andys-adventure", title: "Andy & Shiloh's Adventure", desc: "A faith-filled journey through the garden",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/0c40d911-8481-4c3a-803a-29b39e022b13/SK_Andy_Intro_Pose.png",
    date: "Jun 25, 2025", category: "sensory", lang: "EN", tag: "Fan Favorite", tagIcon: Star, tagColor: "#FF6B35",
  },
  {
    id: "libnis-song", title: "Libni's Worship Song", desc: "A joyful melody straight from the heart",
    thumbnail: "https://images.squarespace-cdn.com/content/v1/685a82804538a6024d2a31d4/08f0ca39-3408-457f-b4d5-4f6ce93fd8d4/SK_Libni_Intro_Pose.png",
    date: "Jun 25, 2025", category: "music", lang: "EN", tag: "New", tagIcon: Sparkles, tagColor: "#7C3AED",
  },
];

export default function WatchPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <>
      <PageHero
        badge={t("watch.badge")}
        badgeIcon={Tv}
        title={t("watch.title")}
        highlight={t("watch.highlight")}
        description={t("watch.desc")}
      />

      {/* Filter + Grid */}
      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Filter bar */}
          <Reveal className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-150 ${
                  filter === cat.id
                    ? "bg-[#FF6B35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.25)]"
                    : "bg-white text-[#1C4425]/40 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:border-[#FF6B35]/20 hover:text-[#1C4425]"
                }`}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            ))}
          </Reveal>

          {/* Video Grid */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.06}>
                <motion.div
                  className="group cursor-pointer"
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] group-hover:border-[#E7E5E4]/60">
                    <div className="relative overflow-hidden">
                      <Image src={v.thumbnail} alt={v.title} width={800} height={600} className="w-full aspect-[4/3] object-cover transition-transform duration-250 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[#1C4425]/0 group-hover:bg-[#1C4425]/20 transition-all duration-200" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg scale-75 group-hover:scale-100 transition-transform duration-200">
                          <Play className="h-6 w-6 text-[#FF6B35] ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="sticker absolute top-3 left-3 flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-bold text-white uppercase tracking-tight" style={{ backgroundColor: v.tagColor }}>
                        <v.tagIcon className="h-3 w-3" fill="currentColor" /> {v.tag}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-[#1C4425]/60 uppercase">
                        {v.lang}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-white/80">
                        3:24
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[16px] font-bold text-[#1C4425] group-hover:text-[#FF6B35] transition-colors duration-150">{v.title}</h3>
                      <p className="mt-1 text-[13px] text-[#64786C]/55 font-medium">{v.desc}</p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-[#64786C]/30 font-medium">{v.date}</span>
                        <span className="flex items-center gap-1 text-[12px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-150 text-[#FF6B35]">
                          Watch <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* YouTube CTA */}
          <Reveal className="mt-16">
            <div className="rounded-3xl bg-[#1C4425] p-8 sm:p-12 text-center overflow-hidden relative">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#FF6B35]/8 blur-[120px]" />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] text-white leading-[0.95] tracking-tight mb-4">
                  Subscribe on <span className="italic text-[#FF6B35]">YouTube</span>
                </h3>
                <p className="text-[15px] text-white/40 max-w-md mx-auto mb-8">
                  Be the first to see new songs, characters, and worship videos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-[#FF6B35] px-7 py-3.5 text-[14px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5">
                    <Youtube className="h-4 w-4" /> English Channel
                  </a>
                  <a href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol?sub_confirmation=1" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-[14px] font-bold text-white/60 transition-all hover:bg-white/10 hover:text-white/80">
                    <Globe className="h-4 w-4" /> Canal en Espanol
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
