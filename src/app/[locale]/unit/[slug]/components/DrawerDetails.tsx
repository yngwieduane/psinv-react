'use client'

import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import MapComponent from '@/app/[locale]/_components/MapComponent';
import TableDetails from './TableDetails';
import SwiperNormal from '@/app/[locale]/_components/SwiperNormal';
import RequestViewing from '@/app/[locale]/_components/RequestViewing';

export default function DrawerDetails(props:any) {
    const [open, setOpen] = useState(props.open);
    let content,coordinates,images,details,video,title;

    const onCloseModal = (event: any) => {
        props.onClose(false);
        setOpen(false);
    };
    switch (props.drawerTitle) {
        case 'details':
            details = props.drawerContent?? "";
            title = "Details";
            content = <TableDetails data={details} />
            break;
        case 'video':
            video = props.drawerContent?? "";
            title = "Video";
            content =  <iframe src={video} allowFullScreen />;
            break;
        case 'map':
            coordinates = props.drawerContent.split(",")?? "";
            title = "Map";
            content = <MapComponent latitude={coordinates['1']} longitude={coordinates['0']} fallbackImage="" height="100%" />;
            break;
        case 'gallery':
            images = props.drawerContent?? "";
            title = "Gallery";
            content = <SwiperNormal slides={images.slice(0, -1)} width="400" height="300"/>
            break;
        case 'requestview':
            details = props.drawerContent?? "";
            title = "Request a Viewing";
            content = <RequestViewing data={details}/>
            break;
        case 'filterunitsearch':
            details = props.drawerContent?? "";
            title = "filterunitsearch";
            content = <RequestViewing data={details}/>
            break;
    
        default:
            details = props.drawerContent?? "";
            title = "Details";
            content = <TableDetails data={details} />
            break;
    }

  return (
    
    <Transition show={props.open} as={Fragment} appear={true} >
    <Dialog as="div" onClose={setOpen} className="relative z-100">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-black/20" onClick={onCloseModal}>
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16" >
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
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
