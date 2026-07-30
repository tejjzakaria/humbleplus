import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function ProductsShowcase({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const base = `/${locale}`;
  const { products: copy } = dict;

  return (
    <section id="produits" className="py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden />
              {copy.eyebrow}
            </span>
            <h2 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
              {copy.subtitle}
            </p>
          </div>

          <Link
            href={`${base}/produits`}
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
          >
            {copy.viewAll}
          </Link>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard
                product={product}
                locale={locale}
                base={base}
                ctaLabel={copy.cta}
                subscribeLabel={copy.subscribe}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button asChild variant="outline" className="h-11 px-6">
            <Link href={`${base}/produits`}>
              {copy.viewAll}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
