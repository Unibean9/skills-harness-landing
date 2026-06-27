export const SITE = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Skill Landing",
  shortName: "Skill Landing",
  defaultDescription:
    "Nền tảng học tập và phát triển kỹ năng — khám phá khóa học, luyện đề và nâng cao năng lực của bạn.",
  locale: "vi_VN",
} as const;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (url) return url.replace(/\/$/, "");
  return "http://localhost:5173";
}
