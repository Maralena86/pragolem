import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { LocaleCode } from "@/lib/types/common";
import type { Tour } from "@/lib/types/tour";

/**
 * Renders the tour hero grid with price-type and duration badges, the tour title,
 * a short description, CTA buttons (booking, all tours, locale switch), and four
 * stat cards summarising duration, languages, group size, and meeting point.
 */
export function TourHeroSection({
	t,
	tour,
	alternateLocale,
}: {
	t: (key: string) => string;
	tour: Tour;
	alternateLocale: LocaleCode;
}) {
	const languageLabels: Record<string, string> = {
		en: t("languages.en"),
		fr: t("languages.fr"),
		es: t("languages.es"),
	};

	return (
		<section className="grid gap-6 border-b pb-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
			<div className="space-y-4">
				<div className="flex flex-wrap gap-2">
					{/* <Badge variant={tour.attributes.priceType === "free" ? "secondary" : "outline"}>
            {t(`priceType.${tour.attributes.priceType}`)}
          </Badge> */}
					{/* <Badge variant="outline">{tour.attributes.durationDisplay}</Badge> */}
				</div>
				<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					{tour.attributes.title}
				</h1>
				<p className="max-w-2xl text-muted-foreground">
					{tour.attributes.shortDescription}
				</p>
				<div className="flex flex-wrap gap-2">
					<Button asChild>
						<Link href="/booking">{t("hero.primaryCta")}</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/tours">{t("hero.secondaryCta")}</Link>
					</Button>
					<Button variant="ghost" asChild>
						<Link
							locale={alternateLocale}
							href={{
								pathname: "/tours/[slug]",
								params: { slug: tour.slug[alternateLocale] },
							}}
						>
							{t(`hero.switchLocale.${alternateLocale}`)}
						</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				{/* <Card size="sm">
					<CardHeader>
						<CardDescription>{t("hero.durationLabel")}</CardDescription>
						<CardTitle>{tour.attributes.durationDisplay}</CardTitle>
					</CardHeader>
				</Card> */}
				<Card size="sm">
					<CardHeader>
						<CardDescription>{t("hero.languagesLabel")}</CardDescription>
						<CardTitle>
							{tour.attributes.languages
								.map((language) => languageLabels[language] ?? language)
								.join(", ")}
						</CardTitle>
					</CardHeader>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardDescription>{t("hero.groupSizeLabel")}</CardDescription>
						<CardTitle>{tour.attributes.maxGroupSize}</CardTitle>
					</CardHeader>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardDescription>{t("hero.meetingPointLabel")}</CardDescription>
						<CardTitle>{tour.attributes.meetingPoint.address}</CardTitle>
					</CardHeader>
				</Card>
			</div>
		</section>
	);
}
