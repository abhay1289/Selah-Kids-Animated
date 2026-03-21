"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Youtube, Send, Users, Newspaper, Instagram, Music } from "lucide-react";
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

const contactTypes = [
  { icon: Mail, title: "General Inquiries", email: "info.selahkids@gmail.com", color: "#FF6B35" },
  { icon: Users, title: "Partnership & Ministry", email: "info.selahkids@gmail.com", color: "#7C3AED" },
  { icon: Newspaper, title: "Press & Media", email: "info.selahkids@gmail.com", color: "#10B981" },
];

const socials = [
  { href: "https://www.youtube.com/@SelahKidsWorship", icon: Youtube, label: "YouTube" },
  { href: "https://www.instagram.com/selahkidsworship", icon: Instagram, label: "Instagram" },
  { href: "https://open.spotify.com", icon: Music, label: "Spotify" },
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
      />

      <section className="relative py-20 sm:py-28 bg-mesh-warm overflow-hidden section-grain">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <Reveal className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-7 sm:p-9 border border-[rgba(0,0,0,0.06)] shadow-layered">
                {submitted ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/10 mb-5">
                      <Send className="h-7 w-7 text-[#10B981]" />
                    </div>
                    <h3 className="font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] text-[#1C4425] leading-[0.95] tracking-tight mb-3">
                      Message Sent
                    </h3>
                    <p className="text-[15px] text-[#64786C]/55 mb-6">Thank you for reaching out. We will get back to you soon.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="rounded-full border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] px-6 py-2.5 text-[13px] font-bold text-[#1C4425]/40 hover:text-[#1C4425] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                    <h3 className="text-[18px] font-bold text-[#1C4425] mb-2">Send a Message</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-[12px] font-bold text-[#1C4425]/40 uppercase tracking-tight mb-1.5">Name</label>
                        <input id="name" required aria-required="true" className="w-full rounded-xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] bg-[#FFF8F0] px-4 py-3 text-[14px] text-[#1C4425] outline-none transition-all duration-150 focus:border-[#FF6B35]/30 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.08)]" placeholder="Your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[12px] font-bold text-[#1C4425]/40 uppercase tracking-tight mb-1.5">Email</label>
                        <input id="email" type="email" required aria-required="true" autoComplete="email" className="w-full rounded-xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] bg-[#FFF8F0] px-4 py-3 text-[14px] text-[#1C4425] outline-none transition-all duration-150 focus:border-[#FF6B35]/30 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.08)]" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-[12px] font-bold text-[#1C4425]/40 uppercase tracking-tight mb-1.5">Subject</label>
                      <input id="subject" required className="w-full rounded-xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] bg-[#FFF8F0] px-4 py-3 text-[14px] text-[#1C4425] outline-none transition-all focus:border-[#FF6B35]/30 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.08)]" placeholder="What is this about?" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-[12px] font-bold text-[#1C4425]/40 uppercase tracking-tight mb-1.5">Message</label>
                      <textarea id="message" rows={5} required className="w-full rounded-xl border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)] bg-[#FFF8F0] px-4 py-3 text-[14px] text-[#1C4425] outline-none transition-all resize-none focus:border-[#FF6B35]/30 focus:shadow-[0_0_0_3px_rgba(255,107,53,0.08)]" placeholder="Tell us what's on your heart..." />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F50] py-4 text-[15px] font-bold text-white shadow-[0_8px_30px_rgba(255,107,53,0.25)]"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {contactTypes.map((ct, i) => (
                <Reveal key={ct.title} delay={i * 0.08}>
                  <div className="rounded-2xl bg-white p-5 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${ct.color}12` }}>
                        <ct.icon className="h-4.5 w-4.5" style={{ color: ct.color }} />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#1C4425] mb-0.5">{ct.title}</h4>
                        <a href={`mailto:${ct.email}`} className="text-[13px] font-medium hover:underline" style={{ color: ct.color }}>{ct.email}</a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.25}>
                <div className="rounded-2xl bg-white p-5 border border-[rgba(0,0,0,0.04)] shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.05)]">
                  <h4 className="text-[13px] font-bold text-[#1C4425]/40 uppercase tracking-tight mb-3">Follow Us</h4>
                  <div className="flex gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1C4425]/5 text-[#1C4425]/30 transition-all duration-150 hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
                        aria-label={s.label}
                      >
                        <s.icon className="h-4.5 w-4.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
