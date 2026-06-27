import { Check } from "lucide-react";
import { HeroChart } from "./hero-chart";

export function HeroWorkspace() {
  return (
    <div className="hero-workspace relative w-full min-h-[620px] lg:min-h-[680px] xl:min-h-[720px]">
      <div className="relative h-[min(420px,52vw)] min-h-[360px] overflow-hidden pb-10 lg:h-[440px] lg:pb-12 xl:h-[480px]">
        <div className="hero-panel absolute inset-x-0 top-0 z-10 h-full overflow-hidden rounded-lg border border-[#141413] bg-[#141413] text-[#faf9f5] shadow-[0_28px_56px_-16px_rgba(20,20,19,0.34)]">
          <div className="grid h-full grid-cols-[88px_1fr] lg:grid-cols-[104px_1fr]">
            <aside className="border-r border-white/12 bg-[#0d0d0c] p-3.5 lg:p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-md bg-[#faf9f5] text-[11px] font-black text-[#141413]">fk</span>
                <span className="text-xs font-black">fk-skills</span>
              </div>
              <p className="mb-2 font-mono text-[9px] font-black tracking-wide text-[#87867f]">SKILLS</p>
              {["layout", "typography", "color", "spacing"].map((item, index) => (
                <div key={item} className="mb-2 flex items-center gap-2 text-[11px] text-[#d8d4c9]">
                  <span className={index % 2 ? "size-1.5 rounded-full bg-[#788c5d]" : "size-1.5 rounded-full bg-[#c96442]"} />
                  {item}
                </div>
              ))}
              <p className="mb-2 mt-4 font-mono text-[9px] font-black tracking-wide text-[#87867f]">DETECTORS</p>
              {["contrast", "alignment", "motion"].map((item) => (
                <div key={item} className="mb-2 flex items-center gap-2 text-[11px] text-[#d8d4c9]">
                  <span className="size-1.5 rounded-full bg-[#788c5d]" />
                  {item}
                </div>
              ))}
            </aside>
            <main className="p-4 lg:p-5">
              <div className="flex h-full flex-col overflow-hidden rounded-lg bg-[#faf9f5] text-[#141413]">
                <div className="px-5 pt-5 lg:px-6 lg:pt-6">
                  <p className="font-mono text-[11px] font-black text-[#c96442]">Analytics</p>
                  <h2 className="mt-1.5 max-w-[16ch] text-2xl font-black leading-tight text-balance lg:text-[1.85rem]">
                    Data thúc đẩy quyết định
                  </h2>
                </div>
                <div className="mt-4 w-full">
                  <HeroChart />
                </div>
                <div className="mt-auto px-5 pb-5 pt-4 lg:px-6 lg:pb-6">
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <p className="text-[11px] font-semibold text-[#5e5d59]">Active users</p>
                      <p className="text-3xl font-black">24.6K</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#5e5d59]">Sessions</p>
                      <p className="text-3xl font-black text-[#788c5d]">+18%</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 rounded-md bg-[#c96442] px-4 py-2 text-xs font-black text-[#faf9f5]"
                  >
                    View dashboard
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div className="hero-panel absolute bottom-1.5 right-2 z-20 w-[min(42%,228px)] rounded-lg border border-[#d9d4c7] bg-[#faf9f5] p-3.5 text-[#141413] shadow-[0_16px_32px_-12px_rgba(20,20,19,0.18)] lg:bottom-3 lg:right-2.5">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] font-black text-[#c96442]">DETECTOR · SPACING</p>
            <span className="rounded bg-[#c96442]/12 px-2 py-0.5 font-mono text-[9px] font-black text-[#c96442]">FAIL</span>
          </div>
          <div className="overflow-hidden rounded-md border border-[#c96442]/35 bg-[#f5f4ed] px-4 py-3.5">
            <div className="relative mx-auto w-[68%]">
              <span className="absolute -left-4 top-1/2 -translate-y-1/2 font-mono text-[9px] font-black text-[#c96442]">16</span>
              <span className="absolute -right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] font-black text-[#c96442]">16</span>
              <div className="mb-1 flex items-center gap-1">
                <span className="h-px flex-1 bg-[#c96442]" />
                <span className="font-mono text-[9px] font-black text-[#c96442]">24</span>
                <span className="h-px flex-1 bg-[#c96442]" />
              </div>
              <div className="relative overflow-hidden rounded-sm border border-[#c96442]/30 bg-white">
                <div className="scan-line absolute inset-x-0 top-0 h-px bg-[#c96442]/55" />
                <div className="h-9" aria-hidden="true" />
              </div>
              <div className="mt-1 flex items-center gap-1">
                <span className="h-px flex-1 bg-[#c96442]" />
                <span className="font-mono text-[9px] font-black text-[#c96442]">32</span>
                <span className="h-px flex-1 bg-[#c96442]" />
              </div>
            </div>
          </div>
          <button type="button" className="mt-2.5 w-full rounded-md bg-[#141413] py-2 text-[11px] font-black text-[#faf9f5]">
            Apply fix
          </button>
        </div>

        <div className="float-chip hero-panel absolute right-1 top-0 z-30 w-[196px] rounded-lg border border-[#d9d4c7] bg-[#faf9f5] p-3.5 text-[#141413] shadow-[0_14px_32px_-10px_rgba(20,20,19,0.2)] lg:top-0.5 lg:right-2">
          <div className="flex gap-3">
            <div className="w-1.5 shrink-0 self-stretch rounded-full bg-[#788c5d]" />
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-black text-[#c96442]">CRAFT SCORE</p>
              <p className="text-[3rem] font-black leading-none">92</p>
              <p className="mt-1.5 text-[11px] font-semibold leading-[1.35] text-[#343430]">
                Great work. A few polish items left.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-5 grid gap-4 sm:grid-cols-[minmax(0,1.15fr)_minmax(220px,0.85fr)] lg:mt-6">
        <div className="hero-panel rounded-lg border border-[#141413] bg-[#0e0e0d] p-4 font-mono text-[11px] leading-6 text-[#d8d4c9] shadow-[0_12px_24px_-10px_rgba(20,20,19,0.28)]">
          <p>
            <span className="text-[#87867f]">&lt;section</span>{" "}
            <span className="text-[#788c5d]">class</span>=
            <span className="text-[#d97757]">&quot;py-24 bg-[#faf9f5]&quot;</span>
            <span className="text-[#87867f]">&gt;</span>
          </p>
          <p className="pl-3">
            <span className="text-[#87867f]">&lt;div</span>{" "}
            <span className="text-[#788c5d]">class</span>=
            <span className="text-[#d97757]">&quot;container mx-auto&quot;</span>
            <span className="text-[#87867f]">&gt;</span>
          </p>
          <p className="hero-code-line pl-6 text-[#c96442]">...</p>
        </div>

        <div className="hero-panel rounded-lg border border-[#141413] bg-[#0e0e0d] p-4 text-[#faf9f5] shadow-[0_12px_24px_-10px_rgba(20,20,19,0.28)]">
          <p className="font-mono text-[11px] font-black text-[#d97757]">fk-skills check</p>
          {[
            ["contrast", "pass"],
            ["alignment", "pass"],
            ["motion", "warn"],
            ["focus-state", "pass"],
          ].map(([item, state]) => (
            <div key={item} className="mt-2.5 flex items-center justify-between text-xs">
              <span>{item}</span>
              {state === "pass" ? (
                <Check className="size-3 text-[#788c5d]" />
              ) : (
                <span className="size-2 rounded-full bg-[#d97757]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
