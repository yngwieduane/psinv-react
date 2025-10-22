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

export const locales = ['en', 'de', 'es'];
export const defaultLocale = 'en';

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
//   alternates
// };
  type Props = {
    children: ReactNode;
    params: { locale: string };
  };
  
  export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    const alternates: { canonical?: string; languages?: Record<string, string> } = {};

    // Set canonical URL (optional, but good for SEO)
    // You might want to point to the default locale's version as canonical
    alternates.canonical = `/${defaultLocale}`;

    // Generate hreflang links for all supported locales
    alternates.languages = {};
    for (const supportedLocale of locales) {
      alternates.languages[supportedLocale] = `/${supportedLocale}`;
    }
    // Add x-default if you have a default language page
    alternates.languages['x-default'] = `/${defaultLocale}`;

    return {
      title: "⚡  Abu Dhabi Real Estate  - Property Shop Investment",
      description: "⚡  Abu Dhabi Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent",
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
      metadataBase: new URL('http://psi.properties'), // Replace with your actual base URL
      alternates,
    };
  }

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navigation from "./_components/navigation";
import MainFooter from "./_components/MainFooter";
import ConditionalNavigation from "./_components/ConditionalNavigation";
import ConditionalFooter from "./_components/ConditionalFooter";
import { Organization, WithContext } from "schema-dts";
import { ReactNode } from "react";

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
      <GoogleTagManager gtmId="GTM-KDDP2SR" />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <NextIntlClientProvider messages={messages}>
            <ConditionalNavigation />
            <Providers>{children}</Providers>
            <div className="w-full mt-10">
            <ConditionalFooter />
            </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}