'use client';

import { usePathname } from 'next/navigation';
import MainFooter from './MainFooter';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isNoFooterPage = ['/list-your-property', '/contact', '/psi-youngsters-program', '/international'].some((path) =>
    pathname.includes(path)
    );

  if (isNoFooterPage) return null;
  return <MainFooter />;
}