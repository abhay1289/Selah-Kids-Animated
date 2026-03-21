"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  Music,
  Heart,
  Globe,
  Home,
  Info,
  Tv,
  Users,
  Shield,
  Download,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/context/language";

const primaryLinks = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/about", labelKey: "nav.about", icon: Info },
  { href: "/watch", labelKey: "nav.watch", icon: Tv },
  { href: "/characters", labelKey: "nav.characters", icon: Users },
  { href: "/parents", labelKey: "nav.parents", icon: Shield },
  { href: "/resources", labelKey: "nav.resources", icon: Download },
  { href: "/blog", labelKey: "nav.blog", icon: BookOpen },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && open) setOpen(false);
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
          scrolled
            ? "bg-[#FFF8F0]/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(45,42,38,0.06)]"
            : "bg-transparent"
        }`}
        style={scrolled ? { backdropFilter: "blur(20px) saturate(180%)" } : undefined}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#2D2A26] bg-[#E8663A] shadow-[2px_2px_0_#2D2A26] transition-transform duration-150 ease-out group-hover:scale-105 group-hover:rotate-[-6deg]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
            <span className={`font-heading text-[16px] tracking-tight transition-colors duration-150 ease-out group-hover:text-[#E8663A] ${
              isHome && !scrolled ? "text-[#FFF8F0]" : "text-[#2D2A26]"
            }`}>
              Selah Kids
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-150 ${
                  pathname === link.href
                    ? isHome && !scrolled
                      ? "text-[#FFF8F0] bg-[#FFF8F0]/15"
                      : "text-[#E8663A] bg-[#E8663A]/8"
                    : isHome && !scrolled
                      ? "text-[#FFF8F0]/50 hover:text-[#FFF8F0] hover:bg-[#FFF8F0]/8"
                      : "text-[#2D2A26]/45 hover:text-[#2D2A26] hover:bg-[#2D2A26]/5"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-2 xl:flex">
            <div role="radiogroup" aria-label="Language" className={`flex items-center rounded-full p-0.5 ${
              isHome && !scrolled ? "bg-[#FFF8F0]/8" : "bg-[#2D2A26]/5"
            }`}>
              <button
                onClick={() => setLang("en")}
                role="radio"
                aria-checked={lang === "en"}
                className={`rounded-full px-3 py-1.5 text-[12px] font-bold transition-all duration-150 ${
                  lang === "en"
                    ? "bg-white text-[#2D2A26] shadow-sm"
                    : isHome && !scrolled
                      ? "text-[#FFF8F0]/40 hover:text-[#FFF8F0]/60"
                      : "text-[#2D2A26]/40 hover:text-[#2D2A26]/60"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("es")}
                role="radio"
                aria-checked={lang === "es"}
                className={`rounded-full px-3 py-1.5 text-[12px] font-bold transition-all duration-150 ${
                  lang === "es"
                    ? "bg-white text-[#2D2A26] shadow-sm"
                    : isHome && !scrolled
                      ? "text-[#FFF8F0]/40 hover:text-[#FFF8F0]/60"
                      : "text-[#2D2A26]/40 hover:text-[#2D2A26]/60"
                }`}
              >
                ES
              </button>
            </div>

            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-full bg-[#E8663A] border-2 border-[#2D2A26] px-5 py-2 text-[13px] font-bold text-white shadow-[2px_2px_0_#2D2A26] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#2D2A26]"
            >
              <Heart className="h-3.5 w-3.5" fill="currentColor" />
              {t("nav.donate")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 xl:hidden transition-colors duration-150 ease-out ${
              isHome && !scrolled
                ? "bg-[#FFF8F0]/10 border-[#FFF8F0]/15 hover:bg-[#FFF8F0]/20"
                : "bg-[#2D2A26]/5 border-[#E8DDD0] hover:bg-[#2D2A26]/10"
            }`}
            aria-label="Open menu"
          >
            <Menu className={`h-5 w-5 ${isHome && !scrolled ? "text-[#FFF8F0]" : "text-[#2D2A26]"}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#FFF8F0] xl:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#2D2A26] bg-[#E8663A] shadow-[2px_2px_0_#2D2A26]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" />
                    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5" />
                  </svg>
                </div>
                <span className="font-heading text-[16px] tracking-tight text-[#2D2A26]">Selah Kids</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[#E8DDD0] bg-[#2D2A26]/5 transition-colors duration-150 ease-out hover:bg-[#2D2A26]/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-[#2D2A26]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-8">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex w-full max-w-xs items-center gap-3 rounded-xl px-5 py-3.5 text-[16px] font-semibold transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#E8663A]/8 text-[#E8663A]"
                      : "text-[#2D2A26]/45 hover:text-[#2D2A26] hover:bg-[#2D2A26]/5"
                  }`}
                >
                  <link.icon className="h-4.5 w-4.5" />
                  {t(link.labelKey)}
                </Link>
              ))}

              <div className="my-3 w-full max-w-xs h-px bg-[#E8DDD0]" />

              <div className="flex w-full max-w-xs items-center gap-2 rounded-xl px-5 py-3">
                <Globe className="h-4.5 w-4.5 text-[#2D2A26]/40" />
                <div className="flex items-center rounded-full bg-[#2D2A26]/5 p-0.5">
                  <button
                    onClick={() => setLang("en")}
                    className={`rounded-full px-4 py-2 text-[14px] font-bold transition-all duration-150 ${
                      lang === "en"
                        ? "bg-white text-[#2D2A26] shadow-sm"
                        : "text-[#2D2A26]/40"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang("es")}
                    className={`rounded-full px-4 py-2 text-[14px] font-bold transition-all duration-150 ${
                      lang === "es"
                        ? "bg-white text-[#2D2A26] shadow-sm"
                        : "text-[#2D2A26]/40"
                    }`}
                  >
                    Espanol
                  </button>
                </div>
              </div>

              <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#E8663A] border-2 border-[#2D2A26] px-6 py-3.5 text-[15px] font-bold text-white shadow-[3px_3px_0_#2D2A26]"
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                  {t("nav.donate")}
                </Link>
                <a
                  href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-[#E8DDD0] px-6 py-3 text-[15px] font-bold text-[#2D2A26]/50"
                >
                  <Music className="h-4 w-4" />
                  {t("nav.subscribe")}
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
