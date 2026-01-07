import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import { GoogleTagManager } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ConditionalNavigation from "./_components/ConditionalNavigation";
import ConditionalFooter from "./_components/ConditionalFooter";
import { locales, siteBaseUrl, defaultLocale } from "@/utils/i18n-config";
import { TranslationProvider } from "@/context/translationContext";
import { UserProvider } from "@/context/userContext";
import CompareFloatingButton from "./_components/CompareFloatingButton";
import BrightCallWidget from "@/app/[locale]/_components/BrightCallWidget";

const WIDGET_KEY =
  process.env.NEXT_PUBLIC_BRIGHT_CALL_WIDGET_KEY ?? "e5c730edd6b0222dd7c568dd2c42d972";
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

  return {
    title: "⚡ Abu Dhabi Real Estate  - Property Shop Investment",
    description: "⚡ Abu Dhabi Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent",
    alternates: {
      canonical: `${siteBaseUrl}/${currentLocale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: "⚡ Abu Dhabi Real Estate - Property Shop Investment",
      description: "⚡ Abu Dhabi Real Estate - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent",
      url: `${siteBaseUrl}/${currentLocale}`,
      siteName: "Property Shop Investment",
      locale: currentLocale,
      type: "website",
      images: [
        {
          url: '/assets/images/about-us/main-office.webp',
          width: 1200,
          height: 630,
          alt: "Property Shop Investment",
        }
      ],
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
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <NextIntlClientProvider messages={messages}>
            <ConditionalNavigation />
            <Providers><main>{children}</main></Providers>
            <ConditionalFooter />
            <CompareFloatingButton />
          </NextIntlClientProvider>
        </UserProvider>
        <GoogleTagManager gtmId="GTM-PMQ9XT65R" />
      </body>
    </html>
  );
}