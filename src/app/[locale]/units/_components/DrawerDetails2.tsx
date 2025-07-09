'use client'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function DrawerDetails2(props:any) {
    const [open, setOpen] = useState(props.open);
    let content,coordinates,images,details,video,title;

    const onCloseModal = (event: any) => {
        props.onClose(false);
        setOpen(false);
    };
    switch (props.drawerTitle) {
        case 'filterunitsearch':
            details = props.drawerContent?? "";
            title = "filterunitsearch";
            content = ""
            break;
    
        default:
            details = props.drawerContent?? "";
            title = "filterunitsearch";
            content = ""
            break;
    }

  return (
    
    <Transition show={props.open} as={Fragment} appear={true} >
        <Dialog as="div" onClose={setOpen} className="relative z-100">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden bg-black/20" onClick={onCloseModal}>
                    <div className="pointer-events-none fixed inset-y-0 bottom-0 flex max-h-full" >
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-enter:translate-y-full data-closed:translate-y-full sm:duration-700"
                        >
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-0 shadow-xl">
                            <div className="px-4 sm:px-6 absolute z-10 top-10 end-0">
                                <div className="flex items-start justify-end">
                                    <DialogTitle className="text-base font-semibold text-gray-900 capitalize hidden">{title}</DialogTitle>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            onClick={onCloseModal}
                                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                        >
                                            <span className="absolute -inset-2.5" />
                                            <span className="sr-only">Close panel</span>
                                            <XMarkIcon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex-1 p-0">{/* Your content */}
                                {content}
                            </div>
                        </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    </Transition>
  )
}
