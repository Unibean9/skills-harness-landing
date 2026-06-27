import { commandGroups } from "./content";
import { SectionLabel } from "./section-label";

export function CommandsSection() {
  return (
    <section id="commands" className="commands-section reveal-block bg-[#faf9f5] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <SectionLabel>23 LỆNH</SectionLabel>
          <h2 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Ngôn ngữ chung giữa bạn và agent
          </h2>
        </div>
        <p className="max-w-[76ch] self-end text-lg leading-8 text-[#343430]">
          Mỗi command là một workflow có quy tắc riêng. Khi bạn gọi `/fk finish` hay `/fk wow`,
          agent biết phải đọc context nào, kiểm chứng ra sao, và dừng ở đâu.
        </p>
      </div>
      <div className="grid border-l border-t border-[#dedacf] md:grid-cols-2 xl:grid-cols-3">
        {commandGroups.map((group, index) => (
          <article key={group.group} className="border-b border-r border-[#dedacf] p-6">
            <p className="font-mono text-sm font-black text-[#c96442]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-6 text-3xl font-black leading-tight">{group.group}</h3>
            <p className="mt-4 min-h-[84px] leading-7 text-[#5e5d59]">{group.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.commands.map((command) => (
                <code key={command} className="bg-[#f0eee6] px-2.5 py-1.5 font-mono text-xs font-black text-[#c96442]">
                  /fk {command}
                </code>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
