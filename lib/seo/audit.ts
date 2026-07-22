import type { LocaleCode } from "@/lib/types/common";
import {
  EXPECTED_PAGE_TYPES,
  REQUIRED_SCHEMAS_BY_PAGE_TYPE,
  type SeoInventoryEntry,
  type SeoPageType,
} from "@/lib/seo/inventory";

const SUPPORTED_LOCALES: LocaleCode[] = ["en", "fr"];

/**
 * Captures a single SEO audit issue with a machine-friendly code and a
 * human-readable explanation.
 */
export interface SeoAuditIssue {
  code: string;
  message: string;
}

/**
 * Stores schema coverage details for a specific page type so missing schema
 * implementations can be surfaced precisely.
 */
export interface SchemaCoverageResult {
  pageType: SeoPageType;
  expected: string[];
  implemented: string[];
  missing: string[];
}

/**
 * Structured report returned by the SEO audit pipeline.
 */
export interface SeoAuditReport {
  generatedAt: Date;
  totalEntries: number;
  hreflangIssues: SeoAuditIssue[];
  metadataUniquenessIssues: SeoAuditIssue[];
  metadataCoverageIssues: SeoAuditIssue[];
  routeCoverageWarnings: SeoAuditIssue[];
  schemaCoverageByPageType: SchemaCoverageResult[];
}

/**
 * Groups SEO inventory entries by their route-group identifier so locale pairs
 * can be validated together during hreflang auditing.
 */
function groupEntriesByRouteGroup(entries: SeoInventoryEntry[]): Map<string, SeoInventoryEntry[]> {
  const grouped = new Map<string, SeoInventoryEntry[]>();

  for (const entry of entries) {
    const existing = grouped.get(entry.routeGroupId) ?? [];
    existing.push(entry);
    grouped.set(entry.routeGroupId, existing);
  }

  return grouped;
}

/**
 * Produces duplicate-value issues for a selected metadata field and labels each
 * issue with route URLs where the duplicate appears.
 */
function getDuplicateMetadataIssues(
  entries: SeoInventoryEntry[],
  fieldName: "title" | "description",
): SeoAuditIssue[] {
  const valueToUrls = new Map<string, string[]>();

  for (const entry of entries) {
    const rawValue = fieldName === "title" ? entry.title : entry.description;
    const normalized = rawValue.trim().toLowerCase();

    if (normalized.length === 0) {
      continue;
    }

    const existingUrls = valueToUrls.get(normalized) ?? [];
    existingUrls.push(entry.url);
    valueToUrls.set(normalized, existingUrls);
  }

  return [...valueToUrls.entries()]
    .filter(([, urls]) => urls.length > 1)
    .map(([normalizedValue, urls]) => ({
      code: `duplicate-${fieldName}`,
      message: `Duplicate ${fieldName} detected for value \"${normalizedValue}\": ${urls.join(", ")}`,
    }));
}

/**
 * Audits hreflang integrity by validating locale alternates per route entry and
 * reciprocal EN/FR linkage inside each route group.
 */
function getHreflangIssues(entries: SeoInventoryEntry[]): SeoAuditIssue[] {
  const issues: SeoAuditIssue[] = [];

  for (const entry of entries) {
    for (const locale of SUPPORTED_LOCALES) {
      const alternate = entry.alternates[locale];

      if (!alternate) {
        issues.push({
          code: "missing-hreflang-alternate",
          message: `Missing hreflang alternate \"${locale}\" for ${entry.url}.`,
        });
      }
    }

    const selfAlternate = entry.alternates[entry.locale];
    if (selfAlternate !== entry.url) {
      issues.push({
        code: "hreflang-self-mismatch",
        message: `Self hreflang URL mismatch for ${entry.url}. Expected ${selfAlternate}.`,
      });
    }
  }

  const groupedEntries = groupEntriesByRouteGroup(entries);

  for (const [routeGroupId, groupEntries] of groupedEntries.entries()) {
    const entryByLocale = new Map(groupEntries.map((entry) => [entry.locale, entry]));

    for (const locale of SUPPORTED_LOCALES) {
      if (!entryByLocale.has(locale)) {
        issues.push({
          code: "missing-route-locale",
          message: `Route group ${routeGroupId} is missing locale \"${locale}\" for hreflang parity.`,
        });
      }
    }

    const enEntry = entryByLocale.get("en");
    const frEntry = entryByLocale.get("fr");

    if (enEntry && frEntry) {
      if (enEntry.alternates.fr !== frEntry.url) {
        issues.push({
          code: "hreflang-reciprocal-mismatch",
          message: `EN alternate FR URL mismatch for route group ${routeGroupId}.`,
        });
      }

      if (frEntry.alternates.en !== enEntry.url) {
        issues.push({
          code: "hreflang-reciprocal-mismatch",
          message: `FR alternate EN URL mismatch for route group ${routeGroupId}.`,
        });
      }
    }
  }

  return issues;
}

