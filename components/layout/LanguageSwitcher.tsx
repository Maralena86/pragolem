"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LanguageSwitcherProps = {
  className?: string;
  onLocaleChange?: () => void;
};

export function LanguageSwitcher({
  className,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<Record<string, string | string[]>>();
  const [isPending, startTransition] = useTransition();

  const setLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;

    startTransition(() => {
      const slug = params.slug;
      if (pathname === "/tours/[slug]" || pathname === "/blog/[slug]") {
        if (typeof slug === "string") {
          router.replace(
            // next-intl recommends passing current template + params to preserve route.
            { pathname, params: { slug } },
            { locale: nextLocale }
          );
        } else {
          router.replace("/tours", { locale: nextLocale });
        }
      } else {
        router.replace(pathname, { locale: nextLocale });
      }
      onLocaleChange?.();
    });
  };

  const languages: Array<{ value: Locale; label: string }> = [
    { value: "en", label: t("en") },
    { value: "fr", label: t("fr") },
  ];

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
      aria-label={t("label")}
    >
      {languages.map((language) => {
        const isActive = language.value === locale;
        return (
          <Button
            key={language.value}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="sm"
            disabled={isPending}
            aria-pressed={isActive}
            onClick={() => setLocale(language.value)}
          >
            {language.label}
          </Button>
        );
      })}
    </div>
  );
}
