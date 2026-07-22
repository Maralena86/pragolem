import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";

/**
 * Generates robots directives using the configured production domain and links
 * crawlers to the localized sitemap endpoint.
 */
export default function robots(): MetadataRoute.Robots {
  const domain = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
