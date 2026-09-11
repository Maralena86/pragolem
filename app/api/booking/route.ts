import { Resend } from "resend";
import { NextResponse } from "next/server";
import { toursData } from "@/lib/data/tours";
import { tourEsTranslations } from "@/lib/data/tours-es";
import { getSiteUrl } from "@/lib/env";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingPayload {
	tourSlug: string;
	date: string;
	timeSlot: string;
	participants: number;
	language: string;
	fullName: string;
	email: string;
	phone: string | null;
	specialRequests: string | null;
	termsAccepted: boolean;
	submittedAt: string;
}

// Noms complets des langues (natifs, pour l'email client)
const languageNativeNames: { [key: string]: string } = {
	en: "English",
	es: "español",
	fr: "français",
};

// Noms des langues en anglais (pour l'email interne, destiné aux guides)
const languageEnglishNames: { [key: string]: string } = {
	en: "English",
	es: "Spanish",
	fr: "French",
};

/**
 * Retourne le chemin localisé de la page CGU.
 * L'espagnol n'ayant pas de page dédiée, on redirige vers la version anglaise.
 */
function getLocalizedTermsUrl(language: string): string {
	const domain = getSiteUrl();
	const isFrench = language === "fr";
	const localeSegment = isFrench ? "fr" : "en";
	const termsPath = isFrench ? "conditions-generales" : "terms-conditions";
	return `${domain}/${localeSegment}/${termsPath}`;
}

function findTourBySlug(tourSlug: string) {
	return (
		toursData.find(
			(tour) =>
				(tour.slug.en === tourSlug || tour.slug.fr === tourSlug) &&
				tour.locale === "en",
		) ??
		toursData.find(
			(tour) => tour.slug.en === tourSlug || tour.slug.fr === tourSlug,
		)
	);
}

function getTourDisplayInfo(tourSlug: string, requestedLanguage: string) {
	const tourInfo = findTourBySlug(tourSlug);

	if (requestedLanguage === "es") {
		const esTranslation = tourEsTranslations[tourInfo?.slug.en ?? tourSlug];
		if (esTranslation) {
			return {
				title: esTranslation.title,
				meetingAddress: esTranslation.meetingAddress,
				meetingDescription: esTranslation.meetingDescription,
				googleMapsUrl: tourInfo?.attributes.meetingPoint?.googleMapsUrl,
			};
		}
	}

	const matchingLocale = requestedLanguage === "fr" ? "fr" : "en";
	const localizedTour =
		toursData.find(
			(tour) =>
				(tour.slug.en === tourSlug || tour.slug.fr === tourSlug) &&
				tour.locale === matchingLocale,
		) ?? tourInfo;

	return {
		title: localizedTour?.attributes.title ?? tourSlug,
		meetingAddress: localizedTour?.attributes.meetingPoint?.address ?? "",
		meetingDescription:
			localizedTour?.attributes.meetingPoint?.description ?? "",
		googleMapsUrl: localizedTour?.attributes.meetingPoint?.googleMapsUrl,
	};
}

