import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

function sanitizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeKeys);
  }

  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.replaceAll(".", "_"),
        sanitizeKeys(value),
      ])
    );
  }

  return obj;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const rawMessages = (await import(`../../messages/${locale}.json`)).default;

  const messages = sanitizeKeys(rawMessages);

  return {
    locale,
    messages
  };
});