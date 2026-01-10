'use client';

import { Combobox, Transition } from '@headlessui/react';
import { Fragment, useMemo, useState } from 'react';

export type SelectOption = {
    id: string;
    label: string;
};

type Props = {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    valueId?: string;
    onChange: (opt?: SelectOption) => void;
    error?: string;
    disabled?: boolean;
};

export default function SearchableSelect({
    label,
    placeholder = 'Search...',
    options,
    valueId = '',
    onChange,
    error,
    disabled,
}: Props) {
    const [query, setQuery] = useState('');

    const selectedOption = useMemo<SelectOption | undefined>(() => {
        return options.find((o) => o.id === valueId);
    }, [options, valueId]);

    const filteredOptions = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options; // ✅ show all options when query is empty
        return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query]);

    return (
        <div className="w-full">
            {label ? (
                <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
                    {label}
                </label>
            ) : null}

            <Combobox
                value={selectedOption ?? null}
                onChange={(val: SelectOption | null) => onChange(val ?? undefined)}
                disabled={disabled}
            >
                {({ open }) => (
                    <div className="relative">
                        <div
                            className={`relative w-full rounded-md border bg-white ${error ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <Combobox.Input
                                className="w-full rounded-md bg-transparent px-3 py-2 pr-10 text-gray-800 outline-none"
                                displayValue={(opt: SelectOption) => opt?.label ?? ''}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={placeholder}
                            />

                            {/* ✅ This button lets users open dropdown without typing */}
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M5.5 7.5 10 12l4.5-4.5" />
                                </svg>
                            </Combobox.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            show={open}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Combobox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                                {filteredOptions.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-gray-500">No results</div>
                                ) : (
                                    filteredOptions.map((opt: SelectOption) => (
                                        <Combobox.Option key={opt.id} value={opt} as={Fragment}>
                                            {({ active, selected }) => (
                                                <li
                                                    className={`cursor-pointer px-3 py-2 text-sm ${active ? 'bg-gray-100' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className={selected ? 'font-semibold' : ''}>
                                                            {opt.label}
                                                        </span>
                                                        {selected ? <span>✓</span> : null}
                                                    </div>
                                                </li>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                )}
            </Combobox>

            {error ? <p className="text-red-500 text-sm mt-1">{error}</p> : null}
        </div>
    );
}
