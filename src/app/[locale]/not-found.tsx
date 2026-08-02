"use client";

import { useParams } from "next/navigation";
import { isLocale, defaultLocale } from "@/i18n/config";
import { NotFoundContent } from "@/components/not-found-content";
import frDict from "@/i18n/dictionaries/fr.json";
import arDict from "@/i18n/dictionaries/ar.json";

const dictionaries = { fr: frDict, ar: arDict };

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const rawLocale = params?.locale;
  const locale = isLocale(rawLocale ?? "") ? (rawLocale as "fr" | "ar") : defaultLocale;

  return <NotFoundContent dict={dictionaries[locale]} locale={locale} />;
}
