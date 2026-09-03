"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface BookingTourOption {
	slug: string;
	title: string;
	priceType: "free" | "paid";
}

interface BookingFormValues {
	tourSlug: string;
	date: string;
	timeSlot: string;
	participants: string;
	language: string;
	fullName: string;
	email: string;
	phone: string;
	specialRequests: string;
	termsAccepted: boolean;
}

type BookingFormErrors = Partial<Record<keyof BookingFormValues, string>>;
type BookingFormTranslator = ReturnType<typeof useTranslations>;

// const PARTICIPANT_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

const TIME_SLOT_OPTIONS = [
	{ value: "09:00", labelKey: "timeSlots.slot0900" },
	{ value: "11:00", labelKey: "timeSlots.slot1100" },
	{ value: "14:00", labelKey: "timeSlots.slot1400" },
	{ value: "17:00", labelKey: "timeSlots.slot1700" },
] as const;

const LANGUAGE_OPTIONS = [
	{ value: "en", labelKey: "languageOptions.en" },
	{ value: "fr", labelKey: "languageOptions.fr" },
	{ value: "es", labelKey: "languageOptions.es" },
] as const;

/**
 * Returns today's date in `YYYY-MM-DD` format based on the visitor's local timezone.
 * The value is used for both the date input minimum and past-date validation.
 */
function getTodayDateString(): string {
	const now = new Date();
	now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
	return now.toISOString().slice(0, 10);
}

/**
 * Builds the default form state used on initial render and after a successful submission.
 */
function createInitialBookingValues(
	defaultLanguage: "en" | "fr",
): BookingFormValues {
	return {
		tourSlug: "",
		date: "",
		timeSlot: "",
		participants: "",
		language: defaultLanguage,
		fullName: "",
		email: "",
		phone: "",
		specialRequests: "",
		termsAccepted: false,
	};
}

/**
 * Validates booking form values and returns a localized error object keyed by field name.
 * The validation includes required fields, email format, and a strict past-date check.
 */
function validateBookingValues(
	values: BookingFormValues,
	todayDateString: string,
	t: BookingFormTranslator,
): BookingFormErrors {
	const errors: BookingFormErrors = {};
	const normalizedName = values.fullName.trim();
	const normalizedEmail = values.email.trim();
	const normalizedPhone = values.phone.trim();

	if (!values.tourSlug) {
		errors.tourSlug = t("validation.requiredTour");
	}

	if (!values.date) {
		errors.date = t("validation.requiredDate");
	} else if (values.date < todayDateString) {
		errors.date = t("validation.pastDate");
	}

	if (!values.timeSlot) {
		errors.timeSlot = t("validation.requiredTimeSlot");
	}

	if (!values.participants) {
		errors.participants = t("validation.requiredParticipants");
	}

	if (!values.language) {
		errors.language = t("validation.requiredLanguage");
	}

	if (!normalizedName) {
		errors.fullName = t("validation.requiredFullName");
	} else if (normalizedName.length < 2) {
		errors.fullName = t("validation.fullNameTooShort");
	}

	if (!normalizedEmail) {
		errors.email = t("validation.requiredEmail");
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
		errors.email = t("validation.invalidEmail");
	}

	if (!normalizedPhone) {
		errors.phone = t("validation.requiredPhone");
	}

	if (!values.termsAccepted) {
		errors.termsAccepted = t("validation.termsRequired");
	}

	return errors;
}

/**
 * Renders the localized booking form and handles client-side validation/submission.
 * On successful submission it logs the payload and shows a success toast.
 */
