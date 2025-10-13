'use client'

import React, { FC, Fragment, useState } from 'react';
import { Link } from "@/i18n/navigation";
import { DynamicIcon } from 'lucide-react/dynamic';
import { Dialog, Disclosure,DialogPanel, DisclosureButton,DisclosurePanel,Popover,PopoverButton,PopoverGroup,PopoverPanel, } from '@headlessui/react';
import { Bars3Icon,ChartPieIcon,XMarkIcon,} from '@heroicons/react/24/outline';
import { ChevronDownIcon,PhoneIcon,PlayCircleIcon} from '@heroicons/react/20/solid';
import {  motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp,} from '@fortawesome/free-brands-svg-icons';
import LanguageSwitcher from './languageSwitcher';
import Image from 'next/image';
import ProjectSearch from './projectSearch';
import { faMagnifyingGlass, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Buy, CallToAction, CallToAction2, CommunitiesAbuDhabi, CommunitiesDubai, More, Person, Rent, SocialMedia } from '@/types/navigation';
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import {NavigationMenu,NavigationMenuContent,NavigationMenuItem,NavigationMenuLink,NavigationMenuList,NavigationMenuTrigger,navigationMenuTriggerStyle,} from "@/components/ui/navigation-menu"


const people: Person[] = [
    { id: 1, name: 'Leslie Alexander' },
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
const developers = [
    { name: 'Aldar Properties', href: '/developer/aldar-properties-pjsc' },
    { name: 'Emaar Properties', href: '/developer/emaar' },
    { name: 'Imkan', href: '/developer/imkan-properties-llc' },
    { name: 'Meeras', href: '/developer/meeras' },
    { name: 'Dubai Properties', href: '/developer/dubai-properties---idama' },
    { name: 'NSHAMA', href: '/developer/nshama' },
    { name: 'View All', href: '/developers' },
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
        name: 'Mortgage Calculator',
        description: 'Mortgage Calculator',
        href: '/mortgage-calculator',
        icon: ChartPieIcon,
    },
    {
        name: 'Youngsters Program',
        description: 'Youngsters Program',
        href: '/psi-youngsters-program',
        icon: ChartPieIcon,
    },
    {
        name: 'Newsletter',
        description: 'Newsletter',
        href: '/newsletter',
        icon: ChartPieIcon,
    },
    {
        name: 'International',
        description: 'International',
        href: '/international',
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
        icon: 'facebook',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/psinv',
        icon: 'twitter',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/property_shop_investment/',
        icon: 'instagram',
    },
    {
        name: 'Snapchat',
        href: 'https://www.snapchat.com/add/property-shop',
        icon: 'camera',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/property-shop-investment-llc',
        icon: 'linkedin',
    },
    {
        name: 'Youtube',
        href: 'https://www.youtube.com/user/propertyshopabudhabi',
        icon: 'youtube',
    }
];


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}

const Navigation: FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="grid grid-cols-3 gap-4 bg-indigo-950 hidden md:grid px-5">
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
            <div className="flex gap-5 justify-end">
                {socialMedia.map((item) => (
                    <Link target="_blank" href={item.href} key={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                    <DynamicIcon name={item.icon} size={20} />
                    </Link>
                ))}
                {/* <Link href="/favorites" className="hidden items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                <HeartIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
                />
                </Link> */}
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

                <NavigationMenu className="hidden lg:flex lg:gap-x-10" viewport={false}>
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className="hover:bg-psiblue hover:text-white" href="/units?category=Buy">Buy</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className="hover:bg-psiblue hover:text-white" href="/units?category=Rent">Rent</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Communities</NavigationMenuTrigger>
                            <NavigationMenuContent className='z-40 border-0 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5'>
                                <div className='grid grid-cols-2 w-[400px] md:w-[500px] lg:w-[600px]'>
                                    <ul className="">
                                    {communitiesAbuDhabi.map((component) => (
                                        <ListItem
                                        key={component.name}
                                        title={component.name}
                                        href={component.href}
                                        ></ListItem>
                                    ))}
                                    </ul>
                                    <ul className="">
                                    {communitiesDubai.map((component) => (
                                        <ListItem
                                        key={component.name}
                                        title={component.name}
                                        href={component.href}
                                        ></ListItem>
                                    ))}
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                            <NavigationMenuContent className='z-40 border-0 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5'>
                                <ul className="grid w-[200px] gap-2 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                                {developers.map((component) => (
                                    <ListItem
                                    key={component.name}
                                    title={component.name}
                                    href={component.href}
                                    ></ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className="hover:bg-psiblue hover:text-white" href="/list-your-property">List Your Property</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>More</NavigationMenuTrigger>
                            <NavigationMenuContent className='z-40 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5'>
                                <ul className="grid w-[200px] gap-2 md:w-[200px] md:grid-cols-1 lg:w-[200px]">
                                {more.map((component) => (
                                    <ListItem
                                    key={component.name}
                                    title={component.name}
                                    href={component.href}
                                    ></ListItem>
                                ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link className="hover:bg-psiblue hover:text-white" href="/contact-us">Contact Us</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <button
                            className="text-sm font-normal text-gray-900"
                            onClick={modalHandler}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                        
                    </NavigationMenuList>
                </NavigationMenu>
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
            <div className="hidden lg:flex-1 lg:justify-end">
                <PopoverGroup>
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-normal text-gray-900">
                            Abu Dhabi
                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            className="absolute top-full -left-8 z-40 mt-3 w-56 rounded-xl bg-white p-2 ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
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

function ListItem({
    title,
    children,
    href,
    ...props
    }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
        <NavigationMenuLink className='flex content-center' asChild>
            <Link href={href}>
            <div className="text-sm leading-none font-medium">{title}</div>
            </Link>
        </NavigationMenuLink>
        </li>
    )
}

export default Navigation;