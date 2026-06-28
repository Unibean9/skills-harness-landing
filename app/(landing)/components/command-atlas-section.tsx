import { ArrowRight, MousePointer2, TerminalSquare } from "lucide-react";

const commandManualGroups = [
  {
    number: "01",
    title: "Khởi tạo & lên kế hoạch",
    intro: "Chạy đầu tiên để tạo ngữ cảnh mà các lệnh còn lại dựa vào.",
    example: "/fk plan thêm trang checkout mới",
    commands: [
      ["/fk setup", "Khởi tạo project mới, hỏi về users, brand, nguyên tắc thiết kế, rồi viết PRODUCT.md và DESIGN.md."],
      ["/fk plan", "Lên kế hoạch UX/UI trước khi code: discovery interview, xem mockup, tạo design brief được xác nhận."],
      ["/fk spec", "Đọc codebase hiện tại rồi tạo DESIGN.md từ màu sắc, font, spacing, radius và pattern đang dùng."],
      ["/fk build", "Flow đầy đủ từ yêu cầu đến build, xem bằng mắt, iterate cho đến khi đúng."],
    ],
  },
  {
    number: "02",
    title: "Đánh giá & kiểm tra",
    intro: "Tìm vấn đề trước khi sửa, tách UX review khỏi kiểm tra kỹ thuật.",
    example: "/fk check trang blog",
    commands: [
      ["/fk review", "Đánh giá UX tổng thể: hierarchy, IA, cognitive load, cảm xúc người dùng, persona và anti-pattern."],
      ["/fk check", "Kiểm tra accessibility, performance, responsive, theming; xuất P0-P3 và hướng xử lý cụ thể."],
    ],
  },
  {
    number: "03",
    title: "Cải thiện thị giác",
    intro: "Dùng khi UI chạy được nhưng chưa đẹp, chưa đúng chất, hoặc còn thô.",
    example: "/fk finish form thanh toán",
    commands: [
      ["/fk amplify", "Tăng visual impact khi design quá an toàn nhưng vẫn giữ usability."],
      ["/fk calm", "Giảm cường độ khi design quá chói, quá áp đảo hoặc thiếu nhịp thở."],
      ["/fk trim", "Bỏ những thứ không cần thiết để UI gọn, tập trung, ít ồn hơn."],
      ["/fk color", "Thêm màu chiến lược vào UI đang đơn điệu, xám hoặc thiếu vai trò màu."],
      ["/fk type", "Cải thiện typography: font, hierarchy, heading/body, size và weight."],
      ["/fk space", "Sửa layout, spacing, alignment, grid đơn điệu và hierarchy yếu."],
      ["/fk finish", "Pass cuối trước khi ship: alignment, spacing, inconsistency, chi tiết bóng hoặc thô."],
    ],
  },
  {
    number: "04",
    title: "Cảm xúc & chuyển động",
    intro: "Khi interface cần sống động hơn mà motion vẫn phục vụ trải nghiệm.",
    example: "/fk wow hero section",
    commands: [
      ["/fk joy", "Thêm moments of joy, micro-animation, chi tiết bất ngờ khiến UI thích dùng hơn."],
      ["/fk motion", "Thiết kế animation và micro-interaction có mục đích, không chỉ trang trí."],
      ["/fk wow", "Đẩy interface vượt giới hạn thường: shader, spring physics, scroll animation, 60fps."],
    ],
  },
  {
    number: "05",
    title: "Kỹ thuật & production",
    intro: "Hardening để UI sống được ngoài đời thật, trên dữ liệu và thiết bị thật.",
    example: "/fk responsive header navigation",
    commands: [
      ["/fk responsive", "Làm design hoạt động trên phone, tablet, desktop; touch target và fluid layout đúng."],
      ["/fk perf", "Chẩn đoán UI chậm, giật, animation nặng, ảnh chưa tối ưu hoặc bundle quá to."],
      ["/fk prod", "Xử lý error state, i18n, text overflow và edge case dữ liệu production."],
      ["/fk tokens", "Gom pattern lặp lại thành design tokens và components để giảm inconsistency."],
    ],
  },
  {
    number: "06",
    title: "Nội dung & onboarding",
    intro: "Chỉnh chữ trong UI và trải nghiệm đầu tiên của người dùng mới.",
    example: "/fk welcome flow onboarding mới",
    commands: [
      ["/fk copy", "Cải thiện error message, label, tooltip, hướng dẫn để rõ ràng và tự nhiên hơn."],
      ["/fk welcome", "Thiết kế onboarding, empty state, first-run flow để người dùng thấy value nhanh."],
    ],
  },
];

