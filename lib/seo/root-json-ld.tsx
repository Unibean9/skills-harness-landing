import { getSiteUrlFromRequest } from "./request-site-url";
import { SITE, getSiteUrl } from "./site";

export async function RootJsonLd() {
  const siteUrl = await getSiteUrlFromRequest();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE.name,
        url: siteUrl,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE.name,
        description: SITE.defaultDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "vi",
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#featured`,
        name: "Nội dung nổi bật",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang chủ",
            url: siteUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export { getSiteUrl };
