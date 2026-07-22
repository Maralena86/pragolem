"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LocaleCode } from "@/lib/types/common";
import type { ReviewSource } from "@/lib/types/review";

interface FilterOption {
  value: string;
  label: string;
}

export interface ReviewFilterItem {
  id: string;
  locale: LocaleCode;
  authorName: string;
  rating: number;
  text: string;
  source: ReviewSource;
  isRealReview: boolean;
  tourKey: string | null;
  tourTitle: string | null;
}

type ReviewsPageTranslator = ReturnType<typeof useTranslations>;

const ALL_LANGUAGE_FILTER = "all";
const ALL_TOUR_FILTER = "all";

/**
 * Resolves a localized language label for a review locale code.
 * The function centralizes locale-to-translation mapping to keep
 * filter controls and badges consistent across the page.
 */
function getLanguageLabel(locale: LocaleCode, t: ReviewsPageTranslator): string {
  return t(`filters.languages.${locale}`);
}

/**
 * Builds the available language filter options from the loaded review set.
 * Only locales present in the data are surfaced to avoid empty filter choices.
 */
function getLanguageOptions(items: ReviewFilterItem[], t: ReviewsPageTranslator): FilterOption[] {
  const locales = [...new Set(items.map((item) => item.locale))].toSorted();
  return [
    { value: ALL_LANGUAGE_FILTER, label: t("filters.allLanguages") },
    ...locales.map((locale) => ({
      value: locale,
      label: getLanguageLabel(locale, t),
    })),
  ];
}

/**
 * Builds localized tour filter options for the selected language.
 * When "all languages" is selected, tours from both locales are offered.
 */
function getTourOptions(
  items: ReviewFilterItem[],
  selectedLanguage: string,
  t: ReviewsPageTranslator,
): FilterOption[] {
  const visibleItems =
    selectedLanguage === ALL_LANGUAGE_FILTER
      ? items
      : items.filter((item) => item.locale === selectedLanguage);
  const tourOptionsMap = new Map<string, string>();

  for (const item of visibleItems) {
    if (item.tourKey && item.tourTitle) {
      tourOptionsMap.set(item.tourKey, item.tourTitle);
    }
  }

  const tourOptions = [...tourOptionsMap.entries()]
    .map(([value, label]) => ({ value, label }))
    .toSorted((left, right) => left.label.localeCompare(right.label));

  return [{ value: ALL_TOUR_FILTER, label: t("filters.allTours") }, ...tourOptions];
}

/**
 * Applies language and tour filters to review items and returns
 * only the entries currently visible in the reviews grid.
 */
function getFilteredReviews(
  items: ReviewFilterItem[],
  selectedLanguage: string,
  selectedTour: string,
): ReviewFilterItem[] {
  return items.filter((item) => {
    const matchesLanguage =
      selectedLanguage === ALL_LANGUAGE_FILTER || item.locale === selectedLanguage;
    const matchesTour = selectedTour === ALL_TOUR_FILTER || item.tourKey === selectedTour;
    return matchesLanguage && matchesTour;
  });
}

/**
 * Converts a numeric rating into a compact star string for visual scanning.
 */
function formatStars(rating: number): string {
  return "★".repeat(Math.max(1, Math.min(5, rating)));
}

/**
 * Renders review filters and a responsive review card grid with client-side
 * filtering by language and tour, without triggering additional network calls.
 */
export function ReviewsFilterGrid({
  items,
  defaultLanguage,
}: {
  items: ReviewFilterItem[];
  defaultLanguage: LocaleCode;
}) {
  const t = useTranslations("ReviewsPage");
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);
  const [selectedTour, setSelectedTour] = useState<string>(ALL_TOUR_FILTER);

  const languageOptions = useMemo(() => getLanguageOptions(items, t), [items, t]);
  const tourOptions = useMemo(
    () => getTourOptions(items, selectedLanguage, t),
    [items, selectedLanguage, t],
  );
  const filteredReviews = useMemo(
    () => getFilteredReviews(items, selectedLanguage, selectedTour),
    [items, selectedLanguage, selectedTour],
  );

  useEffect(() => {
    const isCurrentTourOptionValid = tourOptions.some((option) => option.value === selectedTour);
    if (!isCurrentTourOptionValid) {
      setSelectedTour(ALL_TOUR_FILTER);
    }
  }, [selectedTour, tourOptions]);

  return (
    <div className="space-y-5">
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium" htmlFor="reviews-language-filter">
            {t("filters.languageLabel")}
          </label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger id="reviews-language-filter">
              <SelectValue placeholder={t("filters.allLanguages")} />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium" htmlFor="reviews-tour-filter">
            {t("filters.tourLabel")}
          </label>
          <Select value={selectedTour} onValueChange={setSelectedTour}>
            <SelectTrigger id="reviews-tour-filter">
              <SelectValue placeholder={t("filters.allTours")} />
            </SelectTrigger>
            <SelectContent>
              {tourOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {t("results", { shown: filteredReviews.length, total: items.length })}
      </p>

      {filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-muted-foreground">{t("emptyState")}</CardContent>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredReviews.map((review) => (
            <Card key={`${review.locale}-${review.id}`} size="sm">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle>{review.authorName}</CardTitle>
                  <Badge variant="outline">{getLanguageLabel(review.locale, t)}</Badge>
                </div>
                <CardDescription>
                  <span aria-hidden="true">{formatStars(review.rating)}</span>
                  <span className="sr-only">{review.rating}/5</span>
                  {" · "}{t(`sources.${review.source}`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {!review.isRealReview && <Badge variant="outline">{t("placeholderBadge")}</Badge>}
                {review.tourTitle && (
                  <p className="text-xs font-medium text-foreground">
                    {t("reviewCard.tourLabel")}: {review.tourTitle}
                  </p>
                )}
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
