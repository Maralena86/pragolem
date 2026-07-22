import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteConfig } from "@/lib/api/site-config";
import type { LocaleCode } from "@/lib/types/common";

type FooterProps = {
  locale: LocaleCode;
};

type FooterHref =
  | "/tours"
  | "/about"
  | "/reviews"
  | "/faq"
  | "/blog"
  | "/contact"
  | "/booking"
  | "/terms-conditions";

export async function Footer({ locale }: FooterProps) {
  const [t, siteConfig] = await Promise.all([
    getTranslations("Footer"),
    getSiteConfig(),
  ]);

  const currentYear = new Date().getFullYear();
  const contact = siteConfig.attributes.contact;
  const tagline = siteConfig.attributes.tagline[locale];

  const exploreLinks: Array<{ href: FooterHref; label: string }> = [
    { href: "/tours", label: t("links.tours") },
    { href: "/about", label: t("links.about") },
    { href: "/reviews", label: t("links.reviews") },
    { href: "/faq", label: t("links.faq") },
    { href: "/blog", label: t("links.blog") },
    { href: "/contact", label: t("links.contact") },
  ];

  const legalLinks: Array<{ href: FooterHref; label: string }> = [
    { href: "/booking", label: t("links.booking") },
    { href: "/terms-conditions", label: t("links.terms") },
  ];

  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold tracking-tight">
              <Image src="/pragolem-logo.avif" alt="" width={20} height={20} className="size-5" aria-hidden="true" />
              {siteConfig.attributes.siteName}
            </h3>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold tracking-tight">{t("exploreTitle")}</h3>
            <ul className="space-y-2 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold tracking-tight">{t("contactTitle")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`} className="hover:text-foreground">
                  WhatsApp
                </a>
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold tracking-tight">{t("socialTitle")}</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.attributes.socialLinks.map((social) => (
                <li key={social.network}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t(`social.${social.network}`)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{t("copyright", { year: currentYear })}</p>
      </div>
    </footer>
  );
}
