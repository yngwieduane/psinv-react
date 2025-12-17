'use client'
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { PROPERTIES } from '@/constants/main';

export type Language = 'en' | 'ar' | 'ru' | 'cn' | 'fr' | 'de' | 'tr' | 'it' | 'es';
export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'RUB' | 'CNY';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string, fallback?: string) => string;
  transliterate: (text: string) => string;
  formatPrice: (priceAED: number) => string;
  dir: 'ltr' | 'rtl';
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const RATES: Record<Currency, number> = {
    AED: 1,
    USD: 0.27,
    EUR: 0.25,
    GBP: 0.21,
    RUB: 25.0,
    CNY: 1.96
};

const SYMBOLS: Record<Currency, string> = {
    AED: 'AED',
    USD: '$',
    EUR: '€',
    GBP: '£',
    RUB: '₽',
    CNY: '¥'
};

const EN_DICTIONARY: Record<string, string> = {
    'nav.buy': 'Buy',
    'nav.rent': 'Rent',
    'nav.communities': 'Communities',
    'nav.about': 'About Us',
    'nav.careers': 'Careers',
    'nav.list': 'List Your Property',
    'nav.contact': 'Contact Us',
    'nav.developers': 'Developers',
    'nav.featured': 'Featured Projects',
    'nav.more': 'More',
    'nav.mortgage': 'Mortgage Calculator',
    'nav.luxury': 'Luxury Projects',
    'nav.properties': 'Properties',
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.company': 'Company',
    'nav.insights': 'Insights',
    'nav.psi emirati hub': 'PSI Emirati Hub',
    'nav.youngsters program': 'Youngsters Program',
    'nav.invest in uae': 'Invest in UAE',
    'nav.villa calculator': 'Villa Calculator',
    'nav.newsletters': 'Newsletters',
    'nav.articles': 'Articles',
    'nav.property management': 'Property Management',
    
    'auth.login': 'Log in with Google',
    'auth.logout': 'Logout',
    'auth.favorites': 'Favorites',
    'auth.compare': 'Compare',
    'auth.welcome': 'Welcome',
    'auth.empty_fav': 'Your favorites list is empty.',
    'auth.empty_compare': 'Your comparison list is empty.',
    'auth.login_req': 'Please login to save favorites.',

    'btn.search': 'Search',
    'btn.preview': 'Preview',
    'btn.inquire': 'Inquire',
    'btn.whatsapp': 'WhatsApp',
    'btn.details': 'Unit Details',
    'btn.call': 'Call Now',
    'btn.view_map': 'View Map',
    'btn.download_profile': 'Download Company Profile',
    'btn.discover_hub': 'Discover PSI Emirati Hub',
    'btn.download_report': 'Download Now',
    'btn.signup': 'Sign up',
    'btn.submit_request': 'Submit Request',
    'btn.next_step': 'Next Step',
    'btn.join': 'Join',
    'btn.load_more': 'Load More Projects',
    'btn.view_project': 'View Project',
    'btn.download_brochure': 'Download Brochure',
    'btn.gallery': 'Gallery',
    'btn.compare': 'Compare',
    'btn.list': 'List',
    'btn.overview': 'Overview',
    'btn.units': 'Units',
    'btn.floor_plans': 'Floor Plans',
    'btn.location': 'Location',
    'btn.brochure': 'Brochure',
    'btn.save': 'Save',
    'btn.saved': 'Saved',
    'btn.remove': 'Remove',
    'btn.master_plan': 'Master Plan',
    'btn.nearby': 'Nearby',
    'btn.developer': 'Developer',
    'btn.video_tour': 'Video Tour',

    'loc.Abu Dhabi': 'Abu Dhabi',
    'loc.Dubai': 'Dubai',
    'loc.Sharjah': 'Sharjah',
    'loc.Al Ain': 'Al Ain',
    'loc.Ras Al Khaimah': 'Ras Al Khaimah',
    'loc.Al Reem Island': 'Al Reem Island',
    'loc.Yas Island': 'Yas Island',
    'loc.Saadiyat Island': 'Saadiyat Island',
    'loc.Al Raha Beach': 'Al Raha Beach',
    'loc.Dubai Marina': 'Dubai Marina',
    'loc.Downtown Dubai': 'Downtown Dubai',
    'loc.Palm Jumeirah': 'Palm Jumeirah',
    'loc.coming_soon': 'Coming Soon',
    'loc.updating': 'We are currently updating our listings for',

    'lbl.price': 'Price',
    'lbl.beds': 'Beds',
    'lbl.baths': 'Baths',
    'lbl.area': 'Area',
    'lbl.type': 'Type',
    'lbl.location': 'Location',
    'lbl.description': 'Description',
    'lbl.amenities': 'Amenities',
    'lbl.details': 'Property Details',
    'lbl.property_details': 'Property Details',
    'lbl.unit_details': 'Unit Details',
    'lbl.project_facts': 'Project Facts',
    'lbl.status': 'Status',
    'lbl.handover': 'Handover',
    'lbl.developer': 'Developer',
    'lbl.payment_plan': 'Payment Plan',
    'lbl.construction_update': 'Construction Update',
    'lbl.starting_price': 'Starting Price',
    'lbl.available_units': 'Available Units',
    'lbl.for_sale': 'For Sale',
    'lbl.for_rent': 'For Rent',
    'lbl.features': 'Features',
    'lbl.nearby': 'Nearby',
    'lbl.share': 'Share',
    'lbl.print': 'Print',
    'lbl.similar': 'Similar Properties',
    'lbl.latest_projects': 'Latest Projects by',
    'lbl.faqs': 'FAQs',
    'lbl.total_price': 'Total Price',
    'lbl.schedule_viewing': 'Schedule Viewing',
    'lbl.monthly': 'Monthly',
    'lbl.overview': 'Overview',
    'lbl.gallery': 'Gallery',
    'lbl.floor_plans': 'Floor Plans',
    
    // Property Types
    'lbl.apartment': 'Apartment',
    'lbl.villa': 'Villa',
    'lbl.townhouse': 'Townhouse',
    'lbl.penthouse': 'Penthouse',
    'lbl.office': 'Office',
    'lbl.land': 'Land',
    'lbl.studio': 'Studio',
    
    // Project Facts Labels
    'lbl.available_bedrooms': 'Available Bedrooms',
    'lbl.project_name': 'Project Name',
    'lbl.property_type': 'Property Type',
    'lbl.property_unit_type': 'Property Unit Type',
    'lbl.price_from': 'Price From',
    'lbl.launch_date': 'Launch Date',
    'lbl.possession_from': 'Possession From',
    'lbl.property_age': 'Property Age',
    'lbl.area_range': 'Area Range',
    
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.email': 'Email Address',
    'form.phone': 'Phone Number',
    'form.submit': 'Submit',
    'form.schedule': 'Schedule Viewing',
    'form.property_purpose': 'Property Purpose',
    'form.choose_purpose': 'Choose purpose',
    'form.sell': 'Sell',
    'form.rent': 'Rent',
    'form.manage': 'Property Management',
    'form.describe_prop': 'Please describe your property',
    'form.describe_placeholder': 'Provide details about size, location, bedrooms...',
    'form.agreement': 'By clicking Submit, you agree to our Terms & Conditions and Privacy Policy.',
    'form.marketing_consent': 'I agree to receive calls and communications via various channels from PSI.',
    'form.register_interest': 'Register Your Interest',

    'hero.welcome': 'Modon',
    'hero.title': 'Bashayer Residences',
    'hero.desc': 'Situated on Hudayriyat Island, Abu Dhabi, Bashayer Residences is a refined collection of waterfront apartments with modern layouts, elegant finishes, and expansive skyline views.',
    
    'list.brand_trust_title': 'BE with the Brand you Trust',
    'list.brand_trust_desc': 'Where will we list your property?',
    'list.trust_brand_sub': 'Trust the brand that delivers quality, reliability, and meets your needs.',
    'list.why_title': 'Why To List Your Property With US?',
    'list.why_desc': 'We try to make the process of listing and renting/selling your property as simple and easy as possible.',
    'list.benefit_1': 'Choose an experienced Listing agent.',
    'list.benefit_2': 'Discuss the right price of your property.',
    'list.benefit_3': 'Free professional photos & Videos.',
    'list.benefit_4': 'Get your property verified.',
    'list.exclusive_title': 'Property Exclusively Listing',
    'list.where_title': 'Where Will We List Your Property?',

    'search.filters': 'Filters',
    'search.reset': 'Reset',
    'search.find': 'Find',
    'search.results_count': 'Properties for sale',
    'search.sort': 'Sort by',
    'search.featured': 'Featured',
    'search.price_low': 'Price: Low to High',
    'search.price_high': 'Price: High to Low',
    'search.sidebar_title': 'Exclusive Residences',
    'search.sidebar_cta': 'Book now!',
    'search.newest': 'Newest',
    'search.price_asc': 'Price (Low to High)',
    'search.price_desc': 'Price (High to Low)',
    
    'proj.title_search': 'Real Estate Projects in',
    'proj.status_ready': 'Ready',
    'proj.status_offplan': 'Off Plan',
    'proj.types': 'Types',
    'proj.date': 'Handover',
    
    'stats.customers': 'Customers',
    'stats.language': 'Languages',
    'stats.projects': 'Projects',
    'stats.location worldwide': 'Locations Worldwide',
    'stats.years in business': 'Years in Business',
    'stats.branches': 'Branches',
    'stats.expert employees': 'Expert Employees',
    'stats.trusted_partner': 'YOUR TRUSTED Real Estate PARTNER',
    
    'feat.hub_title': 'PSI Emirati Hub',
    'feat.hub_desc': 'Empowering UAE nationals to excel and lead in the real estate sector through',
    'feat.market_insights': 'Market Insights',
    'feat.monthly_report': 'Monthly Report DXB',
    'feat.youngsters': 'Youngsters Program',
    'feat.crypto': 'Crypto',
    'feat.psi_intl': 'PSI International',
    
    'awards.title': 'AWARDS-DRIVEN Excellence',
    'awards.desc': 'We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry.',
    'awards.winner': 'WINNER',
    'awards.top_agency': 'TOP PERFORMING AGENCY',
    
    'testi.title': 'Testimonials',
    
    'app.get_app': 'Get the app',
    'app.title': 'Your Journey Starts Here',
    'app.desc': 'Take control of your real estate journey with our app. Whether you\'re booking a viewing, tracking your property progress, or staying updated on the latest listings, everything you need is at your fingertips.',
    'app.cta_title': 'Start your journey today',
    'app.cta_sub': 'with just one tap.',
    'app.available': 'Available on App Store and Google Play',

    'footer.brand_desc': 'Property Shop Investment is the leading real estate agency in Abu Dhabi, helping you find your perfect home since 2007.',
    'footer.company': 'Company',
    'footer.services': 'Services',
    'footer.popular_areas': 'Popular Areas',
    'footer.get_in_touch': 'Get in Touch',
    'footer.newsletter': 'Newsletter',
    'footer.rights': 'All Rights Reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.sitemap': 'Sitemap',
    'footer.cookies': 'Cookies Policy',
    'footer.links.about': 'About PSI',
    'footer.links.team': 'Our Team',
    'footer.links.careers': 'Careers',
    'footer.links.awards': 'Awards & Recognition',
    'footer.links.media': 'Media Center',
    'footer.links.testi': 'Testimonials',
    'footer.links.intl': 'PSI International',
    'footer.links.buy': 'Buy a Property',
    'footer.links.rent': 'Rent a Property',
    'footer.links.list': 'List Your Property',
    'footer.links.manage': 'Property Management',
    'footer.links.mortgage': 'Mortgage Services',
    'footer.links.offplan': 'Off-Plan Projects',
    'footer.links.reports': 'Market Reports',
    
    'about.title': 'About Us',
    'about.subtitle': 'Home > About Us',
    'about.intro_title': 'About Property Shop Investment',
    'about.chairman_msg': 'Chairman Message',
    'about.core_values': 'Our Core Values',
    'about.services': 'Our Services',
    'about.partners': 'Partners',
    'about.locations': 'Our Locations',

    'careers.title': 'Careers',
    'careers.unlock': 'Unlock Your Professional Growth',
    'careers.journey': 'A Rewarding Career Journey',
    'careers.social': 'Social Media',

    // Calculator Pages
    'calc.title': 'Mortgage Calculator',
    'calc.tab_mortgage': 'Mortgage',
    'calc.tab_affordability': 'Affordability',
    'calc.tab_rentvsbuy': 'Rent vs Buy',
    'calc.down_payment': 'Down Payment',
    'calc.interest': 'Interest Rate',
    'calc.tenure': 'Tenure',
    'calc.years': 'Years',
    'calc.income': 'Total Income',
    'calc.expenses': 'Monthly Expenses',
    'calc.rent': 'Current Monthly Rent',
    'calc.duration': 'Duration',
    'calc.breakdown': 'Payment Breakdown',
    'calc.principal': 'Principal Amount',
    'calc.max_loan': 'Max Loan Amount',
    'calc.afford_desc': 'Based on a 50% Debt-to-Income ratio.',
    'calc.comparison': '5 Year Comparison',
    'calc.why_important': 'Why is a Mortgage Calculator Important?',
    'calc.why_desc': 'A mortgage calculator helps you estimate your monthly payments, ensuring you can afford your dream home without financial strain. It provides clarity on how different interest rates and down payments affect your loan.',
    'calc.benefits': 'Benefits of Calculating Before Buying',
    'calc.benefits_desc': 'Calculating beforehand helps you set a realistic budget, understand the long-term cost of borrowing, and compare different loan offers to find the best deal for your financial situation.',
    
    'calc.interest_rates': 'Understanding Interest Rates',
    'calc.interest_rates_desc': 'Interest rates directly impact your monthly payments. A lower rate can save you significant amounts over the loan tenure. It\'s crucial to monitor market trends and lock in a rate when it\'s favorable.',
    'calc.fees': 'Additional Fees & Charges',
    'calc.fees_desc': 'Remember to account for extra costs such as property registration fees (like DLD in Dubai), agency fees, and bank processing charges. These can add 5-7% to your upfront costs.',
    'calc.fixed_var': 'Fixed vs. Variable Rates',
    'calc.fixed_var_desc': 'Fixed rates offer stability with consistent payments, while variable rates might start lower but can fluctuate. Choose based on your risk tolerance and how long you plan to keep the property.',
    'calc.preapproval': 'Power of Pre-approval',
    'calc.preapproval_desc': 'Getting pre-approved gives you a clear budget and makes you a serious buyer in the eyes of sellers. It speeds up the buying process significantly once you find your dream home.',
};

