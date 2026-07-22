import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FinalCtaSectionProps {
  t: (key: string) => string;
}

/**
 * Renders the bottom call-to-action section with booking and contact links.
 */
export function FinalCtaSection({ t }: FinalCtaSectionProps) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{t("sections.finalCta.title")}</CardTitle>
          <CardDescription>{t("sections.finalCta.subtitle")}</CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button asChild>
            <Link href="/booking">{t("finalCta.primaryCta")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">{t("finalCta.secondaryCta")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
