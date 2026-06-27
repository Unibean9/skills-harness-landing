"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clipboard,
  GitBranch,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  Wrench,
  Zap,
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

const promptFailureModes = [
  ["UI chung chung", "Model kéo về template quen: card grid, gradient, spacing đều đều, thiếu cá tính project."],
  ["Không cá nhân hóa", "Không có PRODUCT.md/DESIGN.md nên agent không biết brand voice, users, anti-reference, tokens."],
  ["Quy trình mơ hồ", "Không rõ lúc nào phải hỏi, lúc nào build, lúc nào check, lúc nào polish."],
  ["Build theo cảm tính", "Mỗi lần prompt là một hướng khác; kết quả phụ thuộc may rủi và memory của chat."],
  ["Sửa lắt nhắt", "Không làm rõ từ đầu nên phải sửa từng lỗi nhỏ: màu, spacing, motion, responsive, copy."],
];

const harnessLocks = [
  ["Setup", "Ghi PRODUCT.md và DESIGN.md để thống nhất bối cảnh trước khi làm."],
  ["Plan", "Buộc discovery/brief khi việc cần định hình, không nhảy thẳng vào code."],
  ["Command", "Mỗi intent có flow riêng: build, check, finish, motion, wow, prod."],
  ["Detector", "Rule tất định bắt slop trên HTML/CSS trước khi review bằng mắt."],
  ["Harness", "Installer map đúng provider, scope, hook và live config để workflow chạy thật."],
];

