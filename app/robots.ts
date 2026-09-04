import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}