const liveSteps = [
  "Chọn element muốn chỉnh trên trang",
  "Chọn hành động: màu, layout, animation",
  "AI tạo 3 phiên bản khác nhau",
  "Preview trực tiếp và giữ bản thắng",
  "Code được áp dụng vào source file",
];

export function CommandAtlasSection() {
  return (
    <section id="command-atlas" className="reveal-block bg-[#e8e6dc] px-4 py-16 md:px-6 lg:px-10 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-[#141413] p-5 text-[#faf9f5]">
            <div className="flex items-center gap-3 text-[#d97757]">
              <TerminalSquare className="size-5" />
              <p className="font-mono text-sm font-black">23 LỆNH · 6 NHÓM</p>
            </div>
            <h2 className="mt-6 max-w-[10ch] text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
              Sổ tay điều khiển agent
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#d8d4c9]">
              Không cần nhớ prompt dài. Chọn đúng lệnh theo trạng thái của UI:
              khởi tạo, đánh giá, làm đẹp, thêm motion, hardening, hoặc onboarding.
            </p>
          </div>

          <div className="border-x border-b border-[#141413] bg-[#faf9f5] p-5">
            <p className="font-mono text-xs font-black text-[#c96442]">RUN ORDER</p>
            <div className="mt-4 grid gap-2">
              {["setup", "plan", "build", "check", "finish"].map((command, index) => (
                <div key={command} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center bg-[#141413] font-mono text-xs font-black text-[#faf9f5]">
                    {index + 1}
                  </span>
                  <code className="font-mono text-sm font-black text-[#141413]">/fk {command}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {commandManualGroups.map((group) => (
            <article key={group.title} className="border border-[#141413] bg-[#faf9f5]">
              <div className="grid gap-px bg-[#141413] lg:grid-cols-[170px_1fr]">
                <div className="bg-[#c96442] p-5 text-[#faf9f5]">
                  <p className="font-mono text-sm font-black text-white/75">NHÓM {group.number}</p>
                  <p className="mt-5 text-5xl font-black leading-none">{group.number}</p>
                </div>
                <div className="bg-[#faf9f5] p-5">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <h3 className="text-3xl font-black leading-tight">{group.title}</h3>
                      <p className="mt-3 max-w-[68ch] leading-7 text-[#5e5d59]">{group.intro}</p>
                    </div>
                    <code className="self-start bg-[#f0eee6] px-3 py-2 font-mono text-xs font-black text-[#9d432a]">
                      {group.example}
                    </code>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-[#dedacf]">
                {group.commands.map(([command, description]) => (
                  <div key={command} className="grid gap-3 px-5 py-4 md:grid-cols-[150px_1fr] md:items-start">
                    <code className="font-mono text-sm font-black text-[#c96442]">{command}</code>
                    <p className="leading-7 text-[#343430]">{description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <article className="grid overflow-hidden border border-[#141413] bg-[#141413] text-[#faf9f5] lg:grid-cols-[0.72fr_1.28fr]">
            <div className="p-6">
              <div className="flex items-center gap-3 text-[#d97757]">
                <MousePointer2 className="size-5" />
                <p className="font-mono text-sm font-black">ĐẶC BIỆT · LIVE MODE</p>
              </div>
              <h3 className="mt-6 text-4xl font-black leading-none tracking-[-0.04em]">
                Chỉnh ngay trên trình duyệt
              </h3>
              <p className="mt-5 leading-7 text-[#d8d4c9]">
                <code className="font-mono font-black text-[#faf9f5]">/fk live</code> cần dev server đang chạy.
                Chọn element, thử variant, hot-swap trực tiếp rồi giữ bản thắng.
              </p>
            </div>
            <div className="grid gap-px bg-white/12 sm:grid-cols-5">
              {liveSteps.map((step, index) => (
                <div key={step} className="bg-[#1e1e1c] p-4">
                  <p className="font-mono text-sm font-black text-[#d97757]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-4 text-sm font-bold leading-6 text-[#faf9f5]">{step}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-white/12 px-6 py-4 lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 font-black text-[#d97757]">
                <code>/fk live</code>
                <ArrowRight className="size-4" />
                <span className="text-[#faf9f5]">3 variant trong browser, giữ một bản, commit vào source.</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
