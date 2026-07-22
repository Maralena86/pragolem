import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { BookingTourOption } from "@/components/forms/BookingForm";
import { getSiteConfig } from "@/lib/api/site-config";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import { buildPhoneHref, toLocaleCode } from "@/lib/helpers/page-helpers";
import type { Tour } from "@/lib/types/tour";
import { BookingFormCard } from "./booking-form-card";
import { BookingHeroSection } from "./booking-hero-section";
import { BookingSidebar } from "./booking-sidebar";

/**
 * Normalizes tour records into lightweight booking select options.
 */
function buildBookingTourOptions(tours: Tour[]): BookingTourOption[] {
  return tours
    .map((tour) => ({
      slug: tour.slug[tour.locale],
      title: tour.attributes.title,
      priceType: tour.attributes.priceType,
    }))
    .sort((tourA, tourB) => tourA.title.localeCompare(tourB.title));
}

/**
 * Builds localized SEO metadata for the booking landing page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "BookingPage.meta" }),
    getSiteConfig(),
  ]);

  const baseUrl = getSiteUrl();
  const canonicalPath = localeCode === "fr" ? "reservation" : "booking";
  const canonical = `${baseUrl}/${localeCode}/${canonicalPath}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/booking`,
        fr: `${baseUrl}/fr/reservation`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: siteConfig.attributes.siteName,
      locale: localeCode,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

/**
 * Renders the booking conversion page with the localized booking form and
 * contact shortcuts for high-intent users.
 */
export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, tours, siteConfig] = await Promise.all([
    getTranslations("BookingPage"),
    getTours(localeCode),
    getSiteConfig(),
  ]);

  const tourOptions = buildBookingTourOptions(tours);
  const phoneHref = buildPhoneHref(siteConfig.attributes.contact.phone);
  const whatsappHref =
    siteConfig.attributes.socialLinks.find((socialLink) => socialLink.network === "whatsapp")?.url ??
    `https://wa.me/${siteConfig.attributes.contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <BookingHeroSection t={t} />

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <BookingFormCard t={t} tourOptions={tourOptions} defaultLanguage={localeCode} />

        <BookingSidebar
          t={t}
          bookingNotice={siteConfig.attributes.bookingNotice[localeCode]}
          phoneHref={phoneHref}
          phoneDisplay={siteConfig.attributes.contact.phone}
          whatsappHref={whatsappHref}
          email={siteConfig.attributes.contact.email}
        />
      </section>
    </main>
  );
}
