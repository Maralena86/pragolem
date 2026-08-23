import { Resend } from "resend";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
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

    // Validation basique côté serveur (ne jamais faire confiance au client)
    if (!fullName || !email || !date || !timeSlot || !tourSlug) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email de confirmation envoyé au client
    const clientEmail = await resend.emails.send({
      from: "Bookings <onboarding@resend.dev>", // à remplacer par ton domaine vérifié
      to: email,
      subject: "Confirmation de votre réservation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Merci pour votre réservation, ${fullName} !</h1>
          <p>Voici le récapitulatif de votre demande :</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0;"><strong>Tour :</strong></td><td>${tourSlug}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Date :</strong></td><td>${date}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Heure :</strong></td><td>${timeSlot}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Participants :</strong></td><td>${participants}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Langue :</strong></td><td>${language}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0;"><strong>Téléphone :</strong></td><td>${phone}</td></tr>` : ""}
            ${specialRequests ? `<tr><td style="padding: 8px 0;"><strong>Demandes spéciales :</strong></td><td>${specialRequests}</td></tr>` : ""}
          </table>
          <p style="margin-top: 20px;">Nous vous recontacterons rapidement pour confirmer les détails.</p>
        </div>
      `,
    });

    // Email de notification interne
    const internalEmail = await resend.emails.send({
      from: "Bookings <onboarding@resend.dev>",
      to: process.env.BOOKING_NOTIFICATION_EMAIL!,
      subject: `Nouvelle réservation : ${fullName} — ${tourSlug}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Nouvelle réservation reçue</h2>
          <ul>
            <li><strong>Tour :</strong> ${tourSlug}</li>
            <li><strong>Date :</strong> ${date} à ${timeSlot}</li>
            <li><strong>Participants :</strong> ${participants}</li>
            <li><strong>Langue :</strong> ${language}</li>
            <li><strong>Nom :</strong> ${fullName}</li>
            <li><strong>Email :</strong> ${email}</li>
            <li><strong>Téléphone :</strong> ${phone ?? "non fourni"}</li>
            ${specialRequests ? `<li><strong>Demandes spéciales :</strong> ${specialRequests}</li>` : ""}
          </ul>
        </div>
      `,
    });

    if (clientEmail.error || internalEmail.error) {
      console.error("[BookingAPI] Resend error:", clientEmail.error, internalEmail.error);
      return NextResponse.json(
        { success: false, error: "Failed to send confirmation email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[BookingAPI] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}