"use client";
import { useTranslations } from 'next-intl';

const AttractionsSection = () => {
    const t = useTranslations('CryptoPage.attractions');

    const attractions = [
        { key: 'ain_dubai', img: '/assets/images/crypto/ain-dubai.jpg' },
        { key: 'burj_khalifa', img: '/assets/images/crypto/burj-khalifa.jpg' },
        { key: 'palm_jumeirah', img: '/assets/images/crypto/palm-jumeirah.jpg' },
        { key: 'dubai_frame', img: '/assets/images/crypto/dubai-frame.jpg' },
    ];

    return (
        <section className="py-16 bg-[#0A0A2E] text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                    {t('title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {attractions.map(({ key, img }) => (
                        <div key={key} className="group relative overflow-hidden rounded-xl h-80 bg-gray-800">
                            {/* <img src={img} alt={t(`${key}.title`)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" /> */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-bold text-amber-500 mb-2">{t(`${key}.title`)}</h3>
                                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {t(`${key}.desc`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AttractionsSection;
