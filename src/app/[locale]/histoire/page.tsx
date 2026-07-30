import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Award, Repeat } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FoundersStory } from "@/components/founders-story";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

const valueIcons = [Eye, Award, Repeat];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.story.title} — Humble+`,
    description: dict.story.paragraphs[0],
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const { story, productsPage } = dict;
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
            <span className="text-foreground">{story.eyebrow}</span>
          </nav>
        </div>

        <div className="pt-8 sm:pt-10">
          <FoundersStory dict={dict} />
        </div>

        <section className="bg-muted/50 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                <span className="size-1.5 rounded-full bg-brass" aria-hidden />
                {story.valuesEyebrow}
              </span>
              <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                {story.valuesTitle}
              </h2>
            </FadeIn>

            <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {story.values.map((value, index) => {
                const Icon = valueIcons[index % valueIcons.length];
                return (
                  <StaggerItem
                    key={value.title}
                    className="flex h-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 sm:p-8"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-balance font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {story.ctaTitle}
            </h2>
            <Button asChild size="lg" className="mt-6 h-12 px-8 text-base">
              <Link href={`${base}/produits`}>{story.ctaButton}</Link>
            </Button>
          </FadeIn>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
