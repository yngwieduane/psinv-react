'use client';

import { useTranslations, useMessages } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import {
    Home,
    RefreshCw,
    Hammer,
    CheckCircle2,
    ChevronDown,
    Instagram,
    Facebook,
    Youtube,
    Twitter
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import FAQItem from '../../_components/FAQItem';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function MortgageLoan() {
    const t = useTranslations('MortgageLoanPage');
    const messages = useMessages();

    // Type checking helper (casting for simplicity as messages is untyped deep structure)
    // In a real app we might want stricter types or safer access
    const getList = (key: string) => {
        const pageMessages = (messages as any).MortgageLoanPage;
        if (!pageMessages) return [];
        return pageMessages.documents?.[key] || [];
    };

    const faqItems = (messages as any).MortgageLoanPage?.faqs?.items || [];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item: any) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    };

    return (
        <div className="font-sans text-slate-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <div className="relative h-[800px] w-full overflow-hidden">
                <Image
                    src="/images/mortgage-loan/mortgage-banner-top.jpg"
                    alt="Happy family"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent/50 flex items-center justify-center">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Hero Text */}
                        <div className="text-white space-y-4 max-w-xl animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {t('hero.title')}
                            </h1>
                            <div className="text-6xl md:text-8xl font-extrabold text-[#7F56D9]">
                                {t('hero.rate')}
                            </div>
                            <div className="flex items-center gap-2 text-lg md:text-xl font-medium">
                                <CheckCircle2 className="text-[#7F56D9]" />
                                {t('hero.subtitle')}
                            </div>
                            <div className="flex items-center gap-2 text-lg md:text-xl font-medium">
                                <CheckCircle2 className="text-[#7F56D9]" />
                                {t('hero.note')}
                            </div>
                        </div>

                        {/* Hero Form */}
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md animate-fade-in-up delay-100">
                            <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide uppercase border-b border-white/20 pb-4">
                                {t('hero.formTitle')}
                            </h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F56D9] transition-all" />
                                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F56D9] transition-all" />
                                <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F56D9] transition-all" />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7F56D9] transition-all" />
                                <button type="submit" className="w-full bg-[#353455] hover:bg-[#2c2b46] text-white font-bold py-3.5 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all text-lg uppercase tracking-wider">
                                    {t('hero.formButton')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center -mt-32 relative z-10">
                        {[
                            { icon: Home, title: t('services.buy') },
                            { icon: RefreshCw, title: t('services.refinance') },
                            { icon: Hammer, title: t('services.build') }
                        ].map((service, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center gap-4 group">
                                <div className="p-4 rounded-full bg-purple-50 text-[#7F56D9] group-hover:bg-[#7F56D9] group-hover:text-white transition-colors duration-300">
                                    <service.icon size={40} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-[#353455]">{service.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className="relative h-[300px] w-full overflow-hidden flex items-center">
                <Image
                    src="/images/mortgage-loan/construction-loan-banner.jpg"
                    alt="Construction"
                    fill
                    className="object-cover brightness-50"
                />
                <div className="container mx-auto px-4 relative z-10 text-white">
                    <div className="max-w-xl mx-auto md:ml-20">
                        <h2 className="text-3xl md:text-4xl font-light mb-2">{t('banner.title')}</h2>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider border-l-4 border-[#7F56D9] pl-4">
                            {t('banner.highlight')}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Promises Section */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-[#7F56D9] mb-12 text-center">{t('promises.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[0, 1, 2, 3].map((idx) => (
                            <div key={idx} className="flex gap-6 items-start p-6 rounded-xl hover:bg-gray-50 transition-colors">
                                <span className="text-6xl font-black text-gray-200 leading-none select-none">{idx + 1}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-[#353455] mb-3">{t(`promises.items.${idx}.title`)}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">{t(`promises.items.${idx}.desc`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Documents Section (Tabs) */}
            <div className="py-20 bg-purple-50/50">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-4xl font-bold text-[#353455] mb-12 text-center">{t('documents.title')}</h2>
                    <TabGroup>
                        <TabList className="flex space-x-1 rounded-xl bg-[#353455]/10 p-1 mb-8">
                            {['forAll', 'salaried', 'selfEmployed', 'nonResident'].map((category) => (
                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full cursor-pointer rounded-lg py-3 text-sm font-bold leading-5 uppercase tracking-wide transition-all duration-200 outline-none',
                                            selected
                                                ? 'bg-[#353455] text-white shadow '
                                                : 'text-[#353455] hover:bg-[#353455]/[.8] hover:text-white'
                                        )
                                    }
                                >
                                    {t(`documents.tabs.${category}`)}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels>
                            {['forAllList', 'salariedList', 'selfEmployedList', 'nonResidentList'].map((listKey, idx) => {
                                const listItems = getList(listKey);
                                return (
                                    <TabPanel
                                        key={idx}
                                        className={classNames(
                                            'rounded-xl bg-white p-8 shadow-sm ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                        )}
                                    >
                                        <ul className="space-y-4">
                                            {Array.isArray(listItems) && listItems.map((text: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <div className="mt-1.5 h-2 w-2 rounded-full bg-[#7F56D9] flex-shrink-0" />
                                                    <span>{text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </TabPanel>
                                )
                            })}
                        </TabPanels>
                    </TabGroup>
                    <p className="mt-6 text-sm text-gray-500 italic text-center text-balance">
                        * {t('documents.note')}
                    </p>
                </div>
            </div>

            {/* FAQs Section (Accordion) */}
            <div className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-4xl font-bold text-[#7F56D9] mb-4 text-center tracking-tighter uppercase">{t('faqs.title')}</h2>
                    <div className="w-16 h-1 bg-gray-200 mx-auto mb-16 rounded-full"></div>

                    <div className="space-y-4">
                        {faqItems.map((item: any, idx: number) => (
                            <FAQItem
                                key={idx}
                                question={item.q}
                                answer={item.a}
                                slug={item.slug}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Social Media Footer Section */}
            <div className="py-12 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-xl font-serif text-gray-900 mb-8">Social Media</h3>
                    <div className="flex justify-center gap-6">
                        {[
                            { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-50' },
                            { icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
                            { icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' },
                        ].map((social, i) => (
                            <button key={i} className={`p-4 rounded-full ${social.bg} ${social.color} hover:scale-110 transition-transform shadow-sm`}>
                                <social.icon size={24} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}