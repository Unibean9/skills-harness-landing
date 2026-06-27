import { buildPageMetadata } from "@/lib/seo/metadata";
import { UiTestShowcase } from "@/components/widget/ui-test-showcase";

export const metadata = buildPageMetadata({
  title: "UI Test",
  description: "Trang kiểm thử các component UI của dự án.",
  path: "/ui-test",
  noindex: true,
});

export default function UiTestPage() {
  return <UiTestShowcase />;
}
