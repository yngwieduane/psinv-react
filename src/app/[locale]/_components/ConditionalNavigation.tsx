'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();  
  const isNoNavPage = ['/list-your-property', '/psi-youngsters-program', '/international'].some((path) => 
    pathname.includes(path)
  );
  if (isNoNavPage) return null;
  return <Navigation />;
}