import { Check } from "lucide-react";
import { engineeringCompare, harnessLocks, harnessRows } from "./content";

export function HarnessSection() {
  return (
    <section id="harness" className="reveal-block bg-[#c96442] px-4 py-16 text-[#faf9f5] md:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.66fr_1.34fr]">
        <div>
          <p className="mb-4 text-sm font-black text-white/78">HARNESS ENGINEERING</p>
          <h2 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Khóa quy trình ở đúng chỗ
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/88">
            Harness engineering là phần biến lời khuyên thiết kế thành đường ray vận hành:
            agent biết đọc gì, gọi lệnh nào, kiểm bằng rule nào, và cài vào provider nào.
          </p>
        </div>
        <div className="grid gap-px border border-white/24 bg-white/24">
          {harnessLocks.map(([title, text], index) => (
            <article key={title} className={index === 4 ? "grid gap-4 bg-[#141413] p-5 md:grid-cols-[160px_1fr]" : "grid gap-4 bg-[#faf9f5] p-5 text-[#141413] md:grid-cols-[160px_1fr]"}>
              <div>
                <p className={index === 4 ? "font-mono text-sm font-black text-[#d97757]" : "font-mono text-sm font-black text-[#c96442]"}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-black">{title}</h3>
              </div>
              <p className={index === 4 ? "self-center text-lg leading-8 text-[#d8d4c9]" : "self-center text-lg leading-8 text-[#343430]"}>
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-px border border-white/24 bg-white/24 lg:grid-cols-2">
        {engineeringCompare.map((item) => (
          <article key={item.title} className={item.tone === "strong" ? "bg-[#141413] p-6" : "bg-[#faf9f5] p-6 text-[#141413]"}>
            <p className={item.tone === "strong" ? "font-mono text-sm font-black text-[#d97757]" : "font-mono text-sm font-black text-[#c96442]"}>
              {item.title}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {item.points.map((point) => (
                <div key={point} className="flex gap-3">
                  <Check className={item.tone === "strong" ? "mt-1 size-4 shrink-0 text-[#d97757]" : "mt-1 size-4 shrink-0 text-[#788c5d]"} />
                  <p className={item.tone === "strong" ? "leading-7 text-[#d8d4c9]" : "leading-7 text-[#343430]"}>{point}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-px border border-white/24 bg-white/24 md:grid-cols-4">
        {[
          ["Repeatable", "Một workflow chạy lại được, không phụ thuộc prompt nhớ hay quên."],
          ["Portable", "Context và design system đi cùng repo, dùng được qua nhiều agent."],
          ["Enforceable", "Detector và hook biến rule thiết kế thành kiểm tra thật."],
          ["Team-safe", "Project/global scope rõ, dễ review và không phá setup người khác."],
        ].map(([title, text]) => (
          <div key={title} className="bg-[#c96442] p-5">
            <h3 className="text-2xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-white/86">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border border-white/24 p-5">
          <p className="font-mono text-sm font-black text-white/78">INSTALLER PIPELINE</p>
          <div className="mt-6 space-y-3 font-mono text-sm leading-7 text-white/88">
            <p><span className="text-[#141413]">01</span> detect provider folders</p>
            <p><span className="text-[#141413]">02</span> choose scope: project/global</p>
            <p><span className="text-[#141413]">03</span> link commands and skill files</p>
            <p><span className="text-[#141413]">04</span> wire detector/live hooks</p>
          </div>
        </div>
        <div className="border border-white/24 bg-[#141413]">
          <div className="grid grid-cols-[1fr_1.4fr_1fr] border-b border-white/16 px-4 py-3 text-sm font-black text-[#d97757]">
            <span>Harness</span>
            <span>Điểm cài</span>
            <span>Phạm vi</span>
          </div>
          {harnessRows.map(([name, path, scope]) => (
            <div key={name} className="grid grid-cols-[1fr_1.4fr_1fr] gap-3 border-b border-white/12 px-4 py-5 text-sm last:border-0">
              <span className="font-black text-[#faf9f5]">{name}</span>
              <code className="break-words font-mono text-[#d8d4c9]">{path}</code>
              <span className="text-[#d8d4c9]">{scope}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
