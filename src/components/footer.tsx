"use client";

import Link from "next/link";
import { Heart, Youtube, Music, Instagram } from "lucide-react";
import { useLanguage } from "@/context/language";

const explore = [
  { href: "/about", labelKey: "nav.about" },
  { href: "/watch", labelKey: "nav.watch" },
  { href: "/characters", labelKey: "nav.characters" },
  { href: "/parents", labelKey: "nav.parents" },
  { href: "/blog", labelKey: "nav.blog" },
];

const resources = [
  { href: "/resources", labelKey: "footer.downloads" },
  { href: "/donate", labelKey: "nav.donate" },
  { href: "/press", labelKey: "footer.press" },
  { href: "/contact", labelKey: "contact.title" },
];

const socials = [
  { href: "https://www.youtube.com/@SelahKidsWorship", label: "YouTube", icon: Youtube },
  { href: "https://www.instagram.com/selahkidsworship", label: "Instagram", icon: Instagram },
  { href: "https://open.spotify.com/artist/selahkids", label: "Spotify", icon: Music },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#2D2A26] overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,248,240,0.5) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#FFF8F0]/15 bg-[#E8663A]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" />
                  <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>
              <span className="font-heading text-[16px] text-[#FFF8F0] tracking-tight">Selah Kids</span>
            </div>
            <p className="text-[13px] text-[#FFF8F0]/30 leading-relaxed max-w-[240px]">{t("footer.desc")}</p>
            <div className="flex items-center gap-2 mt-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#FFF8F0]/8 text-[#FFF8F0]/30 transition-all duration-150 ease-out hover:bg-[#E8663A]/20 hover:text-[#FFF8F0] hover:border-[#E8663A]/30"
                  aria-label={s.label}>
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#E8B931] mb-4">{t("footer.explore")}</h4>
            <nav aria-label="Explore" className="flex flex-col gap-2.5">
              {explore.map((l) => (
                <Link key={l.href} href={l.href} className="text-[13px] font-medium text-[#FFF8F0]/30 hover:text-[#E8663A] transition-colors duration-150 py-0.5">
                  {t(l.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#4A7C5C] mb-4">{t("footer.resources")}</h4>
            <nav aria-label="Resources" className="flex flex-col gap-2.5">
              {resources.map((l) => (
                <Link key={l.href} href={l.href} className="text-[13px] font-medium text-[#FFF8F0]/30 hover:text-[#E8663A] transition-colors duration-150 py-0.5">
                  {t(l.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[12px] font-extrabold tracking-[0.15em] uppercase text-[#B8336A] mb-4">{t("footer.connect")}</h4>
            <a href="mailto:info.selahkids@gmail.com" className="text-[13px] font-medium text-[#FFF8F0]/25 hover:text-[#E8663A] transition-colors duration-150 block mb-3">
              info.selahkids@gmail.com
            </a>
            <div className="flex flex-col gap-2">
              <a href="https://www.youtube.com/@SelahKidsWorship" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-[#FFF8F0]/25 hover:text-[#E8663A] transition-colors duration-150">YouTube (English)</a>
              <a href="https://www.youtube.com/@SelahKidsEspa%C3%B1ol" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-[#FFF8F0]/25 hover:text-[#E8663A] transition-colors duration-150">YouTube (Espanol)</a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t-2 border-[#FFF8F0]/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[11px] text-[#FFF8F0]/15 font-medium">&copy; {new Date().getFullYear()} Selah Kids. {t("footer.rights")}</p>
          <div className="flex items-center gap-4">
            <Link href="/press" className="text-[11px] text-[#FFF8F0]/10 font-medium hover:text-[#FFF8F0]/25 transition-colors">{t("footer.privacy")}</Link>
            <Link href="/press" className="text-[11px] text-[#FFF8F0]/10 font-medium hover:text-[#FFF8F0]/25 transition-colors">{t("footer.terms")}</Link>
            <Link href="/parents" className="text-[11px] text-[#FFF8F0]/10 font-medium hover:text-[#FFF8F0]/25 transition-colors">{t("footer.coppa")}</Link>
          </div>
          <p className="text-[11px] text-[#FFF8F0]/8 font-medium flex items-center gap-1">
            {t("footer.made")} <Heart className="h-3 w-3 text-[#E8663A]" fill="currentColor" /> {t("footer.families")}
          </p>
        </div>
      </div>
    </footer>
  );
}
