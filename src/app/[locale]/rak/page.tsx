
import { Metadata } from 'next';
import RakHomePageClient from './page-client';

export const metadata: Metadata = {
    title: 'RAK Properties for Sale & Rent | Property Shop Investments',
    description: 'Looking for RAK real estate? PSI offers curated property listings, investment insights, and personalized support for buyers, sellers, and investors in Sharjah, UAE.',
};

export default function DubaiHomePage() {
    return <RakHomePageClient />
}