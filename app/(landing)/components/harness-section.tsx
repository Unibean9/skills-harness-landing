"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { engineeringCompare, harnessLocks, harnessRows } from "./content";

export function HarnessSection() {
  // States cho Prompt
  const [activePromptTab, setActivePromptTab] = useState<"workflow" | "output">("workflow");
  const [promptIndices, setPromptIndices] = useState<Record<string, number>>({
    workflow: 0,
    output: 0,
  });

  // States cho Harness
  const [activeTab, setActiveTab] = useState<"setup" | "plan" | "review" | "output">("setup");
  const [harnessIndices, setHarnessIndices] = useState<Record<string, number>>({
    setup: 0,
    plan: 0,
    review: 0,
    output: 0,
  });

  const promptCategories = [
    {
      id: "workflow",
      name: "Workflow",
      images: [
        {
          src: "/prompt/image.png",
          alt: "Prompt engineering failure example",
          caption: "Prompt đơn lẻ: dễ trôi ngữ cảnh, thiếu kiểm chứng rules, phụ thuộc may rủi.",
        }
      ]
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
        }
      ]
    }
  ];

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
  ];

  // Prompt carousel logic
  const currentPromptImages = promptCategories.find((cat) => cat.id === activePromptTab)?.images || [];
  const currentPromptIndex = promptIndices[activePromptTab] ?? 0;
  const currentPromptImage = currentPromptImages[currentPromptIndex] || currentPromptImages[0];

  const handlePromptPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromptIndices((prev) => ({
      ...prev,
      [activePromptTab]: (prev[activePromptTab] - 1 + currentPromptImages.length) % currentPromptImages.length,
    }));
  };

  const handlePromptNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPromptIndices((prev) => ({
      ...prev,
      [activePromptTab]: (prev[activePromptTab] + 1) % currentPromptImages.length,
    }));
  };

  // Harness carousel logic
  const currentHarnessImages = harnessCategories.find((cat) => cat.id === activeTab)?.images || [];
  const currentHarnessIndex = harnessIndices[activeTab] ?? 0;
  const currentHarnessImage = currentHarnessImages[currentHarnessIndex] || currentHarnessImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHarnessIndices((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] - 1 + currentHarnessImages.length) % currentHarnessImages.length,
    }));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHarnessIndices((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] + 1) % currentHarnessImages.length,
    }));
  };

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
        {/* Cột 1: Prompt engineering */}
        <article className="bg-[#faf9f5] p-6 text-[#141413] flex flex-col justify-between">
          <div>
            <p className="font-mono text-sm font-black text-[#c96442]">
              Prompt engineering
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {engineeringCompare[0].points.map((point) => (
                <div key={point} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[#788c5d]" />
                  <p className="leading-7 text-[#343430]">{point}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Khu vực ảnh Prompt */}
          <div className="mt-8 border-t border-[#141413]/12 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <p className="font-mono text-xs font-bold tracking-wider text-[#141413]/60">
                PREVIEW (PROMPT FLOW)
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Carousel Controls */}
                {currentPromptImages.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-[#141413]/5 px-2 py-1 border border-[#141413]/12 text-[#141413]">
                    <button
                      onClick={handlePromptPrev}
                      className="text-[#141413]/70 hover:text-[#141413] p-0.5 transition-colors"
                      title="Ảnh trước"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <span className="font-mono text-[10px] font-bold text-[#141413]/90">
                      {currentPromptIndex + 1} / {currentPromptImages.length}
                    </span>
                    <button
                      onClick={handlePromptNext}
                      className="text-[#141413]/70 hover:text-[#141413] p-0.5 transition-colors"
                      title="Ảnh tiếp theo"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 bg-[#141413]/5 p-0.5 border border-[#141413]/12">
                  {promptCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActivePromptTab(cat.id as any);
                        setPromptIndices((prev) => ({ ...prev, [cat.id]: 0 }));
                      }}
                      className={`px-3 py-1 font-mono text-xs font-bold transition-all ${
                        activePromptTab === cat.id 
                          ? "bg-[#c96442] text-white" 
                          : "text-[#141413]/60 hover:text-[#141413] hover:bg-[#141413]/5"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Window Mockup */}
            <div className="border border-[#141413]/12 bg-white transition-all duration-300">
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 border-b border-[#141413]/8 bg-neutral-100 px-3 py-2">
                <span className="size-2.5 rounded-full bg-[#ff5f56]/80"></span>
                <span className="size-2.5 rounded-full bg-[#ffbd2e]/80"></span>
                <span className="size-2.5 rounded-full bg-[#27c93f]/80"></span>
                <span className="ml-2 font-mono text-[10px] font-bold text-[#141413]/40">prompt-terminal</span>
              </div>
              {/* Terminal Body */}
              <div 
                className={`overflow-x-hidden p-2 select-none transition-all duration-300 ${
                  activePromptTab === "output" 
                    ? "h-auto py-6 bg-[#141413]/10 flex justify-center" 
                    : "h-[360px] overflow-y-auto bg-[#141413]/5"
                }`} 
                style={{ scrollbarWidth: 'thin' }}
              >
                <img 
                  src={currentPromptImage.src} 
                  alt={currentPromptImage.alt}
                  className={`block transition-all duration-300 ${
                    activePromptTab === "output" 
                      ? "max-w-[240px] w-full h-auto border border-[#141413]/15 shadow-xl rounded-md" 
                      : "w-full h-auto"
                  }`}
                />
              </div>
            </div>
            <p className="mt-2.5 text-xs leading-5 text-[#343430]/78 italic min-h-[40px]">
              {currentPromptImage.caption}
            </p>
          </div>
        </article>

        {/* Cột 2: Harness engineering */}
        <article className="bg-[#141413] p-6 text-[#faf9f5] flex flex-col justify-between">
          <div>
            <p className="font-mono text-sm font-black text-[#d97757]">
              Harness engineering
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {engineeringCompare[1].points.map((point) => (
                <div key={point} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-[#d97757]" />
                  <p className="leading-7 text-[#d8d4c9]">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Khu vực ảnh Harness */}
          <div className="mt-8 border-t border-white/12 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <p className="font-mono text-xs font-bold tracking-wider text-white/60">
                PREVIEW (HARNESS FLOW)
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Carousel Controls */}
                {currentHarnessImages.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 border border-white/12">
                    <button
                      onClick={handlePrev}
                      className="text-white/70 hover:text-white p-0.5 transition-colors"
                      title="Ảnh trước"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <span className="font-mono text-[10px] font-bold text-white/90">
                      {currentHarnessIndex + 1} / {currentHarnessImages.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="text-white/70 hover:text-white p-0.5 transition-colors"
                      title="Ảnh tiếp theo"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 bg-white/5 p-0.5 border border-white/12">
                  {harnessCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveTab(cat.id as any);
                        setHarnessIndices((prev) => ({ ...prev, [cat.id]: 0 }));
                      }}
                      className={`px-3 py-1 font-mono text-xs font-bold transition-all ${
                        activeTab === cat.id 
                          ? "bg-[#d97757] text-[#141413]" 
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Terminal Window Mockup */}
            <div className="border border-white/12 bg-[#141413] transition-all duration-300">
              {/* Terminal Header */}
              <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/5 px-3 py-2">
                <span className="size-2.5 rounded-full bg-[#ff5f56]"></span>
                <span className="size-2.5 rounded-full bg-[#ffbd2e]"></span>
                <span className="size-2.5 rounded-full bg-[#27c93f]"></span>
                <span className="ml-2 font-mono text-[10px] font-bold text-white/40">fk-terminal</span>
              </div>
              {/* Terminal Body */}
              <div 
                className={`overflow-x-hidden p-2 select-none transition-all duration-300 ${
                  activeTab === "output" 
                    ? "h-auto py-6 bg-[#1b1b1a] flex justify-center" 
                    : "h-[360px] overflow-y-auto bg-[#1b1b1a]"
                }`} 
                style={{ scrollbarWidth: 'thin' }}
              >
                <img 
                  src={currentHarnessImage.src} 
                  alt={currentHarnessImage.alt}
                  className={`block transition-all duration-300 ${
                    activeTab === "output" 
                      ? "max-w-[240px] w-full h-auto border border-white/10 shadow-2xl rounded-md" 
                      : "w-full h-auto"
                  }`}
                />
              </div>
            </div>
            <p className="mt-2.5 text-xs leading-5 text-[#d8d4c9]/78 italic min-h-[40px]">
              {currentHarnessImage.caption}
            </p>
          </div>
        </article>
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
