import { Terminal } from "lucide-react";

export function CtaSection() {
  return (
    <section className="reveal-block bg-[#c96442] px-4 py-14 text-[#faf9f5] md:px-6 lg:px-10 lg:py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="mb-4 text-sm font-black text-white/75">CÀI TỪ ROOT PROJECT</p>
          <h2 className="max-w-[14ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Cho agent một hệ thiết kế thật
          </h2>
          <p className="mt-5 max-w-[62ch] text-lg leading-8 text-white/88">
            Chạy installer, chọn provider, rồi dùng `/fk setup` để tạo context cho project.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <a href="#install" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#141413] px-5 font-black text-[#faf9f5] transition hover:bg-[#252520]">
            <Terminal className="size-4" />
            npx fk-skills install
          </a>
        </div>
      </div>
    </section>
  );
}
