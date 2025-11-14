import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import { GoogleTagManager } from '@next/third-parties/google'
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import ConditionalNavigation from "./_components/ConditionalNavigation";
import ConditionalFooter from "./_components/ConditionalFooter";
import { locales,siteBaseUrl,defaultLocale } from "@/utils/i18n-config";

// export const metadata: Metadata = {
//   title: "⚡  Abu Dhabi Real Estate  - Property Shop Investment",
//   description: "⚡  Abu Dhabi Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent",
//   robots: {
//     index: true,
//     follow: true,
//     nocache: false,
//     googleBot: {
//       index: true,
//       follow: true,
//       noimageindex: false,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   metadataBase: new URL('https://psi.properties'),
// };

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

// ✅ Dynamic metadata generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const fullUrl = (await headersList).get("referer") || "";
  const host = (await headersList).get("host") || "psi.properties";

  const { locale } = params;

  // Ensure locale is valid (fallback to default)
  const currentLocale = locales.includes(locale as any) ? locale : defaultLocale;

  // Build alternates dynamically
  const languageAlternates: Record<string, string> = {};

  locales.forEach((lang) => {
    languageAlternates[lang] = `${siteBaseUrl}/${lang}`;
  });

  // Add x-default
  languageAlternates["x-default"] = siteBaseUrl;
// Build absolute URL using host
  const currentURL = `https://${host}${fullUrl.replace(/^https?:\/\/[^/]+/, "")}`;

  // Extract pathname (e.g /en/community/marina-bay)
  const path = new URL(currentURL).pathname;

  // Detect current language
  const lang = path.split("/")[1]; // "en", "ar", "ru" or something else

  // Build language-free path → e.g. remove /en or /ar from beginning
  const cleanPath =
    ["en", "ar", "ru", "cn"].includes(lang)
      ? path.replace(`/${lang}`, "")
      : path;

  const finalPath = cleanPath === "" ? "/" : cleanPath;

  return {
    title: "⚡ Abu Dhabi Real Estate  - Property Shop Investment",
    description: "⚡ Abu Dhabi Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent",
    // alternates: {
    //   canonical: `${siteBaseUrl}/${currentLocale}`,
    //   languages: languageAlternates,
    // },
    alternates: {
      canonical: `https://psi.properties${finalPath}`,

      languages: {
        en: `https://psi.properties/en${finalPath}`,
        ar: `https://psi.properties/ar${finalPath}`,
        ru: `https://psi.properties/ru${finalPath}`,
        "x-default": `https://psi.properties${finalPath}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL('https://psi.properties'),
  };
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            <ConditionalNavigation />
            <Providers><main>{children}</main></Providers>
            <ConditionalFooter />
        </NextIntlClientProvider>
        {/* <GoogleTagManager gtmId="GTM-KDDP2SR" /> */}
      </body>
    </html>
  );
}