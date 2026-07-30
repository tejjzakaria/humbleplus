import "server-only";
import type { Locale } from "@/i18n/config";

const dictionaries = {
  fr: () => import("@/i18n/dictionaries/fr.json").then((m) => m.default),
  ar: () => import("@/i18n/dictionaries/ar.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
