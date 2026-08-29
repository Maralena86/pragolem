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
import type { Tour } from "@/lib/types/tour";
import type { LocaleCode } from "@/lib/types/common";

/**
 * Renders a responsive grid of tour summary cards, each displaying a
 * price-type badge, title, short description, duration/languages/group-size
 * details, and a CTA link button to the individual tour page.
 */
export default function ToursGridSection({
	t,
	tours,
	localeCode,
}: {
	t: (key: string) => string;
	tours: Tour[];
	localeCode: LocaleCode;
}) {
	return (
		<section
			className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			aria-label={t("title")}
		>
			{tours.map((tour) => {
				const slug = tour.slug[localeCode];
				const priceKey = tour.attributes.priceType === "free" ? "free" : "paid";

				return (
					<Card key={tour.id} className="flex flex-col">
						<CardHeader>
							<div className="flex items-center gap-2">
								<Badge variant="secondary">
									{t(`card.priceType.${priceKey}`)}
								</Badge>
							</div>
							<div className="relative w-full h-[200px] flex items-center bg-muted rounded-lg p-1 overflow-hidden">
								<Image
									src={tour.attributes.heroImage.url}
									alt={tour.attributes.heroImage.alt}
									fill
									className="object-contain"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
							</div>
							<CardTitle className="mt-2">{tour.attributes.title}</CardTitle>
							<CardDescription>
								{tour.attributes.shortDescription}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1">
							<dl className="space-y-1 text-sm text-muted-foreground">
								{/* <div className="flex justify-between"> */}
								{/* <dt>{t("card.durationLabel")}</dt> */}
								{/* <dd>{tour.attributes.duration}</dd> */}
								{/* </div> */}
								<div className="flex justify-between">
									<dt>{t("card.languagesLabel")}</dt>
									<dd>
										{tour.attributes.languages
											.map((lang) => t(`card.language.${lang}`))
											.join(", ")}
									</dd>
								</div>
								<div className="flex justify-between">
									<dt>{t("card.groupSizeLabel")}</dt>
									<dd>{tour.attributes.maxGroupSize}</dd>
								</div>
							</dl>
						</CardContent>
						<CardFooter>
							<Button asChild className="w-full">
								<Link href={{ pathname: "/tours/[slug]", params: { slug } }}>
									{t("card.cta")}
								</Link>
							</Button>
						</CardFooter>
					</Card>
				);
			})}
		</section>
	);
}
