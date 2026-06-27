"use client";

import { Clipboard } from "lucide-react";

export function CopyButton() {
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
