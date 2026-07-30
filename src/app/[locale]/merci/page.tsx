import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildWhatsappLink } from "@/data/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.thankYou.titleFallback} — Humble+`,
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ name?: string; product?: string; phone?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const { thankYou } = dict;
  const { name, product, phone } = await searchParams;

  const title = name ? thankYou.title.replace("{name}", name) : thankYou.titleFallback;
  const subtitle =
    product && phone
      ? thankYou.subtitle.replace("{product}", product).replace("{phone}", phone)
      : thankYou.subtitleFallback;

  const whatsappMessage =
    locale === "ar"
      ? "مرحبًا، لدي سؤال بخصوص طلبيتي في Humble+."
      : "Bonjour, j'ai une question au sujet de ma commande Humble+.";

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage/15 text-sage">
            <CheckCircle2 className="size-9" strokeWidth={1.75} />
          </div>

          <h1 className="mt-6 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {subtitle}
          </p>

          <p className="mt-6 rounded-2xl border border-sage/30 bg-sage/10 px-5 py-3 text-sm font-medium text-sage">
            {thankYou.codReminder}
          </p>

          <div className="mt-10 rounded-3xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              {thankYou.whatsappTitle}
            </h2>
            <a
              href={buildWhatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-sage bg-sage/10 text-base font-medium text-sage transition-colors hover:bg-sage/20"
            >
              <MessageCircle className="size-5" strokeWidth={1.75} />
              {thankYou.whatsappCta}
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href={`${base}/produits`}>{thankYou.continueShopping}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href={base}>{thankYou.backHome}</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
