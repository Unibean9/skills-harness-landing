import { promptFailureModes } from "./content";

export function ProblemSection() {
  return (
    <section id="problem" className="reveal-block bg-[#141413] px-4 py-16 text-[#faf9f5] md:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
        <div>
          <p className="mb-4 text-sm font-black text-[#d97757]">VÌ SAO PROMPT CHƯA ĐỦ</p>
          <h2 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            100 prompt không đảm bảo 100 UI đẹp
          </h2>
          <p className="mt-6 max-w-[62ch] text-lg leading-8 text-[#d8d4c9]">
            Prompt tốt giúp nói ý định. Nhưng để đi xa, agent cần một quy trình đã được khóa:
            context rõ từ đầu, command đúng việc, detector kiểm lại, và harness đảm bảo nó chạy
            trong project thật.
          </p>
        </div>
        <div className="grid auto-rows-fr gap-px border border-white/12 bg-white/12 md:grid-cols-2 xl:grid-cols-5">
          {promptFailureModes.map(([title, text], index) => (
            <article key={title} className="min-h-[260px] bg-[#1e1e1c] p-5">
              <p className="font-mono text-sm font-black text-[#d97757]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-8 text-[clamp(1.45rem,2vw,2rem)] font-black leading-tight [text-wrap:balance]">{title}</h3>
              <p className="mt-5 break-words text-base leading-7 text-[#d8d4c9] [overflow-wrap:anywhere]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
