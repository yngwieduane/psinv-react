'use client'
import React, { Fragment, useState } from "react";
import { Dialog, Description, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import HomeBannerForm from "./HomeBannerForm"; 

const BannerModals = (props: any) => {
  const [open, setOpen] = useState(props.modalState);

  const propData = {
    ...props.propData
  }
//console.log("Banner Form props on Modal:", propData);
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={onCloseModal}>
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
                        {props.title || "Register Your Interest" }  
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
                      <HomeBannerForm hideFeedbackButton={true} propData={propData} isReportDownload = {props.isReportDownload} submitLabel={props.submitLabel} />
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

export default BannerModals;