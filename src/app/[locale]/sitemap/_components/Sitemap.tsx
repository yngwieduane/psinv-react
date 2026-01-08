import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
    Building2,
    Home,
    Briefcase,
    Users,
    FileText,
    Map,
    Star,
    ArrowRight,
    Globe
} from 'lucide-react';
import { PROJECTS } from "@/utils/projectOverrides";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FooterAI' });

    return {
        title: `${t('footer_sitemap')} - Property Shop Investment`,
        description: 'Explore the site structure of Property Shop Investment. Find links to all our projects, services, and company information.',
    };
}

export default async function Sitemap() {
    const t = await getTranslations('LocaleSwitcher');
    const tFooter = await getTranslations('FooterAI');
    const prettyLabel = (slug: string) =>
        slug
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

    const registrationLinks = Object.keys(PROJECTS)
        .sort()
        .map((slug) => ({
            label: prettyLabel(slug),
            href: `/project/${slug}`,
        }));

    const sections = [
        {
            title: t('featured projects'),
            icon: Star,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            links: [
                { label: t("Sama Yas"), href: "/project/sama-yas" },
                { label: t("Yas Riva"), href: "/project/yas-riva" },
                { label: t("Manarat Living - Saadiyat"), href: "/project/manarat-living-saadiyat" },
                { label: t("The Arthouse"), href: "/project/the-arthouse" },
                { label: t("Bloom Living - Almeria"), href: "/project/bloom-living-almeria" },
            ]
        },
        {
            title: t('properties'),
            icon: Home,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            groups: [
                {
                    subtitle: t('Residential'),
                    links: [
                        { label: t('Buy Apartments'), href: '/units?category=Sale' },
                        { label: t('Buy Villas'), href: '/units?category=Sale' },
                        { label: t('Rent Apartments'), href: '/units?category=Rent' },
                        { label: t('Rent Villas'), href: '/units?category=Rent' },
                    ]
                },
                {
                    subtitle: t('Commercial'),
                    links: [
                        { label: t('Offices for Sale'), href: '/units' },
                        { label: t('Offices for Rent'), href: '/units' },
                        { label: t('Retail Spaces'), href: '/units' },
                    ]
                },
                {
                    subtitle: t('Popular Areas'),
                    links: [
                        { label: t('Al Reem Island'), href: '/projects/abu-dhabi/al-reem-island' },
                        { label: t('Yas Island'), href: '/projects/abu-dhabi/yas-island' },
                        { label: t('Saadiyat Island'), href: '/projects/abu-dhabi/saadiyat-island' },
                        { label: t('Palm Jumeirah'), href: '/projects/dubai/the-palm-jumeirah' },
                    ]
                }
            ]
        },
        {
            title: t('projects'),
            icon: Building2,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            groups: [
                {
                    subtitle: t('New Launches'),
                    links: [
                        { label: t('Luxury Projects'), href: '/project/luxury-project-uae' },
                        { label: t('Projects'), href: '/projects' },
                    ]
                },
                {
                    subtitle: t('developers'),
                    links: [
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
            title: "Registrations",
            icon: Map,                // you already imported Map icon
            color: "text-rose-600",
            bg: "bg-rose-50",
            links: registrationLinks,
        },
        {
            title: t('services'),
            icon: Briefcase,
            color: 'text-green-600',
            bg: 'bg-green-50',
            groups: [
                {
                    subtitle: t('Valuation & Finance'),
                    links: [
                        { label: t('mortgage'), href: "/mortgage-calculator" },
                        { label: t('Property Valuation'), href: "/list-your-property" },
                    ]
                },
                {
                    subtitle: t('Client Services'),
                    links: [
                        { label: t('list'), href: '/list-your-property/' },
                        { label: t('international'), href: '/international' },
                        { label: t('youngsters program'), href: '/psi-youngsters-program' },
                    ]
                }
            ]
        },
        {
            title: t('company'),
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            groups: [
                {
                    subtitle: t('About PSI'),
                    links: [
                        { label: t('Our Story'), href: "/about-us" },
                        { label: t('careers'), href: "/careers" },
                        { label: t('Awards'), href: "/about-us#awards" },
                    ]
                },
                {
                    subtitle: t('Media'),
                    links: [
                        { label: t('newsletters'), href: "/newsletter" },
                        { label: t('contact'), href: "/contact-us" },
                        { label: t('articles'), href: "/articles" },
                    ]
                }
            ]
        },
        {
            title: 'Legal & Utility',
            icon: FileText,
            color: 'text-slate-600',
            bg: 'bg-slate-50',
            links: [
                { label: tFooter('footer_privacy'), href: '/privacy' },
                { label: tFooter('footer_terms'), href: '/terms' },
                { label: tFooter('footer_cookies'), href: '/cookie-policy' },
                { label: tFooter('footer_sitemap'), href: '/sitemap' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        {tFooter('footer_sitemap')}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our comprehensive guide to all pages, projects, and services available on Property Shop Investment.
                    </p>
                </div>

                {/* Sitemap Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-xl ${section.bg} ${section.color} transition-transform group-hover:scale-110 duration-300`}>
                                    <section.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Direct Links */}
                                {section.links && (
                                    <ul className="space-y-3">
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx}>
                                                <Link
                                                    href={link.href}
                                                    className="flex items-center text-gray-600 hover:text-secondary hover:translate-x-1.5 transition-all duration-200 group/link"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-secondary mr-3 transition-colors"></span>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Grouped Links */}
                                {section.groups && section.groups.map((group, groupIdx) => (
                                    <div key={groupIdx}>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">
                                            {group.subtitle}
                                        </h3>
                                        <ul className="space-y-3">
                                            {group.links.map((link, linkIdx) => (
                                                <li key={linkIdx}>
                                                    <Link
                                                        href={link.href}
                                                        className="flex items-center text-gray-600 hover:text-secondary hover:translate-x-1.5 transition-all duration-200 group/link"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/link:bg-secondary mr-3 transition-colors"></span>
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Property Shop Investment. {tFooter('footer_rights')}</p>
                </div>
            </div>
        </div>
    );
}