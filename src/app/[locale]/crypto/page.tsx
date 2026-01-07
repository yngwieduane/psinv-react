
import { Metadata } from 'next';
import CryptoPageClient from './page-client';

export const metadata: Metadata = {
    title: 'Buy property with CRYPTO - PSI',
    description: 'Buy property with CRYPTO in the new land of opportunities - such as Bitcoin, Ethereum, and Litecoin - Real estate company in Abu dhabi, UAE.',
};

export default function CryptoPage() {
    return <CryptoPageClient />;
}
