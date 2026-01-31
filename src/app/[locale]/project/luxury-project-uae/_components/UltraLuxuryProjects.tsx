import { Montserrat, Parisienne } from "next/font/google"
import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";
import UltraLuxuryProjectsSlider from "./UltraLuxuryProjectsSlider";
import { faFlag, faLocationDot, faTag } from "@fortawesome/free-solid-svg-icons";

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',
});
const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

interface Props {
    onAction: (data?: LuxuryProjectsData) => void;
    data: any[];
    loadingStatus: boolean;
}

const UltraLuxuryProjectsData = [
    {
        proj_name: 'Hudayriyat Island',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7 after:w-full  
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Hudayriyat</span>
            {' '}
            Island
        </>),
        proj_location: 'Abu Dhabi',
        content: (
            <>
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">A vibrant waterfront destination that offers various leisure and entertainment facilities, including cycling tracks, watersports activities, dining options, and outdoor spaces for relaxation and socializing.</p>
                <p className="mb-5 md:text-lg text-md md:text-start text-center">It is a popular destination for residents and visitors seeking outdoor recreation and community events.</p>
            </>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/hudayriyat-island.jpg',
        starting_price: '+ 41,000,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '1 - 2', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Villas', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Free Hold', value: 'For all', FaIcon: faFlag },
            { label: 'Handover', value: '2017', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Location', value: 'Abu Dhabi', FaIcon: faLocationDot },
            { label: 'Downpayment', value: '10%', FaIcon: faTag },
        ],
        brochure: '/assets/images/luxury-project-uae/brochures/hudayriyat-island-brochure.pdf',
    },
    {
        proj_name: 'Saadiyat Island Grove',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                md:after:h-[30px] md:after:top-7 after:w-full  
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Saadiyat Island</span>
            {' '}
            Grove
        </>),
        proj_location: 'Abu Dhabi',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">Aldar's Saadiyat Grove, nestled in Saadiyat Island's Cultural District, transforms into a vibrant mixed-use community. Offering residential spaces, retail options, and cutting-edge facilities, it boasts gyms, children's play areas, a community garden, and running tracks.</p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/saadiyat-island-grove.webp',
        starting_price: '2,300,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: 'Studio, 1 - 2', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Apartments, Penthouses', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q1 2025 (Phase 1)', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Location', value: 'Saadiyat Island, Abu Dhabi', FaIcon: faLocationDot },
            { label: 'Downpayment', value: '10%', FaIcon: faTag },
        ],
        brochure: '',

    },
    {
        proj_name: 'Bugatti Residences',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                md:after:h-[30px] md:after:top-7 after:w-full  
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Bugatti</span>
            {' '}
            Residences
        </>),
        proj_location: 'Dubai',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                Indulge in an exclusive residential haven by BinGhatti, blending French Riviera charm and Bugatti allure. Redefining luxury, this unique tower offers unparalleled style, cutting-edge amenities, and spacious interiors with stunning Dubai skyline views.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/bugatti-residences.webp',
        starting_price: '19,000,000',
        price_unit: 'AED',
        facts: [
            { label: 'Sky Mansions', value: '2 - 4 Bedroom', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Sky Penthouses', value: '5 Bedroom', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Mansions, Penthouses', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q2 2026', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Location', value: 'Business Bay, Dubai', FaIcon: faLocationDot },
            { label: 'Downpayment', value: '25%', FaIcon: faTag },
        ],
        brochure: '',

    },
    {
        proj_name: 'Reem Hills Villas',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7 after:w-full 
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Reem Hills</span>
            {' '}
            Villas
        </>),
        proj_location: 'Abu Dhabi',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                This gated community by Q Properties harmoniously blends living, working, and leisure elements in Abu Dhabi. Offering diverse residential options, well-crafted public spaces, retail facilities, and premium amenities for a balanced lifestyle.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/reem-hills.webp',
        starting_price: '1,500,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '5 - 7', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Villas, Townhouses', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q3 2025', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Downpayment', value: '10%', FaIcon: faTag },
        ],
        brochure: '/assets/images/luxury-project-uae/brochures/reem-hills-brochure.pdf',

    },
    {
        proj_name: 'Tilal Al Ghaf',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7 after:w-full 
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Tilal Al</span>
            {' '}
            Ghaf
        </>),
        proj_location: 'Abu Dhabi',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                Experience vibrant community living at Tilal Al Ghaf's amara. Developed by Majid Al Futtaim, you can escape to a luxurious haven surrounded by lush landscapes, resort-style amenities, diverse entertainment options, and more.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/tilal-al-ghaf.webp',
        starting_price: '10,500,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '4 - 6', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Townhouses', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q1 2022', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Downpayment', value: '10%', FaIcon: faTag },
        ],
        brochure: '',

    },
    {
        proj_name: 'Golf Places Terraces At Dubai Hills',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7  after:w-full 
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>Golf Places Terraces At</span>
            {' '}
            Dubai Hills
        </>),
        proj_location: 'Dubai',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                Experience luxury community living at Golf Places Terraces, nestled in Dubai Hills' scenic landscape. Enjoy a lifestyle of convenience and leisure with convenient access to Dubai Hills Park, Golf Club House, and Dubai Hills Mall.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/golf-places.webp',
        starting_price: '15,000,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '4 - 6', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Villas', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q1 2022 (Phase 1)', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Downpayment', value: '20%', FaIcon: faTag },
        ],
        brochure: '',

    },
    {
        proj_name: 'District One West',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7  after:w-full 
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>District One</span>
            {' '}
            West
        </>),
        proj_location: 'Abu Dhabi',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                Discover District One West by Nakheel, a prestigious gated community where nature and innovative design unite. Embrace waterfront living, lush greenery, and serene atmospheres, with easy access to city landmarks and leisure destinations.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/district-one-west.webp',
        starting_price: '11,000,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '4 - 6', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Villas', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'Q1 2027 (Phase 1)', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Downpayment', value: '20%', FaIcon: faTag },
        ],
        brochure: '',

    },
    {
        proj_name: 'La Mer Masion',
        title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                md:after:h-[30px] md:after:top-7  after:w-full 
                lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>La Mer</span>
            {' '}
            Masion
        </>),
        proj_location: 'Dubai',
        content: (
            <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                Immerse yourself in elevated private island living at the exclusive La Mer Maisons by Merass community. Enjoy stunning sea views, world-class amenities, unrivaled exclusivity, and easy access to Jumeirah’s popular attractions.
            </p>
        ),
        image: '/assets/images/luxury-project-uae/ultra-luxury-projects/la-mer-mansion.webp',
        starting_price: '35,000,000',
        price_unit: 'AED',
        facts: [
            { label: 'Bedroom', value: '4', icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
            { label: 'Type', value: 'Land Plots', icon: '/assets/images/luxury-project-uae/icons/home.svg' },
            { label: 'Handover', value: 'To be announced', icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
            { label: 'Downpayment', value: '10%', FaIcon: faTag },
        ],
        brochure: '',

    }
]

export default function UltraLuxuryProjects({ onAction, data, loadingStatus }: Props) {

    const handlePropDataToSend = (propData?: LuxuryProjectsData) => {
        onAction(propData);
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto relative z-10 text-white px-4 ">
                <div className={`absolute md:-top-32 -top-10 md:left-auto left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                ${montserratBolder.className} text-[#fff] opacity-10`}>03</div>
                <h2 className="lg:ml-20 sm-ml-0 ml-10 text-sm md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] mb-5 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start">
                    <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>Ultra luxury Project
                </h2>
                <UltraLuxuryProjectsSlider data={data} slides={UltraLuxuryProjectsData} onAction={handlePropDataToSend} />
            </div>
        </>
    )
}