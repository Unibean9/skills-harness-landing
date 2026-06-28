import Image from "next/image";
import { ExternalLink, MonitorCheck, Terminal } from "lucide-react";

const toolCommands = [
  {
    title: "Codex CLI",
    command: "npx fk-skills tool --llm codex",
    note: "Dành cho workflow đang chạy bằng Codex CLI.",
    href: "https://developers.openai.com/codex/cli/",
    cta: "Tải Codex CLI",
  },
  {
    title: "Claude Code",
    command: "npx fk-skills tool",
    note: "Dành cho Claude CLI / Claude Code.",
    href: "https://docs.anthropic.com/en/docs/claude-code/setup",
    cta: "Tải Claude Code",
  },
];

export function UiToolSection() {
  return (
    <section id="ui-tool" className="reveal-block scroll-mt-20 bg-[#f5f4ed] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 bg-[#141413] px-3 py-2 text-sm font-black text-[#faf9f5]">
            <MonitorCheck className="size-4 text-[#d97757]" />
            UI TOOL
          </div>
          <h2 className="max-w-[13ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Check giao diện ngay trên màn hình
          </h2>
        </div>
        <p className="max-w-[74ch] text-lg leading-8 text-[#343430] lg:pb-2">
          Thay vì đọc report trong màn hình agent, tool mở một dashboard riêng ở
          <code className="mx-1 bg-[#e8e6dc] px-1.5 py-0.5 font-mono text-sm font-black text-[#141413]">localhost:4444</code>
          để bạn parse URL local, bấm quét, xem điểm review, vấn đề P1/P2 và cách sửa trực quan hơn.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.22fr_0.78fr] xl:items-stretch">
        <div className="self-start overflow-hidden border border-[#141413] bg-[#141413]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 px-4 py-3 text-[#faf9f5]">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-[#d97757]" />
              <p className="font-mono text-sm font-black">fk-skills tool · live audit surface</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-[#d8d4c9]">
              <span className="bg-white/10 px-2 py-1">CODEX</span>
              <span className="bg-white/10 px-2 py-1">44 RULES</span>
            </div>
          </div>
          <div className="bg-[#faf9f5] p-2 sm:p-3">
            <Image
              src="/tools/ui-tool.png"
              alt="fk-skills UI tool dashboard showing an AI review score, issue table, and scan result details."
              width={1854}
              height={936}
              sizes="(max-width: 1280px) 100vw, 62vw"
              className="h-auto w-full border border-[#dedacf]"
              loading="eager"
            />
          </div>
        </div>

        <div className="flex flex-col border border-[#dedacf] bg-[#faf9f5] p-5">
          <div>
            <div className="flex items-center gap-3">
              <Terminal className="size-5 text-[#c96442]" />
              <h3 className="text-2xl font-black">Cài bản có UI tool</h3>
            </div>
            <code className="mt-4 block overflow-x-auto bg-[#141413] px-4 py-3 font-mono text-sm font-black text-[#faf9f5]">
              npm install fk-skills@1.4.1
            </code>
          </div>

          <div className="mt-4 grid flex-1 gap-px border border-[#dedacf] bg-[#dedacf]">
            {toolCommands.map((item) => (
              <article key={item.title} className="flex flex-col justify-center bg-[#faf9f5] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5e5d59]">{item.note}</p>
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-black text-[#9d432a] transition hover:text-[#141413]"
                  >
                    {item.cta}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
                <code className="mt-3 block overflow-x-auto bg-[#f0eee6] px-3 py-2.5 font-mono text-sm font-black text-[#141413]">
                  {item.command}
                </code>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
