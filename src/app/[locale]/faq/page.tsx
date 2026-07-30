import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Faq } from "@/components/faq";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.faq.title} — Humble+`,
    description: dict.faq.subtitle,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const { faq, productsPage } = dict;
  const BackChevron = locale === "ar" ? ChevronRight : ChevronLeft;

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href={base} className="transition-colors hover:text-foreground">
              {productsPage.breadcrumbHome}
            </Link>
            <BackChevron className="size-3.5" strokeWidth={2} />
            <span className="text-foreground">{faq.eyebrow}</span>
          </nav>
        </div>

        <div className="pt-4 sm:pt-6">
          <Faq dict={dict} />
        </div>

        <section className="pb-16 sm:pb-20">
          <FadeIn className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-balance font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {faq.ctaTitle}
            </h2>
            <Button asChild size="lg" className="mt-6 h-12 px-8 text-base">
              <Link href={`${base}/contact`}>{faq.ctaButton}</Link>
            </Button>
          </FadeIn>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
