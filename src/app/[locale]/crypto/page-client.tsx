"use client";
import React from 'react';
import HeroSection from './_components/HeroSection';
import StatsSection from './_components/StatsSection';
import RankingsSection from './_components/RankingsSection';
import EconomicalHavenSection from './_components/EconomicalHavenSection';
import RealEstateFoundations from './_components/RealEstateFoundations';
import FAQSection from './_components/FAQSection';
import SafeServiceProcessSection from './_components/SafeServiceProcessSection';
import CryptoProjectsSection from './_components/CryptoProjectsSection';
import SeamlessProcessSection from './_components/SeamlessProcessSection';
import InvestmentJourneySection from './_components/InvestmentJourneySection';
import UAEHubSection from './_components/UAEHubSection';
import MarketOpennessSection from './_components/MarketOpennessSection';

import { useState } from 'react';
import CryptoFormModal from './_components/CryptoFormModal';

const CryptoPageClient = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    return (
        <main className="min-h-screen bg-[#0A0A2E]">
            <HeroSection onOpenModal={openModal} />
            <StatsSection />
            <RankingsSection />
            <EconomicalHavenSection />
            <SafeServiceProcessSection />
            <CryptoProjectsSection />
            <SeamlessProcessSection />
            <InvestmentJourneySection onOpenModal={openModal} />
            <UAEHubSection />
            <MarketOpennessSection onOpenModal={openModal} />
            <RealEstateFoundations onOpenModal={openModal} />
            <FAQSection onOpenModal={openModal} />

            <CryptoFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </main>
    );
};

export default CryptoPageClient;
