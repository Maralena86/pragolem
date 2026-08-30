import {
	RiArrowRightUpLine,
	RiMailLine,
	RiMapPinLine,
	RiPhoneLine,
	RiWhatsappLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { SocialLink } from "@/lib/types/site-config";
import type { TourMeetingPoint } from "@/lib/types/tour";

/**
 * Renders the contact page sidebar containing three stacked cards: quick-action
 * buttons (phone, WhatsApp, email), social-link buttons with external-arrow icons,
 * and a meeting-point / Google Maps card.
 */
export function ContactSidebar({
	t,
	phoneHref,
	phoneDisplay,
	whatsappHref,
	email,
	socialLinks,
	mapPoint,
}: {
	t: (key: string) => string;
	phoneHref: string;
	phoneDisplay: string;
	whatsappHref: string;
	email: string;
	socialLinks: SocialLink[];
	mapPoint: (TourMeetingPoint & { name: string }) | undefined;
}) {
	return (
		<aside className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>{t("quickActions.title")}</CardTitle>
					<CardDescription>{t("quickActions.description")}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<Button variant="outline" className="w-full justify-start" asChild>
						<a href={phoneHref}>
							<RiPhoneLine aria-hidden="true" />
							{t("quickActions.call")}
						</a>
					</Button>
					<Button variant="outline" className="w-full justify-start" asChild>
						<a href={whatsappHref} target="_blank" rel="noreferrer">
							<RiWhatsappLine aria-hidden="true" />
							{t("quickActions.whatsapp")}
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

			<Card>
				<CardHeader>
					<CardTitle>{t("social.title")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{socialLinks.map((socialLink) => (
						<Button
							key={socialLink.url}
							variant="outline"
							className="w-full justify-between"
							asChild
						>
							<a href={socialLink.url} target="_blank" rel="noreferrer">
								{t(`social.networks.${socialLink.network}`)}
								<RiArrowRightUpLine aria-hidden="true" />
							</a>
						</Button>
					))}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("map.title")}</CardTitle>
					<CardDescription>{t("map.description")}</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="rounded-none border border-dashed p-3 text-sm text-muted-foreground">
						<p className="font-medium text-foreground">
							{mapPoint?.name ?? t("map.fallbackName")}
						</p>
						<p>{mapPoint?.address ?? t("map.fallbackAddress")}</p>
						<p>{t("map.placeholderNote")}</p>
					</div>
					<Button variant="outline" className="w-full justify-start" asChild>
						<a
							href={mapPoint?.googleMapsUrl ?? "https://maps.google.com"}
							target="_blank"
							rel="noreferrer"
						>
							<RiMapPinLine aria-hidden="true" />
							{t("map.openStaticLink")}
						</a>
					</Button>
				</CardContent>
			</Card>
		</aside>
	);
}
