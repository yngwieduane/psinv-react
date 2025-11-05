'use client';
import { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';
import AmortizationCalculator from './AmortizationCalculator';
import RefinancingCalculator from './RefinancingCalculator';
import RentVsBuyCalculator from './RentVsBuyCalculator';
import HouseAffordabilityCalculator from './HouseAffordabilityCalculator';

const tabs = [
  { id: 'mortgage', title: 'Mortgage Calculator' },
  { id: 'amortization', title: 'Amortization' },
  { id: 'refinancing', title: 'Refinancing' },
  { id: 'rentvsbuy', title: 'Rent vs Buy' },
  { id: 'houseafford', title: 'House Affordability' },
];

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
      <h1 className="text-3xl font-bold text-center mb-8">Mortgage Tools</h1>

      <ul className="flex flex-wrap justify-center mb-6 text-sm font-medium">
        {tabs.map((tab) => (
          <li key={tab.id} className="mr-2">
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`inline-block px-4 py-2 rounded-t-md cursor-pointer ${
                activeTab === tab.id
                  ? 'border-b-[3px] border-[#dc481a] font-bold text-[#111954] opacity-100 text-[20px]'
                  : 'border-b-2 border-transparent text-[#6c757d] hover:border-gray-300 opacity-100 font-light text-[20px]'
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
