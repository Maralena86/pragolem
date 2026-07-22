import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FaqCtaSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the FAQ page bottom call-to-action card with links to the booking and contact pages.
 */
export function FaqCtaSection({ t }: FaqCtaSectionProps) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{t("cta.title")}</CardTitle>
          <CardDescription>{t("cta.description")}</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button asChild>
            <Link href="/booking">{t("cta.primary")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">{t("cta.secondary")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
