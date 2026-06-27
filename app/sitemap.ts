import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";
import { getPublicSubjectsForSeo } from "@/lib/seo/fetch-subjects-public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/luyen-de`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/khoa-hoc`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  let subjectRoutes: MetadataRoute.Sitemap = [];
  try {
    const subjects = await getPublicSubjectsForSeo();
    subjectRoutes = subjects.flatMap((subject) => [
      {
        url: `${siteUrl}/luyen-de/${subject.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${siteUrl}/luyen-de/${subject.slug}/thi-thu`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ]);
  } catch {
    // API unavailable during build — static routes only
  }

  return [...staticRoutes, ...subjectRoutes];
}
