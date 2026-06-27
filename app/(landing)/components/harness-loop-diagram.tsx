import { ArrowRight } from "lucide-react";
import { harnessLoop } from "./content";

export function HarnessLoopDiagram() {
  const memorySteps = harnessLoop.slice(0, 2);
  const executionSteps = harnessLoop.slice(3);

  return (
    <div className="relative overflow-hidden border border-[#d9d4c7] bg-[#faf9f5]">
      <div className="grid border-b border-[#d9d4c7] md:grid-cols-[1fr_auto_1fr]">
        {memorySteps.map(([title, code, text], index) => (
          <article key={title} className="min-h-[180px] border-b border-[#d9d4c7] p-5 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs font-black text-[#c96442]">{String(index + 1).padStart(2, "0")}</p>
              <code className="bg-[#f0eee6] px-2 py-1 font-mono text-[11px] font-black text-[#343430]">{code}</code>
            </div>
            <h3 className="mt-8 text-3xl font-black leading-tight tracking-[-0.03em]">{title}</h3>
            <p className="mt-3 text-base font-semibold leading-7 text-[#5e5d59]">{text}</p>
          </article>
        ))}
        <div className="hidden w-24 place-items-center border-x border-[#d9d4c7] bg-[#f0eee6] md:grid">
          <ArrowRight className="size-5 text-[#c96442]" />
        </div>
      </div>

      <div className="relative border-b border-[#141413] bg-[#141413] px-5 py-6 text-[#faf9f5] md:px-7">
        <div className="loop-rail absolute inset-x-0 top-0 h-1 bg-[#c96442]" />
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1.1fr] md:items-center">
          <div>
            <p className="font-mono text-xs font-black text-[#d97757]">03 · /fk command</p>
            <h3 className="mt-2 text-4xl font-black leading-tight tracking-[-0.035em]">Intent biến thành workflow.</h3>
          </div>
          <div className="hidden h-px w-16 bg-white/18 md:block" />
          <p className="max-w-[44ch] text-base leading-7 text-[#d8d4c9]">
            Command là chỗ harness khác prompt: nó quyết định lúc nào hỏi, lúc nào build, lúc nào check, và rule nào phải chạy.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3">
        {executionSteps.map(([title, code, text], index) => (
          <article key={title} className="min-h-[190px] border-b border-[#d9d4c7] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs font-black text-[#c96442]">{String(index + 4).padStart(2, "0")}</p>
              <code className="bg-[#f0eee6] px-2 py-1 font-mono text-[11px] font-black text-[#343430]">{code}</code>
            </div>
            <h3 className="mt-8 text-3xl font-black leading-tight tracking-[-0.03em]">{title}</h3>
            <p className="mt-3 text-base font-semibold leading-7 text-[#5e5d59]">{text}</p>
          </article>
        ))}
      </div>

      <div className="grid border-t border-[#d9d4c7] bg-[#f0eee6] md:grid-cols-[1fr_auto] md:items-center">
        <p className="p-5 text-base font-bold leading-7 text-[#343430]">
          Sau mỗi vòng, context quay lại repo: brief rõ hơn, design rule sắc hơn, detector có thêm tín hiệu để lần sau ít sửa vặt hơn.
        </p>
        <div className="border-t border-[#d9d4c7] p-5 md:border-l md:border-t-0">
          <code className="font-mono text-sm font-black text-[#c96442]">read → build → verify → remember</code>
        </div>
      </div>
    </div>
  );
}
