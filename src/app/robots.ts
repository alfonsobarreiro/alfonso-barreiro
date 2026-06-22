import type { MetadataRoute } from "next";

/**
 * robots.txt
 * ─────────────────────────────────────────────────────────────────────────────
 * Environment-aware: production (barreiro.com) keeps full indexing; every
 * other Vercel deployment (staging.barreiro.com, branch previews) returns a
 * blanket Disallow so search engines never index staging content or compete
 * with prod for SEO.
 *
 * Vercel sets VERCEL_ENV to "production" only on the main-branch deploy.
 * Both "preview" and "development" should be blocked.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.barreiro.com/sitemap.xml",
    host: "https://www.barreiro.com",
  };
}
