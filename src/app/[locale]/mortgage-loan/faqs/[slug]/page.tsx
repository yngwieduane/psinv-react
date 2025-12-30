
import { notFound } from 'next/navigation';
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation'; // Adjust import based on your setup
import { ChevronLeft } from 'lucide-react';

export default function FAQPage({ params }: { params: { slug: string } }) {
    const messages = useMessages();
    const t = useTranslations('MortgageLoanPage');
    const { slug } = params;

    // Type casting to access the nested structure
    const faqs = (messages as any).MortgageLoanPage?.faqs?.items || [];
    const faqItem = faqs.find((item: any) => item.slug === slug);

    if (!faqItem) {
        notFound();
    }

    const { q: question, a: answer } = faqItem;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: answer,
                },
            },
        ],
    };

    return (
        <div className="font-sans text-slate-800 bg-gray-50 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header / Hero specific to FAQ page (optional, keeping it simple) */}
            <div className="bg-[#353455] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-6">
                        <Link href="/mortgage-loan" className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            <ChevronLeft size={16} className="mr-1" />
                            {t('backToMortgage')}
                        </Link>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold max-w-4xl leading-tight">
                        {question}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div
                        className="text-lg text-gray-700 leading-relaxed [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-[#353455]  [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_th]:border [&_th]:border-gray-200 [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:text-left [&_td]:border [&_td]:border-gray-200 [&_td]:p-3"
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                </div>
            </div>

            {/* CTA or Related (Optional) */}
            <div className="bg-white py-16 border-t border-gray-100 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-[#353455] mb-6">Still have questions?</h2>
                    <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Chat with an Advisor
                    </a>
                </div>
            </div>
        </div>
    );
}
