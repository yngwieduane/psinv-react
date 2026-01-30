'use client';

import clsx from 'clsx';
import { useCurrency } from '@/context/currencyContext';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
    css?: string;
};

export default function CurrencySelector({ css }: Props) {
    const { currency, setCurrency, availableCurrencies } = useCurrency();

    const getSymbol = (code: string) => {
        switch (code) {
            case 'AED': return 'AED';
            case 'USD': return '$';
            case 'EUR': return '€';
            case 'BTC': return '₿';
            default: return code;
        }
    };

    return (
        <div className={clsx('relative')}>
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className={clsx(
                                `cursor-pointer flex items-center gap-1 text-xs font-bold uppercase hover:text-secondary transition-colors outline-none py-2`,
                                css
                            )}
                        >
                            <span>{currency}</span>
                            <ChevronDown size={14} className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                        </PopoverButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute right-0 z-50 mt-2 w-32 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="flex flex-col py-1">
                                    {availableCurrencies.map((code) => (
                                        <button
                                            key={code}
                                            onClick={() => {
                                                setCurrency(code);
                                                close();
                                            }}
                                            className={clsx(
                                                'text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors flex items-center gap-3',
                                                currency === code && 'bg-gray-50 font-bold text-secondary'
                                            )}
                                        >
                                            <span className="w-5 font-mono text-xs">{getSymbol(code)}</span>
                                            {code}
                                        </button>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );
}
