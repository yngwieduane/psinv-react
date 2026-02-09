import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/unit',
        destination: '/units',
        permanent: true,
      },
      {
        source: '/services/Sodic',
        destination: 'https://services.psinv.net/Sodic/',
        permanent: true,
      },
      {
        source: '/services/SaadiyatIslandLP',
        destination: 'https://services.psinv.net/SaadiyatIslandLP/',
        permanent: true,
      },
      {
        source: '/services/Roadshow_Checklist',
        destination: 'https://services.psinv.net/Roadshow_Checklist/',
        permanent: true,
      },
      {
        source: '/services/RequestsPortal',
        destination: 'https://services.psinv.net/RequestsPortal/',
        permanent: true,
      },
      {
        source: '/services/RahaBeach',
        destination: 'https://services.psinv.net/RahaBeach/',
        permanent: true,
      },
      {
        source: '/services/NewYearGifts',
        destination: 'https://services.psinv.net/NewYearGifts/',
        permanent: true,
      },
      {
        source: '/services/bashayer-apartment-alhudayriat',
        destination: 'https://services.psinv.net/bashayer-apartment-alhudayriat/',
        permanent: true,
      },
      {
        source: '/services/CorporateMarketing',
        destination: 'https://services.psinv.net/CorporateMarketing/',
        permanent: true,
      },
      {
        source: '/en/conrad-abu-dhabi',
        destination: '/en/walk-in/conrad-abu-dhabi',
        permanent: true,
      },
      {
        source: '/en/conrad-hotel-at-etihad-tower-abu-dhabi',
        destination: '/en/walk-in/conrad-hotel-at-etihad-tower-abu-dhabi',
        permanent: true,
      },
      {
        source: '/en/yas-mall-stand',
        destination: '/en/walk-in/yas-mall-stand',
        permanent: true,
      },
      {
        source: '/en/galleria-stand-deyaar',
        destination: '/en/walk-in/galleria-stand-deyaar',
        permanent: true,
      },
      {
        source: '/en/jbr-lead-registration-dubai',
        destination: '/en/walk-in/jbr-lead-registration-dubai',
        permanent: true,
      },
      {
        source: '/en/psi-assets-reem',
        destination: '/en/walk-in/psi-assets-reem',
        permanent: true,
      },
      {
        source: '/en/psi-assets-yas',
        destination: '/en/walk-in/psi-assets-yas',
        permanent: true,
      },
      {
        source: '/en/project/sama-yas',
        destination: '/en/project/lp/sama-yas',
        permanent: true,
      },
      {
        source: '/en/project/yas-riva',
        destination: '/en/project/lp/yas-riva',
        permanent: true,
      },
      {
        source: '/en/project/manarat-living-saadiyat',
        destination: '/en/project/lp/manarat-living-saadiyat',
        permanent: true,
      },
      {
        source: '/en/project/the-arthouse',
        destination: '/en/project/lp/the-arthouse',
        permanent: true,
      },
      {
        source: '/en/project/bloom-living-almeria',
        destination: '/en/project/lp/bloom-living-almeria',
        permanent: true,
      },
      {
        source: '/ar/project/sama-yas',
        destination: '/ar/project/lp/sama-yas',
        permanent: true,
      },
      {
        source: '/ar/project/yas-riva',
        destination: '/ar/project/lp/yas-riva',
        permanent: true,
      },
      {
        source: '/ar/project/manarat-living-saadiyat',
        destination: '/ar/project/lp/manarat-living-saadiyat',
        permanent: true,
      },
      {
        source: '/ar/project/the-arthouse',
        destination: '/ar/project/lp/the-arthouse',
        permanent: true,
      },
      {
        source: '/ar/project/bloom-living-almeria',
        destination: '/ar/project/lp/bloom-living-almeria',
        permanent: true,
      },
      {
        source: '/en/ramhan-island',
        destination: '/en/project/ramhan-island',
        permanent: true,
      },
      {
        source: '/en/lp-listing',
        destination: '/en/project/lp-listing',
        permanent: true,
      },
      {
        source: '/en/psi-rental-units',
        destination: '/en/project/psi-rental-units',
        permanent: true,
      },
      {
        source: '/en/share-address',
        destination: '/en/project/share-address',
        permanent: true,
      },
      {
        source: '/en/projects/abu-dhabi/hudayriyat-island/nawayef/nawayef-park-views',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/en/projects/abu-dhabi/ramhan-island/ramhan-island/ramhan-island',
        destination: '/en',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apigateway.psi-crm.com',
      },
      {
        protocol: 'http',
        hostname: 'apigateway.psi-crm.com',
      },
      {
        protocol: 'https',
        hostname: 'psi-crm.com',
      },
      {
        protocol: 'https',
        hostname: 'apigateway.dubai-crm.com',
      },
      {
        protocol: 'https',
        hostname: 'blog.psinv.net',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'apigateway.psiassets-crm.com',
      },
      {
        protocol: 'http',
        hostname: 'apigateway.psiassets-crm.com',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
