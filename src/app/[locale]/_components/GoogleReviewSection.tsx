import { H3Icon } from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';
import { Outfit } from 'next/font/google';
import Image from 'next/image';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function GoogleReviewSection() {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("googleReview");

  const reviews = [
    {
      id: 1,
      text: t("review1"),
    },
    {
      id: 2,
      text: t("review2"),
    },
    {
      id: 3,
      text: t("review3"),
    },
  ];

  return (
    <div className="py-20 bg-gray-50" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 md:px-8">
        <h3 className={`text-center text-3xl font-serif mb-12 ${outfit.className}`}>
          {t("title")}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-start mb-4">
                <Image src="/images/google-icon.png" alt="Google" title="Google" width={40} height={40} />
                <span className={`${isRtl ? "mr-2" : "ml-2" } text-lg font-semibold`}>{t("google")}</span>
              </div>
              <div className="text-yellow-400 text-xl mb-5">
                ★★★★★
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
