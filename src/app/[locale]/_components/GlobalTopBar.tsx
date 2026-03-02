'use client';
import React from 'react';
import LanguageSwitcher from './languageSwitcher';
import BranchSwitcher from './BranchSwitcher';
import CurrencySelector from './CurrencySelector';
import HeaderSocial from './HeaderSocial';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ContactBranchSwitcherHeader from './ContactBranchSwitcherHeader';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';

const DevThemeToggle = () => {
    const searchParams = useSearchParams();
    const isDev = searchParams.get('dev') === '1';

    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        // Show popover only if user hasn't dismissed it
        const hasSeenThemePopover = localStorage.getItem('hasSeenThemePopover');
        if (!hasSeenThemePopover) {
            // Delay to allow UI to settle.
            const timer = setTimeout(() => setShowPopover(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissPopover = () => {
        setShowPopover(false);
        localStorage.setItem('hasSeenThemePopover', 'true');
    };

    return (
        <div className="relative flex items-center">
            {isDev ? <ThemeToggle /> : <ThemeToggle />}

            <AnimatePresence>
                {showPopover && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-60 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-[100] text-left normal-case tracking-normal font-normal"
                    >
                        {/* Caret pointing to button */}
                        <div className="absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-slate-800 border-l border-t border-gray-100 dark:border-gray-700 transform rotate-45 rounded-sm"></div>

                        <div className="relative z-10 flex justify-between items-start gap-3">
                            <div>
                                <h4 className="font-bold text-sm mb-1 text-slate-800 dark:text-white">Try Dark Mode! ✨</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                    You can now toggle the theme for a better viewing experience.
                                </p>
                            </div>
                            <button
                                onClick={dismissPopover}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 -mt-1 -mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                                aria-label="Close"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const GlobalTopBar = () => {
    return (
        <div className="bg-[#111954] text-white py-2 hidden lg:block border-b border-white/10">
            <div className="container mx-auto px-5 flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-6">
                    <CurrencySelector css="text-white hover:text-gray-200" />
                    <div className="h-3 w-px bg-white/20"></div>
                    <LanguageSwitcher css="text-white hover:text-gray-200" />
                    <ContactBranchSwitcherHeader css="text-white hover:text-gray-200" />
                </div>
                <div className='flex justify-between items-center gap-10'>
                    <HeaderSocial color="white" />
                    <BranchSwitcher css="text-white hover:text-gray-200" />
                    <Suspense>
                        <DevThemeToggle />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default GlobalTopBar;
