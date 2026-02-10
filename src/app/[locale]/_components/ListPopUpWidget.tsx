'use client';

import React, { Fragment, useState } from 'react';
import "react-phone-number-input/style.css";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import DynamicForm from './DynamicForm';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRight } from 'lucide-react';


const ListPopUpWidget = () => {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [open, setOpen] = useState(isPopUpOpen);
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "en";
    const t = useTranslations('Common_Form_Agreements');    

    const onCloseModal = (event: any) => {
        setIsPopUpOpen(false);
    }

    return (
        <>
         <Transition show={isPopUpOpen} as={Fragment} appear={true} >
              <Dialog as="div" className="relative z-100" onClose={setOpen}>
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
                </TransitionChild>
        
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0" onClick={onCloseModal}>
                    <TransitionChild
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                        <div>
                          <div className="">
                            <div className="grid grid-cols-3 gap-4 content-center">
                              <div className="col-span-2">
                                <DialogTitle
                                  as="h3"
                                  className="text-start font-semibold md:text-2xl text-xl"
                                >
                                List Your Property
                                </DialogTitle>
                              </div>
                              <div className="text-end">
                                <button
                                  type="button"
                                  className="inline-flex justify-end rounded-md bg-transparent h-full text-dark font-semibold text-gray hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  onClick={onCloseModal}
                                >
                                  <XMarkIcon className="h-full w-5 text-dark" />
                                </button>
                              </div>
                            </div>
        
                            <div className="mt-2">
                                <DynamicForm formType="propertyListing" />
                            </div>
                           </div>
                        </div>
                        </DialogPanel>
                       </TransitionChild>
                     </div>
                   </div>
                 </Dialog>
               </Transition>
       

        <div className="bg-[#111954] text-[#fff] p-6 rounded-3xl">
            <h3 className='text-[#fff] text-xl md:text-[15px] xl:text-xl uppercase mb-3'>Ready to Sell or Rent?</h3>
            <p className='mb-6 text-md md:text-[13px] text-[#a2a7ca] xl:text-[16px]'>Partner with our verified agents to get the best market value — fast and secure.</p>
            <Button onClick={() => setIsPopUpOpen(true)} className="bg-white text-[#111954] text-xl md:text-[15px] xl:text-xl px-5 py-3 md:py-2 xl:py-3 rounded flex w-full tect-center justify-content-center gap-2 items-center">Get Started <ChevronRight /></Button>
        </div>
        
            
        </>
    );
};

export default ListPopUpWidget;
