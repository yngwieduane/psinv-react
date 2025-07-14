'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const isNoNavPage = pathname.includes('/list-your-property');
  if (isNoNavPage) return null;
  return <Navigation />;
}