
import { Metadata } from 'next';
import ListYourPropertyPageClient from './page-client';

export const metadata: Metadata = {
    title: 'List Your Property with - PSI',
    description: 'List your property in its best light, lease it out in a whole new way, and collect rent–all online. BE with the brand you trust',
};

export default function ListYourPropertyPage() {
    return <ListYourPropertyPageClient />;
}
