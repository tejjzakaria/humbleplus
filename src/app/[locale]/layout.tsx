import type { Metadata } from "next";
import { Lora, Raleway, Markazi_Text, Tajawal, Geist_Mono } from "next/font/google";
import { Direction } from "radix-ui";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { FloatingWidgets } from "@/components/floating-widgets";
import { MetaPixel } from "@/components/meta-pixel";
import "../globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const markaziText = Markazi_Text({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-markazi",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${lora.variable} ${raleway.variable} ${markaziText.variable} ${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <MetaPixel />
        <Analytics />
        <Direction.Provider dir={dir}>
          {children}
          <FloatingWidgets
            locale={locale}
            whatsappAriaLabel={dict.whatsappWidget.ariaLabel}
          />
        </Direction.Provider>
      </body>
    </html>
  );
}
