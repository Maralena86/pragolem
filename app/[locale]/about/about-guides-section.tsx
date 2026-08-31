import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Guide } from "@/lib/types/guide";

interface AboutGuidesSectionProps {
	t: (key: string, values?: Record<string, string | number | Date>) => string;
	guides: Guide[];
}

/**
 * Renders the guides grid showing each guide's photo, name, role, short bio,
 * spoken languages, years living in Prague, and a personal quote inside Cards.
 * Displays an empty-state message when no guides are available.
 */
export function AboutGuidesSection({ t, guides }: AboutGuidesSectionProps) {
	return (
		<section className="space-y-5">
			<div className="w-full flex justify-center">
				<Image
					src={"/images/guides/lucas_nathan.webp"}
					alt={"Guides Pragolem Praga. Lucas and Nathan"}
					className="object-contain w-[60%] h-auto"
					height={100}
					width={500}
				/>
			</div>
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight">
					{t("guides.title")}
				</h2>
				<p className="text-muted-foreground">{t("guides.subtitle")}</p>
			</div>

			{guides.length === 0 ? (
				<p className="text-muted-foreground">{t("guides.empty")}</p>
			) : (
				<div className="grid gap-4 lg:grid-cols-2">
					{guides.map((guide) => (
						<Card key={guide.id}>
							{/* <CardContent className="grid gap-4 pt-4 md:grid-cols-[160px_1fr]">
								<div className="relative aspect-4/5 w-full overflow-hidden border">
									<Image
										src={guide.attributes.photo.url}
										alt={guide.attributes.photo.alt}
										fill
										sizes="(min-width: 1024px) 160px, (min-width: 768px) 160px, 100vw"
										className="object-cover"
									/>
								</div>
								<div className="space-y-3">
									<div>
										<h3 className="text-lg font-medium">
											{guide.attributes.name}
										</h3>
										<p className="text-muted-foreground">
											{guide.attributes.role}
										</p>
									</div>
									<p className="text-muted-foreground">
										{guide.attributes.shortBio}
									</p>
									<p className="text-xs text-muted-foreground">
										{t("guides.languagesLabel")}:{" "}
										{guide.attributes.languages.join(", ")}
									</p>
									<p className="text-xs text-muted-foreground">
										{t("guides.yearsInPrague", {
											count: guide.attributes.yearsInPrague,
										})}
									</p>
								</div>
								<div className="flex w-full">
									<div className="relative w-full">
										<Image
											src={guide.attributes.photo.url}
											alt={guide.attributes.photo.alt}
											fill
											className="object-contain"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									</div>
									<blockquote className="border-l-2 pl-3 text-muted-foreground">
										&quot;{guide.attributes.quote}&quot;
									</blockquote>
								</div>
							</CardContent> */}
							<CardContent className="space-y-3">
								<p className="text-muted-foreground">
									{guide.attributes.shortBio}
								</p>
								<p className="text-muted-foreground">
									{t("guides.languagesLabel")}:{" "}
									{guide.attributes.languages.join(", ")}
								</p>
								<p className="text-muted-foreground">
									{t("guides.yearsInPrague", {
										count: guide.attributes.yearsInPrague,
									})}
								</p>
								<div className="flex flex-col min-[1000px]:flex-row h-auto min-[1000px]:h-50 gap-3">
									<div className="relative h-50 w-full min-[1000px]:h-full min-[1000px]:w-42.5 shrink-0 mx-auto min-[1000px]:mx-0">
										<Image
											src={guide.attributes.photo.url}
											alt={guide.attributes.photo.alt}
											fill
											className="object-contain"
											sizes="(max-width: 1000px) 100vw, 170px"
										/>
									</div>
									<p className="border-l-2 pl-3 text-muted-foreground">
										{guide.attributes.quote}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</section>
	);
}
