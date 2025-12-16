
import { NavItem, PropertyCategory, StatItem, Testimonial, FAQ, Property, Project, Developer, Agent } from '@/types/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Buy', page: 'search', href: '#' },
  { label: 'Rent', page: 'search', href: '#' },
  { label: 'Communities', page: 'home', href: '#communities' },
  { label: 'About Us', page: 'about' },
  { label: 'Careers', page: 'careers' },
  { label: 'List Your Property', page: 'list-property' },
];

export const LOCATIONS = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Al Ain', 'Ras Al Khaimah'];

export const AGENTS: Agent[] = [
  {
    id: 'ag1',
    name: 'Sarah Johnson',
    role: 'Senior Property Consultant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    languages: ['English', 'Arabic'],
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567',
    email: 'sarah.j@psi.properties',
    brn: '48291',
    experience: '8 Years',
    description: 'Sarah is a dedicated property consultant specializing in luxury apartments in Al Reem Island and Saadiyat. With over 8 years of experience in the Abu Dhabi market, she helps clients find their perfect investment or home with ease and transparency.',
    activeListings: 12,
    location: 'Abu Dhabi'
  },
  {
    id: 'ag2',
    name: 'Mohammed Al Fayed',
    role: 'Sales Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    languages: ['Arabic', 'English', 'French'],
    phone: '+971 52 987 6543',
    whatsapp: '+971 52 987 6543',
    email: 'm.fayed@psi.properties',
    brn: '33102',
    experience: '12 Years',
    description: 'Mohammed leads our sales team with a focus on off-plan projects and high-value investments. His deep understanding of market trends and developer relationships ensures his clients get the best deals available.',
    activeListings: 24,
    location: 'Dubai'
  },
  {
    id: 'ag3',
    name: 'Elena Petrova',
    role: 'Property Consultant',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    languages: ['English', 'Russian'],
    phone: '+971 55 555 1212',
    whatsapp: '+971 55 555 1212',
    email: 'elena.p@psi.properties',
    brn: '51023',
    experience: '4 Years',
    description: 'Elena specializes in waterfront properties and holiday homes. She is known for her patience and attention to detail, making the buying process smooth for international investors.',
    activeListings: 8,
    location: 'Dubai'
  },
  {
    id: 'ag4',
    name: 'David Chen',
    role: 'Commercial Specialist',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    languages: ['English', 'Mandarin', 'Cantonese'],
    phone: '+971 56 777 8888',
    whatsapp: '+971 56 777 8888',
    email: 'david.c@psi.properties',
    brn: '44521',
    experience: '6 Years',
    description: 'David is our go-to expert for commercial real estate, including offices, retail spaces, and warehouses. He assists businesses in finding the strategic locations that drive growth.',
    activeListings: 15,
    location: 'Abu Dhabi'
  },
  {
    id: 'ag5',
    name: 'Omar Khalid',
    role: 'Leasing Manager',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    languages: ['Arabic', 'English'],
    phone: '+971 50 222 3333',
    whatsapp: '+971 50 222 3333',
    email: 'omar.k@psi.properties',
    brn: '39201',
    experience: '9 Years',
    description: 'Omar manages our leasing portfolio across Yas Island and Al Raha Beach. He is committed to finding tenants their ideal rental homes and ensuring landlords receive top-tier management services.',
    activeListings: 30,
    location: 'Abu Dhabi'
  },
  {
    id: 'ag6',
    name: 'Jessica Smith',
    role: 'Luxury Property Advisor',
    image: 'https://images.unsplash.com/photo-1598550832205-d8b552729474?q=80&w=400&auto=format&fit=crop',
    languages: ['English', 'Spanish'],
    phone: '+971 54 111 2222',
    whatsapp: '+971 54 111 2222',
    email: 'jessica.s@psi.properties',
    brn: '55672',
    experience: '5 Years',
    description: 'Jessica focuses on ultra-luxury villas and penthouses. Her discrete and professional approach makes her a favorite among high-net-worth individuals seeking exclusive properties.',
    activeListings: 7,
    location: 'Dubai'
  },
  {
    id: 'ag7',
    name: 'Ahmed Hassan',
    role: 'Investment Consultant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    languages: ['Arabic', 'English', 'Urdu'],
    phone: '+971 58 999 0000',
    whatsapp: '+971 58 999 0000',
    email: 'ahmed.h@psi.properties',
    brn: '41123',
    experience: '7 Years',
    description: 'Ahmed has a knack for identifying high-ROI investment opportunities. He works closely with investors to build robust real estate portfolios across the UAE.',
    activeListings: 18,
    location: 'Sharjah'
  },
  {
    id: 'ag8',
    name: 'Maria Gonzalez',
    role: 'Senior Agent',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&auto=format&fit=crop',
    languages: ['English', 'Portuguese', 'Italian'],
    phone: '+971 52 444 5555',
    whatsapp: '+971 52 444 5555',
    email: 'maria.g@psi.properties',
    brn: '49882',
    experience: '6 Years',
    description: 'Maria brings international expertise to the local market. She specializes in downtown apartments and has a strong track record of successful negotiations.',
    activeListings: 10,
    location: 'Dubai'
  }
];

