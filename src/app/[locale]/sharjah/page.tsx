
import { Metadata } from 'next';
import SharjahHomePageClient from './page-client';

export const metadata: Metadata = {
    title: 'Sharjah - PSINV',
    description: '',
};

export default function DubaiHomePage() {
    return <SharjahHomePageClient />
}
