import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { products, type Product } from "@/data/products";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

type Category = Product["category"];
type FilterKey = "all" | Category;

const filterKeys: FilterKey[] = ["all", "beauty", "energy", "heart"];

function isFilterKey(value: string | undefined): value is FilterKey {
  return !!value && (filterKeys as string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.productsPage.title} — Humble+`,
    description: dict.productsPage.subtitle,
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const { categorie } = await searchParams;
  const activeFilter: FilterKey = isFilterKey(categorie) ? categorie : "all";

  const base = `/${locale}`;
  const { productsPage: copy, products: productsCopy } = dict;
  const BackChevron = locale === "ar" ? ChevronRight : ChevronLeft;

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href={base} className="transition-colors hover:text-foreground">
              {copy.breadcrumbHome}
            </Link>
            <BackChevron className="size-3.5" strokeWidth={2} />
            <span className="text-foreground">{copy.breadcrumbCurrent}</span>
          </nav>

          <FadeIn className="mt-6 max-w-2xl">
            <h1 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
              {copy.subtitle}
            </p>
          </FadeIn>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {filterKeys.map((key) => {
                const isActive = key === activeFilter;
                const href =
                  key === "all" ? `${base}/produits` : `${base}/produits?categorie=${key}`;
                return (
                  <Link
                    key={key}
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {copy.filters[key]}
                  </Link>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              {(filteredProducts.length === 1
                ? copy.resultCountOne
                : copy.resultCount
              ).replace("{count}", String(filteredProducts.length))}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <ProductCard
                    product={product}
                    locale={locale}
                    base={base}
                    ctaLabel={productsCopy.cta}
                    subscribeLabel={productsCopy.subscribe}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <p className="mt-16 text-center text-muted-foreground">
              {copy.empty}
            </p>
          )}
        </div>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
