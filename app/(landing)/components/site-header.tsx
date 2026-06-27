"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { primaryNav } from "./content";

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const hiddenRef = useRef(false);
  const lastScrollY = useRef(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tweenTo = (y: string) => {
      if (reducedMotion) {
        gsap.set(header, { y });
        return;
      }

      gsap.to(header, {
        y,
        duration: 0.55,
        ease: "power4.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);

      if (reducedMotion) return;

      const delta = currentY - lastScrollY.current;

      if (currentY < 48) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          tweenTo("0%");
        }
      } else if (delta > 10 && currentY > 96 && !hiddenRef.current) {
        hiddenRef.current = true;
        tweenTo("-100%");
      } else if (delta < -6 && hiddenRef.current) {
        hiddenRef.current = false;
        tweenTo("0%");
      }

      lastScrollY.current = currentY;
    };

    gsap.set(header, { y: "0%" });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(header);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between border-b px-4 transition-[background-color,box-shadow,border-color] duration-500 ease-out will-change-transform md:px-6 lg:px-10",
        scrolled
          ? "border-[#e8e6dc]/85 bg-[#faf9f5]/92 shadow-[0_10px_32px_rgba(20,20,19,0.08)] backdrop-blur-md"
          : "border-[#e8e6dc] bg-[#faf9f5]/78 backdrop-blur-sm",
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-black tracking-[-0.02em]" aria-label="fk-skills home">
        <span className="grid size-8 place-items-center rounded-md bg-[#141413] text-[11px] text-[#faf9f5]">fk</span>
        <span>fk-skills</span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-semibold text-[#343430] lg:flex" aria-label="Primary navigation">
        {primaryNav.map(([label, href]) => (
          <a key={href} href={`#${href}`} className="transition hover:text-[#c96442] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c96442]/35">
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#install"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#c96442] px-4 text-sm font-bold text-[#faf9f5] transition hover:bg-[#d97757] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d97757]/35"
      >
        Cài đặt
      </a>
    </header>
  );
}
