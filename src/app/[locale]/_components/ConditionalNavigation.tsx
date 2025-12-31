'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';

export type Page = '/en' | '/ar' | '/ru' | '/du' | '/cn';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const isNoNavPage = ['/list-your-property', '/psi-youngsters-program', '/international', '/luxury-project-uae', '/emirati-hub'].some((path) =>
    pathname.includes(path)
  );
  if (isNoNavPage) return null;
  return <Navigation currentPage={pathname as Page} />;
}