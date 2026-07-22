import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

/**
 * Renders the conversion CTA banner at the bottom of the tours page
 * with a heading, description, and primary/secondary action buttons
 * linking to the booking and contact pages.
 */
export default function ToursCtaSection({
  t,
}: {
  t: (key: string) => string;
}) {
  return (
    <section className="rounded-lg border bg-muted/50 p-6 text-center sm:p-10">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t("cta.title")}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
        {t("cta.description")}
      </p>
      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link href="/booking">{t("cta.primary")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">{t("cta.secondary")}</Link>
        </Button>
      </div>
    </section>
  );
}
