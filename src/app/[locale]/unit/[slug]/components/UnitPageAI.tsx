'use client'

import dynamic from "next/dynamic";
import SwiperMaterial from "@/app/[locale]/_components/SwiperMaterial";
import StripeContent from "./StripeContent";
import { useState } from "react";
import DrawerDetails from "./DrawerDetails";
import { ReadMore } from "@/app/[locale]/_components/ReadMore";
import { useFormatter } from "next-intl";
import PriceConvert from "@/app/[locale]/_components/tools/PriceConvert";
import NumberConvert from "@/app/[locale]/_components/tools/NumberConvert";
import InquiryForm from "@/app/[locale]/_components/InquiryForm";
import AmenitiesFeatures from "./AmenitiesFeatures";
import FancyboxWrapper from "@/app/[locale]/_components/tools/FancyboxWrapper";
import Sticky from 'react-sticky-el';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import MortgageCalculator from "@/app/[locale]/mortgage-calculator/MortgageCalculator";
import AgentDetails from "./AgentDetails";
import BreadcrumbUnit from "@/app/[locale]/_components/BreadcrumbUnit";
import PaymentPlans from "@/app/[locale]/projects/[city]/[community]/[subcommunity]/[project]/_components/PaymentPlans";
import { Bath, BedDouble, CheckCircle2, Heart, Link2, MapPin, MessageCircle, Phone, Shuffle, Square } from "lucide-react";
import { useUser } from "@/context/userContext";
import AccordionTabs from "@/app/[locale]/_components/tools/AccordionTabs";
import { Link } from "@/i18n/navigation";

const NearbysWithMap = dynamic(() => import('@/app/[locale]/projects/[city]/[community]/[subcommunity]/[project]/_components/NearbyWithMap'));
const SimilarUnitsGrid = dynamic(() => import('./SimilarUnitsGrid'));

