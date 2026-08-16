/**
 * Placeholder business contact info. Replace with real values before launch.
 * whatsappNumber must be in international format with no leading "+" or spaces
 * (E.164 digits only) for wa.me links to work, e.g. "212600000000".
 */
export const siteConfig = {
  whatsappNumber: "212700084064",
};

export function buildWhatsappLink(message?: string) {
  if (!message) return `https://wa.me/${siteConfig.whatsappNumber}`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
