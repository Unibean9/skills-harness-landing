import { SectionLabel } from "./section-label";
import { HarnessLoopDiagram } from "./harness-loop-diagram";

export function HarnessLoopSection() {
  return (
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
  );
}
