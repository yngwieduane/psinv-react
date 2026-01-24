
import { Metadata } from 'next';
import DubaiHomePageClient from './page-client';

export const metadata: Metadata = {
    title: 'Dubai Properties for Sale & Rent | Property Shop Investments',
    description: 'Looking for Dubai property? PSI offers curated real estate listings, investment insights, and dedicated support for buyers, sellers, and investors in Dubai. Start your property journey with a trusted UAE real estate leader.',
};

export default function DubaiHomePage() {
    return <DubaiHomePageClient />
}
