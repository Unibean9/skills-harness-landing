import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { footerColumns } from "./content";

export function SiteFooter() {
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
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,0.55fr))] lg:gap-10 xl:gap-14">
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
