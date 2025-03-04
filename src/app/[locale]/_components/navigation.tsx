'use client'

import React, { FC, Fragment, useState } from 'react';
import Link from 'next/link';
import { Dialog, Disclosure,DialogPanel, 
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faXTwitter,
  faLinkedin,
  faSnapchat,
  faVk,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';


import LanguageSwitcher from './languageSwitcher';
import Image from 'next/image';
import ProjectSearch from './projectSearch';
//import ProjectSearch from './ProjectSearch';

type Person = {
  id: number;
  name: string;
};

type Product = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

type CallToAction = {
  name: string;
  href: string;
  icon: React.ElementType;
};

type CallToAction2 = {
  name: string;
  href: string;
  // icon can be either a component (React.ElementType) or a FontAwesome icon definition
  icon: React.ElementType | IconDefinition;
};

type SocialMedia = {
  name: string;
  href: string;
  icon: IconDefinition;
};

const people: Person[] = [
  { id: 1, name: 'Leslie Alexander' },
  // More users...
];

const company = [
  { name: 'Abu Dhabi', href: '#' },
  { name: 'Dubai', href: '#' },
  { name: 'Sharjah', href: '#' },
  { name: 'Al Ain', href: '#' },
  { name: 'Ras Al Khaimah', href: '#' },
]

const products: Product[] = [
  {
    name: 'UAE',
    description: 'Get a better understanding of your traffic',
    href: '/projects/uae',
    icon: ChartPieIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon,
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon,
  },
];

const callsToAction: CallToAction[] = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const callsToAction2: CallToAction2[] = [
  { name: '600 538 200', href: 'tel:600538200', icon: PhoneIcon },
  { name: 'WhatsApp', href: 'tel:600538200', icon: faWhatsapp },
  { name: 'Branches', href: 'tel:600538200', icon: PhoneIcon },
];

const socialMedia: SocialMedia[] = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/PropertyShopInvestment',
    icon: faFacebook,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/psinv',
    icon: faXTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/property_shop_investment/',
    icon: faInstagram,
  },
  {
    name: 'Snapchat',
    href: 'https://www.snapchat.com/add/property-shop',
    icon: faSnapchat,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/property-shop-investment-llc',
    icon: faLinkedin,
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/user/propertyshopabudhabi',
    icon: faYoutube,
  },
  {
    name: 'VK',
    href: 'https://vk.com/psinvuae',
    icon: faVk,
  },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const Navigation: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modal, setModal] = useState<boolean>(false);

  const modalHandler = () => {
    setModal(true);
    console.log('clicked = ' + modal);
  };

  const modalUpdate = (state: boolean) => {
    console.log(state);
    setModal(state);
  };

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="grid grid-cols-3 gap-4 bg-indigo-950 hidden md:grid">
        <div className="grid grid-cols-3">
          {callsToAction2.map((item) => (
            <Link href={item.href} key={item.name} className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                {item.name === 'WhatsApp' ? (
                  <FontAwesomeIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    icon={item.icon as IconDefinition}
                  />
                ) : (
                  React.createElement(item.icon as React.ElementType, {
                    className: 'h-5 w-5 flex-none text-gray-400',
                    'aria-hidden': 'true',
                  })
                )}
                {item.name}
            </Link>
          ))}
        </div>
        <div></div>
        <div className="grid grid-cols-10">
          {socialMedia.map((item) => (
            <Link href={item.href} key={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
              <FontAwesomeIcon
                className="h-5 w-5 flex-none text-gray-400"
                icon={item.icon}
              />
            </Link>
          ))}
          <Link href="/favorites" className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
            <HeartIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
      {/* Main Navigation */}
      <nav aria-label="Global" className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Property Shop Investment</span>
            <Image
              alt="Property Shop Investment"
              src="/PSI-Logo.svg"
              className="h-8 w-auto"
              width={200}
              height={200}
            />
          </a>
          <PopoverGroup className="hidden lg:flex lg:gap-x-10">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Buy
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Rent
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Communities
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Developers
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Featured Projects
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm font-normal text-gray-900">
              List Your Property
            </a>

            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                More
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <a href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <a href="#" className="text-sm font-normal text-gray-900">
              Contact Us
            </a>
          <button
            className="text-sm font-normal text-gray-900"
            onClick={modalHandler}
          >
            Search
          </button>
          </PopoverGroup>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <PopoverGroup>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Abu Dhabi
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-56 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                {company.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </PopoverPanel>
            </Popover>
          </PopoverGroup>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Property Shop Investment</span>
              <img className="h-8 w-auto" src="PSI-Logo.svg" alt="Logo" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Projects
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'rotate-180' : '',
                            'h-5 w-5 flex-none'
                          )}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                <Link href="/units" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Units
                </Link>
                <Link href="/landing-page" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Landing Page
                </Link>
                <Link href="/contact-us" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Contact Us
                </Link>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <ProjectSearch modalState={modal} onModalUpdate={modalUpdate} />
    </header>
    
  );
};

export default Navigation;