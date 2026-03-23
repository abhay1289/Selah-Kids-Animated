"use client";

import Link from "next/link";
import Image from "next/image";
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
  Lock,
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out bg-[#FFFDF5]/95 backdrop-blur-xl ${
          scrolled
            ? "shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : ""
        }`}
        style={{ backdropFilter: "blur(20px) saturate(180%)" }}
      >
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-9 w-28 sm:h-10 sm:w-32 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 group-hover:rotate-[-1deg]">
              <Image
                src="/SK_Logo_FN.png"
                alt="Selah Kids"
                fill
                className="object-contain object-left transition-all duration-150 drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:flex">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`font-nav rounded-full px-3.5 py-2 text-[13px] transition-all duration-200 link-underline focus-ring ${
                  pathname === link.href
                    ? "text-[#F02D8A] bg-[#F02D8A]/8"
                    : "text-[#4A4A4A]/75 hover:text-[#4A4A4A] hover:bg-[#F09EBA]/8"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Desktop right — trust signal + actions */}
          <div className="hidden items-center gap-2 xl:flex">
            <div role="radiogroup" aria-label="Language" className="flex items-center rounded-full p-0.5 bg-[#F09EBA]/8">
              <button
                onClick={() => setLang("en")}
                role="radio"
                aria-checked={lang === "en"}
                className={`rounded-full px-3 py-1.5 text-[12px] font-bold transition-all duration-150 ${
                  lang === "en"
                    ? "bg-white text-[#4A4A4A] shadow-sm"
                    : "text-[#4A4A4A]/70 hover:text-[#4A4A4A]/90"
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
                    ? "bg-white text-[#4A4A4A] shadow-sm"
                    : "text-[#4A4A4A]/70 hover:text-[#4A4A4A]/90"
                }`}
              >
                ES
              </button>
            </div>

            <Link
              href="/donate"
              className="font-btn flex items-center gap-2 rounded-full bg-[#F02D8A] border-2 border-[#F09EBA] px-5 py-2 text-[13px] text-white shadow-[2px_2px_0_#F09EBA] transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0_#F09EBA] hover:scale-[1.03] active:translate-y-0 active:shadow-[2px_2px_0_#F09EBA] active:scale-[0.97] btn-shimmer focus-ring"
            >
              <Heart className="h-3.5 w-3.5" fill="currentColor" />
              {t("nav.donate")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 xl:hidden transition-colors duration-150 ease-out bg-[#F09EBA]/8 border-[#F09EBA]/50 hover:bg-[#F09EBA]/12"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-[#4A4A4A]" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-[59] bg-black/20 backdrop-blur-sm xl:hidden animate-[fade-in_0.2s_ease]" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-[60] w-full max-w-sm bg-[#FFFDF5] xl:hidden shadow-2xl animate-[slide-in-right_0.3s_cubic-bezier(0.16,1,0.3,1)]" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4">
              <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                <div className="relative h-9 w-28 sm:h-10 sm:w-32">
                  <Image
                    src="/SK_Logo_FN.png"
                    alt="Selah Kids"
                    fill
                    className="object-contain object-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  />
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[#F09EBA]/50 bg-[#F09EBA]/8 transition-colors duration-150 ease-out hover:bg-[#F09EBA]/12"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-[#4A4A4A]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-8 stagger-in">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-nav flex w-full max-w-xs items-center gap-3 rounded-xl px-5 py-3.5 text-[16px] transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#F02D8A]/8 text-[#F02D8A]"
                      : "text-[#4A4A4A]/75 hover:text-[#4A4A4A] hover:bg-[#F09EBA]/8"
                  }`}
                >
                  <link.icon className="h-4.5 w-4.5" />
                  {t(link.labelKey)}
                </Link>
              ))}

              <div className="my-3 w-full max-w-xs h-px bg-[#F09EBA]" />

              <div className="flex w-full max-w-xs items-center gap-2 rounded-xl px-5 py-3">
                <Globe className="h-4.5 w-4.5 text-[#4A4A4A]/70" />
                <div className="flex items-center rounded-full bg-[#F09EBA]/8 p-0.5">
                  <button
                    onClick={() => setLang("en")}
                    className={`rounded-full px-4 py-2 text-[14px] font-bold transition-all duration-150 ${
                      lang === "en"
                        ? "bg-white text-[#4A4A4A] shadow-sm"
                        : "text-[#4A4A4A]/70"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang("es")}
                    className={`rounded-full px-4 py-2 text-[14px] font-bold transition-all duration-150 ${
                      lang === "es"
                        ? "bg-white text-[#4A4A4A] shadow-sm"
                        : "text-[#4A4A4A]/70"
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
                  className="font-btn flex items-center justify-center gap-2 rounded-full bg-[#F02D8A] border-2 border-[#F09EBA] px-6 py-3.5 text-[15px] text-white shadow-[3px_3px_0_#F09EBA]"
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                  {t("nav.donate")}
                </Link>
                <a
                  href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-btn flex items-center justify-center gap-2 rounded-full border-2 border-[#F09EBA]/50 px-6 py-3 text-[15px] text-[#4A4A4A]/80"
                >
                  <Music className="h-4 w-4" />
                  {t("nav.subscribe")}
                </a>
              </div>
            </nav>
          </div>
        </div>
        </>
      )}
    </>
  );
}
