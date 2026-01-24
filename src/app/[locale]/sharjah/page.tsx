
import { Metadata } from 'next';
import SharjahHomePageClient from './page-client';

export const metadata: Metadata = {
    title: 'Sharjah Properties for Sale & Rent | Property Shop Investments',
    description: 'Looking for Sharjah real estate? PSI offers curated property listings, investment insights, and personalized support for buyers, sellers, and investors in Sharjah, UAE.',
};

export default function DubaiHomePage() {
    return <SharjahHomePageClient />
}
