"use client";

import React, { useState, useEffect } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 bg-[#1a1a1a] border border-[#bfa75d]/30 shadow-2xl rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-bottom-5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center shrink-0 border border-[#bfa75d]/50">
                    <span className="text-[#bfa75d] font-bold text-xs pointer-events-none">PSI</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">Install PSI App</span>
                    <span className="text-gray-400 text-xs">For a better experience</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    Later
                </button>
                <button
                    onClick={handleInstallClick}
                    className="px-4 py-1.5 text-xs font-semibold rounded-md bg-[#bfa75d] text-[#1a1a1a] hover:bg-[#a68f4e] transition-colors"
                >
                    Install
                </button>
            </div>
        </div>
    );
}
