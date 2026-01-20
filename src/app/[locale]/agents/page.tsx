
import React from 'react';
import { getTranslations } from 'next-intl/server';
import AgentsClient from './_components/AgentsClient';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Agents' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

const AgentsPage = async () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 mt-21">
            <div className="container mx-auto px-4">
                <AgentsClient />
            </div>
        </div>
    );
};

export default AgentsPage;
