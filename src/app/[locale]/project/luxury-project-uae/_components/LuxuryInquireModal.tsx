'use client'
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import LuxuryInquireForm from "./LuxuryInquireForm";

interface Project {
  id: string,
  name: string,
  type: string,
}

const LuxuryInquireModal = ({ modalState, onModalUpdate, project, location, title }: any) => {  

  const [propData, setPropData] = useState(project);
  const [locData, setLocData] = useState(location);

  useEffect(() => {
    setPropData(project);
    setLocData(location);
    console.log("Project Data On MOdal======", project);

  }, [project, modalState]);

  const onCloseModal = () => {    
    onModalUpdate(false);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Transition show={modalState} as={Fragment} appear={true} >
      <Dialog as="div" className="relative z-100" onClose={onCloseModal}>
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
              <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-white px-6 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-[500px] w-full">
                <div>
                  <div className="">
                    <div className="grid grid-cols-4 gap-2 content-center">
                      <div className="col-span-3">
                        <DialogTitle
                          as="h3"
                          className="text-start text-[22px]"
                        >
                          {title}
                        </DialogTitle>
                      </div>
                      <div className="text-end">
                        <button type="button"
                          className="cursor-pointer inline-flex justify-end rounded-md bg-transparent h-full text-gray font-semibold text-gray hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 width-10"
                          onClick={onCloseModal} >
                          <XMarkIcon className="h-full w-10 h-10 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <LuxuryInquireForm 
                      project={propData} location = {locData}
                      downloadIntent= {propData?.downloadIntent}
                      onSuccessDownload = {handleDownload}
                       />
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

export default LuxuryInquireModal;