export function BookingForm({
	tourOptions,
	defaultLanguage,
}: {
	tourOptions: BookingTourOption[];
	defaultLanguage: "en" | "fr";
}) {
	const t = useTranslations("BookingPage.form");
	const todayDateString = useMemo(() => getTodayDateString(), []);
	const [values, setValues] = useState<BookingFormValues>(() =>
		createInitialBookingValues(defaultLanguage),
	);
	const [errors, setErrors] = useState<BookingFormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	/**
	 * Updates one field value and clears any existing validation message for that field.
	 */
	const updateField = <K extends keyof BookingFormValues>(
		field: K,
		value: BookingFormValues[K],
	) => {
		setValues((previousValues) => ({ ...previousValues, [field]: value }));
		setErrors((previousErrors) => {
			if (!previousErrors[field]) {
				return previousErrors;
			}

			const nextErrors = { ...previousErrors };
			delete nextErrors[field];
			return nextErrors;
		});
	};

	/**
	 * Validates the form, logs a normalized payload, and shows a success toast when valid.
	 */
	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	//   event.preventDefault();
	//   const nextErrors = validateBookingValues(values, todayDateString, t);

	//   if (Object.keys(nextErrors).length > 0) {
	//     setErrors(nextErrors);
	//     return;
	//   }

	//   setIsSubmitting(true);

	//   const payload = {
	//     tourSlug: values.tourSlug,
	//     date: values.date,
	//     timeSlot: values.timeSlot,
	//     participants: Number(values.participants),
	//     language: values.language,
	//     fullName: values.fullName.trim(),
	//     email: values.email.trim(),
	//     phone: values.phone.trim() || null,
	//     specialRequests: values.specialRequests.trim() || null,
	//     termsAccepted: values.termsAccepted,
	//     submittedAt: new Date().toISOString(),
	//   };

	//   console.info("[BookingForm] Submitted booking payload:", payload);
	//   // TODO: Send this payload to Strapi and trigger booking confirmation emails/WhatsApp messages.
	//   toast.success(t("successToast"));
	//   setValues(createInitialBookingValues(defaultLanguage));
	//   setErrors({});
	//   setIsSubmitting(false);
	// };
	/**
	 * Validates the form, submits the booking to the API route, and shows a toast
	 * based on the result. On success, the form resets to its initial state.
	 */
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextErrors = validateBookingValues(values, todayDateString, t);

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		setIsSubmitting(true);

		const payload = {
			tourSlug: values.tourSlug,
			date: values.date,
			timeSlot: values.timeSlot,
			participants: Number(values.participants),
			language: values.language,
			fullName: values.fullName.trim(),
			email: values.email.trim(),
			phone: values.phone.trim() || null,
			specialRequests: values.specialRequests.trim() || null,
			termsAccepted: values.termsAccepted,
			submittedAt: new Date().toISOString(),
		};

		try {
			const response = await fetch("/api/booking", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				throw new Error(
					`Booking request failed with status ${response.status}`,
				);
			}

			toast.success(t("successToast"));
			setValues(createInitialBookingValues(defaultLanguage));
			setErrors({});
		} catch (error) {
			console.error("[BookingForm] Submission failed:", error);
			toast.error(t("errorToast"));
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} noValidate className="space-y-5">
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="booking-tour">{t("tourLabel")}</FieldLabel>
					<Select
						value={values.tourSlug}
						onValueChange={(value) => updateField("tourSlug", value)}
					>
						<SelectTrigger
							id="booking-tour"
							aria-invalid={Boolean(errors.tourSlug)}
						>
							<SelectValue placeholder={t("tourPlaceholder")} />
						</SelectTrigger>
						<SelectContent>
							{tourOptions.map((tour) => (
								<SelectItem key={tour.slug} value={tour.slug}>
									{tour.title} · {t(`tourPriceType.${tour.priceType}`)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{errors.tourSlug}</FieldError>
				</Field>

				<div className="grid gap-4 sm:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="booking-date">{t("dateLabel")}</FieldLabel>
						<Input
							id="booking-date"
							name="date"
							type="date"
							min={todayDateString}
							value={values.date}
							onChange={(event) => updateField("date", event.target.value)}
							aria-invalid={Boolean(errors.date)}
						/>
						<FieldError>{errors.date}</FieldError>
					</Field>

					<Field>
						<FieldLabel htmlFor="booking-time-slot">
							{t("timeSlotLabel")}
						</FieldLabel>
						<Select
							value={values.timeSlot}
							onValueChange={(value) => updateField("timeSlot", value)}
						>
							<SelectTrigger
								id="booking-time-slot"
								aria-invalid={Boolean(errors.timeSlot)}
							>
								<SelectValue placeholder={t("timeSlotPlaceholder")} />
							</SelectTrigger>
							<SelectContent>
								{TIME_SLOT_OPTIONS.map((slot) => (
									<SelectItem key={slot.value} value={slot.value}>
										{t(slot.labelKey)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldError>{errors.timeSlot}</FieldError>
					</Field>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					{/* <Field>
						<FieldLabel htmlFor="booking-participants">
							{t("participantsLabel")}
						</FieldLabel>
						<Select
							value={values.participants}
							onValueChange={(value) => updateField("participants", value)}
						>
							<SelectTrigger
								id="booking-participants"
								aria-invalid={Boolean(errors.participants)}
							>
								<SelectValue placeholder={t("participantsPlaceholder")} />
							</SelectTrigger>
							<SelectContent>
								{PARTICIPANT_OPTIONS.map((count) => (
									<SelectItem key={count} value={String(count)}>
										{t("participantsCount", { count })}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldDescription>
							{t.rich("participantsPrivateNote", {
								contactLink: (chunks) => (
									<Link
										href="/contact"
										className="underline underline-offset-4"
									>
										{chunks}
									</Link>
								),
							})}
						</FieldDescription>
						<FieldError>{errors.participants}</FieldError>
					</Field> */}
					<Field>
						<FieldLabel htmlFor="booking-participants">
							{t("participantsLabel")}
						</FieldLabel>
						<Input
							id="booking-participants"
							name="participants"
							type="number"
							min="1"
							placeholder={t("participantsPlaceholder")}
							value={values.participants}
							onChange={(event) =>
								updateField("participants", event.target.value)
							}
							aria-invalid={Boolean(errors.participants)}
						/>
						{Number(values.participants) > 6 && (
							<FieldDescription>
								{t.rich("participantsPrivateNote", {
									contactLink: (chunks) => (
										<Link
											href="/contact"
											className="underline underline-offset-4"
										>
											{chunks}
										</Link>
									),
								})}
							</FieldDescription>
						)}
						<FieldError>{errors.participants}</FieldError>
					</Field>

					<Field>
						<FieldLabel htmlFor="booking-language">
							{t("languageLabel")}
						</FieldLabel>
						<Select
							value={values.language}
							onValueChange={(value) => updateField("language", value)}
						>
							<SelectTrigger
								id="booking-language"
								aria-invalid={Boolean(errors.language)}
							>
								<SelectValue placeholder={t("languagePlaceholder")} />
							</SelectTrigger>
							<SelectContent>
								{LANGUAGE_OPTIONS.map((language) => (
									<SelectItem key={language.value} value={language.value}>
										{t(language.labelKey)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldError>{errors.language}</FieldError>
					</Field>
				</div>

				<Field>
					<FieldLabel htmlFor="booking-full-name">
						{t("fullNameLabel")}
					</FieldLabel>
					<Input
						id="booking-full-name"
						name="fullName"
						autoComplete="name"
						placeholder={t("fullNamePlaceholder")}
						value={values.fullName}
						onChange={(event) => updateField("fullName", event.target.value)}
						aria-invalid={Boolean(errors.fullName)}
					/>
					<FieldError>{errors.fullName}</FieldError>
				</Field>

				<div className="grid gap-4 sm:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="booking-email">{t("emailLabel")}</FieldLabel>
						<Input
							id="booking-email"
							name="email"
							type="email"
							autoComplete="email"
							placeholder={t("emailPlaceholder")}
							value={values.email}
							onChange={(event) => updateField("email", event.target.value)}
							aria-invalid={Boolean(errors.email)}
						/>
						<FieldError>{errors.email}</FieldError>
					</Field>

					<Field>
						<FieldLabel htmlFor="booking-phone">{t("phoneLabel")}</FieldLabel>
						<Input
							id="booking-phone"
							name="phone"
							type="tel"
							autoComplete="tel"
							placeholder={t("phonePlaceholder")}
							value={values.phone}
							onChange={(event) => updateField("phone", event.target.value)}
							aria-invalid={Boolean(errors.phone)}
						/>
						<FieldError>{errors.phone}</FieldError>
					</Field>
				</div>

				<Field>
					<FieldLabel htmlFor="booking-special-requests">
						{t("specialRequestsLabel")}
					</FieldLabel>
					<Textarea
						id="booking-special-requests"
						name="specialRequests"
						rows={4}
						placeholder={t("specialRequestsPlaceholder")}
						value={values.specialRequests}
						onChange={(event) =>
							updateField("specialRequests", event.target.value)
						}
					/>
				</Field>

				<Field>
					<div className="flex items-start gap-2.5">
						<Checkbox
							id="booking-terms"
							checked={values.termsAccepted}
							onCheckedChange={(checked) =>
								updateField("termsAccepted", checked === true)
							}
							aria-invalid={Boolean(errors.termsAccepted)}
						/>
						<div className="space-y-1">
							<FieldLabel htmlFor="booking-terms">{t("termsLabel")}</FieldLabel>
							<FieldError>{errors.termsAccepted}</FieldError>
						</div>
					</div>
				</Field>
			</FieldGroup>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? t("submitPending") : t("submit")}
			</Button>
		</form>
	);
}
