"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clipboard,
  GitBranch,
  Radar,
  ScanSearch,
  ShieldCheck,
  Terminal,
  Workflow,
  Wrench,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const harnessRows = [
  ["Codex CLI", ".agents/skills + .codex/hooks", "Project-local hoặc global"],
  ["Claude Code", ".claude/skills", "Project hoặc user-level"],
  ["Cursor", ".cursor/rules + skill assets", "Tích hợp theo workspace"],
  ["Gemini CLI", ".gemini/skills", "Cần bật Skills trong settings"],
  ["OpenCode", ".opencode", "Copy/link từ dist"],
];

const engineeringCompare = [
  {
    title: "Prompt engineering",
    tone: "quiet",
    points: [
      "Một đoạn hướng dẫn tốt nhưng thường nằm ngoài repo.",
      "Khó biết agent đã đọc đúng lúc chưa.",
      "Không tự map sang folder, provider, hook hay live mode.",
      "Không có detector chạy độc lập để kiểm chứng output.",
    ],
  },
  {
    title: "Harness engineering",
    tone: "strong",
    points: [
      "Skill được đóng gói theo format mà từng agent thật sự đọc được.",
      "Installer phát hiện Codex, Claude, Cursor, Gemini, OpenCode.",
      "Link đúng command, hook, detector, live config và scope project/global.",
      "Biến design taste thành workflow có thể lặp lại trong codebase.",
    ],
  },
];

const commandGroups = [
  {
    group: "Khởi tạo & lên kế hoạch",
    commands: ["setup", "plan", "spec", "build"],
    text: "Tạo context, document design system, lập brief UX/UI và build end-to-end.",
  },
  {
    group: "Đánh giá & kiểm tra",
    commands: ["review", "check"],
    text: "Chấm UX, a11y, responsive, performance, theming và surface risk trước khi ship.",
  },
  {
    group: "Cải thiện thị giác",
    commands: ["amplify", "calm", "trim", "color", "type", "space", "finish"],
    text: "Tăng/giảm cường độ, chỉnh màu, type, spacing và polish các chi tiết cuối.",
  },
  {
    group: "Cảm xúc & chuyển động",
    commands: ["joy", "motion", "wow"],
    text: "Thiết kế micro-interaction, scroll motion, cinematic effect có reduced-motion fallback.",
  },
  {
    group: "Production",
    commands: ["responsive", "perf", "prod", "tokens"],
    text: "Hardening UI: edge cases, text overflow, bundle/perf, token hóa pattern dùng lại.",
  },
  {
    group: "Nội dung & live iteration",
    commands: ["copy", "welcome", "live"],
    text: "Viết UX copy, onboarding/empty state và thử variant trực tiếp trong browser.",
  },
];

const detectorRules = [
  "Gradient text trang trí",
  "Card lồng trong card",
  "Chữ xám trên nền màu",
  "Touch target quá nhỏ",
  "Heading scale quá lớn",
  "Line length quá dài",
  "Motion bounce/elastic",
  "Focus state bị thiếu",
  "Text overflow ở mobile",
  "Shadow/glow thiếu kiểm soát",
  "Repeated section eyebrow",
  "Responsive grid gãy",
];

const bestFeatures = [
  {
    icon: Workflow,
    title: "Workflow có trạng thái",
    text: "Mỗi lệnh có flow riêng: discovery, brief, build, verify, finish. Agent không nhảy thẳng vào code khi chưa hiểu bối cảnh.",
  },
  {
    icon: Wrench,
    title: "Harness engineering",
    text: "Installer phát hiện provider, link đúng folder, hỗ trợ project/global, hook detector và live mode theo môi trường thật.",
  },
  {
    icon: ShieldCheck,
    title: "Rule trước taste",
    text: "Detector chạy rule tất định không cần API key, giúp bắt lỗi AI slop trước khi phải nhờ LLM đánh giá.",
  },
  {
    icon: Radar,
    title: "Live iteration",
    text: "Khi dev server chạy, bạn chọn element trong browser, tạo variant, preview ngay, rồi giữ phiên bản thắng.",
  },
];

