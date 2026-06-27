import { cache } from "react";
import type { ApiResponse } from "@/types/api";

export interface PublicSubjectSeo {
  slug: string;
  name: string;
  description?: string;
}

const MAX_PAGES = 20;
const PAGE_SIZE = 50;

async function fetchSubjectsPage(page: number): Promise<PublicSubjectSeo[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";
  const url = new URL("api/v1/public/subjects", baseUrl);
  url.searchParams.set("page", String(page));
  url.searchParams.set("pageSize", String(PAGE_SIZE));

  const response = await fetch(url.toString(), {
    next: { revalidate: 600 },
  });

  if (!response.ok) return [];

  const json = (await response.json()) as ApiResponse<PublicSubjectSeo[]>;
  return json.isSuccess && Array.isArray(json.data) ? json.data : [];
}

export const getPublicSubjectsForSeo = cache(async (): Promise<PublicSubjectSeo[]> => {
  const subjects: PublicSubjectSeo[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await fetchSubjectsPage(page);
    if (batch.length === 0) break;
    subjects.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return subjects;
});

export async function getSubjectSeoBySlug(slug: string): Promise<PublicSubjectSeo | undefined> {
  const subjects = await getPublicSubjectsForSeo();
  return subjects.find((s) => s.slug === slug);
}
