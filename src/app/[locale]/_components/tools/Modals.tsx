'use client'
import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import ContactFormPopUp from "./ContactFormPopUp";

const Modals = (props:any) => {
  const [open, setOpen] = useState(props.modalState);

  const onCloseModal = (event:any) => {
    props.onModalUpdate(false);
  };

  const saveFormDataHandler = (formData:any) => {
    console.log(formData);
  };

  return (
    <Transition.Root show={props.modalState} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" onClick={onCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="">
                    <div className="grid grid-cols-3 gap-4 content-center">
                      <div className="col-span-2">
                        <Dialog.Title
                          as="h3"
                          className="text-start font-semibold text-2xl text-gray-900"
                        >
                          Register Interest
                        </Dialog.Title>
                      </div>
                      <div className="text-end">
                        <button
                          type="button"
                          className="inline-flex justify-end rounded-md bg-transparent h-full text-black font-semibold text-gray hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={onCloseModal}
                        >
                          <XMarkIcon className="h-full w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <ContactFormPopUp
                          onSaveFormData={saveFormDataHandler}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modals;
