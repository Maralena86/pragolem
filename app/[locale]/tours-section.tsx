import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { LocaleCode } from "@/lib/types/common";
import type { Tour } from "@/lib/types/tour";

interface ToursSectionProps {
	t: (key: string, values?: Record<string, string | number | Date>) => string;
	tours: Tour[];
	languageMap: Record<string, string>;
	guideNameBySlug: Map<string, string>;
	locale: LocaleCode;
}

/**
 * Renders the featured tours grid with tour cards showing price type,
 * duration, languages, group size, and assigned guide.
 */
export function ToursSection({
	t,
	tours,
	languageMap,
	guideNameBySlug,
	locale,
}: ToursSectionProps) {
	return (
		<section id="tours" className="space-y-5">
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight">
					{t("sections.tours.title")}
				</h2>
				<p className="text-muted-foreground">{t("sections.tours.subtitle")}</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{tours.map((tour) => (
					<Card key={tour.id}>
						<CardHeader>
							<Badge
								variant={
									tour.attributes.priceType === "free" ? "secondary" : "outline"
								}
							>
								{t(`tourCard.priceType.${tour.attributes.priceType}`)}
							</Badge>
							<div className="relative w-full h-[160px] bg-muted rounded-lg p-1 overflow-hidden">
								<Image
									src={tour.attributes.heroImage.url}
									alt={tour.attributes.heroImage.alt}
									fill
									className="object-contain"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<CardTitle>{tour.attributes.title}</CardTitle>
							<CardDescription>
								{tour.attributes.shortDescription}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-1 text-muted-foreground">
								{/* <li>
									{t("tourCard.durationLabel")}:{" "}
									{tour.attributes.durationDisplay}
								</li> */}

								<li>
									{t("tourCard.languagesLabel")}:{" "}
									{tour.attributes.languages
										.map((code) => languageMap[code] ?? code)
										.join(", ")}
								</li>
								<li>
									{t("tourCard.groupSizeLabel")}: {tour.attributes.maxGroupSize}
								</li>
								<li>
									{t("tourCard.guideLabel")}:{" "}
									{(tour.relationships.guide.data.slug &&
										guideNameBySlug.get(tour.relationships.guide.data.slug)) ??
										t("tourCard.fallbackGuide")}
								</li>
							</ul>
						</CardContent>
						<CardFooter>
							<Button variant="outline" asChild>
								<Link
									href={{
										pathname: "/tours/[slug]",
										params: { slug: tour.slug[locale] },
									}}
								>
									{t("tourCard.cta")}
								</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
}
