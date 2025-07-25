// src/components/RegistrationHeroImage.tsx

'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface RegistrationHeroImageProps {
  slug: string;
  locale: string;
  className?: string;
}
export default function RegistrationHeroImage({ className = '' }: RegistrationHeroImageProps) {
  const { locale, slug } = useParams() as { locale: string; slug: string };
  const baseSlug = slug || 'default';
  const basePath = '/images/registration-projects';
  const localizedImage = `${basePath}/${baseSlug}-${locale}.webp`;
  const fallbackImage = `${basePath}/${baseSlug}.webp`;
  const defaultImage = `${basePath}/default.webp`;
  const [imageSrc, setImageSrc] = useState(localizedImage);
  const [tries, setTries] = useState(0);
  const handleError = () => {
    if (tries === 0) {
      setImageSrc(fallbackImage);
      setTries(1);
    } else if (tries === 1) {
      setImageSrc(defaultImage);
      setTries(2);
    }
  };
  return (
    <div className={`max-w-6xl mx-auto px-4 py-10 ${className}`}>
      <Image
        src={imageSrc}
        alt="Project Banner"
        width={1200}
        height={600}
        className="w-full h-auto object-cover"
        priority
        onError={handleError}
      />
    </div>
  );
}
