import { BadgeCheck } from "lucide-react";
import { detectorRules } from "./content";

export function DetectorSection() {
  return (
    <section id="detector" className="reveal-block bg-[#141413] px-4 py-16 text-[#faf9f5] md:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-sm font-black text-[#d97757]">DETECTOR</p>
          <h2 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            44 rule bắt lỗi AI slop
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-[#d8d4c9]">
            Rule chạy trên HTML/CSS, không cần LLM hay API key. Nó giúp agent thấy lỗi cụ thể
            trước khi bạn phải review bằng mắt.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/12 bg-white/12 sm:grid-cols-2">
          {detectorRules.map((rule) => (
            <div key={rule} className="flex min-h-16 items-center gap-3 bg-[#1e1e1c] p-4">
              <BadgeCheck className="size-4 text-[#d97757]" />
              <span className="font-bold">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
