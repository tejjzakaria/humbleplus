import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, MapPin, BadgeCheck, Star } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { products, getProductBySlug, formatPrice } from "@/data/products";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { OrderForm } from "@/components/order-form";
import { WhatsappOrderButton } from "@/components/whatsapp-order-button";
import { UsageSteps } from "@/components/usage-steps";
import { IngredientsTable } from "@/components/ingredients-table";
import { ProductReviews } from "@/components/product-reviews";
import { StickyOrderBar } from "@/components/sticky-order-bar";
import { ViewContentPixel } from "@/components/view-content-pixel";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name[locale]} — Humble+`,
    description: product.tagline[locale],
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const { productDetail: copy, productsPage, testimonials, hero, certifications } = dict;
  const BackChevron = locale === "ar" ? ChevronRight : ChevronLeft;

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <ViewContentPixel
        contentId={product.slug}
        contentName={product.name[locale]}
        value={product.price}
      />
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        {/* Hero zone */}
        <section className="relative overflow-hidden bg-background">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(60%_50%_at_50%_0%,var(--secondary)_0%,transparent_70%)]"
          />
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <Link href={base} className="transition-colors hover:text-foreground">
                {productsPage.breadcrumbHome}
              </Link>
              <BackChevron className="size-3.5" strokeWidth={2} />
              <Link
                href={`${base}/produits`}
                className="transition-colors hover:text-foreground"
              >
                {productsPage.breadcrumbCurrent}
              </Link>
              <BackChevron className="size-3.5" strokeWidth={2} />
              <span className="text-foreground">{product.name[locale]}</span>
            </nav>

            <StaggerGroup className="mt-6 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <StaggerItem className="relative">
                {product.badge && (
                  <Badge className="absolute start-4 top-4 z-10">
                    {product.badge[locale]}
                  </Badge>
                )}
                <ProductGallery
                  images={product.images}
                  alt={product.imageAlt[locale]}
                  zoomHint={copy.zoomHint}
                />
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-5">
                <div>
                  <h1 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                    {product.name[locale]}
                  </h1>
                  <p className="mt-2 text-base text-muted-foreground">
                    {product.tagline[locale]}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <span className="flex items-center" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-brass text-brass"
                        strokeWidth={0}
                      />
                    ))}
                  </span>
                  {testimonials.ratingValue}
                  <span className="font-normal text-muted-foreground">
                    &middot; {testimonials.ratingCount}
                  </span>
                </div>

                <ul className="flex flex-col gap-2">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight[locale]}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <BadgeCheck
                        className="size-4 shrink-0 text-sage"
                        strokeWidth={1.75}
                      />
                      {highlight[locale]}
                    </li>
                  ))}
                </ul>

                <div
                  id="order-panel"
                  className="rounded-3xl border-2 border-primary/25 bg-gradient-to-b from-primary/[0.06] to-muted/50 p-5 shadow-sm shadow-primary/10 sm:p-6"
                >
                  <OrderForm
                    copy={copy.orderForm}
                    locale={locale}
                    unitPrice={product.price}
                    productName={product.name[locale]}
                    productSlug={product.slug}
                  />
                  <div className="mt-3">
                    <WhatsappOrderButton
                      label={copy.whatsappCta}
                      message={copy.whatsappMessage.replace(
                        "{product}",
                        product.name[locale]
                      )}
                    />
                  </div>
                  <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
                    {copy.deliveryNote}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="inline-flex max-w-[240px] items-center rounded-xl border border-border bg-card p-2.5">
                      <Image
                        src="/labs.webp"
                        alt={certifications.badgeAlt}
                        width={640}
                        height={101}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-sage" strokeWidth={1.75} />
                    {hero.trust.clinical}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 text-sage" strokeWidth={1.75} />
                    {hero.trust.madeIn}
                  </span>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </section>

        <UsageSteps
          title={copy.usageTitle}
          subtitle={copy.usageSubtitle}
          steps={product.usageSteps.map((step) => ({
            title: step.title[locale],
            description: step.description[locale],
          }))}
        />

        <section className="py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {copy.descriptionTitle}
            </h2>
            <StaggerGroup className="mt-3 flex flex-col gap-4">
              {product.description.map((paragraph, index) => (
                <StaggerItem
                  key={index}
                  className="text-pretty text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph[locale]}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </FadeIn>
        </section>

        <IngredientsTable
          title={copy.ingredientsTitle}
          subtitle={copy.ingredientsSubtitle}
          rows={product.facts.map((fact) => ({
            name: fact.name[locale],
            amount: fact.value[locale],
          }))}
        />

        <ProductReviews
          title={copy.reviewsTitle}
          ratingValue={testimonials.ratingValue}
          ratingCount={testimonials.ratingCount}
          translatedBadge={dict.reviewsUi.translatedBadge}
          reviews={product.reviews.map((review) => ({
            name: review.name,
            location: review.location[locale],
            rating: review.rating,
            quote: review.quote[locale],
            translated: review.translated,
          }))}
        />

        <section className="py-16 sm:py-20">
          <FadeIn className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {copy.faqTitle}
            </h2>
            <Accordion
              type="single"
              collapsible
              className="mt-4 rounded-3xl border border-border bg-card px-6 sm:px-8"
            >
              {copy.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="py-5 text-base font-medium text-foreground hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </section>

        {relatedProducts.length > 0 && (
          <section className="pb-16 sm:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <FadeIn>
                <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  {copy.relatedTitle}
                </h2>
              </FadeIn>
              <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((related) => (
                  <StaggerItem key={related.id} className="h-full">
                    <ProductCard
                      product={related}
                      locale={locale}
                      base={base}
                      ctaLabel={dict.products.cta}
                      subscribeLabel={dict.products.subscribe}
                    />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}
      </main>
      <SiteFooter dict={dict} locale={locale} />

      <StickyOrderBar
        targetId="order-panel"
        name={product.name[locale]}
        price={formatPrice(product.price, locale)}
        cta={copy.stickyBarCta}
      />
    </>
  );
}
