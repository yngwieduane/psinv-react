// src/app/[locale]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import TermsPage from '../_components/static-pages/TermsPage';
import PrivacyPolicyPage from '../_components/static-pages/PrivacyPolicyPage';
import CookiePolicyPage from '../_components/static-pages/CookiePolicyPage';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const { slug, locale } = params;

  switch (slug) {
    case 'terms':
      return <TermsPage locale={locale} />;
    case 'privacy':
      return <PrivacyPolicyPage locale={locale} />;
    case 'cookie-policy':
      return <CookiePolicyPage locale={locale} />;
    default:
      notFound();
      return null;
  }
}
export async function generateStaticParams() {
  const slugs = ['terms', 'privacy', 'cookie-policy'];
  const locales = ['en', 'ar'];

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}
