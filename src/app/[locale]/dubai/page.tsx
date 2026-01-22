
import { Metadata } from 'next';
import DubaiHomePageClient from './page-client';

export const metadata: Metadata = {
    title: '',
    description: '',
};

export default function DubaiHomePage() {
    return <DubaiHomePageClient />
}
