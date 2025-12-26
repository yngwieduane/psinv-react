
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Page } from '@/types/types';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { SocialMedia } from '@/types/navigation';
import { DynamicIcon } from 'lucide-react/dynamic';

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

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const MainFooterAI: React.FC<FooterProps> = ({ onNavigate }) => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations('FooterAI');

  return (
    <footer className="bg-primary-dark text-gray-800 pt-24 pb-12 border-t border-white/5" dir={isRtl ? "rtl" : "ltr"} >
      <div className="container mx-auto px-6 md:px-12"  dir={isRtl ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-20"  dir={isRtl ? "rtl" : "ltr"}>
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-4xl font-serif font-bold mb-8 tracking-wider cursor-pointer">
            <span className="sr-only">Property Shop Investment</span>
            <Image
                alt="PSI"
                title="PSI"
                src="/PSI-Logo.svg"
                className="h-15 w-auto"
                width={200}
                height={200}
            /></Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
              {t('footer_brand_desc')}
            </p>
            <div className="flex space-x-5 rtl:space-x-reverse text-gray-400">
                {socialMedia.map((item) => (
                    <Link target="_blank" href={item.href} key={item.name} title={item.name} aria-label={item.name} className="hover:text-secondary transition-colors">
                    <DynamicIcon name={item.icon} size={20} />
                    </Link>
                ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-8 text-gray-900 border-b border-white/10 pb-3 inline-block">{t('footer_company')}</h3>
            <ul className="space-y-4 text-sm text-gray-800 font-light">
              <li><Link href="/about-us" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all text-left rtl:text-right">{t('footer_links_about')}</Link></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all text-left rtl:text-right">{t('footer_links_team')}</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all text-left rtl:text-right">{t('footer_links_careers')}</button></li>
              <li><Link href="/about-us#awards"  className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all text-left rtl:text-right">{t('footer_links_awards')}</Link></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_media')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_testi')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_intl')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-8 text-gray-900 border-b border-white/10 pb-3 inline-block">{t('footer_services')}</h3>
            <ul className="space-y-4 text-sm text-gray-800 font-light">
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_buy')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_rent')}</a></li>
              <li><button onClick={() => onNavigate('list-property')} className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all text-left rtl:text-right">{t('footer_links_list')}</button></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_manage')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_mortgage')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_offplan')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('footer_links_reports')}</a></li>
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-8 text-gray-900 border-b border-white/10 pb-3 inline-block">{t('footer_popular_areas')}</h3>
            <ul className="space-y-4 text-sm text-gray-800 font-light">
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Al Reem Island')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Yas Island')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Saadiyat Island')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Al Raha Beach')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Dubai Marina')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Downtown Dubai')}</a></li>
              <li><a href="#" className="hover:text-gray-400 hover:pl-2 rtl:hover:pr-2 transition-all">{t('loc_Palm Jumeirah')}</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-base uppercase tracking-wider mb-8 text-gray-900 border-b border-white/10 pb-3 inline-block">{t('footer_get_in_touch')}</h3>
            <ul className="space-y-5 text-sm text-gray-800 mb-10 font-light">
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                <a href='tel:600548200'>
                  <span className="hover:text-gray-400 cursor-pointer transition-colors font-medium" dir="ltr">600 548 200</span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                <a href='tel:+97122052999'>
                  <span className="hover:text-gray-400 cursor-pointer transition-colors font-medium" dir="ltr">+971 2205 2999</span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <span>{t('company_address.part1')}<br />
                {t('company_address.part2')}<br/>
                {t('company_address.part3')}<br/>
                {t('company_address.part4')}</span> 
              </li>
            </ul>

            <h3 className="font-bold text-base uppercase tracking-wider mb-4 text-gray-900">{t('footer_newsletter')}</h3>
            <div className="flex">
              <input type="email" placeholder={t('form_email')} className="bg-white/5 border border-gray-400 outline-none text-white px-4 py-3 rounded-l rtl:rounded-l-none rtl:rounded-r w-full text-sm focus:bg-white/10 transition-colors" />
              <button className="bg-secondary hover:bg-secondary-dark border border-gray-400 text-gray-800 px-6 py-3 rounded-r rtl:rounded-r-none rtl:rounded-l font-bold text-sm transition-colors">{t('btn_join')}</button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-800 font-light">
          <p>&copy; {new Date().getFullYear()} {t('footer_psi')} {t('footer_rights')}</p>
          <div className="flex space-x-8 rtl:space-x-reverse mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">{t('footer_privacy')}</a>
            <a href="#" className="hover:text-gray-400 transition-colors">{t('footer_terms')}</a>
            <button onClick={() => onNavigate('sitemap')} className="hover:text-gray-400 transition-colors">{t('footer_sitemap')}</button>
            <a href="#" className="hover:text-gray-400 transition-colors">{t('footer_cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooterAI;
