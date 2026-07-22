import { Link } from "@/i18n/navigation";

/**
 * Renders the breadcrumb navigation trail showing Home > Tours > current tour title,
 * providing contextual wayfinding and accessible navigation landmarks.
 */
export function TourBreadcrumb({ t, tourTitle }: { t: (key: string) => string; tourTitle: string }) {
  return (
    <nav aria-label={t("breadcrumbs.ariaLabel")}>
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <li>
          <Link href="/" className="underline-offset-2 hover:underline">
            {t("breadcrumbs.home")}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/tours" className="underline-offset-2 hover:underline">
            {t("breadcrumbs.tours")}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-foreground">{tourTitle}</li>
      </ol>
    </nav>
  );
}
