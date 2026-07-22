import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/**
 * Renders the localized 404 not-found page shown when a route under a valid
 * locale prefix does not match any known page. Provides navigation links back
 * to the homepage and tours index.
 */
export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 py-20 text-center sm:px-6">
      <p className="text-6xl font-bold text-muted-foreground" aria-hidden="true">
        404
      </p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-muted-foreground">{t("description")}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">{t("backHome")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tours">{t("browseTours")}</Link>
        </Button>
      </div>
    </main>
  );
}
