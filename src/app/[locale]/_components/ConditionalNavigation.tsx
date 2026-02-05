'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('./navigation'), { ssr: false, loading: () => null });

export type Page = '/en' | '/ar' | '/ru' | '/du' | '/zh';

export default function ConditionalNavigation() {
  const pathname = usePathname();
const normalize = (p: string) => p.replace(/\/+$/, '');
const current = normalize(pathname);
  const isNoNavPage =
    pathname.includes('/walk-in/') || // ALL walk-in pages
    [
      '/list-your-property',
      '/psi-youngsters-program',
      '/international',
      '/luxury-project-uae',
      '/emirati-hub',
      '/conrad-abu-dhabi',
      '/jbr-lead-registration-dubai',
      '/share-your-feedback',
      '/mobile-app-waitlist',
    ].some((p) => {
    const target = normalize(p);
    return current === target || current.startsWith(`${target}/`);
  });

  if (isNoNavPage) return null;

  return <Navigation currentPage={pathname as Page} />;
}
