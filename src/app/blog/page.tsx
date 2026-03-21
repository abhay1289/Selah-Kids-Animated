"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { BookOpen, ArrowRight, Calendar, Heart, Tv, Users, Sparkles } from "lucide-react";
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
  { id: "all", label: "All" },
  { id: "parenting", label: "Parenting" },
  { id: "bts", label: "Behind the Scenes" },
  { id: "faith", label: "Faith & Learning" },
  { id: "devotional", label: "Devotional" },
];

const posts = [
  { id: "1", title: "5 Ways to Make Family Worship Fun", excerpt: "Practical tips to bring joyful worship into your home every day, from morning routines to bedtime praise.", category: "parenting", date: "Mar 15, 2026", icon: Users, color: "#FF6B35" },
  { id: "2", title: "Behind the Scenes: Creating The Good News", excerpt: "A look at how our team of animators, musicians, and writers brought our first song to life.", category: "bts", date: "Mar 10, 2026", icon: Tv, color: "#7C3AED" },
  { id: "3", title: "Why Kids Need Worship Music", excerpt: "Research-backed insights into how worship music shapes children's faith development and emotional wellbeing.", category: "faith", date: "Mar 5, 2026", icon: BookOpen, color: "#10B981" },
  { id: "4", title: "A Parent's Guide to Screen Time & Faith", excerpt: "How to make screen time spiritually enriching while maintaining healthy boundaries for your family.", category: "parenting", date: "Feb 28, 2026", icon: Users, color: "#F59E0B" },
  { id: "5", title: "Meet the Voices Behind Andy & Libni", excerpt: "Get to know the talented voice actors who bring our beloved characters to life in every episode.", category: "bts", date: "Feb 20, 2026", icon: Sparkles, color: "#EC4899" },
  { id: "6", title: "Teaching Kids About the Gospel", excerpt: "Age-appropriate ways to share the good news of Jesus with your little ones through story and song.", category: "devotional", date: "Feb 15, 2026", icon: Heart, color: "#3B82F6" },
];

export default function BlogPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        badge={t("blog.badge")}
        badgeIcon={BookOpen}
        title={t("blog.title")}
        highlight={t("blog.highlight")}
        description={t("blog.desc")}
      />

      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          {/* Filter */}
          <Reveal className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-150 ${
                  filter === cat.id
                    ? "bg-[#FF6B35] text-white shadow-[0_4px_16px_rgba(255,107,53,0.25)]"
                    : "bg-white text-[#1C4425]/40 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] hover:border-[#FF6B35]/20 hover:text-[#1C4425]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <motion.article
                  className="group cursor-pointer rounded-3xl bg-white border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                  whileHover={{ y: -4 }}
                >
                  <div className="p-4 h-[140px] rounded-t-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${post.color}12, ${post.color}06)` }}>
                    <post.icon className="h-10 w-10" style={{ color: `${post.color}40` }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase" style={{ backgroundColor: `${post.color}12`, color: post.color }}>
                        {categories.find((c) => c.id === post.category)?.label}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#64786C]/30">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-bold text-[#1C4425] leading-snug mb-2 group-hover:text-[#FF6B35] transition-colors duration-150">
                      {post.title}
                    </h3>
                    <p className="text-[16px] text-[#64786C]/60 leading-[28px] mb-4">{post.excerpt}</p>
                    <span className="flex items-center gap-1 text-[12px] font-bold text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-all duration-150">
                      Read more <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
