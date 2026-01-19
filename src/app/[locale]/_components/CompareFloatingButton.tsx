'use client'
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/userContext';
import { Link } from '@/i18n/navigation';
import { Shuffle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const CompareFloatingButton = () => {
    const { compareList } = useUser();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't show on server or if empty or if already on compare page
    if (!mounted || compareList.length === 0 || pathname.includes('/compare')) {
        return null;
    }

    return (
        <Link href="/compare" className="fixed bottom-6 left-6 z-50 animate-bounce hover:animate-none">
            <div className="bg-white text-black p-4 rounded-full shadow-2xl flex items-center gap-2 hover:bg-primary/90 transition-colors border-2 border-white/20 backdrop-blur-sm">
                <div className="relative">
                    <Shuffle size={24} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                        {compareList.length}
                    </span>
                </div>
                <span className="font-bold pr-1 hidden md:inline-block">Compare</span>
            </div>
        </Link>
    );
};

export default CompareFloatingButton;
