import type { Metadata } from "next";
import { getSiteUrl, SITE } from "./site";

interface BuildPageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
}

function normalizePath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? normalized : normalized.replace(/\/$/, "");
}

function socialTitle(title: string): string {
  const suffix = `| ${SITE.shortName}`;
  if (title.includes(SITE.shortName)) return title;
  return `${title} ${suffix}`;
}

export function buildPageMetadata({
  title,
  description = SITE.defaultDescription,
  path,
  noindex = false,
}: BuildPageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = normalizePath(path);
  const canonical = `${siteUrl}${canonicalPath}`;
  const ogTitle = socialTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: canonical,
      title: ogTitle,
      description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
