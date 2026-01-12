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
        protocol: 'https',
        hostname: 'psi-crm.com',
      },
      {
        protocol: 'https',
        hostname: 'apigateway.dubai-crm.com',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
