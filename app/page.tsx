import { FkSkillsLanding } from "@/components/landing/fk-skills-landing";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "fk-skills",
  description:
    "Trang giới thiệu fk-skills: skill thiết kế cho AI coding agents với 23 lệnh, harness engineering và 44 rule detector.",
  path: "/",
});

export default function HomePage() {
  return <FkSkillsLanding />;
}
