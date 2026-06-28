export const PREVIEW_TERMINAL_HEIGHT = "h-[500px] md:h-[520px]";

export function previewTerminalBodyClass(isOutput: boolean, tone: "light" | "dark") {
  const bg = tone === "light"
    ? isOutput ? "bg-[#141413]/10" : "bg-[#141413]/5"
    : "bg-[#1b1b1a]";

  if (isOutput) {
    return `flex ${PREVIEW_TERMINAL_HEIGHT} select-none overflow-hidden p-2 items-center justify-center ${bg}`;
  }

  return `flex ${PREVIEW_TERMINAL_HEIGHT} select-none overflow-x-hidden overflow-y-auto p-2 items-start justify-center ${bg}`;
}
