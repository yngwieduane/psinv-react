'use client';
import { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';
import AmortizationCalculator from './AmortizationCalculator';
import RefinancingCalculator from './RefinancingCalculator';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import HouseAffordabilityCalculator from './HouseAffordabilityCalculator';
import { Outfit } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import BannerModals from '../_components/HomeBannerModal';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function MortgageTabs(props: any) {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("Mortgage_Tabs");

  const tabs = [
    { id: 'mortgage', title: t("mortgage") },
    { id: 'amortization', title: t("amortization") },
    { id: 'refinancing', title: t("refinancing") },
    { id: 'rentvsbuy', title: t("rentvsbuy") },
    { id: 'houseafford', title: t("houseafford") }
  ];

  const [activeTab, setActiveTab] = useState('mortgage');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const [modal, setModal] = useState(false);
  const modalHandler = () => {
    setModal(true);
  };

  const modalUpdate = (event: any) => {
    console.log(event);
    setModal(event);
  };

  return (
    <>
      <div className="max-w-[1320px] mx-auto px-4 py-8" dir={isRtl ? "rtl" : "ltr"}>
        <h2 className={`text-center text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 ${outfit.className}`}>{t("Mortgage Tools")}</h2>
        <ul className="flex flex-wrap justify-center mb-6 text-sm font-medium">
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`${outfit.className} inline-block px-4 py-2 rounded-t-md pb-4 font-bold mr-6 whitespace-nowrap text-center cursor-pointer ${activeTab === tab.id
                  ? 'text-primary border-b-2 border-secondary font-bold dark:text-white dark:border-secondary'
                  : 'text-gray-500 hover:text-gray-800 font-light dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="bg-white dark:bg-neutral-900">
          {activeTab === 'mortgage' && <MortgageCalculator modal={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} />}
          {activeTab === 'amortization' && <AmortizationCalculator amount={1000000} modal={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} />}
          {activeTab === 'refinancing' && <RefinancingCalculator modal={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} />}
          {activeTab === 'rentvsbuy' && <RentVsBuyCalculator modal={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} />}
          {activeTab === 'houseafford' && <HouseAffordabilityCalculator modal={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} />}
        </div>
      </div>
      <BannerModals modalState={modal} onOpenModal={modalHandler} onModalUpdate={modalUpdate} propData="" city={props.city} />
    </>
  );
}
