'use client';
import React from 'react';
import LanguageSwitcher from './languageSwitcher';
import BranchSwitcher from './BranchSwitcher';
import CurrencySelector from './CurrencySelector';

const GlobalTopBar = () => {
    return (
        <div className="bg-[#111954] text-white py-2 hidden lg:block border-b border-white/10">
            <div className="container mx-auto px-5 md:px-12 flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-6">
                    <CurrencySelector css="text-white hover:text-gray-200" />
                    <div className="h-3 w-px bg-white/20"></div>
                    <LanguageSwitcher css="text-white hover:text-gray-200" />
                </div>
                <BranchSwitcher css="text-white hover:text-gray-200" />
            </div>
        </div>
    );
};

export default GlobalTopBar;
