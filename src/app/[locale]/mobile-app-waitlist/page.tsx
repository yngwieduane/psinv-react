
import { Metadata } from 'next';
import ShareYourFeedBackPageClient from './page-client';

export const metadata: Metadata = {
    title: 'PSI App Waiting List – Get Early Access to Exclusive Property Deals',
    description: 'Sign up for the PSI App waiting list and be the first to access exclusive property listings, hot deals, and smart real estate tools in Abu Dhabi.',
};

export default function DubaiHomePage() {
    return <ShareYourFeedBackPageClient />
}