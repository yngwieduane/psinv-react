'use client'
import React, { useState, useEffect, useRef,ChangeEvent, useTransition } from 'react';
import { Menu, X, Phone, Search, ChevronDown, Heart, Shuffle, User as UserIcon, Globe, ArrowRight, Coins } from 'lucide-react';

import { useTranslation, Language, Currency } from '@/context/translationContext';
import { useUser } from '@/context/userContext';
import { Page } from '@/types/types';
import Image from 'next/image';
import { Link, useRouter } from '@/i18n/navigation';
import {Locale,routing} from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ar', label: 'العربية', flag: 'https://flagcdn.com/w40/ae.png' },
  { code: 'ru', label: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'cn', label: '中文', flag: 'https://flagcdn.com/w40/cn.png' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
//   { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
//   { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
//   { code: 'tr', label: 'Türkçe', flag: 'https://flagcdn.com/w40/tr.png' },
//   { code: 'it', label: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
];

const CURRENCIES: Currency[] = ['AED', 'USD', 'EUR', 'GBP', 'RUB', 'CNY'];

// Simplified Mega Menu Structure
const NAV_GROUPS = [
    {
        label: 'Featured',
        image: 'https://psinv.net/assets/img/landing-page/reem-hills-villa-reem-island/main-img-1.webp?ver=2',
        columns: [
            {
                title: 'Abu Dhabi',
                items: [
                    { label: 'Reem Hills', page: 'reem-hills' },
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
                    { label: 'Aldar Properties', page: 'developers' },
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
                    { label: 'Mortgage Calculator', page: 'mortgage-calculator' },
                    { label: 'Villa Cost Calculator', page: 'villa-calculator' },
                    { label: 'Property Valuation', page: 'list-property' },
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
                    { label: 'Our Story', page: 'about' },
                    { label: 'Careers', page: 'careers' },
                    { label: 'Awards', page: 'about' },
                    { label: 'Our Agents', page: 'agents' }, // Added Agent Link
                ]
            },
            {
                title: 'Media',
                items: [
                    { label: 'Market Insights', page: 'articles' },
                    { label: 'Newsletters', page: 'newsletters' },
                    { label: 'Contact Us', page: 'contact' },
                ]
            }
        ]
    }
];

