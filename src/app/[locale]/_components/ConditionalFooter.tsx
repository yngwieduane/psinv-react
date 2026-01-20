'use client';

import { usePathname } from 'next/navigation';

import MainFooterAI from './MainFooterAI';

export default function ConditionalFooter() {
  const pathname = usePathname();

  const isNoFooterPage =
    pathname.includes('/walk-in/') ||
    ['/list-your-property', '/psi-youngsters-program', '/international', '/project/'].some((path) =>
      pathname.includes(path)
    );

  if (isNoFooterPage) return null;

  return <MainFooterAI onNavigate={() => { }} />;
}