const AR_DICTIONARY: Record<string, string> = {
    ...EN_DICTIONARY,
    'nav.buy': 'شراء',
    'nav.rent': 'إيجار',
    'nav.communities': 'المجتمعات',
    'nav.about': 'معلومات عنا',
    'nav.careers': 'وظائف',
    'nav.list': 'اعرض عقارك',
    'nav.contact': 'اتصل بنا',
    'nav.developers': 'المطورين',
    'nav.featured': 'مشاريع مميزة',
    'nav.more': 'المزيد',
    'nav.mortgage': 'حاسبة الرهن العقاري',
    'nav.luxury': 'مشاريع فاخرة',
    'nav.properties': 'العقارات',
    'nav.projects': 'المشاريع',
    'nav.services': 'الخدمات',
    'nav.company': 'الشركة',
    'nav.insights': 'رؤى',
    'nav.psi emirati hub': 'مركز PSI الإماراتي',
    'nav.youngsters program': 'برنامج الشباب',
    'nav.invest in uae': 'استثمر في الإمارات',
    'nav.villa calculator': 'حاسبة الفلل',
    'nav.newsletters': 'النشرات الإخبارية',
    'nav.articles': 'مقالات',
    'nav.property management': 'إدارة الممتلكات',

    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'auth.favorites': 'المفضلة',
    'auth.compare': 'مقارنة',
    'auth.welcome': 'أهلاً',
    'auth.empty_fav': 'قائمة المفضلة فارغة.',
    'auth.empty_compare': 'قائمة المقارنة فارغة.',
    'auth.login_req': 'يرجى تسجيل الدخول لحفظ المفضلة.',

    'btn.search': 'بحث',
    'btn.preview': 'معاينة',
    'btn.inquire': 'استفسار',
    'btn.details': 'تفاصيل الوحدة',
    'btn.call': 'اتصل الآن',
    'btn.signup': 'سجل الآن',
    'btn.submit_request': 'ارسال الطلب',
    'btn.next_step': 'الخطوة التالية',
    'btn.join': 'اشترك',
    'btn.discover_hub': 'اكتشف مركز PSI الإماراتي',
    'btn.download_report': 'حمل التقرير',
    'btn.load_more': 'تحميل المزيد من المشاريع',
    'btn.view_project': 'عرض المشروع',
    'btn.download_brochure': 'تحميل الكتيب',
    'btn.gallery': 'المعرض',
    'btn.compare': 'مقارنة',
    'btn.list': 'قائمة',
    'btn.overview': 'نظرة عامة',
    'btn.units': 'الوحدات',
    'btn.floor_plans': 'المخططات',
    'btn.location': 'الموقع',
    'btn.brochure': 'الكتيب',
    'btn.save': 'حفظ',
    'btn.saved': 'محفوظ',
    'btn.remove': 'إزالة',
    'btn.view_map': 'عرض الخريطة',
    'btn.master_plan': 'المخطط الرئيسي',
    'btn.nearby': 'بالقرب من',
    'btn.developer': 'المطور',
    'btn.video_tour': 'جولة فيديو',

    'loc.Abu Dhabi': 'أبو ظبي',
    'loc.Dubai': 'دبي',
    'loc.Sharjah': 'الشارقة',
    'loc.Al Ain': 'العين',
    'loc.Ras Al Khaimah': 'رأس الخيمة',
    'loc.Al Reem Island': 'جزيرة الريم',
    'loc.Yas Island': 'جزيرة ياس',
    'loc.Saadiyat Island': 'جزيرة السعديات',
    'loc.Al Raha Beach': 'شاطئ الراحة',
    'loc.Dubai Marina': 'دبي مارينا',
    'loc.Downtown Dubai': 'وسط مدينة دبي',
    'loc.Palm Jumeirah': 'نخلة جميرا',
    'loc.coming_soon': 'قريباً',
    'loc.updating': 'نقوم حالياً بتحديث قوائمنا لـ',

    'lbl.price': 'السعر',
    'lbl.beds': 'غرف النوم',
    'lbl.baths': 'الحمامات',
    'lbl.area': 'المساحة',
    'lbl.type': 'النوع',
    'lbl.location': 'الموقع',
    'lbl.description': 'الوصف',
    'lbl.amenities': 'المرافق',
    'lbl.details': 'تفاصيل العقار',
    'lbl.property_details': 'تفاصيل العقار',
    'lbl.unit_details': 'تفاصيل الوحدة',
    'lbl.project_facts': 'حقائق المشروع',
    'lbl.status': 'الحالة',
    'lbl.handover': 'التسليم',
    'lbl.developer': 'المطور',
    'lbl.payment_plan': 'خطة الدفع',
    'lbl.construction_update': 'تحديثات البناء',
    'lbl.starting_price': 'سعر يبدأ من',
    'lbl.available_units': 'الوحدات المتاحة',
    'lbl.for_sale': 'للبيع',
    'lbl.for_rent': 'للإيجار',
    'lbl.features': 'المميزات',
    'lbl.nearby': 'بالقرب من',
    'lbl.share': 'مشاركة',
    'lbl.print': 'طباعة',
    'lbl.similar': 'عقارات مشابهة',
    'lbl.latest_projects': 'أحدث المشاريع من',
    'lbl.faqs': 'الأسئلة الشائعة',
    'lbl.total_price': 'السعر الإجمالي',
    'lbl.schedule_viewing': 'حجز موعد معاينة',
    'lbl.monthly': 'شهرياً',
    'lbl.overview': 'نظرة عامة',
    'lbl.gallery': 'المعرض',
    'lbl.floor_plans': 'المخططات',
    
    // Property Types
    'lbl.apartment': 'شقة',
    'lbl.villa': 'فيلا',
    'lbl.townhouse': 'تاون هاوس',
    'lbl.penthouse': 'بنتهاوس',
    'lbl.office': 'مكتب',
    'lbl.land': 'أرض',
    'lbl.studio': 'استوديو',
    
    // Project Facts
    'lbl.available_bedrooms': 'غرف النوم المتاحة',
    'lbl.project_name': 'اسم المشروع',
    'lbl.property_type': 'نوع العقار',
    'lbl.property_unit_type': 'نوع الوحدة العقارية',
    'lbl.price_from': 'السعر من',
    'lbl.launch_date': 'تاريخ الإطلاق',
    'lbl.possession_from': 'التسليم من',
    'lbl.property_age': 'عمر العقار',
    'lbl.area_range': 'نطاق المساحة',

    'form.firstName': 'الاسم الأول',
    'form.lastName': 'اسم العائلة',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.submit': 'إرسال',
    'form.property_purpose': 'غرض العقار',
    'form.choose_purpose': 'اختر الغرض',
    'form.sell': 'بيع',
    'form.rent': 'تأجير',
    'form.manage': 'إدارة ممتلكات',
    'form.describe_prop': 'يرجى وصف عقارك',
    'form.describe_placeholder': 'قدم تفاصيل حول المساحة، الموقع، عدد الغرف...',
    'form.agreement': 'بالنقر على إرسال، فإنك توافق على الشروط والأحكام وسياسة الخصوصية.',
    'form.marketing_consent': 'أوافق على تلقي مكالمات ورسائل عبر قنوات مختلفة من PSI.',
    'form.register_interest': 'سجل اهتمامك',

    'hero.welcome': 'مدن',
    'hero.title': 'بشاير ريزيدنس',
    'hero.desc': 'تقع بشاير ريزيدنس في جزيرة الحديريات، أبو ظبي، وهي مجموعة راقية من الشقق الواجهة البحرية بتصاميم حديثة، وتشطيبات أنيقة، وإطلالات واسعة على الأفق.',

    'search.filters': 'تصفية',
    'search.reset': 'إعادة تعيين',
    'search.find': 'بحث',
    'search.results_count': 'عقار للبيع',
    'search.sort': 'ترتيب حسب',
    'search.featured': 'متميز',
    'search.price_low': 'السعر: من الأقل للأعلى',
    'search.price_high': 'السعر: من الأعلى للأقل',
    'search.sidebar_title': 'مساكن حصرية',
    'search.sidebar_cta': 'احجز الآن!',
    'search.newest': 'الأحدث',
    'search.price_asc': 'السعر (من الأقل إلى الأعلى)',
    'search.price_desc': 'السعر (من الأعلى إلى الأقل)',

    'proj.title_search': 'مشاريع عقارية في',
    'proj.status_ready': 'جاهز',
    'proj.status_offplan': 'قيد الإنشاء',
    'proj.types': 'الأنواع',
    'proj.date': 'التسليم',

    'stats.customers': 'عميل',
    'stats.language': 'لغات',
    'stats.projects': 'مشروع',
    'stats.location worldwide': 'موقع حول العالم',
    'stats.years in business': 'سنوات من الخبرة',
    'stats.branches': 'فروع',
    'stats.expert employees': 'موظف خبير',
    'stats.trusted_partner': 'شريكك العقاري الموثوق',

    'feat.hub_title': 'مركز PSI الإماراتي',
    'feat.hub_desc': 'تمكين مواطني دولة الإمارات من التفوق والقيادة في القطاع العقاري من خلال',
    'feat.market_insights': 'رؤى السوق',
    'feat.monthly_report': 'التقرير الشهري دبي',
    'feat.youngsters': 'برنامج الشباب',
    
    'awards.title': 'التميز المدفوع بالجوائز',
    'awards.desc': 'نؤكد التزامنا بإعادة تعريف معايير العقارات. تفانينا في الابتكار والتركيز المستمر على العملاء أكسبنا تقديراً في الصناعة.',

    'testi.title': 'آراء العملاء',

    'app.get_app': 'احصل على التطبيق',
    'app.title': 'رحلتك تبدأ هنا',
    'app.desc': 'تحكم في رحلتك العقارية مع تطبيقنا. سواء كنت تحجز موعداً للمعاينة، أو تتابع تقدم عقارك، أو تبقى على اطلاع بأحدث القوائم، كل ما تحتاجه في متناول يدك.',
    'app.cta_title': 'ابدأ رحلتك اليوم',
    'app.cta_sub': 'بلمسة واحدة فقط.',
    'app.available': 'متوفر على متجر التطبيقات وجوجل بلاي',

    'footer.brand_desc': 'بروبيرتي شوب للاستثمار هي وكالة العقارات الرائدة في أبو ظبي، تساعدك في العثور على منزلك المثالي منذ عام 2007.',
    'footer.company': 'الشركة',
    'footer.services': 'الخدمات',
    'footer.popular_areas': 'المناطق الأكثر طلباً',
    'footer.get_in_touch': 'تواصل معنا',
    'footer.newsletter': 'النشرة الإخبارية',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.sitemap': 'خريطة الموقع',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.links.about': 'عن PSI',
    'footer.links.team': 'فريقنا',
    'footer.links.careers': 'وظائف',
    'footer.links.awards': 'الجوائز والتقدير',
    'footer.links.media': 'المركز الإعلامي',
    'footer.links.testi': 'الشهادات',
    'footer.links.intl': 'PSI العالمية',
    'footer.links.buy': 'شراء عقار',
    'footer.links.rent': 'استئجار عقار',
    'footer.links.list': 'اعرض عقارك',
    'footer.links.manage': 'إدارة ممتلكات',
    'footer.links.mortgage': 'خدمات الرهن العقاري',
    'footer.links.offplan': 'مشاريع قيد الإنشاء',
    'footer.links.reports': 'تقارير السوق',

    'calc.title': 'حاسبة الرهن العقاري',
    'calc.tab_mortgage': 'الرهن العقاري',
    'calc.tab_affordability': 'القدرة الشرائية',
    'calc.tab_rentvsbuy': 'إيجار مقابل شراء',
    'calc.down_payment': 'الدفعة الأولى',
    'calc.interest': 'معدل الفائدة',
    'calc.tenure': 'المدة',
    'calc.years': 'سنوات',
    'calc.income': 'الدخل الإجمالي',
    'calc.expenses': 'المصاريف الشهرية',
    'calc.rent': 'الإيجار الشهري الحالي',
    'calc.duration': 'المدة',
    'calc.breakdown': 'تفاصيل الدفع',
    'calc.principal': 'المبلغ الأساسي',
    'calc.max_loan': 'الحد الأقصى للقرض',
    'calc.afford_desc': 'بناءً على نسبة دين إلى دخل 50%.',
    'calc.comparison': 'مقارنة 5 سنوات',
    'calc.why_important': 'لماذا حاسبة الرهن العقاري مهمة؟',
    'calc.why_desc': 'تساعدك حاسبة الرهن العقاري على تقدير مدفوعاتك الشهرية، مما يضمن قدرتك على تحمل تكاليف منزل أحلامك دون ضغوط مالية.',
    'calc.benefits': 'فوائد الحساب قبل الشراء',
    'calc.benefits_desc': 'يساعدك الحساب مسبقاً على وضع ميزانية واقعية، وفهم التكلفة طويلة المدى للاقتراض، ومقارنة عروض القروض المختلفة.',
};