export const DEVELOPERS: Developer[] = [
    { id: 'dev_aldar', name: 'Aldar Properties', logo: 'https://picsum.photos/seed/logo_aldar/200/100' },
    { id: 'dev_emaar', name: 'Emaar Properties', logo: 'https://picsum.photos/seed/logo_emaar/200/100' },
    { id: 'dev_imkan', name: 'Imkan', logo: 'https://picsum.photos/seed/logo_imkan/200/100' },
    { id: 'dev_meraas', name: 'Meraas', logo: 'https://picsum.photos/seed/logo_meraas/200/100' },
    { id: 'dev_damac', name: 'Damac Properties', logo: 'https://picsum.photos/seed/logo_damac/200/100' },
    { id: 'dev_sobha', name: 'Sobha Realty', logo: 'https://picsum.photos/seed/logo_sobha/200/100' },
    { id: 'dev_nshama', name: 'Nshama', logo: 'https://picsum.photos/seed/logo_nshama/200/100' },
    { id: 'dev_bloom', name: 'Bloom Holding', logo: 'https://picsum.photos/seed/logo_bloom/200/100' },
];

export const FEATURED_COMMUNITIES: PropertyCategory[] = [
  // Abu Dhabi
  { id: '1', name: 'Al Reem Island', image: 'https://picsum.photos/seed/reem/600/800', count: 'APT | VI | TH | PH', location: 'Abu Dhabi' },
  { id: '2', name: 'Saadiyat Island', image: 'https://picsum.photos/seed/saadiyat/600/800', count: 'APT | VI | TH | PH', location: 'Abu Dhabi' },
  { id: '3', name: 'Yas Island', image: 'https://picsum.photos/seed/yas/600/800', count: 'APT | VI | TH | PH', location: 'Abu Dhabi' },
  { id: '4', name: 'Al Raha Beach', image: 'https://picsum.photos/seed/raha/600/800', count: 'APT | VI | TH | PH', location: 'Abu Dhabi' },
  
  // Dubai
  { id: '5', name: 'Palm Jumeirah', image: 'https://picsum.photos/seed/palm/600/800', count: 'APT | VI | TH', location: 'Dubai' },
  { id: '6', name: 'Downtown Dubai', image: 'https://picsum.photos/seed/downtown/600/800', count: 'APT | PH', location: 'Dubai' },
  { id: '7', name: 'Dubai Marina', image: 'https://picsum.photos/seed/marina/600/800', count: 'APT | PH', location: 'Dubai' },
  { id: '8', name: 'Business Bay', image: 'https://picsum.photos/seed/business/600/800', count: 'APT | OFF', location: 'Dubai' },

  // Sharjah
  { id: '9', name: 'Aljada', image: 'https://picsum.photos/seed/aljada/600/800', count: 'APT | VI', location: 'Sharjah' },
  { id: '10', name: 'Maryam Island', image: 'https://picsum.photos/seed/maryam/600/800', count: 'APT', location: 'Sharjah' },
  { id: '13', name: 'Tilal City', image: 'https://picsum.photos/seed/tilal/600/800', count: 'LAND | VI', location: 'Sharjah' },

  // Al Ain
  { id: '11', name: 'Jebel Hafeet', image: 'https://picsum.photos/seed/jebel/600/800', count: 'VI', location: 'Al Ain' },
  { id: '14', name: 'Al Ain Oasis', image: 'https://picsum.photos/seed/oasis/600/800', count: 'VI | FARM', location: 'Al Ain' },

  // RAK
  { id: '12', name: 'Al Marjan Island', image: 'https://picsum.photos/seed/marjan/600/800', count: 'APT | VI', location: 'Ras Al Khaimah' },
  { id: '15', name: 'Mina Al Arab', image: 'https://picsum.photos/seed/mina/600/800', count: 'VI | TH', location: 'Ras Al Khaimah' },
];

