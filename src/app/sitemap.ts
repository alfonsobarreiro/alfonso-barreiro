import type { MetadataRoute } from "next";

const SITE = "https://www.barreiro.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE}/`,                                  lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/work/spotify`,                      lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/work/wayfarer`,                     lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/work/mens-sole-revival`,            lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/work/abd-ui-system`,                lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/about`,                             lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/connect`,                           lastModified, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${SITE}/work/presentations`,                lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/work/presentations/spotify`,        lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/work/presentations/wayfarer`,       lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/work/presentations/mens-sole-revival`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`,                           lastModified, changeFrequency: "yearly",  priority: 0.5 },
  ];
}
