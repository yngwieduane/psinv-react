"use client";
import React from 'react';
import HeroSection from './_components/HeroSection';
import StatsSection from './_components/StatsSection';
import AttractionsSection from './_components/AttractionsSection';
import CryptoOfferSection from './_components/CryptoOfferSection';
import StepsSection from './_components/StepsSection';
import WhyInvestMap from './_components/WhyInvestMap';
import RealEstateFoundations from './_components/RealEstateFoundations';
import FAQSection from './_components/FAQSection';

const CryptoPageClient = () => {
    return (
        <main className="min-h-screen bg-[#0A0A2E]">
            <HeroSection />
            <StatsSection />
            <AttractionsSection />
            <CryptoOfferSection />
            <StepsSection />
            <WhyInvestMap />
            <RealEstateFoundations />
            <FAQSection />
        </main>
    );
};

export default CryptoPageClient;
