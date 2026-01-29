
import { Metadata } from 'next';
import ShareYourFeedBackPageClient from './page-client';

export const metadata: Metadata = {
    title: 'PSI Feedback – Share Your Experience',
    description: 'Tell us how PSI can better support you. Share your feedback on our real estate services in Abu Dhabi and help us improve client experience.',
};

export default function DubaiHomePage() {
    return <ShareYourFeedBackPageClient />
}