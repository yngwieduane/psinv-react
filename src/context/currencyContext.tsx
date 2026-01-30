'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Exchange rates relative to AED (Base)
// These should ideally be fetched from an API in a real production environment
const EXCHANGE_RATES: Record<string, number> = {
    'AED': 1,
    'USD': 0.27229, // 1 AED = 0.27 USD
    'EUR': 0.25,    // 1 AED = 0.25 EUR (approx)
    'BTC': 0.000003 // 1 AED = ~0.000003 BTC (Volatile, placeholder)
};

const SYMBOLS: Record<string, string> = {
    'AED': 'AED',
    'USD': '$',
    'EUR': '€',
    'BTC': '₿'
};

export type CurrencyCode = 'AED' | 'USD' | 'EUR' | 'BTC';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
    convertPrice: (amountInAED: number) => { value: number; symbol: string; code: string; formatted: string };
    availableCurrencies: CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<CurrencyCode>('AED');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('psi_currency');
        if (saved && EXCHANGE_RATES[saved]) {
            setCurrencyState(saved as CurrencyCode);
        }
    }, []);

    const setCurrency = (code: CurrencyCode) => {
        setCurrencyState(code);
        localStorage.setItem('psi_currency', code);
    };

    const convertPrice = (amountInAED: number) => {
        const rate = EXCHANGE_RATES[currency] || 1;
        const value = amountInAED * rate;
        const symbol = SYMBOLS[currency] || currency;

        // Formatting
        let formatted = '';
        if (currency === 'BTC') {
            formatted = `${symbol} ${value.toFixed(6)}`;
        } else {
            formatted = `${symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        }

        return { value, symbol, code: currency, formatted };
    };

    // Avoid hydration mismatch by rendering default until mounted
    const activeCurrency = mounted ? currency : 'AED';

    return (
        <CurrencyContext.Provider value={{
            currency: activeCurrency,
            setCurrency,
            convertPrice: (amount) => {
                const rate = EXCHANGE_RATES[activeCurrency] || 1;
                const value = amount * rate;
                const symbol = SYMBOLS[activeCurrency] || activeCurrency;
                let formatted = '';
                if (activeCurrency === 'BTC') {
                    formatted = `${symbol} ${value.toFixed(6)}`;
                } else {
                    formatted = `${symbol} ${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                }
                return { value, symbol, code: activeCurrency, formatted };
            },
            availableCurrencies: Object.keys(EXCHANGE_RATES) as CurrencyCode[]
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
