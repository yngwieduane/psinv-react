import { notFound } from 'next/navigation';
import TermsPage from '../_components/static-pages/TermsPage';
import PrivacyPolicyPage from '../_components/static-pages/PrivacyPolicyPage';
import CookiePolicyPage from '../_components/static-pages/CookiePolicyPage';

type Props = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function Page({ params }: Props) {
  const { slug, locale } = await Promise.resolve(params);

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

  return locales.flatMap(locale =>
    slugs.map(slug => ({ slug, locale }))
  );
}
