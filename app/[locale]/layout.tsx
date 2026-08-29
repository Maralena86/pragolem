import type { Metadata } from "next";
import { Outfit, Quintessential } from "next/font/google";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { getSiteUrl } from "@/lib/env";
import type { LocaleCode } from "@/lib/types/common";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const googleAnalyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const quintessential = Quintessential({
	weight: "400", // Quintessential n'existe qu'en poids 400 (Regular)
	subsets: ["latin"],
	variable: "--font-quintessential-raw",
});

/**
 * Generates root-level metadata including a default OpenGraph image that all
 * child pages inherit unless they override it with their own images.
 */
export function generateMetadata(): Metadata {
	const siteUrl = getSiteUrl();

	return {
		title: "Pragolem Tours",
		description: "Discover Prague with certified local guides.",
		openGraph: {
			images: [{ url: `${siteUrl}/pragolem-logo.avif`, alt: "Pragolem Tours" }],
		},
	};
}

/**
 * Returns the static locale params used by Next.js to pre-render each localized
 * route segment handled by this layout.
 */
export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/**
 * Provides the localized shell for all locale-prefixed pages. It validates the
 * locale from params, loads the translation catalog, and wraps content with
 * shared navigation/footer plus a global toast container.
 */
export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();
	const localeCode = locale as LocaleCode;

	return (
		<html
			lang={locale}
			className={`${outfit.variable} ${quintessential.variable}`}
		>
			<body className={`font-sans antialiased dark`}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
					>
						{locale === "fr" ? "Aller au contenu" : "Skip to content"}
					</a>
					<div className="flex min-h-screen flex-col">
						<Header />
						<div className="flex-1">{children}</div>
						<Footer locale={localeCode} />
						<Toaster richColors position="top-right" />
					</div>
				</NextIntlClientProvider>
				{googleAnalyticsMeasurementId ? (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`}
							strategy="afterInteractive"
						/>
						<Script id="google-analytics" strategy="afterInteractive">
							{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${googleAnalyticsMeasurementId}');`}
						</Script>
					</>
				) : null}
			</body>
		</html>
	);
}
