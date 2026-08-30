import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Tour } from "@/lib/types/tour";
import { AnimatedTitle } from "@/components/ui/animatedtitle";

interface HeroSectionProps {
	t: (key: string) => string;
	aggregateRating: { ratingValue: number; reviewCount: number };
	tourCount: number;
}

/**
 * Renders the homepage hero section with headline, CTAs, and key stats
 * (rating, review count, and tour count) displayed in compact cards.
 */
export function HeroSection({
	t,
	aggregateRating,
	tourCount,
}: HeroSectionProps) {
	return (
		<section className="grid gap-6 border-b pb-10 md:grid-cols-[2fr_auto_0.8fr] items-center ">
			<div className="space-y-4">
				<div className="flex justify-items-normal gap-4">
					<div className="bg-[#123865] flex items-center justify-center w-16 h-16 rounded-full">
						<Image
							src="/pragolem-logo.avif"
							alt=""
							width={55}
							height={55}
							className="transition-transform duration-300 hover:scale-110 hover:-rotate-6"
							aria-hidden="true"
						/>
					</div>
					<AnimatedTitle text="Pragolem Tours" />
				</div>
				<Badge variant="outline">{t("hero.badge")}</Badge>
				<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					{t("title")}
				</h2>
				<p className="max-w-2xl text-muted-foreground">{t("subtitle")}</p>
				<div className="flex flex-wrap gap-2">
					<Button asChild>
						<Link href="/booking">{t("hero.primaryCta")}</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/tours">{t("hero.secondaryCta")}</Link>
					</Button>
				</div>
			</div>

			<div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1  md:w-20">
				<Card size="sm">
					<CardHeader>
						<CardTitle>{aggregateRating.ratingValue}/5</CardTitle>
						<CardDescription>{t("hero.ratingLabel")}</CardDescription>
					</CardHeader>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardTitle>{aggregateRating.reviewCount}</CardTitle>
						<CardDescription>{t("hero.reviewsLabel")}</CardDescription>
					</CardHeader>
				</Card>
				<Card size="sm">
					<CardHeader>
						<CardTitle>{tourCount}</CardTitle>
						<CardDescription>{t("hero.toursLabel")}</CardDescription>
					</CardHeader>
				</Card>
			</div>
			<div className="relative w-full h-64 md:h-full">
				<Image
					src="/images/pragolem_guides_prague_tours.webp"
					alt=""
					fill
					className="object-contain"
					sizes="(max-width: 768px) 100vw, 33vw"
				/>
			</div>
		</section>
	);
}