const disciplines = [
  ["Typography", "Type scale rõ, không chọn font theo phản xạ, tránh heading vỡ trên mobile."],
  ["Color & Contrast", "Palette theo brand, contrast đạt chuẩn, không lạm dụng gradient tím xanh."],
  ["Spatial Design", "Spacing có nhịp, layout có thứ bậc, không biến mọi thứ thành card grid."],
  ["Responsive", "Thiết kế cho màn nhỏ trước, grid tự thích nghi theo nội dung thật."],
  ["Interaction", "State rõ ràng, affordance thật, không dùng modal hoặc hover như lối thoát duy nhất."],
  ["Motion", "Chuyển động có mục đích, easing chắc, luôn có reduced-motion fallback."],
];

function CopyButton() {
  return (
    <button
      type="button"
      aria-label="Copy install command"
      onClick={() => navigator.clipboard?.writeText("npx fk-skills install")}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#c96442] text-[#faf9f5] transition hover:bg-[#d97757] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d97757]/35"
    >
      <Clipboard className="size-4 transition group-active:scale-90" />
    </button>
  );
}

function HeroDiagram() {
  return (
    <div className="hero-diagram relative min-h-[520px] w-full lg:min-h-[620px]">
      <div className="absolute left-[3%] right-[3%] top-6 border border-[#d9d4c7] bg-[#141413] text-[#faf9f5]">
        <div className="flex items-center justify-between border-b border-white/12 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-[#faf9f5] text-xs font-black text-[#141413]">fk</span>
            <div>
              <p className="text-sm font-black">fk-skills harness</p>
              <p className="text-xs text-white/55">design behavior installed into the agent</p>
            </div>
          </div>
          <span className="rounded-md bg-[#252520] px-3 py-1 font-mono text-xs text-[#d97757]">v1.4.1</span>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-4">
          {[
            ["01", "Detect", "Codex, Claude, Cursor, Gemini"],
            ["02", "Load", "PRODUCT.md + DESIGN.md"],
            ["03", "Run", "23 command workflows"],
            ["04", "Verify", "44 detector rules"],
          ].map(([step, title, text]) => (
            <div key={title} className="min-h-[150px] bg-[#1d1d1a] p-5">
              <p className="font-mono text-xs font-black text-[#d97757]">{step}</p>
              <h3 className="mt-6 text-2xl font-black tracking-[-0.025em]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d8d4c9]">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid border-t border-white/12 md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-5">
            <p className="mb-3 font-mono text-xs font-black text-[#788c5d]">$ npx fk-skills install</p>
            <div className="space-y-2 font-mono text-sm leading-7 text-[#d8d4c9]">
              <p><span className="text-[#d97757]">→</span> find harness directories</p>
              <p><span className="text-[#d97757]">→</span> link skill files, commands, hooks</p>
              <p><span className="text-[#788c5d]">✓</span> repeatable UI workflow ready</p>
            </div>
          </div>
          <div className="border-t border-white/12 bg-[#0e0e0d] p-5 md:border-l md:border-t-0">
            <p className="text-xs font-black text-[#d97757]">PROJECT MEMORY</p>
            <div className="mt-4 grid gap-2">
              <div className="bg-[#252520] px-3 py-2 font-mono text-sm">PRODUCT.md</div>
              <div className="bg-[#252520] px-3 py-2 font-mono text-sm">DESIGN.md</div>
              <div className="bg-[#252520] px-3 py-2 font-mono text-sm">detector hooks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scan-panel absolute bottom-8 left-0 w-[52%] border border-[#d9d4c7] bg-[#faf9f5] p-5 text-[#141413]">
        <div className="mb-4 flex items-center gap-2">
          <ScanSearch className="size-5 text-[#c96442]" />
          <p className="font-black">Detector feedback</p>
        </div>
        <div className="relative h-32 border border-[#d9d4c7] bg-[#f5f4ed] p-4">
          <div className="scan-line absolute left-3 right-3 top-8 h-px bg-[#c96442]" />
          <div className="space-y-3">
            <div className="h-3 w-11/12 rounded bg-[#d8d2c4]" />
            <div className="h-3 w-7/12 rounded bg-[#d8d2c4]" />
            <div className="h-3 w-10/12 rounded bg-[#c96442]/35" />
            <div className="h-3 w-8/12 rounded bg-[#788c5d]/35" />
          </div>
        </div>
      </div>

      <div className="float-chip absolute bottom-0 right-0 w-[310px] border border-[#141413] bg-[#c96442] p-5 text-[#faf9f5]">
        <p className="font-mono text-xs text-white/72">harness &gt; prompt</p>
        <p className="mt-2 text-2xl font-black leading-tight">Design skill sống trong project, không trôi trong chat.</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm font-black text-[#c96442]">{children}</p>;
}

export function FkSkillsLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", {
        y: 20,
        duration: 0.75,
        stagger: 0.08,
        ease: "power4.out",
      });

      gsap.from(".hero-diagram > *", {
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.1,
      });

      gsap.to(".scan-line", {
        y: 88,
        repeat: -1,
        yoyo: true,
        duration: 1.7,
        ease: "power2.inOut",
      });

      gsap.utils.toArray<HTMLElement>(".reveal-block").forEach((block) => {
        gsap.from(block, {
          y: 36,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: block, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".float-chip").forEach((chip, index) => {
        gsap.to(chip, {
          y: index % 2 ? -8 : 8,
          duration: 2.4 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const commandLine = root.querySelector(".command-line");
      const commandsSection = root.querySelector(".commands-section");
      if (commandLine && commandsSection) {
        gsap.to(commandLine, {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: commandsSection,
            start: "top 70%",
            end: "bottom 72%",
            scrub: true,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="overflow-hidden bg-[#f5f4ed] text-[#141413]">
      <section className="relative min-h-screen bg-[#faf9f5]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(217,119,87,0.16),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(120,140,93,0.16),transparent_26%),linear-gradient(180deg,#faf9f5_0%,#f5f4ed_78%,#f0eee6_100%)]" />
        <header className="relative z-10 flex min-h-16 items-center justify-between border-b border-[#e8e6dc] px-5 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-2 font-black tracking-[-0.02em]" aria-label="fk-skills home">
            <span className="grid size-8 place-items-center rounded-md bg-[#141413] text-[11px] text-[#faf9f5]">fk</span>
            <span>fk-skills</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#343430] lg:flex" aria-label="Primary navigation">
            {[
              ["Deslop", "problem"],
              ["Context", "architecture"],
              ["Harness", "harness"],
              ["Commands", "commands"],
              ["Detector", "detector"],
            ].map(([label, href]) => (
              <a key={href} href={`#${href}`} className="transition hover:text-[#c96442]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com/ThinhTP204/fk-skills" className="hidden items-center gap-2 text-sm font-semibold md:flex">
              <GitBranch className="size-4" />
              GitHub
            </a>
            <a href="#install" className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#141413] px-4 text-sm font-bold text-[#faf9f5] transition hover:bg-[#c96442]">
              Cài đặt
            </a>
          </div>
        </header>

        <div className="relative z-10 grid min-h-[calc(100vh-4rem)] gap-10 px-5 py-14 md:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:px-16 lg:py-20">
          <div className="hero-copy self-center">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#f0eee6] px-3 py-1.5 text-xs font-black text-[#c96442]">HARNESS-FIRST DESIGN SKILL</span>
              <span className="text-xs font-bold text-[#5e5d59]">1 SKILL · 23 LỆNH · 44 RULES</span>
            </div>
            <h1 className="text-[clamp(3.25rem,8.1vw,6rem)] font-black leading-[0.88] tracking-[-0.04em] [text-wrap:balance]">
              Cài design skill vào agent của bạn
            </h1>
            <p className="mt-7 max-w-[58ch] text-xl font-semibold leading-8 text-[#343430] [text-wrap:pretty]">
              Một skill frontend design được harness hóa: có memory của project, command rõ intent,
              detector kiểm lỗi, và installer biết từng môi trường agent.
            </p>
            <div id="install" className="mt-8 flex max-w-[560px] items-center border border-[#e8e6dc] bg-white p-2">
              <Terminal className="ml-3 size-5 text-[#788c5d]" />
              <code className="min-w-0 flex-1 overflow-x-auto px-4 font-mono text-sm font-bold text-[#141413]">npx fk-skills install</code>
              <CopyButton />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Memory", "PRODUCT.md + DESIGN.md"],
                ["Workflow", "23 command intents"],
                ["Verification", "44 detector rules"],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-[#d9d4c7] pt-4">
                  <h2 className="text-sm font-black">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5e5d59]">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroDiagram />
        </div>
      </section>

      <section id="problem" className="reveal-block bg-[#fbfaf6] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
          <div>
            <SectionLabel>DESLOPIFICATION</SectionLabel>
            <h2 className="max-w-[14ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Gỡ phản xạ AI khỏi từng discipline
            </h2>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-[#343430]">
              Skill không làm model thành designer giỏi hơn trong một lần. Nó dọn các mặc định xấu:
              từ type, màu, spacing, responsive đến motion và copy.
            </p>
          </div>
          <div className="grid auto-rows-fr gap-4 md:grid-cols-3 xl:grid-cols-6">
            {disciplines.map(([title, text], index) => (
              <article key={title} className="flex min-h-[380px] flex-col border border-[#dedacf] bg-[#faf9f5] p-5">
                <p className="mb-8 font-mono text-sm font-black text-[#c96442]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-black leading-tight">{title}</h3>
                <p className="mt-5 text-base leading-7 text-[#5e5d59]">{text}</p>
                <div className="mt-auto h-24 border border-[#e8e6dc] bg-[#f0eee6]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="reveal-block bg-[#f0eee6] px-5 py-4 md:px-10">
        <div className="grid border border-[#e1ded2] bg-[#faf9f5] lg:grid-cols-2">
          <article className="border-b border-[#e1ded2] p-8 lg:border-r lg:p-12">
            <p className="font-mono text-sm font-black text-[#c96442]">01</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">PRODUCT.md là trí nhớ chiến lược.</h2>
            <p className="mt-8 max-w-[68ch] text-lg leading-8 text-[#343430]">
              File này trả lời “đang thiết kế cho ai, để làm gì, tránh điều gì, nguyên tắc nào quan trọng”.
              Khi agent chạy `/fk plan`, `/fk build`, `/fk review`, nó không đoán brief từ prompt ngắn nữa.
            </p>
            <div className="mt-10 border border-[#d9d4c7] bg-[#f5f4ed] font-mono text-sm">
              <div className="border-b border-[#d9d4c7] bg-[#d9d4c7] px-5 py-3 text-[#5e5d59]">PRODUCT.md · loaded before intent</div>
              <div className="space-y-2 p-5 leading-7">
                <p><span className="text-[#788c5d]">✓</span> users, purpose, register</p>
                <p><span className="text-[#788c5d]">✓</span> brand personality, anti-references</p>
                <p><span className="text-[#788c5d]">✓</span> design principles and accessibility</p>
                <p><span className="text-[#c96442]">→</span> every command starts from the same product truth</p>
              </div>
            </div>
          </article>
          <article className="border-b border-[#e1ded2] p-8 lg:p-12">
            <p className="font-mono text-sm font-black text-[#c96442]">02</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">DESIGN.md là trí nhớ thị giác.</h2>
            <p className="mt-8 max-w-[62ch] text-lg leading-8 text-[#343430]">
              File này mô tả màu, type, spacing, component conventions và visual system. Agent dùng nó để
              khớp style hiện có thay vì phát minh lại mỗi lần.
            </p>
            <div className="mt-10 border border-[#d9d4c7] bg-[#faf9f5] text-sm">
              {[
                ["TOKENS", "Colors, fonts, radius, spacing scale."],
                ["COMPONENTS", "Button, card, input, table, navigation patterns."],
                ["LAYOUT", "Grid, density, section rhythm, responsive rules."],
                ["MOTION", "Easing, reduced motion, interaction behavior."],
              ].map(([label, text]) => (
                <div key={label} className="grid gap-4 border-b border-[#e8e6dc] px-5 py-4 last:border-0 sm:grid-cols-[120px_1fr]">
                  <span className="font-mono font-black text-[#c96442]">{label}</span>
                  <span className="font-semibold text-[#343430]">{text}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="border-b border-[#e1ded2] p-8 lg:border-r lg:border-b-0 lg:p-12">
            <p className="font-mono text-sm font-black text-[#c96442]">03</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">Áp dụng vào từng lệnh.</h2>
            <p className="mt-8 max-w-[54ch] text-lg leading-8 text-[#343430]">
              `/fk plan` dùng PRODUCT.md để hỏi đúng. `/fk build` dùng DESIGN.md để code đúng hệ.
              `/fk check` và detector soi lại output theo rule cụ thể.
            </p>
          </article>
          <article className="p-8 lg:p-12">
            <p className="font-mono text-sm font-black text-[#c96442]">04</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">Quan trọng vì nó sống cùng dự án.</h2>
            <p className="mt-8 max-w-[68ch] text-lg leading-8 text-[#343430]">
              Hai file này có thể commit, review, cập nhật và dùng lại giữa nhiều agent. Team không phụ thuộc
              vào trí nhớ của một phiên chat.
            </p>
          </article>
        </div>
      </section>

      <section id="harness" className="reveal-block bg-[#c96442] px-5 py-20 text-[#faf9f5] md:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="mb-4 text-sm font-black text-white/78">HARNESS ENGINEERING</p>
            <h2 className="max-w-[12ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Phần riêng làm skill này khác prompt
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/88">
              Prompt engineering là viết hướng dẫn tốt. Harness engineering là đóng gói hướng dẫn đó
              thành skill mà từng agent thật sự nạp được, gọi được, hook được và kiểm chứng được.
            </p>
          </div>
          <div className="grid gap-px border border-white/24 bg-white/20 md:grid-cols-2">
            {engineeringCompare.map((item) => (
              <article key={item.title} className={item.tone === "strong" ? "bg-[#141413] p-6" : "bg-[#faf9f5] p-6 text-[#141413]"}>
                <p className={item.tone === "strong" ? "font-mono text-sm font-black text-[#d97757]" : "font-mono text-sm font-black text-[#c96442]"}>
                  {item.title}
                </p>
                <div className="mt-8 space-y-4">
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

      <section id="commands" className="commands-section reveal-block bg-[#faf9f5] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
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

      <section id="detector" className="reveal-block bg-[#141413] px-5 py-20 text-[#faf9f5] md:px-10 lg:px-16 lg:py-28">
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

      <section className="reveal-block bg-[#f0eee6] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="mb-12 max-w-[780px]">
          <SectionLabel>TÍNH NĂNG ĐÁNG GIÁ</SectionLabel>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Không chỉ là một bộ prompt
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {bestFeatures.map((feature, index) => (
            <article key={feature.title} className={index === 1 ? "bg-[#141413] p-6 text-[#faf9f5]" : "border border-[#dedacf] bg-[#faf9f5] p-6"}>
              <feature.icon className={index === 1 ? "mb-6 size-6 text-[#d97757]" : "mb-6 size-6 text-[#c96442]"} />
              <h3 className="text-2xl font-black">{feature.title}</h3>
              <p className={index === 1 ? "mt-3 text-base leading-7 text-[#d8d4c9]" : "mt-3 text-base leading-7 text-[#5e5d59]"}>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal-block bg-[#faf9f5] px-5 pb-10 md:px-10 lg:px-16">
        <div className="grid gap-8 bg-[#c96442] p-8 text-[#faf9f5] md:grid-cols-[1fr_auto] md:items-end lg:p-12">
          <div>
            <p className="mb-4 text-sm font-black text-white/75">CÀI TỪ ROOT PROJECT</p>
            <h2 className="max-w-[14ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Cho agent một hệ thiết kế thật
            </h2>
            <p className="mt-5 max-w-[62ch] text-lg leading-8 text-white/88">
              Chạy installer, chọn provider, rồi dùng `/fk setup` để tạo context cho project.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#install" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#141413] px-5 font-black text-[#faf9f5] transition hover:bg-[#252520]">
              <Terminal className="size-4" />
              npx fk-skills install
            </a>
            <a href="https://github.com/ThinhTP204/fk-skills" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#faf9f5] px-5 font-black text-[#141413] transition hover:bg-[#f0eee6]">
              Xem repo
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#faf9f5] px-5 pb-8 text-sm text-[#5e5d59] md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-3 border-t border-[#d9d4c7] pt-6 md:flex-row">
          <span>fk-skills · landing page tiếng Việt theo hệ màu Claude terracotta</span>
          <a href="#install" className="inline-flex items-center gap-1 font-bold text-[#141413]">
            Bắt đầu cài đặt <ArrowRight className="size-4" />
          </a>
        </div>
      </footer>
    </main>
  );
}
