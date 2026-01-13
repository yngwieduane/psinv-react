'use client'
import React, { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { AudreyNormal } from "@/utils/fonts";

import InquireForm from "./InquireForm";

import { useTranslations } from 'next-intl';

const LearnMoreModal = (props: any) => {
  const t = useTranslations('InternationalPage.form_section');
  const [open, setOpen] = useState(props.modalState);

  const onCloseModal = (event: any) => {
    props.onModalUpdate(false);
  };

  const saveFormDataHandler = (formData: any) => {
    console.log(formData);
  };

  return (
    <Transition show={props.modalState} as={Fragment} appear={true} >
      <Dialog as="div" className="relative z-100" onClose={setOpen}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={onCloseModal}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-[#00000075] text-white px-6 pb-10 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[500px] w-full">
                <div className="">
                  <div className="text-end">
                    <button
                      type="button"
                      className="cursor-pointer rounded-md bg-transparent h-full text-gray font-semibold text-gray hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 width-10"
                      onClick={onCloseModal}
                    >
                      <XMarkIcon className="h-full w-8 h-8 text-gray-400" />
                    </button>
                  </div>
                  <div className="">
                    <div>
                      <DialogTitle
                        as="h3"
                        className={`text-start font-bold text-lg uppercase ${AudreyNormal.className} pb-4 border-b border-white`}
                      >
                        {t('title')}
                      </DialogTitle>
                    </div>

                    <div className="mt-5 px-5">
                      <InquireForm fromModal={true} />
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LearnMoreModal;