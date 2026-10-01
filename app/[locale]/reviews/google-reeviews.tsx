// app/[locale]/reviews/google-reeviews.tsx
import { getGoogleReviews } from "@/lib/google-reviews";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GoogleReviewsProps = {
	t: (key: string, values?: Record<string, any>) => string;
};

async function GoogleReviews({ t }: GoogleReviewsProps) {
	const place = await getGoogleReviews();

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<Badge
					variant="outline"
					className="  text-blue-900   dark:text-amber-200"
				>
					<span className="text-amber-500 text-lg">★</span>{" "}
					{t("reviews.google.aggregate", {
						rating: place.rating,
						count: place.userRatingCount,
					})}
				</Badge>
				<a
					href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_PLACE_ID}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm font-medium text-[#375d8f] underline underline-offset-4 hover:text-blue-600 dark:text-blue-400"
				>
					{t("reviews.google.cta")}
				</a>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				{place.reviews?.map((r: any, i: number) => (
					<Card key={i} size="sm" className="transition-shadow hover:shadow-md">
						<CardHeader>
							<CardTitle>{r.authorAttribution?.displayName}</CardTitle>
							<CardDescription className="flex items-center gap-1">
								<span aria-hidden="true" className="text-amber-500">
									{"★".repeat(r.rating)}
									<span className="text-muted-foreground/30">
										{"★".repeat(5 - r.rating)}
									</span>
								</span>
								<span className="sr-only">{r.rating}/5</span>
								<span className="text-muted-foreground">
									{" · "}
									{t("reviews.source.google")}
								</span>
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<p className="text-muted-foreground">{r.text?.text}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

export default GoogleReviews;
