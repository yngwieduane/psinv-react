"use client";

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Search, Handshake, FileText, Coins, Wallet, Key, Landmark } from 'lucide-react';
import Image from 'next/image';

const SeamlessProcessSection = () => {
    const t = useTranslations('CryptoPage.seamless_process_section');
    const locale = useLocale();
    const isRtl = locale.toLowerCase().startsWith("ar");

    const steps = [
        { key: 'step1', icon: '/assets/images/crypto/pro-1.png', badge: '01' },
        { key: 'step2', icon: '/assets/images/crypto/pro-2.png', badge: '02' },
        { key: 'step3', icon: '/assets/images/crypto/pro-3.png', badge: '03' },
        { key: 'step4', icon: '/assets/images/crypto/pro-4.png', badge: '04' },
        { key: 'step5', icon: '/assets/images/crypto/pro-5.png', badge: '05' },
        { key: 'step6', icon: '/assets/images/crypto/pro-6.png', badge: '06' },
    ];

    return (
        <section className="bg-white pb-20 pt-10 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-[#0A0A2E] text-3xl md:text-4xl font-bold font-serif">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.key} className="bg-[#F8F9FC] rounded-2xl p-8 pb-12 relative flex flex-col items-start min-h-[300px]">
                            {/* Icon */}
                            <Image src={step.icon} alt="seamless-process" title='seamless-process' className='mb-5' width={60} height={60} />
                            {/* Title */}
                            <h3 className="text-[#0A0A2E] text-xl font-bold mb-4">
                                {t(`steps.${step.key}.title`)}
                            </h3>

                            {/* Description */}
                            <div className="text-[#0A0A2E] text-base leading-relaxed mb-4">
                                {t(`steps.${step.key}.description`)}
                            </div>

                            {/* Step 1 Specific: Highlighted text */}
                            {step.key === 'step1' && (
                                <div className="text-[#0A0A2E] text-base mt-2">
                                    {t(`steps.${step.key}.sub_text`)} <span className="text-orange-500 font-bold">{t(`steps.${step.key}.highlight`)}</span>
                                </div>
                            )}

                            {/* Badge */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-[#1A1A4A] text-white flex items-center justify-center rounded-lg shadow-lg font-bold text-lg">
                                {step.badge}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeamlessProcessSection;
