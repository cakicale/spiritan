export const contactEmail = "aleksandar.popovic311@gmail.com";

export function contactHref(subject?: string) {
  return `mailto:${contactEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
