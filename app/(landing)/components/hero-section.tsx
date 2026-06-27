import { Terminal } from "lucide-react";
import { CopyButton } from "./copy-button";
import { heroFeatures } from "./content";
import { HeroGallery } from "./hero/hero-gallery";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-x-clip bg-[#faf9f5] pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(217,119,87,0.16),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(120,140,93,0.16),transparent_26%),linear-gradient(180deg,#faf9f5_0%,#f5f4ed_78%,#f0eee6_100%)]" />
      <div className="relative z-10 grid w-full min-h-[calc(100vh-4rem)] gap-8 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,4.2fr)_minmax(0,7.8fr)] lg:items-center lg:gap-10 lg:px-10 lg:py-12">
        <div className="hero-copy self-center">
          <p className="mb-5 font-mono text-xs font-black text-[#c96442]">PREMIUM FRONTEND CRAFT · fk-skills</p>
          <h1 className="text-[clamp(2.85rem,5.2vw,5.75rem)] font-black leading-[0.9] tracking-[-0.04em] text-balance">
            Skill design cho agent
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg font-semibold leading-8 text-[#343430] text-pretty lg:text-xl">
            fk-skills là design skill system cho AI coding agents. Ship UI đẹp, nhất quán,
            với craft có thể kiểm chứng qua detector và harness workflow.
          </p>
          <div
            id="install"
            className="mt-8 flex w-full max-w-2xl items-center rounded-xl border border-[#e8e6dc] bg-white p-2 shadow-[0_8px_30px_rgba(20,20,19,0.06)]"
          >
            <Terminal className="ml-3 size-5 shrink-0 text-[#788c5d]" />
            <code className="min-w-0 flex-1 overflow-x-auto px-3 font-mono text-sm font-bold text-[#141413] sm:px-4">
              <span className="text-[#788c5d]">$</span> npx fk-skills install
            </code>
            <CopyButton />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {heroFeatures.map((feature) => (
              <div key={feature.title} className="border-t border-[#d9d4c7] pt-4">
                <feature.icon className="mb-3 size-5 text-[#c96442]" aria-hidden="true" />
                <h2 className="text-sm font-black">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#343430]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
        <HeroGallery />
      </div>
    </section>
  );
}
