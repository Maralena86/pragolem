import { RiMailLine, RiPhoneLine, RiWhatsappLine } from "@remixicon/react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Renders the booking page sidebar with two cards: a notice card
 * explaining booking terms and a private-tour CTA, and a contact
 * card with phone, WhatsApp, and email action buttons.
 */
export function BookingSidebar({
  t,
  bookingNotice,
  phoneHref,
  phoneDisplay,
  whatsappHref,
  email,
}: {
  t: (key: string) => string;
  bookingNotice: string;
  phoneHref: string;
  phoneDisplay: string;
  whatsappHref: string;
  email: string;
}) {
  return (
    <aside className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("sidebar.noticeTitle")}</CardTitle>
          <CardDescription>{bookingNotice}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>{t("sidebar.privateTourHint")}</p>
          <Button variant="outline" asChild>
            <Link href="/contact">{t("sidebar.privateTourCta")}</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("sidebar.contactTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={phoneHref}>
              <RiPhoneLine aria-hidden="true" />
              {phoneDisplay}
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <RiWhatsappLine aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href={`mailto:${email}`}>
              <RiMailLine aria-hidden="true" />
              {email}
            </a>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