const RU_NAMES: Record<string, string> = {
    'Pixel': 'Пиксель',
    'Apartment': 'Апартаменты',
};

const AR_NAMES: Record<string, string> = {
    'Pixel': 'بيكسل',
    'Parkside Residence A': 'باركسيد ريزيدنس أ',
    'Al Maryah Vista 2': 'المارية فيستا 2',
    'Radiant Square': 'راديانت سكوير',
    'Radiant Boulevard': 'راديانت بوليفارد',
    'Sky Tower': 'سكاي تاور',
    'Rivage': 'ريفاج',
    'Addax Port': 'ميناء أداكس',
    'The Gate Tower': 'برج البوابة',
    'The Gate Tower 3': 'برج البوابة 3',
    'The Gate Tower 2': 'برج البوابة 2',
    'Muheira at Maysan': 'محيرة في ميسان',
    'Al Reem Island': 'جزيرة الريم',
    'Al Maryah Island': 'جزيرة المارية',
    'Saadiyat Island': 'جزيرة السعديات',
    'Mamsha Al Saadiyat': 'ممشى السعديات',
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('AED');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const dictionary = language === 'ar' ? AR_DICTIONARY : EN_DICTIONARY;

  const t = (key: string, fallback?: string) => {
    // If the key is technical (e.g., 'nav.buy'), try to find it. 
    // If not found, prioritize the fallback (which is usually the label itself) over the raw key.
    const translation = dictionary[key];
    if (translation) return translation;
    return fallback || key;
  };

  const transliterate = (text: string) => {
    if (language !== 'ar') return text;
    // Simple mock transliteration/translation for dynamic content
    let translated = text;
    Object.keys(AR_NAMES).forEach(eng => {
        translated = translated.replace(eng, AR_NAMES[eng]);
    });
    return translated;
  };

  const formatPrice = (priceAED: number) => {
    const rate = RATES[currency];
    const converted = priceAED * rate;
    const symbol = SYMBOLS[currency];
    return `${symbol} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <TranslationContext.Provider value={{ 
      language, setLanguage, 
      currency, setCurrency, 
      t, 
      transliterate, 
      formatPrice,
      dir: language === 'ar' ? 'rtl' : 'ltr'
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