export const STATS: StatItem[] = [
  { value: '103K', label: 'Customers' },
  { value: '10', label: 'Language' },
  { value: '+83', label: 'Projects' },
  { value: '6', label: 'Location Worldwide' },
  { value: '+11', label: 'Years in Business' },
  { value: '8', label: 'Branches' },
  { value: '+485', label: 'Expert Employees' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    role: 'Google',
    text: 'My experience with them was awesome! They really made my home-buying journey smooth and stress-free.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Ahmed Al-Fayed',
    role: 'Google',
    text: 'Hello from Turkey. Lillit took very good care of us and answered all our questions and queries very clearly.',
    rating: 5,
  },
  {
    id: 3,
    author: 'Wissam Atef',
    role: 'Google',
    text: 'It was a good experience, as engineer Wissam Atef provided us with excellent support in all maintenance work. Thank you.',
    rating: 5,
  },
];

export const CORE_VALUES = [
  {
    number: '1',
    title: 'WE GATHER',
    desc: 'Not only a slogan. We gather embodies everything we stand for in our culture, business philosophy and operations.',
  },
  {
    number: '2',
    title: 'NOVELTY',
    desc: 'Devoted to originality in our services, efforts.',
  },
  {
    number: '3',
    title: 'ACCOUNTABILITY',
    desc: 'Ensuring fairness, integrity, honesty, transparency, effectiveness and commitment to responsibility.',
  },
];

export const SERVICES = [
  { icon: 'chart', title: 'SALES', desc: 'Our sales team serves as your trusted guide, simplifying the complex property market.' },
  { icon: 'users', title: 'LANDLORDS', desc: 'Our listing teams, for sales and leasing, strategically maximize property value while prioritizing client confidentiality.' },
  { icon: 'key', title: 'LEASING', desc: 'Our listing teams ensure a robust inventory of property listings across the UAE.' },
  { icon: 'building', title: 'DEVELOPMENT MANAGEMENT', desc: 'PSI builds on best practices and trusted partners to deliver high-quality, innovative developments.' },
  { icon: 'shield', title: 'PROPERTY MANAGEMENT', desc: 'PSI has a centralised property management department that manages residential, commercial, and industrial properties.' },
  { icon: 'megaphone', title: 'MARKETING', desc: 'PSI’s in-house marketing hub offers tailored solutions for client journeys.' },
];

export const LISTING_FAQS: FAQ[] = [
  { question: "What are exclusive Seller's Agency Services?", answer: "Exclusive Seller's Agency Services mean PSI represents you solely in the sale, ensuring your best interests are prioritized, offering dedicated marketing and negotiation support." },
  { question: "What kind of properties qualify for the exclusive listing service?", answer: "We accept a wide range of properties including residential villas, apartments, and commercial spaces. Our team evaluates each property to ensure it meets market standards." },
  { question: "Why should I choose an exclusive agreement?", answer: "An exclusive agreement ensures a dedicated agent works tirelessly for you, providing focused marketing, better control over viewings, and often a faster sale at a better price." },
  { question: "What extra service do I get under an exclusive listing?", answer: "You receive premium marketing placement, professional photography, 360 tours, dedicated agent support, and priority in our buyer network matching." },
];

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'With Balcony – Renovated',
    location: 'Pixel, Al Reem Island',
    community: 'Al Reem Island',
    price: 1800000,
    currency: 'AED',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    area: 802,
    images: [
      'https://picsum.photos/seed/pixel1/1000/600',
      'https://picsum.photos/seed/pixel2/1000/600',
      'https://picsum.photos/seed/pixel3/1000/600',
      'https://picsum.photos/seed/pixel4/1000/600',
      'https://picsum.photos/seed/pixel5/1000/600',
    ],
    refNumber: 'AP44254',
    description: 'A stunning renovated apartment in Pixel, offering modern living spaces, a spacious balcony with community views, and access to premium amenities. Ideal for singles or couples looking for a vibrant lifestyle.',
    amenities: ['Balcony', 'Shared Gym', 'Shared Pool', 'Security', 'Covered Parking'],
    badges: ['Renovated', 'Community View'],
    furnished: 'No',
    view: 'Community View',
    completion: 'Ready',
    coordinates: { lat: 30, lng: 40 }
  },
  {
    id: 'p2',
    title: 'Ready To Move | Amazing Views | Big Layout',
    location: 'Parkside Residence A, Al Reem Island',
    community: 'Al Reem Island',
    price: 2900000,
    currency: 'AED',
    type: 'Apartment',
    beds: 3,
    baths: 3,
    area: 1794,
    images: [
      'https://picsum.photos/seed/parkside1/1000/600',
      'https://picsum.photos/seed/parkside2/1000/600',
    ],
    refNumber: 'AP55123',
    description: 'Spacious 3 bedroom apartment ready to move in. Features amazing views and a big layout perfect for families.',
    amenities: ['Maids Room', 'Central A/C', 'Kitchen Appliances'],
    badges: ['Ready to Move', 'Big Layout'],
    coordinates: { lat: 35, lng: 45 }
  },
  {
    id: 'p3',
    title: 'Al Maryah Vista 2 | Al Maryah Island | Studio | Direct View',
    location: 'Al Maryah Vista 2, Al Maryah Island',
    community: 'Al Maryah Island',
    price: 880000,
    currency: 'AED',
    type: 'Studio',
    beds: 0,
    baths: 1,
    area: 341,
    images: [
      'https://picsum.photos/seed/maryam1/1000/600',
      'https://picsum.photos/seed/maryam2/1000/600',
    ],
    refNumber: 'ST99281',
    description: 'Modern studio with direct views in Al Maryah Vista 2. Excellent investment opportunity.',
    amenities: ['Canal View', 'Retail nearby'],
    coordinates: { lat: 45, lng: 30 }
  },
  {
    id: 'p4',
    title: 'Radiant Square | Al Reem Island | Apartment',
    location: 'Radiant Square, Al Reem Island',
    community: 'Al Reem Island',
    price: 1950000,
    currency: 'AED',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: 782,
    images: [
      'https://picsum.photos/seed/radiant1/1000/600',
      'https://picsum.photos/seed/radiant2/1000/600',
    ],
    refNumber: 'AP77123',
    description: 'Luxury living in Radiant Square. High floor with great views.',
    amenities: ['High Floor', 'Pool', 'Gym'],
    coordinates: { lat: 32, lng: 42 }
  },
  {
    id: 'p5',
    title: 'High Floor | Mangrove View | Prime Location',
    location: 'Radiant Boulevard, Al Reem Island',
    community: 'Al Reem Island',
    price: 2100000,
    currency: 'AED',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: 782,
    images: [
      'https://picsum.photos/seed/mangrove1/1000/600',
    ],
    refNumber: 'AP12345',
    description: 'Prime location with mangrove views. High floor unit.',
    amenities: ['Mangrove View', 'Prime Location'],
    badges: ['Mangrove View'],
    coordinates: { lat: 34, lng: 48 }
  },
  {
    id: 'p6',
    title: 'Sky Tower | Al Reem Island | Apartment | Sea View | Resale',
    location: 'Sky Tower, Al Reem Island',
    community: 'Al Reem Island',
    price: 2400000,
    currency: 'AED',
    type: 'Apartment',
    beds: 2,
    baths: 4,
    area: 1240,
    images: [
      'https://picsum.photos/seed/sky1/1000/600',
    ],
    refNumber: 'AP88219',
    description: 'Iconic Sky Tower apartment with sea views. Resale opportunity.',
    amenities: ['Sea View', 'High Floor'],
    badges: ['Sea View'],
    coordinates: { lat: 28, lng: 44 }
  },
  {
    id: 'p7',
    title: 'Rivage | Al Reem Island | Sea View | Resale',
    location: 'Rivage, Al Reem Island',
    community: 'Al Reem Island',
    price: 1400000,
    currency: 'AED',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    area: 852,
    images: ['https://picsum.photos/seed/rivage1/1000/600'],
    refNumber: 'AP44111',
    description: 'Resale unit in Rivage with sea view.',
    amenities: [],
    coordinates: { lat: 29, lng: 46 }
  },
  {
    id: 'p8',
    title: "Don't miss out on this exclusive listing!!",
    location: 'Addax Port, Al Reem Island',
    community: 'Al Reem Island',
    price: 2400000,
    currency: 'AED',
    type: 'Office',
    beds: 0,
    baths: 1,
    area: 1626,
    images: ['https://picsum.photos/seed/office1/1000/600'],
    refNumber: 'OF33211',
    description: 'Premium office space in Addax Port.',
    amenities: [],
    coordinates: { lat: 31, lng: 41 }
  },
  {
    id: 'p9',
    title: 'High Floor | Amazing View | unique layout | fully Furnished',
    location: 'The Gate Tower 3, Al Reem Island',
    community: 'Al Reem Island',
    price: 1500000,
    currency: 'AED',
    type: 'Apartment',
    beds: 1,
    baths: 2,
    area: 840,
    images: ['https://picsum.photos/seed/gate1/1000/600'],
    refNumber: 'AP11223',
    description: 'Unique layout, fully furnished high floor unit.',
    amenities: ['Furnished'],
    coordinates: { lat: 33, lng: 43 }
  },
  {
    id: 'p10',
    title: 'Mangrove View | High floor | Prime location',
    location: 'Radiant Boulevard, Al Reem Island',
    community: 'Al Reem Island',
    price: 1600000,
    currency: 'AED',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    area: 783,
    images: ['https://picsum.photos/seed/radiantblvd1/1000/600'],
    refNumber: 'AP99887',
    description: 'Prime location apartment.',
    amenities: [],
    coordinates: { lat: 36, lng: 46 }
  },
  {
    id: 'p11',
    title: 'Muheira at Maysan | Al Reem Island | Apartment | Resale',
    location: 'Muheira at Maysan, Al Reem Island',
    community: 'Al Reem Island',
    price: 1450000,
    currency: 'AED',
    type: 'Apartment',
    beds: 1,
    baths: 1,
    area: 797,
    images: ['https://picsum.photos/seed/muheira/1000/600'],
    refNumber: 'AP66554',
    description: 'Resale opportunity in Muheira.',
    amenities: [],
    coordinates: { lat: 38, lng: 40 }
  },
  {
    id: 'p12',
    title: 'Full Sea & Community View | Laundry Room | High Floor',
    location: 'The Gate Tower 2, Al Reem Island',
    community: 'Al Reem Island',
    price: 2600000,
    currency: 'AED',
    type: 'Apartment',
    beds: 3,
    baths: 4,
    area: 1694,
    images: ['https://picsum.photos/seed/gate2/1000/600'],
    refNumber: 'AP22331',
    description: 'Spacious 3 bedroom with laundry room and sea views.',
    amenities: [],
    coordinates: { lat: 33, lng: 44 }
  },
];

