"use client";

import { useTranslations } from 'next-intl';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faXTwitter,
    faLinkedinIn,
    faFacebookF,
    faWhatsapp,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectUrl: string;
    projectTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, projectUrl, projectTitle }) => {
    const t = useTranslations('CryptoPage.share');
    const [copied, setCopied] = useState(false);

    // Determine the full URL
    const baseUrl = "https://psinv.net/en/";
    const fullUrl = `${baseUrl}${projectUrl}`;

    const shareLinks = [
        {
            name: 'Twitter',
            icon: faXTwitter,
            color: 'text-[#000000]', // X is black
            bgColor: 'bg-gray-50',
            href: `http://www.twitter.com/share?url=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'LinkedIn',
            icon: faLinkedinIn,
            color: 'text-[#0077B5]',
            bgColor: 'bg-[#0077B5]/10',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'Facebook',
            icon: faFacebookF,
            color: 'text-[#1877F2]',
            bgColor: 'bg-[#1877F2]/10',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'WhatsApp',
            icon: faWhatsapp,
            color: 'text-[#25D366]',
            bgColor: 'bg-[#25D366]/10',
            href: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'Instagram',
            icon: faInstagram,
            color: 'text-[#E4405F]',
            bgColor: 'bg-[#E4405F]/10',
            href: `https://www.instagram.com/?url=${encodeURIComponent(fullUrl)}`
        },
        {
            name: 'Email',
            icon: faEnvelope,
            color: 'text-gray-600',
            bgColor: 'bg-gray-100',
            href: `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to&su=${encodeURIComponent(projectTitle)}&body=${encodeURIComponent(fullUrl)}`
        }
    ];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-8">
                                    <Dialog.Title as="h3" className="text-xl font-bold text-[#0A0A2E]">
                                        {t('title')}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-y-8">
                                    {shareLinks.map((link) => (
                                        <div key={link.name} className="flex flex-col items-center">
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all group ${link.bgColor} hover:scale-110`}
                                            >
                                                <FontAwesomeIcon icon={link.icon} className={`text-xl ${link.color}`} />
                                            </a>
                                            <span className="text-xs text-gray-500 mt-2 font-medium">{link.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                        <input
                                            readOnly
                                            value={fullUrl}
                                            className="bg-transparent text-xs text-gray-500 w-full outline-none truncate"
                                        />
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(fullUrl);
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 2000);
                                            }}
                                            className="text-xs font-bold text-[#E35F27] hover:text-[#c44d1d] whitespace-nowrap min-w-[70px] text-right"
                                        >
                                            {copied ? t('copied') : t('copy_link')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ShareModal;
