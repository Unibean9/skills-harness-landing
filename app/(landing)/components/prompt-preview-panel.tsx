"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { previewTerminalBodyClass } from "./preview-terminal-viewport";

const promptCategories = [
  {
    id: "workflow",
    name: "Workflow",
    images: [
      {
        src: "/prompt/image.png",
        alt: "Prompt engineering failure example",
        caption: "Prompt đơn lẻ: dễ trôi ngữ cảnh, thiếu kiểm chứng rules, phụ thuộc may rủi.",
      },
    ],
  },
  {
    id: "output",
    name: "Output",
    images: [
      {
        src: "/prompt/output-1.png",
        alt: "Prompt output 1",
        caption: "Kết quả đầu ra 1: Giao diện cơ bản, bố cục khuôn mẫu, thiếu sự tinh tế trong các tiểu tiết.",
      },
      {
        src: "/prompt/output-2.png",
        alt: "Prompt output 2",
        caption: "Kết quả đầu ra 2: Một phiên bản khác nhưng vẫn gặp các lỗi AI slop phổ biến.",
      },
    ],
  },
] as const;

type PromptTab = (typeof promptCategories)[number]["id"];

export function PromptPreviewPanel() {
  const [activeTab, setActiveTab] = useState<PromptTab>("workflow");
  const [indices, setIndices] = useState<Record<PromptTab, number>>({
    workflow: 0,
    output: 0,
  });

  const currentImages = promptCategories.find((cat) => cat.id === activeTab)?.images ?? [];
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
    <div className="mt-8 border-t border-[#141413]/12 pt-6">
      <div className="mb-3 grid min-h-[72px] gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p className="font-mono text-xs font-bold tracking-wider text-[#141413]/60">
          PREVIEW (PROMPT FLOW)
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {currentImages.length > 1 && (
            <div className="flex items-center gap-1.5 border border-[#141413]/12 bg-[#141413]/5 px-2 py-1 text-[#141413]">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-[#141413]/70 transition-colors hover:text-[#141413]"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="font-mono text-[10px] font-bold text-[#141413]/90">
                {currentIndex + 1} / {currentImages.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-[#141413]/70 transition-colors hover:text-[#141413]"
                aria-label="Ảnh tiếp theo"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          <div className="flex gap-1 border border-[#141413]/12 bg-[#141413]/5 p-0.5" role="tablist" aria-label="Prompt preview tabs">
            {promptCategories.map((cat) => (
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
                    ? "bg-[#c96442] text-white"
                    : "text-[#141413]/60 hover:bg-[#141413]/5 hover:text-[#141413]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border border-[#141413]/12 bg-white">
        <div className="flex items-center gap-1.5 border-b border-[#141413]/8 bg-neutral-100 px-3 py-2">
          <span className="size-2.5 rounded-full bg-[#ff5f56]/80" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]/80" aria-hidden="true" />
          <span className="size-2.5 rounded-full bg-[#27c93f]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[10px] font-bold text-[#141413]/40">prompt-terminal</span>
        </div>
        <div className={previewTerminalBodyClass(isOutput, "light")} style={{ scrollbarWidth: "thin" }}>
          {currentImage && (
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={`block ${
                isOutput
                  ? "h-auto max-w-[240px] w-full rounded-md border border-[#141413]/15 shadow-xl"
                  : "h-auto w-full"
              }`}
            />
          )}
        </div>
      </div>
      <p className="mt-2.5 min-h-[48px] text-xs leading-5 text-[#343430]/78 italic">
        {currentImage?.caption}
      </p>
    </div>
  );
}