export async function POST(request: Request) {
	if (!process.env.RESEND_API_KEY) {
		console.error("[BookingAPI] Missing RESEND_API_KEY environment variable");
		
		return NextResponse.json(
			{ success: false, error: "Server configuration error" },
			{ status: 500 },
		);
	}

	if (!process.env.BOOKING_NOTIFICATION_EMAIL) {
		console.error(
			"[BookingAPI] Missing BOOKING_NOTIFICATION_EMAIL environment variable",
		);
		return NextResponse.json(
			{ success: false, error: "Server configuration error" },
			{ status: 500 },
		);
	}

	try {
		const payload = (await request.json()) as BookingPayload;

		const {
			tourSlug,
			date,
			timeSlot,
			participants,
			language,
			fullName,
			email,
			phone,
			specialRequests,
		} = payload;

		if (!fullName || !email || !date || !timeSlot || !tourSlug) {
			return NextResponse.json(
				{ success: false, error: "Missing required fields" },
				{ status: 400 },
			);
		}

		const {
			title: tourTitle,
			meetingAddress,
			meetingDescription,
			googleMapsUrl,
		} = getTourDisplayInfo(tourSlug, language);
		const languageDisplay = languageNativeNames[language] ?? language;
		const languageForGuides = languageEnglishNames[language] ?? language;
		const termsUrl = getLocalizedTermsUrl(language);

		// Templates de traduction pour l'email CLIENT (fr / en / es)
		const clientEmailTranslations = {
			fr: {
				subject: (fullName: string) =>
					`Confirmation de votre réservation — Merci ${fullName} !`,
				greeting: (fullName: string) =>
					`Merci pour votre réservation, ${fullName} ! 🎉`,
				intro: "Nous avons bien reçu votre demande. Voici le récapitulatif :",
				labels: {
					tour: "Tour",
					date: "Date",
					time: "Heure",
					participants: "Participants",
					language: "Langue",
					phone: "Téléphone",
					specialRequests: "Demandes spéciales",
					meetingPoint: "Point de rencontre",
				},
				followUp:
					"📞 Nous vous recontacterons rapidement pour confirmer les détails de votre visite.",
				footer: "Pragolem — Découvrez Prague autrement",
				termsLinkText: "Conditions générales de vente",
			},
			en: {
				subject: (fullName: string) =>
					`Booking Confirmation — Thank you ${fullName}!`,
				greeting: (fullName: string) =>
					`Thank you for your booking, ${fullName}! 🎉`,
				intro: "We've received your request. Here's your booking summary:",
				labels: {
					tour: "Tour",
					date: "Date",
					time: "Time",
					participants: "Participants",
					language: "Language",
					phone: "Phone",
					specialRequests: "Special requests",
					meetingPoint: "Meeting point",
				},
				followUp:
					"📞 We'll get back to you shortly to confirm the details of your visit.",
				footer: "Pragolem — Discover Prague differently",
				termsLinkText: "Terms and Conditions",
			},
			es: {
				subject: (fullName: string) =>
					`Confirmación de tu reserva — ¡Gracias ${fullName}!`,
				greeting: (fullName: string) =>
					`¡Gracias por tu reserva, ${fullName}! 🎉`,
				intro: "Hemos recibido tu solicitud. Aquí tienes el resumen:",
				labels: {
					tour: "Tour",
					date: "Fecha",
					time: "Hora",
					participants: "Participantes",
					language: "Idioma",
					phone: "Teléfono",
					specialRequests: "Solicitudes especiales",
					meetingPoint: "Punto de encuentro",
				},
				followUp:
					"📞 Nos pondremos en contacto contigo pronto para confirmar los detalles de tu visita.",
				footer: "Pragolem — Descubre Praga de otra manera",
				termsLinkText: "Terminos y condiciones", 
			},
		} as const;

		const clientLang =
			language === "es" ? "es" : language === "fr" ? "fr" : "en";
		const tc = clientEmailTranslations[clientLang];
		

		// Bloc HTML du point de rencontre (email client)
		const meetingPointBlock = meetingAddress
			? `
				<tr>
					<td style="padding: 12px 0; color: #6b7280; font-size: 14px; vertical-align: top;">${tc.labels.meetingPoint}</td>
					<td style="padding: 12px 0; text-align: right; font-weight: 600; color: #123865;">
						${meetingAddress}
						${meetingDescription ? `<br/><span style="font-weight: 400; font-size: 13px; color: #6b7280;">${meetingDescription}</span>` : ""}
						${
							googleMapsUrl
								? `<br/><a href="${googleMapsUrl}" style="color: #4A719A; font-size: 13px; font-weight: 400;">Voir sur Google Maps →</a>`
								: ""
						}
					</td>
				</tr>`
			: "";

		// Email de confirmation envoyé au client (fr / en / es selon son choix)
		const clientEmail = await resend.emails.send({
			from: "Bookings <onboarding@pragolem.com>", // à remplacer par ton domaine vérifié
			to: email,
			subject: tc.subject(fullName),
			html: `
				<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
					<div style="background-color: #123865; padding: 32px 24px; text-align: center;">
          			<div style="background-color: #123865; padding-bottom: 32px; text-align: center;">
						<img
							src="https://pragolem-rho.vercel.app/pragolem-logo.png"
							alt="Pragolem"
							width="60"
							height="60"
							style="display: block; margin: 0 auto 2px;"
						/>
						<h1 style="color: #4a719c; margin: 0; font-size: 24px;">Pragolem</h1>
						<p style="color: #a8c4de; margin: 8px 0 0; font-size: 14px;">Prague Tours & Guides</p>
					</div>

					<div style="background-color: #ffffff; padding: 32px 24px; border-radius: 0 0 8px 8px;">
						<h2 style="color: #1a1a1a; margin-top: 0; font-size: 20px;">${tc.greeting(fullName)}</h2>
						<p style="color: #4b5563; line-height: 1.6;">${tc.intro}</p>

						<table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
							<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.tour}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${tourTitle}</td>
							</tr>
							<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.date}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${date}</td>
							</tr>
							<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.time}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${timeSlot}</td>
							</tr>
							<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.participants}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${participants}</td>
							</tr>
							<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.language}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${languageDisplay}</td>
							</tr>
							${meetingPointBlock}
							${
								phone
									? `<tr>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">${tc.labels.phone}</td>
								<td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #123865;">${phone}</td>
							</tr>`
									: ""
							}
							${
								specialRequests
									? `<tr>
								<td style="padding: 12px 0; color: #6b7280; font-size: 14px;">${tc.labels.specialRequests}</td>
								<td style="padding: 12px 0; text-align: right; font-weight: 600; color: #123865;">${specialRequests}</td>
							</tr>`
									: ""
							}
						</table>

						<div style="background-color: #eef3f8; border-left: 4px solid #123865; padding: 16px; border-radius: 4px; margin: 24px 0;">
							<p style="margin: 0; color: #123865; font-size: 14px;">${tc.followUp}</p>
						</div>
					</div>
					<div style="text-align: center; padding: 24px; color: #9ca3af; font-size: 12px;">
						<p style="margin: 0 0 8px;">${tc.footer}</p>
						<a href="${termsUrl}" style="color: #9ca3af; text-decoration: underline;">${tc.termsLinkText}</a>
					</div>
				</div>
			`,
		});

		// Email de notification interne — toujours en anglais, langue de réservation bien visible
		const internalEmail = await resend.emails.send({
			from: "Bookings <onboarding@pragolem.com>",
			to: process.env.BOOKING_NOTIFICATION_EMAIL,
			subject: `New booking (${languageForGuides}): ${fullName} — ${tourTitle}`,
			html: `
				<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<div style="background-color: #58190F; padding: 20px 24px;">
						<h2 style="color: #ffffff; margin: 0 0 4px; font-size: 18px;">New booking received</h2>
						<p style="color: #f3d9d3; margin: 0; font-size: 14px; font-weight: 600;">Booking tour in ${languageForGuides}</p>
					</div>
					<div style="background-color: #ffffff; padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
						<table style="width: 100%; border-collapse: collapse;">
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Tour</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${tourTitle}</td></tr>
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Date</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${date} — ${timeSlot}</td></tr>
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Participants</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${participants}</td></tr>
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Language</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${languageForGuides}</td></tr>
							${
								meetingAddress
									? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Meeting point</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${meetingAddress}</td></tr>`
									: ""
							}
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Name</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${fullName}</td></tr>
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${email}</td></tr>
							<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${phone ?? "not provided"}</td></tr>
							${
								specialRequests
									? `<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Special requests</td><td style="padding: 8px 0; text-align: right; font-weight: 600;">${specialRequests}</td></tr>`
									: ""
							}
						</table>
					</div>
				</div>
			`,
		});

		if (clientEmail.error || internalEmail.error) {
			console.error(
				"[BookingAPI] Client email error:",
				JSON.stringify(clientEmail.error, null, 2),
			);
			console.error(
				"[BookingAPI] Internal email error:",
				JSON.stringify(internalEmail.error, null, 2),
			);
			return NextResponse.json(
				{ success: false, error: "Failed to send confirmation email" },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("[BookingAPI] Unexpected error:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}