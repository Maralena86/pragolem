import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSiteConfig } from "@/lib/api/site-config";
import { getTours } from "@/lib/api/tours";
import { getSiteUrl } from "@/lib/env";
import { buildPhoneHref, toLocaleCode } from "@/lib/helpers/page-helpers";
import { ContactFormCard } from "./contact-form-card";
import { ContactHeroSection } from "./contact-hero-section";
import { ContactSidebar } from "./contact-sidebar";

/**
 * Builds localized SEO metadata for the contact page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);

  const [t, siteConfig] = await Promise.all([
    getTranslations({ locale: localeCode, namespace: "ContactPage.meta" }),
    getSiteConfig(),
  ]);

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/${localeCode}/contact`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en/contact`,
        fr: `${siteUrl}/fr/contact`,
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
 * Renders the localized contact page with a contact form, direct call/WhatsApp
 * actions, social profiles, and a static map link placeholder.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = toLocaleCode(locale);
  setRequestLocale(localeCode);

  const [t, siteConfig, tours] = await Promise.all([
    getTranslations("ContactPage"),
    getSiteConfig(),
    getTours(localeCode),
  ]);

  const contact = siteConfig.attributes.contact;
  const socialLinks = siteConfig.attributes.socialLinks;
  const phoneHref = buildPhoneHref(contact.phone);
  const whatsappHref =
    socialLinks.find((socialLink) => socialLink.network === "whatsapp")?.url ??
    `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`;
  const firstTour = tours[0];
  const mapPoint = firstTour
    ? { name: firstTour.attributes.title, ...firstTour.attributes.meetingPoint }
    : undefined;

  return (
    <main id="main-content" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <ContactHeroSection t={t} />

      <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <ContactFormCard t={t} />
        <ContactSidebar
          t={t}
          phoneHref={phoneHref}
          phoneDisplay={contact.phone}
          whatsappHref={whatsappHref}
          email={contact.email}
          socialLinks={socialLinks}
          mapPoint={mapPoint}
        />
      </section>
    </main>
  );
}
