'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { UnitListing } from '@/types/types';
import { useTranslations } from 'next-intl';

const BreadcrumbUnit = ({ data }: { data: UnitListing }) => {
  const t = useTranslations('Breadcrumbs');
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);
  pathSegments.shift();
  const itemListElement = pathSegments.map((segment, index) => {
    const url = '/' + pathSegments.slice(0, index + 1).join('/');
    const name = segment;
    return {
      '@type': 'ListItem',
      'position': index + 1,
      'name': name,
      'item': url
    };
  });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement,
  };
  return (
    <nav className="bg-white py-4 text-gray-600 text-sm sm:text-xs md:text-sm lg:text-base overflow-x-auto whitespace-nowrap scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ul className="container mx-auto px-6 md:px-12 flex items-center space-x-2 text-gray-500">
        <li className='text-sm'>
          <Link title={t('home')} href="/" className="hover:text-blue-600">
            {t('home')}
          </Link>
        </li>
        <li className="text-sm flex items-center space-x-2">
          <span>/</span>
          <Link title={t('units')} href="/units" className="hover:text-blue-600">
            {t('units')}
          </Link>
        </li>
        <li className="text-sm flex items-center space-x-2">
          <span>/</span>
          <Link title={t('units')} href={`/units/?fcity=${data?.city_pk}`} className="hover:text-blue-600">
            {data?.city_name}
          </Link>
        </li>
        <li className="text-sm flex items-center space-x-2">
          <span>/</span>
          <Link title={t('units')} href={`/units/?fcity=${data?.city_pk}&fcommunity=${data?.community_pk}`} className="hover:text-blue-600">
            {data?.community}
          </Link>
        </li>
        <li className="text-sm flex items-center space-x-2">
          <span>/</span>
          <Link title={t('units')} href={`/units/?fcity=${data?.city_pk}&fcommunity=${data?.community_pk}&fsubcommunity=${data?.sub_community_pk}`} className="hover:text-blue-600">
            {data?.sub_community}
          </Link>
        </li>
        {pathSegments.slice(1, 2).map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = '/' + pathSegments.slice(0, index + 2).join('/');

          return (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-sm text-dark font-medium capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                  {segment.replaceAll('-', ' ')}
                </span>
              ) : (
                <Link title={segment.replaceAll('-', ' ')} href={href} className="text-sm text-black hover:text-blue-600 capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                  {segment.replaceAll('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BreadcrumbUnit;