import { BookingForm, type BookingTourOption } from "@/components/forms/BookingForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LocaleCode } from "@/lib/types/common";

/**
 * Renders the main booking form inside a card with a localized
 * title and subtitle describing the form's purpose.
 */
export function BookingFormCard({
  t,
  tourOptions,
  defaultLanguage,
}: {
  t: (key: string) => string;
  tourOptions: BookingTourOption[];
  defaultLanguage: LocaleCode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("formTitle")}</CardTitle>
        <CardDescription>{t("formSubtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <BookingForm tourOptions={tourOptions} defaultLanguage={defaultLanguage} />
      </CardContent>
    </Card>
  );
}
