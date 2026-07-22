import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FAQItem } from "@/lib/types/faq";

/**
 * Renders the FAQ preview section with an accordion of up to 6 questions and answers
 * inside a card, or an empty-state message when there are no FAQs, plus a "view all" link.
 */
export function TourFaqSection({
  t,
  faqPreview,
}: {
  t: (key: string) => string;
  faqPreview: FAQItem[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{t("sections.faq")}</h2>
      {faqPreview.length === 0 ? (
        <p className="text-muted-foreground">{t("faq.empty")}</p>
      ) : (
        <Card>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqPreview.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.attributes.question}</AccordionTrigger>
                  <AccordionContent>{item.attributes.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
      <Button variant="outline" asChild>
        <Link href="/faq">{t("faq.viewAll")}</Link>
      </Button>
    </section>
  );
}
