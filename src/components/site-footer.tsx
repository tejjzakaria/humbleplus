import Link from "next/link";
import Image from "next/image";
import { Truck, ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { NewsletterForm } from "@/components/newsletter-form";

const socialLabels = ["Instagram", "Facebook", "TikTok"];

export function SiteFooter({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const base = `/${locale}`;
  const { footer, certifications } = dict;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-muted/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {footer.newsletterTitle}
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {footer.newsletterSubtitle}
            </p>
          </div>
          <NewsletterForm
            placeholder={footer.newsletterPlaceholder}
            cta={footer.newsletterCta}
            success={footer.newsletterSuccess}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href={base} className="flex items-center">
              <Image
                src="/logo.png"
                alt="Humble+"
                width={560}
                height={160}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.brandBlurb}
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLabels.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {label.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title={footer.columns.shop.title} links={footer.columns.shop.links} base={base} />
          <FooterColumn title={footer.columns.company.title} links={footer.columns.company.links} base={base} />
          <FooterColumn title={footer.columns.support.title} links={footer.columns.support.links} base={base} />
        </div>

        <div className="mt-10 flex flex-col items-start gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full max-w-[220px]">
            <Image
              src="/labs.webp"
              alt={certifications.badgeAlt}
              width={640}
              height={101}
              className="h-auto w-full"
            />
          </div>

          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center">
            <p>
              © {year} Humble+. {footer.rights}
            </p>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Truck className="size-4 text-sage" strokeWidth={1.75} />
                {footer.paymentNote}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-sage" strokeWidth={1.75} />
                Naticol®
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  base,
}: {
  title: string;
  links: { label: string; href: string }[];
  base: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={`${base}${link.href}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
