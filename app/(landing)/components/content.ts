import {
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export const harnessRows = [
  ["Codex CLI", ".agents/skills + .codex/hooks", "Project-local hoặc global"],
  ["Claude Code", ".claude/skills", "Project hoặc user-level"],
  ["Cursor", ".cursor/rules + skill assets", "Tích hợp theo workspace"],
  ["Gemini CLI", ".gemini/skills", "Cần bật Skills trong settings"],
  ["OpenCode", ".opencode", "Copy/link từ dist"],
];

export const engineeringCompare = [
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

export const promptFailureModes = [
  ["UI chung chung", "Model kéo về template quen: card grid, gradient, spacing đều đều, thiếu cá tính project."],
  ["Không cá nhân hóa", "Không có PRODUCT.md/DESIGN.md nên agent không biết brand voice, users, anti-reference, tokens."],
  ["Quy trình mơ hồ", "Không rõ lúc nào phải hỏi, lúc nào build, lúc nào check, lúc nào polish."],
  ["Build theo cảm tính", "Mỗi lần prompt là một hướng khác; kết quả phụ thuộc may rủi và memory của chat."],
  ["Sửa lắt nhắt", "Không làm rõ từ đầu nên phải sửa từng lỗi nhỏ: màu, spacing, motion, responsive, copy."],
];

export const harnessLocks = [
  ["Setup", "Ghi PRODUCT.md và DESIGN.md để thống nhất bối cảnh trước khi làm."],
  ["Plan", "Buộc discovery/brief khi việc cần định hình, không nhảy thẳng vào code."],
  ["Command", "Mỗi intent có flow riêng: build, check, finish, motion, wow, prod."],
  ["Detector", "Rule tất định bắt slop trên HTML/CSS trước khi review bằng mắt."],
  ["Harness", "Installer map đúng provider, scope, hook và live config để workflow chạy thật."],
];

export const harnessLoop = [
  ["Product truth", "PRODUCT.md", "Mục tiêu, users, anti-reference, voice."],
  ["Design truth", "DESIGN.md", "Tokens, component rules, spacing, motion."],
  ["Intent", "/fk command", "Plan, build, finish, check, wow có flow riêng."],
  ["Build", "Agent edits", "Code theo context, không tự bịa style."],
  ["Verify", "Detector", "44 rule bắt overflow, contrast, responsive, AI slop."],
  ["Finish", "Ship loop", "Polish, review, commit lại bài học vào context."],
];

export const commandGroups = [
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

export const detectorRules = [
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

export const heroWorkflowSteps = [
  { num: "01", title: "plan", text: "Lập plan và scope UI có intent", tone: "sky" as const },
  { num: "02", title: "build", text: "Generate polished FE", tone: "clay" as const, active: true },
  { num: "03", title: "check", text: "Chạy detector rules", tone: "olive" as const },
  { num: "04", title: "finish", text: "Polish chi tiết cuối", tone: "ink" as const },
  { num: "05", title: "wow", text: "Thêm craft đáng nhớ", tone: "terracotta" as const },
];

export const heroFeatures = [
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

export const bestFeatures = [
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

export const footerColumns = [
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
      ["UI Tool", "#ui-tool"],
      ["Cài đặt", "#install"],
    ],
  },
] as const;

export const primaryNav = [
  ["Vấn đề", "problem"],
  ["Context", "architecture"],
  ["Harness", "harness"],
  ["Commands", "commands"],
  ["Detector", "detector"],
  ["UI Tool", "ui-tool"],
] as const;

export type HeroWorkflowTone = (typeof heroWorkflowSteps)[number]["tone"];
