'use client';

import { usePathname } from 'next/navigation';
//import MainFooter from './MainFooter';
import dynamic from 'next/dynamic';
const MainFooterAI = dynamic(() => import('./MainFooterAI'));
const MainFooter = dynamic(() => import('./MainFooter'));

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isNoFooterPage = ['/list-your-property', '/psi-youngsters-program', '/international', '/project/'].some((path) =>
    pathname.includes(path)
    );

  if (isNoFooterPage) return null;
  return <MainFooterAI onNavigate={(page) => { }} />;
}