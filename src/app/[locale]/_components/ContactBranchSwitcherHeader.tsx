'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { ChangeEvent, useTransition, useEffect, useState, Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';

export default function ContactBranchSwitcherHeader({ css }: { css: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [selectedBranch, setSelectedBranch] = useState('/');

    const t = useTranslations('LocaleSwitcher');

    // Detect current branch from pathname
    useEffect(() => {
        if (pathname.startsWith('/contact-us')) {
            setSelectedBranch('/contact-us');
        } else if (pathname.startsWith('/contact-us/psi-assets')) {
            setSelectedBranch('/contact-us/psi-assets');
        } else if (pathname.startsWith('/contact-us/dubai-hills-branch')) {
            setSelectedBranch('/contact-us/dubai-hills-branch');
        } else {
            setSelectedBranch('/contact-us');
        }
    }, [pathname]);

    const contacts = [
        { name: t('PSI Head Office'), value: '/contact-us/' },
        { name: t('PSI Assets'), value: '/contact-us/psi-assets' },
        { name: t('Dubai Hills Branch'), value: '/contact-us/dubai-hills-branch' },
        { name: t('Mamsha Branch'), value: '/contact-us/mamsha-saadiyat-branch' },
        { name: t('Waters Edge Branch'), value: '/contact-us/waters-edge-branch' },
        { name: t('Palm Jumeirah Branch'), value: '/contact-us/palm-jumeirah-branch' },
        { name: t('Conrad Etihad Towers'), value: '/contact-us/conrad-abu-dhabi-etihad-towers' },
        { name: t('Benelux Branch'), value: '/contact-us/business-bay-branch' },
    ];

    function onSelectChange(value: string) {
        setSelectedBranch(value);
        startTransition(() => {
            router.push(value);
        });
    }

    const getBranchName = (value: string) => {
        const contact = contacts.find(b => b.value === value);
        return contact ? contact.name : 'Contact';
    }

    return (
        <div className={clsx('relative', isPending && 'transition-opacity disabled:opacity-30')}>
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <PopoverButton
                            className={clsx(
                                `cursor-pointer flex items-center gap-1 text-xs font-bold uppercase hover:text-secondary transition-colors outline-none py-2`,
                                css
                            )}
                        >
                            <span>{t('Branches')}</span>
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
                            <PopoverPanel className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="flex flex-col py-1">
                                    {contacts.map((branch) => (
                                        <button
                                            key={branch.value}
                                            onClick={() => {
                                                onSelectChange(branch.value);
                                                close();
                                            }}
                                            disabled={isPending}
                                            className={clsx(
                                                'text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors flex items-center gap-3',
                                                selectedBranch === branch.value && 'bg-gray-50 font-bold text-secondary'
                                            )}
                                        >
                                            {branch.name}
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
