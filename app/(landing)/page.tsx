import { buildPageMetadata } from "@/lib/seo/metadata";
import { ArchitectureSection } from "./components/architecture-section";
import { CommandsSection } from "./components/commands-section";
import { CtaSection } from "./components/cta-section";
import { DetectorSection } from "./components/detector-section";
import { FeaturesSection } from "./components/features-section";
import { HarnessLoopSection } from "./components/harness-loop-section";
import { HarnessSection } from "./components/harness-section";
import { HeroSection } from "./components/hero-section";
import { LandingMotionRoot } from "./components/landing-motion-root";
import { ProblemSection } from "./components/problem-section";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata = buildPageMetadata({
  title: "fk-skills",
  description:
    "Trang giới thiệu fk-skills: skill thiết kế cho AI coding agents với 23 lệnh, harness engineering và 44 rule detector.",
  path: "/",
});

export default function HomePage() {
  return (
    <LandingMotionRoot>
      <SiteHeader />
      <HeroSection />
      <ProblemSection />
      <HarnessLoopSection />
      <ArchitectureSection />
      <HarnessSection />
      <CommandsSection />
      <DetectorSection />
      <FeaturesSection />
      <CtaSection />
      <SiteFooter />
    </LandingMotionRoot>
  );
}