export default function UnitPageAI(props: any) {
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const [activeTab, setActiveTab] = useState<'details' | 'description' | 'unit'>('details');
    const drawerHandler = (content: string, valuesarray: any) => (e: any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }

    const format = useFormatter();
    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();

    const TABS = [
        { id: 'details', key: 'lbl.property_details', fallback: 'Property Details' }
        // { id: 'description', key: 'lbl.description', fallback: 'Description' },
        // { id: 'unit', key: 'lbl.unit_details', fallback: 'Unit Details' }
    ];
    const callPhone = process.env.NEXT_PUBLIC_CALLNUMBER_ASSETS as string;
    const whatsappPhone = process.env.NEXT_PUBLIC_WAPPNUMBER_ASSETS as string;

    return (
        <div className="pt-28 md:pt-24 pb-24">
            <div>
                <BreadcrumbUnit data={props.data[0]} />
            </div>
            <div >
                {props.data.map((post: any, index: any) => {
                    let images, price, category, map, video, amenities, facilities, coordinates;
                    const saved = isFavorite(post.code);
                    const compared = isCompared(post.code);
                    {
                        post.imageurl !== null
                            ? images = post.imageurl.split('|')
                            : images = '';
                    }
                    {
                        post.sellprice !== null
                            ? price = post.sellprice
                            : price = post.rent;
                    }
                    {
                        post.sellprice !== null
                            ? category = "Sale"
                            : category = "Rent";
                    }
                    {
                        post.externalUrl_youtube !== null
                            ? video = post.externalUrl_youtube
                            : video = '';
                    }
                    {
                        post.unit_Amenities !== null
                            ? amenities = post.unit_Amenities.split(' | ')
                            : amenities = '';
                    }
                    {
                        post.facilities !== null
                            ? facilities = post.facilities.split(' | ')
                            : facilities = '';
                    }
                    map = post.pro_google_coordinates;
                    {
                        post.pro_google_coordinates !== null
                            ? coordinates = post.pro_google_coordinates.split(",")
                            : coordinates = '';
                    }
                    const faqData = [
                        {
                            title: `What is the price of this property?`,
                            content: `The price starts from AED ${price ? Number(price).toLocaleString() : 'Price on Request'}.`
                        },
                        {
                            title: `Where is ${post.propertyname}, ${post.community} located?`,
                            content: `It is located in ${post.community}, ${post.city || 'Dubai, UAE'}.`
                        },
                        {
                            title: `How many bedrooms and bathrooms does it have?`,
                            content: `This property features ${post.bedrooms} bedrooms and ${post.no_of_bathrooms} bathrooms.`
                        },
                        {
                            title: `What is the built-up area?`,
                            content: `The built-up area is ${Number(post.built_upArea).toLocaleString()} Sq.ft.`
                        },
                        {
                            title: `Who is the developer of this ${post.propertyname}, ${post.community}?`,
                            content: `The developer of this property is ${post.developerName}.`
                        },
                        {
                            title: `What is the status of this property?`,
                            content: `The status of this property is ${post.status}.`
                        }
                    ];
                    return (
                        <div key={index} >
                            <div className="container mx-auto px-4 md:px-12 mt-6 md:mt-10">
                                {/* Title Section */}
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-10 gap-6 md:gap-8">
                                    <div className="w-full">
                                        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-primary mb-2 md:mb-4 leading-tight">{post.marketingTitle}</h1>
                                        <div className="flex items-center text-gray-500 text-sm md:text-base font-medium">
                                            <MapPin size={18} className="text-secondary mr-2 rtl:ml-2" />
                                            {post.community}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 w-full md:w-auto">
                                        {/* Quick Actions */}
                                        <button
                                            onClick={() => toggleFavorite({ id: post.code, type: 'units', data: post })}
                                            className={`cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 transition-colors font-bold ${saved ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'}`}
                                        >
                                            <Heart size={20} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (compared) {
                                                    removeFromCompare(post.code);
                                                } else {
                                                    addToCompare({ id: post.code, type: 'units', data: post });
                                                }
                                            }}
                                            className={`cursor-pointer flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 transition-colors font-bold ${compared ? 'bg-[#0c1356] text-white' : 'border-gray-200 text-gray-600 hover:bg-[#0c1356] hover:text-white'}`}
                                        >
                                            <Shuffle size={20} /> {compared ? "Compared" : "Compare"}
                                        </button>
                                    </div>
                                </div>
                                {/* Stats Row - Updated for Landscape: horizontal flex with wrap */}
                                <div className="hidden flex-wrap sm:flex-nowrap gap-4 md:gap-10 text-center bg-gray-50 px-4 md:px-8 py-4 rounded-2xl border border-gray-100 shadow-sm mb-8 md:mb-12 max-w-3xl">
                                    <div className="flex flex-col items-center min-w-[60px] flex-1">
                                        <BedDouble size={24} className="text-gray-400 mb-2" strokeWidth={1.5} />
                                        <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Beds</span>
                                        <span className="text-lg md:text-xl font-bold text-gray-800">{post.bedrooms}</span>
                                    </div>
                                    <div className="hidden sm:block w-px bg-gray-200 h-10 self-center"></div>
                                    <div className="flex flex-col items-center min-w-[60px] flex-1">
                                        <Bath size={24} className="text-gray-400 mb-2" strokeWidth={1.5} />
                                        <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Baths</span>
                                        <span className="text-lg md:text-xl font-bold text-gray-800">{post.no_of_bathrooms}</span>
                                    </div>
                                    <div className="hidden sm:block w-px bg-gray-200 h-10 self-center"></div>
                                    <div className="flex flex-col items-center min-w-[60px] flex-1">
                                        <Square size={24} className="text-gray-400 mb-2" strokeWidth={1.5} />
                                        <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Area</span>
                                        <span className="text-lg md:text-xl font-bold text-gray-800"><NumberConvert number={Number(post.built_upArea)} minDecimal='0' label='Sqft' /></span>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative mainsidebar">

                                    {/* Left Content */}
                                    <div className="lg:w-2/3">

                                        {/* Gallery Grid */}
                                        <FancyboxWrapper>
                                            <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-4 h-[300px] sm:h-[450px] md:h-[550px] mb-8 md:mb-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-md">
                                                <div className="col-span-3 row-span-2 relative group cursor-pointer bg-gray-100">
                                                    <a data-fancybox="gallerypopup" href={images[0]}>
                                                        <img src={images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Main" />
                                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                                    </a>
                                                </div>
                                                <div className="col-span-1 row-span-1 cursor-pointer bg-gray-100 overflow-hidden">
                                                    <a data-fancybox="gallerypopup" href={images[1] || images[0]}>
                                                        <img src={images[1] || images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Thumb 1" />
                                                    </a>
                                                </div>
                                                <div className="col-span-1 row-span-1 cursor-pointer relative bg-gray-100 overflow-hidden">
                                                    <img src={images[2] || images[0]} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Thumb 2" />
                                                    {images.length > 3 && (
                                                        <a data-fancybox="gallerypopup" href={images[3] || images[0]}>
                                                            <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center text-white font-bold text-lg md:text-xl backdrop-blur-sm">
                                                                +{images.length - 3}
                                                            </div>
                                                        </a>
                                                    )}
                                                    {images.slice(4)?.map((slide: any, index: any) => {
                                                        let imagecontent = slide.split('?');
                                                        return (
                                                            <a key={index} data-fancybox="gallerypopup" href={imagecontent[0]}></a>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </FancyboxWrapper>

                                        {/* Tabs */}
                                        <div className="flex border-b border-gray-100 mb-8 md:mb-10 overflow-x-auto no-scrollbar">
                                            {TABS.map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    className={`px-6 md:px-8 py-4 text-sm md:text-base font-bold border-b-4 transition-all whitespace-nowrap ${activeTab === tab.id
                                                        ? 'border-secondary text-secondary'
                                                        : 'border-transparent text-gray-500 hover:text-gray-800'
                                                        }`}
                                                    onClick={() => setActiveTab(tab.id as any)}
                                                >
                                                    {tab.fallback}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Property Overview */}
                                        <div className="mb-10 md:mb-14 animate-[fadeIn_0.5s_ease-out]">
                                            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">Details</h3>
                                            <div className="bg-gray-50 rounded-3xl p-6 md:p-10 border border-gray-100">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8">
                                                    {[
                                                        { label: "Project", value: post.propertyname },
                                                        { label: "Location", value: post.community },
                                                        { label: "Type", value: post.category },
                                                        { label: "Reference Number", value: post.refNo },
                                                        { label: "Contract", value: category },
                                                        { label: "Price", value: <PriceConvert price={price} minDecimal='0' />, isBold: true },
                                                        { label: "Area", value: <NumberConvert number={Number(post.built_upArea)} minDecimal='0' label='Sqft' />, isBold: true },
                                                        { label: "Beds", value: post.bedrooms, isBold: true },
                                                        { label: "Baths", value: post.no_of_bathrooms, isBold: true },
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-0 md:last:border-b">
                                                            <span className="text-gray-500 text-sm font-bold uppercase tracking-wide">{item.label}</span>
                                                            <span className={`${item.isBold ? 'text-gray-900 font-bold' : 'text-primary font-semibold'} text-base`}>{item.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description & Amenities */}
                                        <div className="mb-10 md:mb-14">
                                            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">Description</h3>
                                            <div className="bg-white text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line font-light mb-10">


                                                <div dangerouslySetInnerHTML={{ __html: post.property_overview }} />
                                            </div>

                                            {/* Rich Amenities Grid */}
                                            {amenities ? (
                                                <>
                                                    <h4 className="font-bold text-gray-900 text-xl mb-6">Ameneties</h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                                                        {amenities.slice(0, -1).map((am: string, i: number) => (
                                                            <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                                <CheckCircle2 className="text-secondary shrink-0" size={20} />
                                                                <span className="text-gray-700 font-medium">{am.split('^')[1].trim()}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : ("")}

                                            {/* Payment Plans Grid */}
                                            {amenities ? (
                                                <>
                                                    <h4 className="font-bold text-gray-900 text-xl mb-6">Payment Plans</h4>
                                                    <div className=" mb-10">
                                                        <PaymentPlans
                                                            propid={post.property_Pk}
                                                        />
                                                    </div>
                                                </>
                                            ) : ("")}

                                            {/* Mortgage Calculator Grid */}
                                            {category == "Sale" ? (
                                                <div className="">
                                                    <MortgageCalculator basePrice={price} />
                                                </div>) : ("")}

                                            <div className="mt-8 md:mt-12">
                                                <h4 className="font-bold text-gray-900 text-xl mb-6">Frequently Asked Questions</h4>
                                                <AccordionTabs items={faqData} />
                                            </div>
                                        </div>

                                        <div className="mt-8 ">
                                            <AgentDetails agent={post.agent} />
                                        </div>

                                    </div>

                                    {/* Right Sidebar (Sticky Desktop) */}
                                    <div className="lg:w-1/3 space-y-10 lg:sticky lg:top-32 h-fit ">
                                        <Sticky stickyClassName="" boundaryElement=".mainsidebar" hideOnBoundaryHit={false}>
                                            {/* Price Card */}
                                            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
                                                <div className="flex justify-between items-end mb-8">
                                                    <div>
                                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-2">Total Price</span>
                                                        <span className="text-3xl md:text-4xl font-bold text-primary"><PriceConvert price={price} minDecimal='0' /></span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    <Link href={`tel:${callPhone}`} className="cursor-pointer w-full bg-white hover:bg-[#dedede] border border-gray-300 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3">
                                                        <Phone size={22} /> Call
                                                    </Link>
                                                    <Link href={`https://wa.me/${whatsappPhone}?text=I%20am%20Interested%20 in this reference number: ${props.refNo}`} className="cursor-pointer w-full bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3">
                                                        <MessageCircle size={22} /> WhatsApp
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={drawerHandler('requestview', props.data)}
                                                        name="details"
                                                        className="col-span-2 cursor-pointer w-full bg-white hover:bg-[#dedede] border border-gray-300 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-3"
                                                    >
                                                        <FontAwesomeIcon icon={faCalendarCheck} /> Request a Meeting
                                                    </button>
                                                </div>

                                                <div className="">
                                                </div>

                                                <hr className="border-gray-100 mb-8" />

                                                {/* Schedule Viewing Form */}
                                                <div className="hidden md:flex">
                                                    <InquiryForm hideFeedbackButton={true} branchCode='assets' />
                                                </div>
                                            </div>
                                        </Sticky>
                                    </div>
                                </div>
                                {/* Similar Properties Section - Grid Update for landscape */}
                                <div className="container mx-auto mt-20 border-t border-gray-100 pt-16">
                                    {/* MAP */}
                                    {map !== null ? (
                                        <div className="">
                                            {/* <MapComponent
                                                latitude={coordinates['1']}
                                                longitude={coordinates['0']}
                                                fallbackImage={props.data["featuredImages"]}
                                                height='500px'
                                            /> */}
                                            <NearbysWithMap
                                                latitude={coordinates['1']}
                                                longitude={coordinates['0']}
                                                distance={10}
                                            />
                                        </div>) : ("")}

                                    <h2 className="text-3xl font-bold text-primary mb-8 mt-10">Similar Units</h2>
                                    <SimilarUnitsGrid
                                        propid={post.property_Pk}
                                        category={category}
                                        display={3}
                                    />
                                </div>
                            </div>
                            <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}