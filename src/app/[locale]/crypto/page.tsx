
import { Metadata } from 'next';
import CryptoPageClient from './page-client';

export const metadata: Metadata = {
    title: 'Buy Real Estate with Crypto - PSI',
    description: 'Invest in Dubai real estate using cryptocurrency. Secure, fast, and 0% tax.',
};

export default function CryptoPage() {
    return <CryptoPageClient />;
}
