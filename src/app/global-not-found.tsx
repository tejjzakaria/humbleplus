import { headers } from "next/headers";
import { Lora, Raleway, Markazi_Text, Tajawal, Geist_Mono } from "next/font/google";
import { Direction } from "radix-ui";
import { Analytics } from "@vercel/analytics/next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { NotFoundContent } from "@/components/not-found-content";
import "./globals.css";

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

export const metadata = {
  title: "404 — Humble+",
  description: "This page does not exist.",
};

export default async function GlobalNotFound() {
  const headersList = await headers();
  const rawLocale = headersList.get("x-locale") ?? "";
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${lora.variable} ${raleway.variable} ${markaziText.variable} ${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Direction.Provider dir={dir}>
          <NotFoundContent dict={dict} locale={locale} />
        </Direction.Provider>
        <Analytics />
      </body>
    </html>
  );
}
