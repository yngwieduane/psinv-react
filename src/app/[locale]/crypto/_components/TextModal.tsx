'use client'
import React, { Fragment, useState } from "react";
import { Dialog, Description, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const TextModal = (props: any) => {
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-[#090953] px-4 pb-4 pt-5 text-left text-[#fff] shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-4">
                <div className="mt-2">                        
                    <Image src={props.image} alt="Economical Haven" className="w-full h-auto" width={100} height={100} />
                </div>                
                <p className="text-sm mt-3">{props.text}</p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TextModal;