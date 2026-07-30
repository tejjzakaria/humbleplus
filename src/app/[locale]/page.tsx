import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { ProductsShowcase } from "@/components/products-showcase";
import { Science } from "@/components/science";
import { Ritual } from "@/components/ritual";
import { Testimonials } from "@/components/testimonials";
import { SiteFooter } from "@/components/site-footer";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        <Hero dict={dict} locale={locale} />
        <Benefits dict={dict} />
        <ProductsShowcase dict={dict} locale={locale} />
        <Science dict={dict} />
        <Ritual dict={dict} />
        <Testimonials dict={dict} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
