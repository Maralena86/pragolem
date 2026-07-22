/**
 * Returns the production site URL from the NEXT_PUBLIC_SITE_URL environment
 * variable, with any trailing slash removed so path concatenation stays clean.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SITE_URL environment variable is not set.");
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}