const NavigationAI: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isCurrMenuOpen, setIsCurrMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
  
  // Mobile Menu States
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState<'currency' | 'language' | null>(null);
  
  const { language, setLanguage, currency, setCurrency, dir } = useTranslation();
  const { user, login, logout, favorites, compareList } = useUser();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const currMenuRef = useRef<HTMLDivElement>(null);

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
  const isDarkHeroPage = ['home', 'newsletters'].includes(currentPage);

  // Updated transparency: Clear at top, frosted glass on scroll
  const navbarClasses = isScrolled || hoveredMenu
    ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4 border-b border-white/20' 
    : 'bg-transparent py-6';
    
  const linkColor = (isScrolled || hoveredMenu || !isDarkHeroPage) ? 'text-gray-800' : 'text-white';
  const logoColor = (isScrolled || hoveredMenu || !isDarkHeroPage) ? '' : 'brightness-0 invert';
  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const handleNavClick = (e: React.MouseEvent, page: any) => {
    e.preventDefault();
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
    window.scrollTo(0, 0);
  };


    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale;
        startTransition(() => {
        router.replace(
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            {pathname, params},
            {locale: nextLocale}
        );
        });
    }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navbarClasses}`} dir={dir} onMouseLeave={() => setHoveredMenu(null)}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* LOGO */}
          <Link className="flex items-center cursor-pointer group z-50" href="/">
             <span className="sr-only">Property Shop Investment</span>
            <Image
                alt="PSI"
                title="PSI"
                src="/PSI-Logo.svg"
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
                <button 
                  className={`text-sm font-bold tracking-widest uppercase hover:text-secondary transition-colors flex items-center gap-1 ${linkColor}`}
                >
                  {t(`${group.label.toLowerCase()}`)}
                  <ChevronDown size={10} className={`transform transition-transform duration-300 ${hoveredMenu === group.label ? 'rotate-180' : ''}`}/>
                </button>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className={`hidden lg:flex items-center gap-6 ${linkColor}`}>
             <button onClick={() => onNavigate('search')} className="hover:text-secondary transition-colors"><Search size={20} /></button>
             <button onClick={() => onNavigate('favorites')} className="hover:text-secondary transition-colors relative">
                <Heart size={20} />
                {favorites.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
             </button>
             <div className="h-4 w-px bg-current opacity-30"></div>
             {user ? (
                 <button onClick={logout} className="text-xs font-bold uppercase hover:text-secondary">Logout</button>
             ) : (
                 <button onClick={login} className="text-xs font-bold uppercase hover:text-secondary flex items-center gap-2">
                    <UserIcon size={16} /> Login
                 </button>
             )}
             
             {/* Currency Selector */}
             <div className="relative" ref={currMenuRef}>
                <button 
                    onClick={() => setIsCurrMenuOpen(!isCurrMenuOpen)}
                    className="flex items-center gap-1 hover:text-secondary transition-colors text-xs font-bold uppercase"
                >
                    <span>{currency}</span>
                    <ChevronDown size={10} className={`transform transition-transform ${isCurrMenuOpen ? 'rotate-180' : ''}`}/>
                </button>
                {isCurrMenuOpen && (
                    <div className={`absolute top-full mt-2 w-24 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 overflow-hidden z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                        {CURRENCIES.map(curr => (
                            <button
                                key={curr}
                                onClick={() => {
                                    setCurrency(curr);
                                    setIsCurrMenuOpen(false);
                                }}
                                className={`w-full text-left rtl:text-right px-5 py-2 text-xs font-bold hover:bg-gray-100 transition-colors ${currency === curr ? 'text-gray-800 bg-blue-50/50' : 'text-gray-400'}`}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>
                )}
             </div>

             {/* Language Selector */}
             <div className="relative" ref={langMenuRef}>
                <button 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="flex items-center gap-2 hover:text-secondary transition-colors text-xs font-bold uppercase"
                >
                    <Globe size={16} /> {language.toUpperCase()}
                </button>
                {isLangMenuOpen && (
                    <div className={`absolute top-full mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 overflow-hidden z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
                    
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsLangMenuOpen(false);
                                }}
                                className={`w-full text-left rtl:text-right px-5 py-3 text-xs font-bold flex items-center gap-3 hover:bg-gray-100 transition-colors cursor-pointer ${language === lang.code ? 'text-gray-800 bg-blue-50/50' : 'text-gray-400'}`}
                            >
                                <img src={lang.flag} alt={lang.label} className="w-5 h-3.5 object-cover rounded-[2px]" />
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </div>
                )}
             </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className={linkColor} size={28} /> : <Menu className={linkColor} size={28} />}
          </button>
      </div>

      {/* SLEEK MEGA MENU (Transparent Glass) - Desktop Only */}
      <div 
        className={`absolute top-full left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-white/20 shadow-xl transition-all duration-300 ease-out overflow-hidden hidden lg:block ${hoveredMenu ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}
        onMouseEnter={() => setHoveredMenu(hoveredMenu)} 
        onMouseLeave={() => setHoveredMenu(null)}
      >
         <div className="container mx-auto px-12 py-8">
            {NAV_GROUPS.map((group) => (
               <div key={group.label} className={`${hoveredMenu === group.label ? 'block' : 'hidden'} animate-[fadeIn_0.3s_ease-out]`}>
                  <div className="flex gap-12">
                      
                      {/* Left: Elegant Featured Card */}
                      <div className="w-1/4 hidden xl:block">
                          <div className="rounded-lg h-64 overflow-hidden relative cursor-pointer group/promo" onClick={() => onNavigate('search')}>
                              <img src={group.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-110" alt="Promo"/>
                              <div className="absolute inset-0 bg-black/30 group-hover/promo:bg-black/20 transition-colors"></div>
                              <div className="absolute bottom-6 left-6 text-white">
                                  <span className="text-[10px] font-bold uppercase tracking-widest bg-secondary px-2 py-1 rounded mb-2 inline-block">Featured</span>
                                  <h4 className="font-serif font-bold text-2xl">{group.label}</h4>
                                  <div className="flex items-center gap-2 text-xs font-bold uppercase mt-2 opacity-0 group-hover/promo:opacity-100 transition-opacity transform translate-y-2 group-hover/promo:translate-y-0">
                                      Explore <ArrowRight size={12} />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Right: Clean Link Columns */}
                      <div className="flex-1 grid grid-cols-3 gap-8">
                          {group.columns.map((col, idx) => (
                              <div key={idx}>
                                  <h4 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-4 border-b border-gray-400/20 pb-2">{col.title}</h4>
                                  <ul className="space-y-3">
                                      {col.items.map((item, i) => (
                                          <li key={i}>
                                              <button 
                                                onClick={(e) => handleNavClick(e, item.page)}
                                                className="text-gray-600 hover:text-secondary text-sm font-medium transition-colors hover:pl-1 rtl:hover:pr-1"
                                              >
                                                  {item.label}
                                              </button>
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

      {/* Mobile Menu - Full Screen Dark Glass Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200 lg:hidden">
           <div className="p-6">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <h2 className="text-3xl font-serif font-bold text-white">PSI.</h2>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white hover:text-secondary transition-colors p-2"
                  >
                    <X size={32} />
                  </button>
              </div>

              {/* Navigation Accordion */}
              <div className="space-y-4">
                {NAV_GROUPS.map((group) => (
                  <div key={group.label} className="border-b border-white/10 last:border-0 pb-2">
                    <button
                      onClick={() => setExpandedMobileMenu(expandedMobileMenu === group.label ? null : group.label)}
                      className="flex justify-between items-center w-full py-3 text-left font-bold text-xl text-white"
                    >
                      {group.label}
                      <ChevronDown size={20} className={`transition-transform duration-300 ${expandedMobileMenu === group.label ? 'rotate-180 text-secondary' : 'text-gray-400'}`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMobileMenu === group.label ? 'max-h-[1000px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                       <div className="pl-4 space-y-6 pt-2">
                          {group.columns.map((col, idx) => (
                             <div key={idx}>
                                <p className="text-xs font-bold text-secondary uppercase mb-3 tracking-wider">{col.title}</p>
                                <div className="space-y-3 border-l-2 border-white/10 pl-4">
                                   {col.items.map((item, i) => (
                                      <button 
                                         key={i} 
                                         onClick={(e) => handleNavClick(e, item.page)} 
                                         className="block text-base text-gray-300 hover:text-white w-full text-left py-1"
                                      >
                                         {item.label}
                                      </button>
                                   ))}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Settings Section (Dropdowns) */}
              <div className="mt-10 pt-8 border-t border-white/10 space-y-4 mb-20">
                  
                  {/* Currency Dropdown */}
                  <div className="border border-white/20 rounded-lg overflow-hidden">
                      <button 
                          onClick={() => setMobileSettingsOpen(mobileSettingsOpen === 'currency' ? null : 'currency')}
                          className="w-full flex justify-between items-center px-4 py-3 bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                      >
                          <span className="flex items-center gap-2"><Coins size={16} className="text-gray-400"/> {currency}</span>
                          <ChevronDown size={14} className={`transition-transform ${mobileSettingsOpen === 'currency' ? 'rotate-180' : ''}`}/>
                      </button>
                      {mobileSettingsOpen === 'currency' && (
                          <div className="bg-black/20 p-2 grid grid-cols-3 gap-2 border-t border-white/10">
                              {CURRENCIES.map(curr => (
                                  <button
                                      key={curr}
                                      onClick={() => {
                                          setCurrency(curr);
                                          setIsCurrMenuOpen(false);
                                      }}
                                      className={`py-2 text-xs font-bold rounded ${currency === curr ? 'bg-secondary text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                  >
                                      {curr}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>

                  {/* Language Dropdown */}
                  <div className="border border-white/20 rounded-lg overflow-hidden">
                      <button 
                          onClick={() => setMobileSettingsOpen(mobileSettingsOpen === 'language' ? null : 'language')}
                          className="w-full flex justify-between items-center px-4 py-3 bg-white/5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                      >
                          <span className="flex items-center gap-2"><Globe size={16} className="text-gray-400"/> {currentLangObj?.label}</span>
                          <ChevronDown size={14} className={`transition-transform ${mobileSettingsOpen === 'language' ? 'rotate-180' : ''}`}/>
                      </button>
                      {mobileSettingsOpen === 'language' && (
                          <div className="bg-black/20 p-2 space-y-1 border-t border-white/10 max-h-48 overflow-y-auto">
                              {LANGUAGES.map(lang => (
                                  <button
                                      key={lang.code}
                                      onClick={() => { setLanguage(lang.code); setMobileSettingsOpen(null); }}
                                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded ${language === lang.code ? 'bg-secondary text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                                  >
                                      <img src={lang.flag} className="w-5 h-3.5 object-cover rounded-[2px]" />
                                      {lang.label}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>

                  <button onClick={login} className="w-full bg-white text-primary hover:bg-gray-100 py-3 rounded-lg font-bold shadow-lg mt-4 transition-colors">
                      Login / Sign Up
                  </button>
              </div>
           </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationAI;
