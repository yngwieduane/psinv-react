'use client'

import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from "@/i18n/navigation";

import { Dialog, Disclosure, DialogPanel, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Button, } from '@headlessui/react';
import { Bars3Icon, ChartPieIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faWhatsapp, } from '@fortawesome/free-brands-svg-icons';
import LanguageSwitcher from './languageSwitcher';
import BranchSwitcher from './BranchSwitcher';
import Image from 'next/image';
import ProjectSearch from './projectSearch';
import { faMagnifyingGlass, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Buy, CallToAction, CallToAction2, CommunitiesAbuDhabi, CommunitiesDubai, More, Rent, SocialMedia } from '@/types/navigation';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import { ArrowRight, ChevronDown, Globe, Heart, Menu, Search, UserIcon, X } from 'lucide-react';
import { useUser } from '@/context/userContext';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';


export type Page = '/en' | '/ar' | '/ru' | '/du' | '/zh';

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
        href: '/units?category=Sale',
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
    },
    {
        name: 'Luxury Projects',
        description: 'Luxury Projects',
        href: '/project/luxury-project-uae',
        icon: ChartPieIcon,
    }
];
const callsToAction: CallToAction[] = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
];
const callsToAction2: CallToAction2[] = [
    { name: '600 538 200', href: 'tel:600538200', icon: PhoneIcon },
    { name: 'WhatsApp', href: 'https://wa.me/97122052999?text=%0AI%20am%20Interested%20.%20Kindly%20send%20me%20more%20information.%0Ahttps://psinv.net/%0A%0A', icon: faWhatsapp },
    { name: 'Branches', href: '/contact-us', icon: faMapLocationDot },
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

// Simplified Mega Menu Structure
const NAV_GROUPS = [
    {
        label: 'Featured',
        image: '/images/landing-page/yas-riva/yas-riva-about.webp',
        columns: [
            {
                title: 'Abu Dhabi',
                url: '/',
                items: [
                    { label: "Sama Yas", lpSlug: "sama-yas" },
                    { label: "Yas Riva", lpSlug: "yas-riva" },
                    { label: "Manarat Living – Saadiyat", lpSlug: "manarat-living-saadiyat" },
                    { label: "The Arthouse", lpSlug: "the-arthouse" },
                    { label: "Bloom Living – Almeria", lpSlug: "bloom-living-almeria" },
                ]
            }
        ]
    },
    {
        label: 'Properties',
        image: 'https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=800&auto=format&fit=crop',
        columns: [
            {
                title: 'Residential',
                items: [
                    { label: 'Buy Apartments', page: 'search' },
                    { label: 'Buy Villas', page: 'search' },
                    { label: 'Rent Apartments', page: 'search' },
                    { label: 'Rent Villas', page: 'search' },
                ]
            },
            {
                title: 'Commercial',
                items: [
                    { label: 'Offices for Sale', page: 'search' },
                    { label: 'Offices for Rent', page: 'search' },
                    { label: 'Retail Spaces', page: 'search' },
                ]
            },
            {
                title: 'Popular Areas',
                items: [
                    { label: 'Al Reem Island', page: 'search' },
                    { label: 'Yas Island', page: 'search' },
                    { label: 'Saadiyat Island', page: 'search' },
                    { label: 'Dubai Marina', page: 'search' },
                ]
            }
        ]
    },
    {
        label: 'Projects',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
        columns: [
            {
                title: 'New Launches',
                items: [
                    { label: 'Luxury Projects', page: 'luxury-projects' },
                    { label: 'Off-Plan Projects', page: 'projects' },
                    { label: 'Ready to Move', page: 'projects' },
                ]
            },
            {
                title: 'By Developer',
                items: [
                    { label: 'Aldar Properties', href: "/developer/aldar-properties-pjsc" },
                    { label: 'Emaar', page: 'developers' },
                    { label: 'Sobha Realty', page: 'developers' },
                ]
            }
        ]
    },
    {
        label: 'Services',
        image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=800&auto=format&fit=crop',
        columns: [
            {
                title: 'Valuation & Finance',
                items: [
                    { label: 'Mortgage Calculator', href: "/mortgage-calculator" },
                    { label: 'Villa Cost Calculator', page: 'villa-calculator' },
                    { label: 'Property Valuation', href: "/list-your-property" },
                ]
            },
            {
                title: 'Client Services',
                items: [
                    { label: 'List Your Property', page: 'list-property' },
                    { label: 'Property Management', page: 'about' },
                    { label: 'Golden Visa', page: 'invest' },
                ]
            }
        ]
    },
    {
        label: 'Company',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
        columns: [
            {
                title: 'About PSI',
                items: [
                    { label: 'Our Story', href: "/about-us" },
                    { label: 'Careers', href: "/careers" },
                    { label: 'Awards', page: 'awards' },
                    { label: 'Our Agents', page: 'agents' }, // Added Agent Link
                ]
            },
            {
                title: 'Media',
                items: [
                    { label: 'Market Insights', page: 'market-insight' },
                    { label: 'Newsletters', href: "/newsletter" },
                    { label: 'Contact Us', href: "/contact-us" },
                    { label: 'Articles', href: "/articles" },
                ]
            }
        ]
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
type MenuItem = {
    label: string;
    href?: string;
    lpSlug?: string;
    link?: string;
};
type Column = {
    title: string;
    link?: string;
    items: MenuItem[];
};

function normalizeHref(href: string) {
    return href.replace(/^\/(en|ar|ru|du|cn)(?=\/)/, "");
}
function resolveHref(item: MenuItem) {
    const raw =
        item.href ? item.href :
            item.lpSlug ? `/project/lp/${item.lpSlug}` :
                "#";

    // don’t touch external links or "#"
    if (raw === "#" || raw.startsWith("http") || raw.startsWith("tel:") || raw.startsWith("mailto:")) {
        return raw;
    }

    return normalizeHref(raw);
}


const Navigation: FC<{ currentPage: Page }> = ({ currentPage }) => {
    console.log(currentPage);
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [isCurrMenuOpen, setIsCurrMenuOpen] = useState(false);
    const [modal, setModal] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);
    const currMenuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");


    // Simplified Mega Menu Structure
    const NAV_GROUPS = [
        {
            label: t('featured projects'),
            image: '/images/landing-page/yas-riva/yas-riva-about.webp',
            columns: [
                {
                    title: t('Abu Dhabi'),
                    link: "/",
                    items: [
                        { label: t("Sama Yas"), lpSlug: "sama-yas" },
                        { label: t("Yas Riva"), lpSlug: "yas-riva" },
                        { label: t("Manarat Living - Saadiyat"), lpSlug: "manarat-living-saadiyat" },
                        { label: t("The Arthouse"), lpSlug: "the-arthouse" },
                        { label: t("Muheira"), href: "/projects/abu-dhabi/al-reem-island/maysan/muheira" },
                    ]
                },
                {
                    title: t('Dubai'),
                    link: "/dubai",
                    items: [
                        { label: t('Elegance Tower'), href: '/projects/dubai/downtown-dubai/downtown-dubai/elegance-tower' },
                        { label: t('Address Residences The Bay'), href: '/projects/dubai/jumeirah-beach-residence/emaar-beachfront/address-residences-the-bay' },
                        { label: t('Rawda Apartments'), href: '/projects/dubai/town-square-dubai/town-square-dubai/rawda-apartments' },
                        { label: t('DE Collective'), href: '/projects/dubai/dubai-hills-estate/dubai-hill-estate/de-collective' },
                        { label: t('Expo Golf Villas'), href: '/projects/dubai/emaar-south/emaar-south/expo-golf-villas' },
                    ]
                },
                {
                    title: t('Sharjah'),
                    link: "/sharjah",
                    items: [
                        { label: t('Sharjah Waterfront City'), href: '/projects/sharjah/sharjah-waterfront-city/n-a/sharjah-waterfront-city' },
                        { label: t('Deem at Hayyan'), href: '/projects/sharjah/al-bedea-suburb/al-bedea-suburb/deem-at-hayyan' },
                        { label: t('Olfah'), href: '/projects/sharjah/muwaileh-commercial/muwaileh-commercial/olfah-3' },
                        { label: t('Hayyan'), href: '/projects/sharjah/ain-al-fayda/barashi/hayyan' },
                        { label: t('Hamsa 2'), href: '/projects/sharjah/muwaileh-commercial/muwaileh-commercial/hamsa-2' },
                    ]
                },
                {
                    title: t('Ras Al Khaima'),
                    link: "/rak",
                    items: [
                        { label: t('Solera'), href: '/projects/ras-al-khaimah/mina-al-arab/mina-al-arab/solera' },
                        { label: t('Nikki-Beach-Residences'), href: '/projects/ras-al-khaimah/al-marjan-island/n-a/nikki-beach-residences' },
                    ]
                },
            ]
        },
        {
            label: t('properties'),
            image: '/images/properties-featured.webp',
            columns: [
                {
                    title: t('Residential'),
                    items: [
                        { label: t('Buy Apartments'), href: '/units?category=Sale&propertyType=411' },
                        { label: t('Buy Villas'), href: '/units?category=Sale&propertyType=413' },
                        { label: t('Rent Apartments'), href: '/units?category=Rent&propertyType=411' },
                        { label: t('Rent Villas'), href: '/units?category=Rent&propertyType=413' },
                    ]
                },
                {
                    title: t('Commercial'),
                    items: [
                        { label: t('Offices for Sale'), href: '/units?category=Sale&propertyType=417' },
                        { label: t('Offices for Rent'), href: '/units?category=Rent&propertyType=417' },
                        { label: t('Commercial plot'), href: 'units?category=Sale&propertyType=420' },
                        { label: t('View All'), href: '/units?category=Sale' },
                    ]
                },
                {
                    title: t('Bedrooms'),
                    items: [
                        { label: t('1 Bedroom'), href: '/units?category=Sale&beds=1' },
                        { label: t('2 Bedrooms'), href: '/units?category=Sale&beds=2' },
                        { label: t('3 Bedrooms'), href: '/units?category=Sale&beds=3' },
                        { label: t('View All'), href: '/units?category=Sale' },
                    ]
                }
            ]
        },
        {
            label: t('projects'),
            image: '/images/landing-page/manarat-living-saadiyat/manarat-living.webp',
            columns: [
                {
                    title: t('Abu Dhabi'),
                    link: "/",
                    items: [
                        { label: t("Al Reem Island"), href: "/projects/abu-dhabi/al-reem-island" },
                        { label: t("Saadiyat Island"), href: "/projects/abu-dhabi/saadiyat-island" },
                        { label: t("Yas island"), href: "/projects/abu-dhabi/yas-island" },
                        { label: t("Al Raha Beach"), href: "/projects/abu-dhabi/al-raha-beach" },
                        { label: t("Al Raha Gardens"), href: "/projects/abu-dhabi/al-raha-gardens" },
                        { label: t("View All"), href: "/projects/abu-dhabi" },
                    ]
                },
                {
                    title: t('Dubai'),
                    link: "/dubai",
                    items: [
                        { label: t("Palm Jumeirah"), href: "/projects/dubai/the-palm-jumeirah" },
                        { label: t("Downtown Dubai"), href: "/projects/dubai/downtown-dubai" },
                        { label: t("Dubai Creek"), href: "/projects/dubai/dubai-creek" },
                        { label: t("Town Square Dubai"), href: "/projects/dubai/town-square-dubai" },
                        { label: t("Dubai Hills Estate"), href: "/projects/dubai/dubai-hills-estate" },
                        { label: t("View All"), href: "/projects/dubai" },
                    ]
                },
                {
                    title: t('developers'),
                    link: "/developers",
                    items: [
                        { label: t('Aldar'), href: "/developer/aldar-properties-pjsc" },
                        { label: t('Emaar'), href: "/developer/emaar" },
                        { label: t('Imkan'), href: '/developer/imkan-properties-llc' },
                        { label: t('Meraas'), href: '/developer/meraas' },
                        { label: t('Dubai Properties'), href: '/developer/dubai-properties---idama' },
                        { label: t('NSHAMA'), href: '/developer/nshama' },
                    ]
                }
            ]
        },
        {
            label: t('services'),
            image: '/assets/images/about-us/main-office.webp',
            columns: [
                {
                    title: t('Valuation & Finance'),
                    items: [
                        { label: t('mortgage'), href: "/mortgage-calculator" },
                        { label: t('Amortization'), page: '/mortgage-calculator#amortization' },
                        { label: t('Refinancing'), page: '/mortgage-calculator#refinancing' },
                        { label: t('Rent vs Buying'), page: '/mortgage-calculator#rentvsbuy' },
                        { label: t('House Affordability'), page: '/mortgage-calculator#houseafford' },
                    ]
                },
                {
                    title: t('Client Services'),
                    items: [
                        { label: t('list'), href: '/list-your-property/' },
                        { label: t('international'), href: '/international' },
                        { label: t('youngsters program'), href: '/psi-youngsters-program' },
                        { label: t('luxury'), href: '/project/luxury-project-uae/' },
                        { label: t('emirati-hub'), href: '/project/emirati-hub' }
                    ]
                }
            ]
        },
        {
            label: t('company'),
            image: '/images/psi-office-featured.webp',
            columns: [
                {
                    title: t('About PSI'),
                    link: "/about-us",
                    items: [
                        { label: t('Our Story'), href: "/about-us" },
                        { label: t('careers'), href: "/careers" },
                        { label: t('Awards'), href: "/about-us#awards" },
                        { label: t('Blog'), href: "/blog" },
                    ]
                },
                {
                    title: t('Media'),
                    items: [
                        { label: t('newsletters'), href: "/newsletter" },
                        { label: t('contact'), href: "/contact-us" },
                        { label: t('articles'), href: "/articles" },
                    ]
                }
            ]
        }
    ];


    const { user, login, logout, favorites, compareList } = useUser();

    const modalHandler = () => {
        setModal(true);
        console.log('clicked = ' + modal);
    };

    const modalUpdate = (state: boolean) => {
        console.log(state);
        setModal(state);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
            if (currMenuRef.current && !currMenuRef.current.contains(event.target as Node)) {
                setIsCurrMenuOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    // Determine if the current page has a dark hero section where the navbar should start transparent with white text

    const darkHeroBasePaths = ['/en', '/ar', '/ru', '/du', '/cn'];

    // Add dynamic job pages pattern
    const isDarkHeroPage =
        darkHeroBasePaths.includes(pathname) ||
        /^\/[a-z]{2}\/careers\/jobs\/[^/]+$/.test(pathname); // Matches /en/careers/jobs/:slug

    const pages = ['/about-us', '/crypto', '/careers'];
    const isTargetPage = pages.some(page => pathname.endsWith(page)) || /^\/projects\/[^/]+\/[^/]+\/[^/]+$/.test(pathname);


    const showWhiteTheme = (isDarkHeroPage || isTargetPage) && !isScrolled && !hoveredMenu;

    const navbarClasses = showWhiteTheme
        ? 'bg-transparent py-6 text-white transition-all duration-300'
        : 'bg-white/80 backdrop-blur-xl shadow-sm py-4 border-b border-white/20 text-gray-900 transition-all duration-300';

    const mainLogo = showWhiteTheme ? '/logo-psi-white.svg' : '/PSI-Logo.svg';
    const linkColor = showWhiteTheme ? 'text-white' : 'text-gray-800';

    return (
        <header className="bg-transparent">
            {/* Top Bar */}
            {/* <div className="grid grid-cols-3 gap-4 bg-indigo-950 hidden md:grid px-5">
            <div className="grid grid-cols-3">
                {callsToAction2.map((item) => (
                    <Link href={item.href} key={item.name} title={item.name} className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
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
                    <Link target="_blank" href={item.href} key={item.name} title={item.name} aria-label={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                    <DynamicIcon name={item.icon} size={20} />
                    </Link>
                ))}
                <LanguageSwitcher />
            </div>
        </div> */}
            {/* Main Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-70 transition-all duration-500 ease-in-out ${navbarClasses}`} onMouseLeave={() => setHoveredMenu(null)}>
                <div className="container mx-auto flex justify-between items-center relative px-5 md:px-0">
                    {/* LOGO */}
                    <Link className="flex items-center cursor-pointer group" href="/" title="Property Shop Investment">
                        <span className="sr-only">Property Shop Investment</span>
                        <Image
                            alt="PSI"
                            title="PSI"
                            src={mainLogo}
                            className="h-15 w-auto"
                            width={200}
                            height={200}
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-10 rtl:space-x-reverse h-full">
                        {NAV_GROUPS.map((group) => (
                            <div
                                key={group.label}
                                className="h-full flex items-center py-2"
                                onMouseEnter={() => setHoveredMenu(group.label)}
                            >
                                <button className={`text-sm font-bold tracking-widest uppercase hover:text-secondary transition-colors flex items-center gap-1 ${linkColor}`}
                                >
                                    {group.label.toLowerCase()}
                                    <ChevronDown size={10} className={`transform transition-transform duration-300 ${hoveredMenu === group.label ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className={`hidden lg:flex items-center gap-6 ${linkColor}`}>
                        <button onClick={modalHandler} aria-label='search' role="presentation" tabIndex={-1}
                            className="hover:text-secondary transition-colors cursor-pointer"><Search size={20} /></button>
                        <Link href="/favorites" title="Favorites" className="hover:text-secondary transition-colors relative cursor-pointer">
                            <Heart size={20} />
                            {favorites.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
                        </Link>
                        <div className="h-4 w-px bg-current opacity-30"></div>
                        {user ? (
                            <div className="relative" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                                <button className="text-xs font-bold uppercase hover:text-secondary flex items-center gap-2 py-2">
                                    <UserIcon size={16} /> {user.displayName || 'User'}
                                </button>
                                {/* User Dropdown */}
                                <div className={`absolute top-full right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden transition-all duration-200 z-50 ${userMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                                    <ul className="py-2">
                                        <li>
                                            <Link href="/profile" title="Profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                                {t("profile")}
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => { logout(); setUserMenuOpen(false); }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                {t("logout")}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <button onClick={login} className="text-xs font-bold uppercase hover:text-secondary flex items-center gap-2">
                                <UserIcon size={16} /> {t("login")}
                            </button>
                        )}
                        <LanguageSwitcher css={linkColor} />
                        <BranchSwitcher css={linkColor} />
                    </div>

                    {/* Mobile Menu Button */}
                    <button aria-label='mobile menu'
                        className="lg:hidden p-2 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* SLEEK MEGA MENU (Transparent Glass) - Desktop Only */}
                <div
                    className={`absolute top-full left-0 w-full bg-white backdrop-blur-2xl border-t border-white/20 shadow-xl transition-all duration-300 ease-out overflow-hidden hidden lg:block ${hoveredMenu ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
                    onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                    onMouseLeave={() => setHoveredMenu(null)}
                >
                    <div className="container mx-auto px-12 py-8">
                        {NAV_GROUPS.map((group) => (
                            <div key={group.label} className={`${hoveredMenu === group.label ? 'block' : 'hidden'} animate-[fadeIn_0.3s_ease-out]`}>
                                <div className="flex gap-12">

                                    {/* Left: Elegant Featured Card */}
                                    <div className="w-1/4 hidden xl:block">
                                        <div className="rounded-lg h-64 overflow-hidden relative cursor-pointer group/promo">
                                            <img src={group.image}
                                                title={`${group.label} featured image`}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-110" alt="Promo" />
                                            <div className="absolute inset-0 bg-black/30 group-hover/promo:bg-black/20 transition-colors"></div>
                                            <div className="absolute bottom-6 left-6 text-white">
                                                <span className="text-[10px] font-bold uppercase tracking-widest bg-secondary px-2 py-1 rounded mb-2 inline-block">{t('Featured')}</span>
                                                <h4 className="font-serif font-bold text-2xl">{group.label}</h4>
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase mt-2 opacity-0 group-hover/promo:opacity-100 transition-opacity transform translate-y-2 group-hover/promo:translate-y-0">
                                                    {t('Explore')} <ArrowRight size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Clean Link Columns */}
                                    <div className="flex-1 grid grid-cols-3 gap-8">
                                        {group.columns.map((col, idx) => (
                                            <div key={idx}>
                                                {"link" in col && col.link ? (
                                                    <Link href={col.link} title={col.title}>
                                                        <h4 className="font-bold text-sm uppercase tracking-widest mb-4 border-b border-gray-400/20 pb-2
                                                    relative text-gray-700 transition-all duration-300
   bg-gradient-to-r from-[#0c1356] to-[#0c1356] bg-[length:0%_2px] bg-left-bottom bg-no-repeat
   hover:bg-[length:100%_2px] hover:text-[#0c1356]">{col.title}</h4>
                                                    </Link>
                                                ) : (
                                                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-4 border-b border-gray-400/20 pb-2">{col.title}</h4>
                                                )}

                                                <ul className="space-y-3">
                                                    {col.items.map((item, i) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={`${resolveHref(item as any)}`}
                                                                title={item.label}
                                                                className="text-gray-600 hover:text-secondary text-sm font-medium transition-colors hover:pl-1 rtl:hover:pr-1"
                                                                onClick={() => setHoveredMenu(null)} // closes menu after click
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </nav>

            {/* Mobile Menu */}
            <Dialog
                as="div"
                className="lg:hidden"
                open={isMobileMenuOpen}
                onClose={setIsMobileMenuOpen}
            >
                <div className="fixed inset-0 z-50 bg-gray-900/20 backdrop-blur-sm" />
                <DialogPanel className="fixed inset-y-0 right-0 z-99 w-full overflow-y-auto bg-white/95 backdrop-blur-xl px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transition-transform duration-500 ease-in-out">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                        <Link href="/" className="-m-1.5 p-1.5" title="Property Shop Investment">
                            <span className="sr-only">Property Shop Investment</span>
                            <Image height={200} width={200} className="h-15 w-auto" src="/PSI-Logo.svg" alt="Logo" />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {/* Dynamic Mobile Menu Groups */}
                                {NAV_GROUPS.map((group) => (
                                    <Disclosure as="div" className="-mx-3" key={group.label}>
                                        {({ open }) => (
                                            <>
                                                <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-3 pl-3 pr-3.5 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50 transition-colors">
                                                    {t(group.label.toLowerCase())}
                                                    <ChevronDownIcon
                                                        className={classNames(
                                                            open ? 'rotate-180' : '',
                                                            'h-5 w-5 flex-none text-gray-400 transition-transform duration-300'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </DisclosureButton>
                                                <DisclosurePanel className="mt-2 space-y-4 pl-4 border-l-2 border-gray-100 ml-3">
                                                    {group.columns.map((col, idx) => (
                                                        <div key={idx} className="pb-2">
                                                            <h5 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2 px-3">{col.title}</h5>
                                                            {col.items.map((item, i) => (
                                                                <Link
                                                                    key={i}
                                                                    href={resolveHref(item as any)}
                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                    className="block rounded-lg py-2 pl-3 pr-3 text-sm font-semibold leading-7 text-gray-600 hover:text-[#111954] hover:bg-gray-50 transition-all"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </DisclosurePanel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div>

                            {/* Mobile Utility Links */}
                            <div className="py-6 space-y-4">
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        modalHandler();
                                    }}
                                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                >
                                    <Search size={18} /> Search Projects
                                </button>

                                <div className="-mx-3 px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2">
                                    <LanguageSwitcher css={linkColor} />
                                    <BranchSwitcher css={linkColor} />
                                </div>

                                {user ? (
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        Log out
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (login) login();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <UserIcon size={18} /> Log in
                                    </button>
                                )}
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
                <Link href={href} title={title}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

export default Navigation;