"use client";
import { useTranslations } from 'next-intl';

const StepsSection = () => {
    const t = useTranslations('CryptoPage.steps');

    const steps = [
        { id: 1, key: 'step1' },
        { id: 2, key: 'step2' },
        { id: 3, key: 'step3' },
    ];

    return (
        <section className="py-20 bg-white text-[#0A0A2E]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#0A0A2E]">
                    {t('title')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-1" />

                    {steps.map(({ id, key }) => (
                        <div key={key} className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-amber-500 flex items-center justify-center text-3xl font-bold text-amber-500 mb-6 shadow-xl relative z-10">
                                {id}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t(`${key}.title`)}</h3>
                            <p className="text-gray-600 max-w-xs">
                                {t(`${key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
