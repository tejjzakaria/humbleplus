import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle, Mail } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildWhatsappLink } from "@/data/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.contact.title} — Humble+`,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const base = `/${locale}`;
  const { contact, productsPage } = dict;
  const BackChevron = locale === "ar" ? ChevronRight : ChevronLeft;

  const whatsappMessage =
    locale === "ar"
      ? "مرحبًا، لدي سؤال بخصوص Humble+."
      : "Bonjour, j'ai une question au sujet de Humble+.";

  return (
    <>
      <SiteHeader dict={dict} locale={locale} />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href={base} className="transition-colors hover:text-foreground">
              {productsPage.breadcrumbHome}
            </Link>
            <BackChevron className="size-3.5" strokeWidth={2} />
            <span className="text-foreground">{contact.breadcrumbCurrent}</span>
          </nav>

          <FadeIn className="mt-6 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden />
              {contact.eyebrow}
            </span>
            <h1 className="mt-4 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              {contact.title}
            </h1>
            <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
              {contact.subtitle}
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            <StaggerGroup className="flex flex-col gap-5">
              <StaggerItem>
                <a
                  href={buildWhatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-3xl border border-sage/30 bg-sage/10 p-6 transition-colors hover:bg-sage/15"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sage text-sage-foreground">
                    <MessageCircle className="size-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      {contact.whatsappTitle}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {contact.whatsappDescription}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-sage">
                      {contact.whatsappCta}
                    </span>
                  </div>
                </a>
              </StaggerItem>

              <StaggerItem>
                <a
                  href={`mailto:${contact.emailValue}`}
                  className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 transition-colors hover:bg-muted/60"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <Mail className="size-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-foreground">
                      {contact.emailTitle}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {contact.emailDescription}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-primary">
                      {contact.emailValue}
                    </span>
                  </div>
                </a>
              </StaggerItem>

              <StaggerItem>
                <p className="text-sm text-muted-foreground">
                  {contact.faqTeaser}{" "}
                  <Link
                    href={`${base}/faq`}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {contact.faqTeaserLink}
                  </Link>
                </p>
              </StaggerItem>
            </StaggerGroup>

            <FadeIn delay={0.15} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {contact.formTitle}
              </h2>
              <div className="mt-5">
                <ContactForm copy={contact} />
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </>
  );
}
