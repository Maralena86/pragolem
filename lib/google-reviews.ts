// app/lib/google-reviews.ts
// app/lib/google-reviews.ts
export async function getGoogleReviews() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey!,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,displayName",
      },
      next: { revalidate: 3600 },
    }
  );
  const data = await res.json();
  console.log("Google API response:", JSON.stringify(data, null, 2)); // TEMPORAIRE
  return data;
}