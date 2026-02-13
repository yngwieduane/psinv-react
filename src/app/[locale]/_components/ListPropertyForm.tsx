"use client";
import "react-phone-number-input/style.css";
import DynamicForm from "../_components/DynamicForm";
import { Outfit } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import './ListPropertyForm.css';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

type CityProps = {
  city?: string;  //optional
}

const ListPropertyForm: React.FC<CityProps> = ({ city }) => {
  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("ListPropertySection");

  return (
    <>

      <section id="list-property" className="container mx-auto py-10 bg-white dark:bg-neutral-900" dir={isRTL ? 'rtl' : "ltr"}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-gray-700">

            {/* Left Content */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/images/list-your-property-main-homepage-new.webp")' }}
              >
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
              </div>

              <div className="absolute bottom-0 left-0 p-10 bg-gradient-to-t from-gray-700 via-gray-700/60 to-transparent w-full dark:bg-gradient-to-t dark:from-gray-900 dark:via-gray-900/60 dark:to-transparent">
                <h2 className={`text-3xl font-serif font-bold text-white mb-4 ${outfit.className}`}>
                  {t("title")}
                </h2>
                <div className="w-16 h-1 bg-secondary mb-6" />
                <p className={`text-gray-200 mb-6 font-light ${outfit.className}`}>{t("desc")}</p>

                <div className="flex gap-6 items-center opacity-90 flex-wrap">
                  <img
                    src="/assets/images/list-property/logos/psi-logo.png"
                    alt="PSI" title="PSI"
                    className="h-10"
                  />
                  <img
                    src="/assets/images/list-property/logos/bayut-logo.png"
                    alt="Bayut" title="Bayut"
                    className="h-10"
                  />
                  <img
                    src="/assets/images/list-property/logos/dubizzle.png"
                    alt="Dubizzle" title="Dubizzle"
                    className="h-10"
                  />
                  <img
                    src="/assets/images/list-property/logos/property-finder.png"
                    alt="Property Finder" title="Property Finder"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-1/2 p-8 md:p-12 bg-white dark:bg-neutral-900">
              <h3 className={`text-2xl font-serif font-bold mb-6 text-gray-800 dark:text-white ${outfit.className}`}>{t("title2")}</h3>
              <DynamicForm formType="propertyListing" city={city} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListPropertyForm;

