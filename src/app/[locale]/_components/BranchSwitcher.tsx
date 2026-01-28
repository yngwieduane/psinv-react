'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useTransition, useEffect, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import clsx from 'clsx';

export default function BranchSwitcher({ css }: { css: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [selectedBranch, setSelectedBranch] = useState('/');

    // Detect current branch from pathname
    useEffect(() => {
        if (pathname.startsWith('/dubai')) {
            setSelectedBranch('/dubai');
        } else if (pathname.startsWith('/sharjah')) {
            setSelectedBranch('/sharjah');
        } else if (pathname.startsWith('/rak')) {
            setSelectedBranch('/rak');
        } else {
            setSelectedBranch('/');
        }
    }, [pathname]);

    const branches = [
        { name: 'Abu Dhabi', value: '/' },
        { name: 'Dubai', value: '/dubai' },
        { name: 'Sharjah', value: '/sharjah' },
        { name: 'Ras Al Khaimah', value: '/rak' },
    ];

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextBranch = event.target.value;
        setSelectedBranch(nextBranch);
        startTransition(() => {
            router.push(nextBranch);
        });
    }

    return (
        <div
            className={clsx(
                'relative',
                isPending && 'transition-opacity disabled:opacity-30'
            )}
        >
            <label className="sr-only">Select Branch</label>
            <div className="mt-2 grid grid-cols-1 border border-gray-200 rounded-md">
                <select
                    className={`branch-select col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-2 pl-3 text-base ${css} outline-none focus:ring-0 bg-transparent sm:text-sm/6 cursor-pointer font-bold `}
                    value={selectedBranch}
                    disabled={isPending}
                    onChange={onSelectChange}
                    aria-label="Branch Switcher"
                >
                    {branches.map((branch) => (
                        <option key={branch.value} value={branch.value}>
                            {branch.name}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className={`pointer-events-none col-start-1 row-start-1 mr-2 size-4 self-center justify-self-end ${css}`}
                />
            </div>
            <style jsx global>{`
        .branch-select option {
            color: black !important;
            background-color: white !important;
        }
        `}</style>
        </div>
    );
}
