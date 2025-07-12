'use client'

import React, { FC, Fragment, useState } from 'react';
import { Link } from "@/i18n/navigation";
import { Dialog, Disclosure,DialogPanel, 
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel, } from '@headlessui/react';
import {
  Bars3Icon,
  ChartPieIcon,
  XMarkIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
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
import { faMagnifyingGlass, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
//import ProjectSearch from './ProjectSearch';

type Person = {
  id: number;
  name: string;
};

type Buy = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};
type Rent = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};
type CommunitiesAbuDhabi = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};
type CommunitiesDubai = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};
type More = {
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

const products_buy: Buy[] = [
  {
    name: 'All Units',
    description: 'All Units for Sale',
    href: '/units?category=Buy',
    icon: ChartPieIcon,
  }
];
const products_rent: Rent[] = [
  {
    name: 'All Units',
    description: 'All Units for Rent',
    href: '/units?category=Rent',
    icon: ChartPieIcon,
  }
];
const communitiesAbuDhabi: CommunitiesAbuDhabi[] = [
  {
    name: 'Abu Dhabi',
    description: '',
    href: '/projects/abu-dhabi',
    icon: ChartPieIcon,
  },
  {
    name: 'Al Reem Island',
    description: '',
    href: '/projects/abu-dhabi/al-reem-island',
    icon: ChartPieIcon,
  },
  {
    name: 'Yas Island',
    description: '',
    href: '/projects/abu-dhabi/yas-island',
    icon: ChartPieIcon,
  },
  {
    name: 'Saadiyat Island',
    description: '',
    href: '/projects/abu-dhabi/saadiyat-island',
    icon: ChartPieIcon,
  },
  {
    name: 'Al Raha Beach',
    description: '',
    href: '/projects/abu-dhabi/al-raha-beach',
    icon: ChartPieIcon,
  },
  {
    name: 'View All',
    description: '',
    href: '/projects/abu-dhabi',
    icon: ChartPieIcon,
  }
];
const communitiesDubai: CommunitiesDubai[] = [
  {
    name: 'Dubai',
    description: '',
    href: '/projects/dubai',
    icon: ChartPieIcon,
  },
  {
    name: 'Downtown Dubai',
    description: '',
    href: '/projects/dubai/downtown-dubai',
    icon: ChartPieIcon,
  },
  {
    name: 'Dubai Creek',
    description: '',
    href: '/projects/dubai/dubai-creek',
    icon: ChartPieIcon,
  },
  {
    name: 'Town Square Dubai',
    description: '',
    href: '/projects/dubai/town-square-dubai',
    icon: ChartPieIcon,
  },
  {
    name: 'View All',
    description: '',
    href: '/projects/dubai',
    icon: ChartPieIcon,
  }
];

const more: More[] = [
  {
    name: 'About Us',
    description: 'About PSI',
    href: '/about-us',
    icon: ChartPieIcon,
  },
  {
    name: 'Careers',
    description: 'Careers',
    href: '/careers',
    icon: ChartPieIcon,
  },
  {
    name: 'Youngsters Program',
    description: 'Youngsters Program',
    href: '/psi-youngsters-program',
    icon: ChartPieIcon,
  }
];

const callsToAction: CallToAction[] = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const callsToAction2: CallToAction2[] = [
  { name: '600 538 200', href: 'tel:600538200', icon: PhoneIcon },
  { name: 'WhatsApp', href: 'tel:600538200', icon: faWhatsapp },
  { name: 'Branches', href: 'tel:600538200', icon: faMapLocationDot },
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
  const [modal, setModal] = useState<boolean>(false);

  const modalHandler = () => {
    setModal(true);
    console.log('clicked = ' + modal);
  };

  const modalUpdate = (state: boolean) => {
    console.log(state);
    setModal(state);
  };

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="grid grid-cols-3 gap-4 bg-indigo-950 hidden md:grid">
        <div className="grid grid-cols-3">
          {callsToAction2.map((item) => (
            <Link href={item.href} key={item.name} className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                {item.name !== '600 538 200' ? (
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
            <Link target="_blank" href={item.href} key={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
              <FontAwesomeIcon
                className="h-5 w-5 flex-none text-gray-400"
                icon={item.icon}
              />
            </Link>
          ))}
          <Link href="/favorites" className="hidden items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
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
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Property Shop Investment</span>
            <Image
              alt="Property Shop Investment"
              src="/PSI-Logo.svg"
              className="h-8 w-auto"
              width={200}
              height={200}
            />
          </Link>
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
                  {products_buy.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
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
                  {products_rent.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
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
                <div className="p-4 grid grid-cols-2">
                  <div>
                    {communitiesAbuDhabi.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                        >
                          <div className="flex-auto">
                            <Link href={item.href} className="block font-normal text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div>
                    {communitiesDubai.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                        >
                          <div className="flex-auto">
                            <Link href={item.href} className="block font-normal text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative hidden">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Developers
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  
                </div>
              </PopoverPanel>
            </Popover>
            <Popover className="relative hidden">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                Featured Projects
                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
                <div className="p-4">
                  
                </div>
              </PopoverPanel>
            </Popover>

            <Link href="/list-your-property" className="text-sm font-normal text-gray-900">
              List Your Property
            </Link>

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
                {more.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-normal text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <PopoverGroup className="hidden lg:flex lg:gap-x-10">
              <Link href="/contact-us" className="text-sm font-normal text-gray-900 hover:text-indigo-600">
                Contact Us
              </Link>
            </PopoverGroup>

          <button
            className="text-sm font-normal text-gray-900"
            onClick={modalHandler}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
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
        
        <div className="hidden  lg:flex-1 lg:justify-end">
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
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
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
              <Image height={200} width={200} className="h-8 w-auto" src="PSI-Logo.svg" alt="Logo" />
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
                <Disclosure as="div" className="-mx-3 hidden">
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
                        {[...products_buy, ...callsToAction].map((item) => (
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
                <Link onClick={() => setMobileMenuOpen(false)} href="/projects" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Projects
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/units" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Units
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/landing-page" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Landing Page
                </Link>
                <Link onClick={() => setMobileMenuOpen(false)} href="/contact-us" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Contact Us
                </Link>
              </div>
              <div className="py-6 hidden">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
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