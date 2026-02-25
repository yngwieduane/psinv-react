import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'zh', 'ru', 'de'],
  defaultLocale: 'en',
  localeDetection: false
});

export type Locale = (typeof routing.locales)[number];