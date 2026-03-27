'use client'

import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";
import { Building2, ArrowRight } from "lucide-react";
import slugify from 'react-slugify';
import { Link } from '@/i18n/navigation';

const AboutDeveloper = (props: {
    masterDeveloper: string;
    developerDescription: string;
    propid?: string;
    propname?: string;
    viewAllLink?: string;
}) => {
    const router = useRouter();
    const t = useTranslations('ProjectPage');

    const devSlug = slugify(props.masterDeveloper || '');
    const defaultLink = `/developer/${devSlug}`;
    const linkHref = props.viewAllLink || defaultLink;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-gray-700/50 transition-all duration-300 hover:shadow-2xl group/devcard">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

                {/* Developer Icon / Logo Placeholder */}
                <div className="hidden md:flex flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-primary/5 dark:bg-white/5 rounded-2xl items-center justify-center text-primary dark:text-gray-300 group-hover/devcard:-translate-y-1 transition-transform duration-300">
                    <Building2 size={40} strokeWidth={1.5} />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 md:hidden text-primary dark:text-gray-300">
                        <div className="w-12 h-12 bg-primary/5 dark:bg-white/5 rounded-xl flex items-center justify-center">
                            <Building2 size={24} />
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-wider text-secondary dark:text-gray-400">
                            {t('developer')}
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <span className="text-sm font-semibold uppercase tracking-wider text-secondary dark:text-gray-400 mb-1 block">
                            {t('developer')}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {props.masterDeveloper}
                    </h2>

                    <div className="prose prose-sm md:prose-base dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none leading-relaxed">
                        <p>{props.developerDescription}</p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <Link
                            href={linkHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-secondary text-white dark:bg-white dark:text-primary dark:hover:bg-gray-100 font-semibold rounded-xl transition-all duration-200 group shadow-lg shadow-secondary/20 hover:shadow-primary/30"
                        >
                            View All Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutDeveloper;