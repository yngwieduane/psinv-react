// src/components/RegistrationHeroImage.tsx
'use client';

import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface RegistrationHeroImageProps {
  slug?: string;
  locale?: string;
  className?: string;
}

export default function RegistrationHeroImage({
  slug,
  locale,
  className = '',
}: RegistrationHeroImageProps) {
  const params = useParams() as { slug?: string; locale?: string };
  const pathname = usePathname() ?? '';

  // 1) Detect locale from URL: /en, /ar, /cn, /ru, /de
  const pathLocaleMatch = pathname.match(/^\/(en|ar|cn|ru|de)(\/|$)/);
  const inferredLocale = pathLocaleMatch ? pathLocaleMatch[1] : 'en';

  // 2) Slug & locale priority – PATH FIRST
  const activeSlug = slug ?? params?.slug ?? 'default';
  const activeLocale = inferredLocale ?? locale ?? params?.locale ?? 'en';
  const basePath = '/images/registration-projects';
  const localizedImage = `${basePath}/${activeSlug}-${activeLocale}.webp`;
  const englishFallback = `${basePath}/${activeSlug}-en.webp`;             // slug-en
  const defaultImage = `${basePath}/default.webp`;                      // default


  const [imageSrc, setImageSrc] = useState(localizedImage);
  const [errorStep, setErrorStep] = useState(0);

  useEffect(() => {
    setImageSrc(localizedImage);
    setErrorStep(0);
  }, [localizedImage]);

  const handleError = () => {
    console.log('[RegistrationHeroImage locale debug]', {
      pathname,
      inferredLocale,
      propLocale: locale,
      paramsLocale: params?.locale,
      activeLocale,
    });


    // 1) localized → English
    if (errorStep === 0 && activeLocale !== 'en') {
      setImageSrc(englishFallback);
      setErrorStep(1);
      return;
    }

    // 2) English → default
    if (errorStep <= 1) {
      setImageSrc(defaultImage);
      setErrorStep(2);
      return;
    }
  };
  return (
    <div
      className={`w-full mt-30 md:mt-30 pb-10 ${className}`}
      role="img"
      aria-label={`${activeSlug} hero image`}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl shadow-md">
          <Image
            src={imageSrc}
            alt={`Banner for ${activeSlug}`}
            width={1200}
            height={600}
            className="w-full h-[220px] sm:h-[320px] md:h-[610px] object-cover object-center md:object-top"
            priority
            unoptimized
            onError={handleError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        </div>
      </div>
    </div>
  );
}
