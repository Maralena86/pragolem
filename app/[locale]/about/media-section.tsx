import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MediaSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the media mention CTA card with an external link to press coverage
 * and a booking call-to-action button.
 */
export function MediaSection({ t }: MediaSectionProps) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{t("media.title")}</CardTitle>
          <CardDescription>{t("media.description")}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-wrap gap-2">
          <Button variant="outline" asChild>
            <a href={t("media.href")} target="_blank" rel="noreferrer">
              {t("media.linkLabel")}
            </a>
          </Button>
          <Button asChild>
            <Link href="/booking">{t("media.bookingCta")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
