"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingMotionRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const heroCopyItems = gsap.utils.toArray<HTMLElement>(".hero-copy > *");
      if (heroCopyItems.length) {
        gsap.from(heroCopyItems, {
          y: 20,
          duration: 0.75,
          stagger: 0.08,
          ease: "power4.out",
        });
      }

      const heroGallery = root.querySelector<HTMLElement>(".hero-gallery");
      if (heroGallery) {
        gsap.from(heroGallery, {
          y: 20,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.12,
        });
      }

      const heroPanels = gsap.utils.toArray<HTMLElement>(".hero-panel");
      if (heroPanels.length) {
        gsap.from(heroPanels, {
          y: 24,
          duration: 0.85,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.14,
        });
      }

      const heroSteps = gsap.utils.toArray<HTMLElement>(".hero-step");
      if (heroSteps.length) {
        gsap.from(heroSteps, {
          y: 14,
          duration: 0.65,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.45,
        });
      }

      const heroCodeLine = root.querySelector<HTMLElement>(".hero-code-line");
      if (heroCodeLine) {
        gsap.to(heroCodeLine, {
          color: "#d97757",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const scanLine = root.querySelector<HTMLElement>(".scan-line");
      if (scanLine) {
        gsap.to(scanLine, {
          y: 34,
          repeat: -1,
          yoyo: true,
          duration: 1.7,
          ease: "power2.inOut",
        });
      }

      const loopRail = root.querySelector<HTMLElement>(".loop-rail");
      if (loopRail) {
        gsap.fromTo(
          loopRail,
          { scaleX: 0.12, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "power3.inOut",
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.from(block, {
          y: 36,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: block, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".float-chip").forEach((chip, index) => {
        gsap.to(chip, {
          y: index % 2 ? -8 : 8,
          duration: 2.4 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const commandLine = root.querySelector(".command-line");
      const commandsSection = root.querySelector(".commands-section");
      if (commandLine && commandsSection) {
        gsap.to(commandLine, {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: commandsSection,
            start: "top 70%",
            end: "bottom 72%",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main id="top" ref={rootRef} className="min-w-0 overflow-x-clip bg-[#f5f4ed] text-[#141413]">
      {children}
    </main>
  );
}
