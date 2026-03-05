'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('./navigation'), { ssr: false, loading: () => null });

export type Page = '/en' | '/ar' | '/ru' | '/du' | '/zh';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const normalize = (p: string) => p.replace(/\/+$/, '').split(/[?#]/)[0];
  const current = normalize(pathname);  
  const pathwithoutlocale = current.replace(/^\/(en|ar|ru|zh|de)/, '') || '/';

  const noNavPaths = [
    '/list-your-property',
    '/psi-youngsters-program',
    '/international',
    '/luxury-project-uae',
    '/emirati-hub',
    '/conrad-abu-dhabi',
    '/jbr-lead-registration-dubai',
    '/share-your-feedback',
    '/mobile-app-waitlist',
  ];  

  // walk-in pages
  const isWalkIn = pathwithoutlocale.startsWith('/walk-in');

  const isNoNavPage = isWalkIn || noNavPaths.some((p) => pathwithoutlocale.includes(p));

  if (isNoNavPage) return null;

  return <Navigation currentPage={pathname as Page} />;
}
