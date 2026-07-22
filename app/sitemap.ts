import type { MetadataRoute } from "next";
import { assertSeoAuditReport, buildSeoAuditReport } from "@/lib/seo/audit";
import { getSeoInventoryEntries } from "@/lib/seo/inventory";

/**
 * Generates the XML sitemap for all localized static and dynamic routes.
 * Before returning entries, it runs blocking SEO audits so hreflang,
 * schema, uniqueness, and metadata-channel regressions fail fast.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSeoInventoryEntries();
  const auditReport = buildSeoAuditReport(entries);

  if (auditReport.routeCoverageWarnings.length > 0) {
    const warningSummary = auditReport.routeCoverageWarnings
      .map((warning) => `[${warning.code}] ${warning.message}`)
      .join("\n");
    console.warn(`SEO route coverage warning(s):\n${warningSummary}`);
  }

  assertSeoAuditReport(auditReport);

  return entries
    .toSorted((left, right) => left.url.localeCompare(right.url))
    .map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
      alternates: {
        languages: {
          en: entry.alternates.en,
          fr: entry.alternates.fr,
          "x-default": entry.alternates.en,
        },
      },
    }));
}
