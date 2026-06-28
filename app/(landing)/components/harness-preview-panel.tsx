"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { previewTerminalBodyClass } from "./preview-terminal-viewport";

const harnessCategories = [
  {
    id: "setup",
    name: "Setup",
    images: [
      {
        src: "/harness/setup-1.png",
        alt: "Setup step 1 - read context",
        caption: "Khởi tạo môi trường: Phân tích dự án, đọc PRODUCT.md và chọn register.",
      },
      {
        src: "/harness/setup-2.png",
        alt: "Setup step 2 - write settings",
        caption: "Thiết lập harness: Tự động phát hiện cấu hình và liên kết commands.",
      },
    ],
  },
  {
    id: "plan",
    name: "Plan",
    images: [
      {
        src: "/harness/plan-1.png",
        alt: "Plan step 1 - interview",
        caption: "Khảo sát yêu cầu: Đặt câu hỏi discovery trực tiếp làm rõ bối cảnh UX/UI.",
      },
      {
        src: "/harness/plan-2.png",
        alt: "Plan step 2 - design brief",
        caption: "Tạo brief thiết kế: Xác lập color strategy, fonts, states trước khi code.",
      },
      {
        src: "/harness/plan-3.png",
        alt: "Plan step 3 - confirmation",
        caption: "Xác nhận thiết kế: Gate yêu cầu người dùng duyệt brief rồi mới triển khai.",
      },
    ],
  },
  {
    id: "review",
    name: "Review",
    images: [
      {
        src: "/harness/review-1.png",
        alt: "Review step 1 - heuristic check",
        caption: "Đánh giá heuristics: Quét các quy chuẩn thiết kế, chỉ ra lỗi và chấm điểm.",
      },
      {
        src: "/harness/review-2.png",
        alt: "Review step 2 - detailed warning",
        caption: "Phân tích chi tiết: Đưa ra các giải thích trực quan để sửa lỗi giao diện.",
      },
    ],
  },
  {
    id: "output",
    name: "Output",
    images: [
      {
        src: "/harness/output-1.png",
        alt: "Harness output 1",
        caption: "Kết quả đầu ra 1: Giao diện hoàn thiện cao cấp, phối màu OKLCH hài hòa, typographic voice mạnh mẽ.",
      },
      {
        src: "/harness/output-2.png",
        alt: "Harness output 2",
        caption: "Kết quả đầu ra 2: Thiết kế responsive mượt mà trên mobile, tuân thủ chặt chẽ rule a11y và contrast.",
      },
    ],
  },
] as const;

type HarnessTab = (typeof harnessCategories)[number]["id"];

export function HarnessPreviewPanel() {
  const [activeTab, setActiveTab] = useState<HarnessTab>("setup");
  const [indices, setIndices] = useState<Record<HarnessTab, number>>({
    setup: 0,
    plan: 0,
    review: 0,
    output: 0,
  });

  const currentImages = harnessCategories.find((cat) => cat.id === activeTab)?.images ?? [];
  const currentIndex = indices[activeTab] ?? 0;
  const currentImage = currentImages[currentIndex] ?? currentImages[0];
  const isOutput = activeTab === "output";

  const handlePrev = () => {
    setIndices((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] - 1 + currentImages.length) % currentImages.length,
    }));
  };

  const handleNext = () => {
    setIndices((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] + 1) % currentImages.length,
    }));
  };

  return (
    <div className="mt-8 border-t border-white/12 pt-6">
      <div className="mb-3 grid min-h-[72px] gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p className="font-mono text-xs font-bold tracking-wider text-white/60">
          PREVIEW (HARNESS FLOW)
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {currentImages.length > 1 && (
            <div className="flex items-center gap-1.5 border border-white/12 bg-white/5 px-2 py-1">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-white/70 transition-colors hover:text-white"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="font-mono text-[10px] font-bold text-white/90">
                {currentIndex + 1} / {currentImages.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-white/70 transition-colors hover:text-white"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          <div className="flex gap-1 border border-white/12 bg-white/5 p-0.5" role="tablist" aria-label="Harness preview tabs">
            {harnessCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                onClick={() => {
                  setActiveTab(cat.id);
                  setIndices((prev) => ({ ...prev, [cat.id]: 0 }));
                }}
                className={`px-3 py-1 font-mono text-xs font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-[#d97757] text-[#141413]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-white/12 bg-[#141413]">
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/5 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f56]" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-[#27c93f]" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] font-bold text-white/40">fk-terminal</span>
        </div>
        <div className={previewTerminalBodyClass(isOutput, "dark")} style={{ scrollbarWidth: "thin" }}>
          {currentImage && (
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`block ${
                isOutput
                  ? "h-auto max-w-[240px] w-full rounded-md border border-white/10 shadow-2xl"
                  : "h-auto w-full"
              }`}
            />
          )}
        </div>
      </div>
      <p className="mt-2.5 min-h-[48px] text-xs leading-5 text-[#d8d4c9]/78 italic">
        {currentImage?.caption}
      </p>
    </div>
  );
}