/**
 * Audits canonical/OpenGraph/Twitter metadata channel coverage for every
 * indexable route entry.
 */
function getMetadataCoverageIssues(entries: SeoInventoryEntry[]): SeoAuditIssue[] {
  const issues: SeoAuditIssue[] = [];

  for (const entry of entries) {
    if (!entry.metadataCoverage.canonical) {
      issues.push({
        code: "missing-canonical",
        message: `Canonical metadata coverage is missing for ${entry.url}.`,
      });
    }

    if (!entry.metadataCoverage.openGraph) {
      issues.push({
        code: "missing-open-graph",
        message: `Open Graph metadata coverage is missing for ${entry.url}.`,
      });
    }

    if (!entry.metadataCoverage.twitter) {
      issues.push({
        code: "missing-twitter",
        message: `Twitter metadata coverage is missing for ${entry.url}.`,
      });
    }
  }

  return issues;
}

/**
 * Audits schema coverage by page type using the required schema matrix from
 * the SEO inventory module.
 */
function getSchemaCoverage(entries: SeoInventoryEntry[]): SchemaCoverageResult[] {
  const schemasByPageType = new Map<SeoPageType, Set<string>>();

  for (const entry of entries) {
    const existingSchemas = schemasByPageType.get(entry.pageType) ?? new Set<string>();
    for (const schema of entry.schemas) {
      existingSchemas.add(schema);
    }
    schemasByPageType.set(entry.pageType, existingSchemas);
  }

  return Object.entries(REQUIRED_SCHEMAS_BY_PAGE_TYPE).map(([pageType, requiredSchemas]) => {
    const typedPageType = pageType as SeoPageType;
    const implemented = [...(schemasByPageType.get(typedPageType) ?? new Set<string>())].toSorted();
    const expected = [...(requiredSchemas ?? [])].toSorted();
    const missing = expected.filter((schema) => !implemented.includes(schema));

    return {
      pageType: typedPageType,
      expected,
      implemented,
      missing,
    };
  });
}

/**
 * Reports expected page types that are not currently represented in the SEO
 * inventory. These findings are warnings to highlight structural gaps.
 */
function getRouteCoverageWarnings(entries: SeoInventoryEntry[]): SeoAuditIssue[] {
  const existingPageTypes = new Set(entries.map((entry) => entry.pageType));

  return EXPECTED_PAGE_TYPES.filter((pageType) => !existingPageTypes.has(pageType)).map((pageType) => ({
    code: "missing-page-type",
    message: `Expected page type \"${pageType}\" is not currently present in the SEO inventory.`,
  }));
}

/**
 * Builds the full SEO audit report for a precomputed SEO inventory.
 */
export function buildSeoAuditReport(entries: SeoInventoryEntry[]): SeoAuditReport {
  const schemaCoverageByPageType = getSchemaCoverage(entries);

  return {
    generatedAt: new Date(),
    totalEntries: entries.length,
    hreflangIssues: getHreflangIssues(entries),
    metadataUniquenessIssues: [
      ...getDuplicateMetadataIssues(entries, "title"),
      ...getDuplicateMetadataIssues(entries, "description"),
    ],
    metadataCoverageIssues: getMetadataCoverageIssues(entries),
    routeCoverageWarnings: getRouteCoverageWarnings(entries),
    schemaCoverageByPageType,
  };
}

/**
 * Throws when blocking SEO audit failures exist. Route coverage warnings are
 * intentionally non-blocking and should be handled in release notes.
 */
export function assertSeoAuditReport(report: SeoAuditReport): void {
  const schemaIssues = report.schemaCoverageByPageType.flatMap((coverage) =>
    coverage.missing.map((schema) => ({
      code: "missing-schema",
      message: `Missing schema \"${schema}\" for page type \"${coverage.pageType}\".`,
    })),
  );

  const blockingIssues = [
    ...report.hreflangIssues,
    ...report.metadataUniquenessIssues,
    ...report.metadataCoverageIssues,
    ...schemaIssues,
  ];

  if (blockingIssues.length > 0) {
    const renderedIssues = blockingIssues.map((issue) => `- [${issue.code}] ${issue.message}`).join("\n");
    throw new Error(`SEO audit failed with ${blockingIssues.length} issue(s):\n${renderedIssues}`);
  }
}
