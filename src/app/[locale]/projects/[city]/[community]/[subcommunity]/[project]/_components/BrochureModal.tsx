'use client';

import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import InquiryForm from '@/app/[locale]/_components/InquiryForm';
import { useTranslations } from 'next-intl';

interface BrochureModalProps {
    isOpen: boolean;
    closeModal: () => void;
    brochureUrl: string;
    propertyName: string;
    image?: string;
}

export default function BrochureModal({ isOpen, closeModal, brochureUrl, propertyName, image }: BrochureModalProps) {
    const t = useTranslations('ProjectPage');

    const handleSuccess = () => {
        if (brochureUrl) {
            window.open(brochureUrl, '_blank');
        }
        closeModal();
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-10">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {/* Left Side - Image */}
                                    <div className="relative h-48 md:h-auto bg-gray-200">
                                        {image && (
                                            <img
                                                src={image}
                                                alt={propertyName}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-xl font-bold shadow-black drop-shadow-md">{propertyName}</h3>
                                        </div>
                                    </div>

                                    {/* Right Side - Form */}
                                    <div className="p-6 md:p-8">
                                        <DialogTitle as="h3" className="text-xl font-bold leading-6 text-gray-900 mb-4">
                                            {t('download_brochure')}
                                        </DialogTitle>

                                        <InquiryForm
                                            onSuccess={handleSuccess}
                                            hideFeedbackButton={true}
                                        />
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
