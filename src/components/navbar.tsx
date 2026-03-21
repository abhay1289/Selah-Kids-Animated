"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Music } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl border-b-2 border-[#FF6B35]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6B35] shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5"/>
            </svg>
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-[#2D1B69]" : "text-[#2D1B69]"
          }`}>
            Selah Kids
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-300 ${
                pathname === link.href
                  ? "text-[#FF6B35] bg-[#FF6B35]/8"
                  : scrolled
                    ? "text-[#2D1B69]/50 hover:text-[#2D1B69] hover:bg-[#2D1B69]/5"
                    : "text-[#2D1B69]/50 hover:text-[#2D1B69] hover:bg-white/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 flex items-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-[14px] font-bold text-white transition-all hover:bg-[#FF8F6B] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,107,53,0.3)]"
          >
            <Music className="h-4 w-4" />
            Subscribe
          </a>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6B35]/10 md:hidden">
            <Menu className="h-5 w-5 text-[#2D1B69]" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-[#FFF8F0] border-l-2 border-[#FF6B35]/10">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex items-center gap-2.5 pb-8 pt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6B35] shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5"/>
                  <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2.5"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#2D1B69]">Selah Kids</span>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-all ${
                    pathname === link.href
                      ? "bg-[#FF6B35]/10 text-[#FF6B35]"
                      : "text-[#2D1B69]/40 hover:text-[#2D1B69] hover:bg-[#2D1B69]/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4" />
              <a
                href="https://www.youtube.com/@SelahKidsWorship?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3.5 text-[15px] font-bold text-white shadow-lg"
              >
                <Music className="h-4 w-4" />
                Subscribe on YouTube
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