const harnessLoop = [
  ["Product truth", "PRODUCT.md", "Mục tiêu, users, anti-reference, voice."],
  ["Design truth", "DESIGN.md", "Tokens, component rules, spacing, motion."],
  ["Intent", "/fk command", "Plan, build, finish, check, wow có flow riêng."],
  ["Build", "Agent edits", "Code theo context, không tự bịa style."],
  ["Verify", "Detector", "44 rule bắt overflow, contrast, responsive, AI slop."],
  ["Finish", "Ship loop", "Polish, review, commit lại bài học vào context."],
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

const heroWorkflowSteps = [
  { num: "01", title: "plan", text: "Lập plan và scope UI có intent", tone: "sky" as const },
  { num: "02", title: "build", text: "Generate polished FE", tone: "clay" as const, active: true },
  { num: "03", title: "check", text: "Chạy detector rules", tone: "olive" as const },
  { num: "04", title: "finish", text: "Polish chi tiết cuối", tone: "ink" as const },
  { num: "05", title: "wow", text: "Thêm craft đáng nhớ", tone: "terracotta" as const },
];

const heroFeatures = [
  {
    icon: Sparkles,
    title: "Premium craft",
    text: "Pattern UI cao cấp, không kéo về template AI.",
  },
  {
    icon: ScanSearch,
    title: "Verifiable quality",
    text: "44 rule detector bắt slop trước khi ship.",
  },
  {
    icon: Zap,
    title: "Agent-native",
    text: "Plan → build → check → finish trong harness.",
  },
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

const footerColumns = [
  {
    title: "Khám phá",
    links: [
      ["Vấn đề prompt", "#problem"],
      ["Context loop", "#architecture"],
      ["Harness", "#harness"],
    ],
  },
  {
    title: "Công cụ",
    links: [
      ["23 lệnh", "#commands"],
      ["Detector 44 rule", "#detector"],
      ["Cài đặt", "#install"],
    ],
  },
  {
    title: "Nguồn",
    links: [
      ["GitHub", "https://github.com/ThinhTP204/fk-skills"],
      ["Install command", "#install"],
    ],
  },
] as const;

const primaryNav = [
  ["Vấn đề", "problem"],
  ["Context", "architecture"],
  ["Harness", "harness"],
  ["Commands", "commands"],
  ["Detector", "detector"],
] as const;

function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const hiddenRef = useRef(false);
  const lastScrollY = useRef(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tweenTo = (y: string) => {
      if (reducedMotion) {
        gsap.set(header, { y });
        return;
      }

      gsap.to(header, {
        y,
        duration: 0.55,
        ease: "power4.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 12);

      if (reducedMotion) return;

      const delta = currentY - lastScrollY.current;

      if (currentY < 48) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          tweenTo("0%");
        }
      } else if (delta > 10 && currentY > 96 && !hiddenRef.current) {
        hiddenRef.current = true;
        tweenTo("-100%");
      } else if (delta < -6 && hiddenRef.current) {
        hiddenRef.current = false;
        tweenTo("0%");
      }

      lastScrollY.current = currentY;
    };

    gsap.set(header, { y: "0%" });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(header);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "site-header fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between border-b px-4 transition-[background-color,box-shadow,border-color] duration-500 ease-out will-change-transform md:px-6 lg:px-10",
        scrolled
          ? "border-[#e8e6dc]/85 bg-[#faf9f5]/92 shadow-[0_10px_32px_rgba(20,20,19,0.08)] backdrop-blur-md"
          : "border-[#e8e6dc] bg-[#faf9f5]/78 backdrop-blur-sm",
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-black tracking-[-0.02em]" aria-label="fk-skills home">
        <span className="grid size-8 place-items-center rounded-md bg-[#141413] text-[11px] text-[#faf9f5]">fk</span>
        <span>fk-skills</span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-semibold text-[#343430] lg:flex" aria-label="Primary navigation">
        {primaryNav.map(([label, href]) => (
          <a key={href} href={`#${href}`} className="transition hover:text-[#c96442] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c96442]/35">
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#install"
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#c96442] px-4 text-sm font-bold text-[#faf9f5] transition hover:bg-[#d97757] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d97757]/35"
      >
        Cài đặt
      </a>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="footer-shell reveal-block relative overflow-hidden bg-[#141413] text-[#faf9f5]">
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,#788c5d_22%,#c96442_50%,#d97757_78%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute right-0 bottom-0 select-none overflow-hidden opacity-[0.04]" aria-hidden="true">
        <p className="translate-y-1/4 text-[clamp(7rem,22vw,15rem)] font-black leading-none tracking-[-0.06em]">fk</p>
      </div>

      <div className="relative px-4 py-14 md:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.55fr))] lg:gap-10 xl:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 font-black tracking-[-0.02em]" aria-label="fk-skills home">
              <span className="grid size-9 place-items-center rounded-md bg-[#faf9f5] text-xs text-[#141413]">fk</span>
              <span className="text-lg">fk-skills</span>
            </Link>
            <p className="mt-5 max-w-[38ch] text-base leading-7 text-[#d8d4c9] text-pretty">
              Design skill system cho AI coding agents — harness, detector, và workflow frontend có thể kiểm chứng.
            </p>
            <a
              href="#install"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-[#c96442] px-4 text-sm font-black text-[#faf9f5] transition hover:bg-[#d97757] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d97757]/35"
            >
              <Terminal className="size-4" aria-hidden="true" />
              npx fk-skills install
            </a>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-xs font-black text-[#d97757]">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm font-semibold text-[#d8d4c9] transition hover:text-[#faf9f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97757]/40"
                      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between lg:mt-16">
          <p className="text-sm text-[#87867f]">© 2026 fk-skills · Craft frontend với agent workflow</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#install"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#faf9f5] transition hover:text-[#d97757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97757]/40"
            >
              Cài đặt ngay
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/ThinhTP204/fk-skills"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#87867f] transition hover:text-[#faf9f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="size-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href="#top"
              className="text-sm font-semibold text-[#87867f] transition hover:text-[#faf9f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              Lên đầu trang
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

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

function stepToneColor(tone: (typeof heroWorkflowSteps)[number]["tone"]) {
  const tones = {
    sky: "#6a9bcc",
    clay: "#d97757",
    olive: "#788c5d",
    ink: "#141413",
    terracotta: "#c96442",
  } as const;
  return tones[tone];
}

function HeroChart() {
  return (
    <svg
      viewBox="0 0 360 96"
      className="block h-[104px] w-full lg:h-[120px]"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c96442" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#c96442" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="76" x2="360" y2="76" stroke="#e8e6dc" strokeWidth="1" />
      <line x1="0" y1="52" x2="360" y2="52" stroke="#f0eee6" strokeWidth="1" />
      <line x1="0" y1="28" x2="360" y2="28" stroke="#f0eee6" strokeWidth="1" />
      <path
        d="M0 58 L36 50 L72 54 L108 34 L144 38 L180 24 L216 28 L252 16 L288 20 L324 12 L360 16 L360 96 L0 96 Z"
        fill="url(#heroChartFill)"
      />
      <path
        d="M0 58 L36 50 L72 54 L108 34 L144 38 L180 24 L216 28 L252 16 L288 20 L324 12 L360 16"
        fill="none"
        stroke="#d97757"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroStepper() {
  return (
    <div className="hero-stepper relative flex min-h-[620px] flex-col justify-between py-8 lg:min-h-[680px]" aria-hidden="true">
      <div className="absolute bottom-2 left-[6px] top-2 w-px bg-[#d9d4c7]" />
      {heroWorkflowSteps.map((step) => (
        <div key={step.title} className="hero-step relative z-10">
          <div className="flex items-start gap-3">
            <span
              className="relative z-10 mt-1 size-3 shrink-0 rounded-full border-2 bg-[#faf9f5]"
              style={{ borderColor: stepToneColor(step.tone) }}
            />
            <div className="min-w-0 pr-2">
              <p className="font-mono text-xs font-black leading-none" style={{ color: stepToneColor(step.tone) }}>
                {step.num} {step.title}
              </p>
              <p className="mt-2 text-xs font-medium leading-[1.4] text-[#343430]">{step.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroWorkspace() {
  return (
    <div className="hero-workspace relative w-full min-h-[620px] lg:min-h-[680px] xl:min-h-[720px]">
      {/* Stage: dashboard + detector + craft score */}
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

        <div className="hero-panel absolute -bottom-1 right-0 z-20 w-[min(42%,228px)] translate-y-1 rounded-lg border border-[#d9d4c7] bg-[#faf9f5] p-3.5 text-[#141413] shadow-[0_16px_32px_-12px_rgba(20,20,19,0.18)] lg:-bottom-2 lg:translate-y-2">
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

        <div className="float-chip hero-panel absolute right-0 top-0 z-30 w-[196px] rounded-lg border border-[#d9d4c7] bg-[#faf9f5] p-3.5 text-[#141413] shadow-[0_14px_32px_-10px_rgba(20,20,19,0.2)] lg:top-0.5">
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

      {/* Dock: code + check — no overlap */}
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

function HeroGallery() {
  return (
    <div className="hero-gallery hidden w-full min-w-0 md:grid md:grid-cols-[minmax(152px,176px)_minmax(0,1fr)] md:items-start md:gap-5 lg:gap-7 xl:gap-9">
      <HeroStepper />
      <HeroWorkspace />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm font-black text-[#c96442]">{children}</p>;
}

function HarnessLoopDiagram() {
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
        <div className="loop-rail absolute left-5 right-5 top-0 h-1 bg-[#c96442] md:left-7 md:right-7" />
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

export function FkSkillsLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const heroCopyItems = gsap.utils.toArray<HTMLElement>(".hero-copy > *");
      if (heroCopyItems.length) {
        gsap.from(heroCopyItems, {
          y: 20,
          duration: 0.75,
          stagger: 0.08,
          ease: "power4.out",
        });
      }

      const heroGallery = root.querySelector<HTMLElement>(".hero-gallery");
      if (heroGallery) {
        gsap.from(heroGallery, {
          y: 20,
          duration: 0.9,
          ease: "power4.out",
          delay: 0.12,
        });
      }

      const heroPanels = gsap.utils.toArray<HTMLElement>(".hero-panel");
      if (heroPanels.length) {
        gsap.from(heroPanels, {
          y: 24,
          duration: 0.85,
          stagger: 0.07,
          ease: "power4.out",
          delay: 0.14,
        });
      }

      const heroSteps = gsap.utils.toArray<HTMLElement>(".hero-step");
      if (heroSteps.length) {
        gsap.from(heroSteps, {
          y: 14,
          duration: 0.65,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.45,
        });
      }

      const heroCodeLine = root.querySelector<HTMLElement>(".hero-code-line");
      if (heroCodeLine) {
        gsap.to(heroCodeLine, {
          color: "#d97757",
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      const scanLine = root.querySelector<HTMLElement>(".scan-line");
      if (scanLine) {
        gsap.to(scanLine, {
          y: 34,
          repeat: -1,
          yoyo: true,
          duration: 1.7,
          ease: "power2.inOut",
        });
      }

      const loopRail = root.querySelector<HTMLElement>(".loop-rail");
      if (loopRail) {
        gsap.fromTo(
          loopRail,
          { scaleX: 0.12, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "power3.inOut",
          },
        );
      }

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
    <main id="top" ref={rootRef} className="min-w-0 overflow-x-clip bg-[#f5f4ed] text-[#141413]">
      <SiteHeader />
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

      <section className="reveal-block bg-[#fbfaf6] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <SectionLabel>VÒNG LẶP HARNESS</SectionLabel>
            <h2 className="max-w-[13ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Làm rõ từ đầu để không sửa lắt nhắt
            </h2>
            <p className="mt-6 max-w-[60ch] text-lg leading-8 text-[#343430]">
              Harness engineering khóa quy trình ở những điểm prompt hay trôi: context phải được nạp,
              intent phải đi qua command, output phải qua detector, và bài học quay lại project memory.
            </p>
          </div>
          <HarnessLoopDiagram />
        </div>
      </section>

      <section id="architecture" className="reveal-block bg-[#f0eee6] px-4 py-4 md:px-6">
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

      <section className="reveal-block bg-[#f0eee6] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
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

      <SiteFooter />
    </main>
  );
}
