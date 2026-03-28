'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BrittanySignature } from '@/utils/fonts';
import { Poppins } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function CareerJourney() {
  const [hovered, setHovered] = useState<number | null>(null);
  const t = useTranslations('Career_Journey');

  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");

  const hoverSteps = [
    {
      id: 1, top: '62.5%', left: '17.3%', bgPos: '-132px -539px', size: '538%',
      title: t('steps.1.title'),
      description: t('steps.1.description'),
    },
    {
      id: 2, top: '33.5%', left: '21.5%', bgPos: '-412px -289px', size: '650%',
      title: t('steps.2.title'),
      description: t('steps.2.description'),
    },
    {
      id: 3, top: '24.5%',   left: '43.5%', bgPos: '-1002px -80px', size: '708%',
      title: t('steps.3.title'),
      description: t('steps.3.description'),
    },
    {
      id: 4, top: '68%', left: '56.5%', bgPos: '-1308px -607px', size: '669%',
      title: t('steps.4.title'),
      description: t('steps.4.description'),
    },
    {
      id: 5, top: '63.8%', left: '79%', bgPos: '-2162px -697px', size: '687%',
      title: t('steps.5.title'),
      description: t('steps.5.description'),
    },
    {
      id: 6, top: '32.8%', left: '83.5%',   bgPos: '-2394px -86px', size: '711%',
      title: t('steps.6.title'),
      description: t('steps.6.description'),
    },
  ];

  return (
    <div className="relative w-full px-4 py-16 overflow-hidden bg-white dark:bg-neutral-900">
      <div className="relative max-w-[1320px] mx-auto z-10 mb-10">
        <h2
          className={`uppercase text-[#2C2D65] text-[32px] leading-[53px] ${poppins.className} dark:text-white`}
        >
          {t('title')}{' '}
          <span
            className={`${BrittanySignature.className} text-orange-600 capitalize`}
          >
            {t('subtitle')}
          </span>
        </h2>
        <p
          className={`text-gray-700 mt-4 text-[18px] leading-[30px] ${poppins.className} dark:text-gray-300`}
        >
          {t('description')}
        </p>
      </div>
      <div className="relative w-full aspect-[2.4/1] max-w-[1320px] mx-auto">
        <Image
          src={`${isRTL ? '/images/career/careers-roadmap-arabic.svg' : '/images/career/careers-roadmap.svg'}`}
          alt="Career Journey Roadmap"
          fill
          priority
          className="object-contain"
        />
        <div className="absolute inset-0 hidden md:block">
          {hoverSteps.map((step) => (
            <div
              key={step.id}
              className="absolute transition-transform hover:scale-110"
              style={{
                top: step.top,
                left: step.left,
                transform: 'translate(-50%, -50%)',
                zIndex: hovered === step.id ? 50 : 10,
              }}
              onMouseEnter={() => setHovered(step.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === step.id && (
                <div
                  className="absolute z-20 w-[450px] h-[450px] rounded-full border-4 border-[#E35F27] bg-white transition-all duration-500 p-8 flex flex-col justify-center shadow-[0px_10px_30px_rgba(0,0,0,0.12)] dark:bg-gray-800"
                  style={{
                    top: '-250px',
                    left: '-200px',
                    backgroundImage: "url('/images/career/careers2.svg')",
                    backgroundPosition: step.bgPos,
                    backgroundSize: step.size,
                  }}
                >
                  <div className="flex items-start gap-2 mb-2 text-[#E35F27] text-lg"></div>
                </div>
              )}
              <div className="relative z-10 w-[69px] h-[69px] bg-white border-2 border-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-[#2C2D65] shadow-md cursor-pointer dark:bg-gray-800 dark:text-white">
                {String(step.id).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
