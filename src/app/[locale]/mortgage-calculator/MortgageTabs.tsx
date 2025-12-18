'use client';
import { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';
import AmortizationCalculator from './AmortizationCalculator';
import RefinancingCalculator from './RefinancingCalculator';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import HouseAffordabilityCalculator from './HouseAffordabilityCalculator';
import { Outfit } from 'next/font/google';

const tabs = [
  { id: 'mortgage', title: 'Mortgage Calculator' },
  { id: 'amortization', title: 'Amortization' },
  { id: 'refinancing', title: 'Refinancing' },
  { id: 'rentvsbuy', title: 'Rent vs Buy' },
  { id: 'houseafford', title: 'House Affordability' },
];

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function MortgageTabs() {
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
  

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-8">
      <h1 className={`text-center text-2xl md:text-4xl font-bold text-gray-900 mb-8 ${outfit.className}`}>Mortgage Tools</h1>

      <ul className="flex flex-wrap justify-center mb-6 text-sm font-medium">
        {tabs.map((tab) => (
          <li key={tab.id} className="mr-2">
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`${outfit.className} inline-block px-4 py-2 rounded-t-md pb-4 font-bold mr-6 whitespace-nowrap text-center cursor-pointer ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-secondary font-bold'
                  : 'text-gray-500 hover:text-gray-800 font-light'
              }`}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      <div className="bg-white">
        {activeTab === 'mortgage' && <MortgageCalculator />}
        {activeTab === 'amortization' && <AmortizationCalculator amount={1000000} />}
        {activeTab === 'refinancing' && <RefinancingCalculator />}
        {activeTab === 'rentvsbuy' && <RentVsBuyCalculator />}
        {activeTab === 'houseafford' && <HouseAffordabilityCalculator />}
      </div>
    </div>
  );
}
