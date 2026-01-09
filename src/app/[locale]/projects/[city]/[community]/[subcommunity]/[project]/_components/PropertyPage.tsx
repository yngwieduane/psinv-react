'use client'
import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitModels from "./UnitModels";
import SwiperMaterialProjectPage from "@/app/[locale]/_components/SwiperMaterialProjectPage";
import Image from "next/image";
import CardGroup from "./CardGroup";
import CardOne from "./CardOne";
import AvailableUnits from './AvailableUnits';
import StripeContentPro from './StripeContentPro';
import { ReadMore } from '@/app/[locale]/_components/ReadMore';
import FancyboxWrapper from '@/app/[locale]/_components/tools/FancyboxWrapper';
import Sticky from 'react-sticky-el';
import InquiryForm from '@/app/[locale]/_components/InquiryForm';
import DrawerDetails from '@/app/[locale]/unit/[slug]/components/DrawerDetails';
import Faqs from './Faqs';
import NearbysWithMap from './NearbyWithMap';
import PaymentPlans from './PaymentPlans';
import CardGroupImage from './CardGroupImage';
import { ArrowRight, BedDouble, CalendarCheck, CheckCircle2, CirclePlay, Clock, ExternalLink, FileText, Heart, LandPlot, LayoutGrid, MapPin, MapPinCheck, MapPinIcon, MapPinned, PlayCircle, PlayIcon, Shuffle, Square, Video } from 'lucide-react';
import { useUser } from '@/context/userContext';
import TableRow from './TableRow';
import PaymentPlansAI from './PaymentPlansAI';
import UnitModelsAI from './UnitModelsAI';


const PropertyPage = (props: any) => {
    const format = useFormatter();
    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();
    let HOdate, launchDate, completionDate, minprice, maxPrice, areaRangeMin, areaRangeMax;
    const [activeTab, setActiveTab] = useState('Overview');
    const [activeFloorPlan, setActiveFloorPlan] = useState(0);
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content: string, valuesarray: any) => (e: any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }
    const t = useTranslations('ProjectPage');
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'] : ("");

    const generalImages = props.data["generalImages"] ? props.data["generalImages"] : ("");
    const facilitiesAndAmenitiesImages = props.data["facilitiesAndAmenitiesImages"] ? props.data["facilitiesAndAmenitiesImages"] : ("");
    const communityImages = props.data["communityImages"] ? props.data["communityImages"] : ("");
    const unitModels = props.data["unitModels"] ? props.data["unitModels"] : ("");


    const generalImagesNew = [{ imageURL: imgFeatured }, ...generalImages];
    console.log(generalImagesNew);

    const map = props.data["mapLongitude"] + "," + props.data["mapLatitude"];
    const video = props.data["propertyVideos"] ? props.data["propertyVideos"][0]['imageURL'] : ("");

    const galleryData = [
        {
            title: "Facilities and Amenities",
            image: facilitiesAndAmenitiesImages,
        },
        {
            title: "Community Images",
            image: communityImages,
        }
    ];

    const allGalleryData = [
        {
            title: "Project Gallery",
            image: generalImagesNew
        },
        ...galleryData
    ].filter(item => item.image && item.image.length > 0);

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const currentGalleryImages = allGalleryData[activeGalleryIndex]?.image || [];
    const currentTabTitle = allGalleryData[activeGalleryIndex]?.title || "Gallery";

    let availbeds = '';
    if (props.data['availableBedrooms']) {
        props.data['availableBedrooms'].forEach((array: any) => {
            availbeds += array.noOfBedroom;
            availbeds += ','
        });
        availbeds = availbeds.slice(0, availbeds.length - 1);
    }
    let availtype = '';
    if (props.data['propertyUnitTypes']) {
        props.data['propertyUnitTypes'].forEach((array: any) => {
            availtype += array.unitType;
            availtype += ','
        });
        availtype = availtype.slice(0, availtype.length - 1);
    }

    let fpGroup;
    if (unitModels) {
        fpGroup = Object.entries(
            unitModels.reduce((acc: any, value: any) => {
                if (value.unitType == 'Office') {
                    if (!acc[value.unitType]) {
                        acc[value.unitType] = [];
                    }
                    acc[value.unitType].push(value);
                } else if (value.unitType == 'Retail') {
                    if (!acc[value.unitType]) {
                        acc[value.unitType] = [];
                    }
                    acc[value.unitType].push(value);
                } else if (value.bedrooms === '0') {
                    if (!acc['Studio']) {
                        acc['Studio'] = [];
                    }
                    acc['Studio'].push(value);
                } else {
                    if (!acc[value.bedrooms]) {
                        acc[value.bedrooms] = [];
                    }
                    acc[value.bedrooms].push(value);
                }

                return acc;
            }, {})
        ).map(([title, options]) => ({ title, options }));
    }
    const thumbimg = imgFeatured.replace('?width=0&height=0', '?width=1400&height=600');

    if (props.data["handoverDate"]) {
        HOdate = new Date(props.data["handoverDate"]);
        HOdate = format.dateTime(HOdate, { year: 'numeric', month: 'short' });
    } else {
        HOdate = false;
    }
    if (props.data["launchDate"]) {
        launchDate = new Date(props.data["launchDate"]);
        launchDate = format.dateTime(launchDate, { year: 'numeric', month: 'short' });
    } else {
        launchDate = false;
    }
    if (props.data["completionDate"]) {
        completionDate = new Date(props.data["completionDate"]);
        completionDate = format.dateTime(completionDate, { year: 'numeric', month: 'short' });
    } else {
        completionDate = false;
    }

    if (props.data["minPrice"] !== null && parseInt(props.data["minPrice"]) > 1) {
        minprice = format.number(props.data["minPrice"]);
    } else { minprice = "" }
    if (props.data["maxPrice"] !== null && parseInt(props.data["maxPrice"]) > 1) {
        maxPrice = format.number(props.data["maxPrice"]);
    } else { maxPrice = "" }
    if (props.data["areaRangeMin"] !== null && parseInt(props.data["areaRangeMin"]) > 1) {
        areaRangeMin = format.number(props.data["areaRangeMin"]);
    } else { areaRangeMin = "" }
    if (props.data["areaRangeMax"] !== null && parseInt(props.data["areaRangeMax"]) > 1) {
        areaRangeMax = format.number(props.data["areaRangeMax"]);
    } else { areaRangeMax = "" }

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": props.data["propertyName"] + ', ' + props.data["community"] + ' by ' + props.data['masterDeveloper'],
        "description": props.data["propertyName"] + ', ' + props.data["community"] + ' by ' + props.data['masterDeveloper'],
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": 4,
                "bestRating": 5
            },
            "author": {
                "@type": "Person",
                "name": "Property Shop Investment"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.4,
            "reviewCount": 942
        }
    };


    const tabs = ['Overview', 'Gallery', 'Payment Plan', 'Floor Plans', 'Location', 'Nearby', 'Developer'];

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id.toLowerCase().replace(' ', '-'));
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div id={props.data["propertyID"]} className="hidden">
                <Breadcrumb />
            </div>
            <div className="bg-white min-h-screen mainban">
                {/* Hero Section */}
                <div className="relative h-[80vh] md:h-screen">
                    <div className="absolute inset-0">
                        <img src={imgFeatured} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-primary/10" />
                    </div>

                    <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-end pb-12 md:pb-24 text-white">
                        <button className="absolute top-24 md:top-32 left-4 md:left-12 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold z-10">
                            <ArrowRight className="rotate-180" size={16} /> Back
                        </button>

                        <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-12 pb-20 md:pb-0">
                            <div className="max-w-3xl w-full">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="bg-secondary px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider rounded">Status: {props.data["propertyPlan"]}</span>
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider rounded">{props.data["masterDeveloper"]}</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg leading-tight">{props.data["propertyName"]}</h1>
                                <div className="flex items-center gap-2 text-lg md:text-2xl text-gray-200 font-light mb-6 md:mb-8">
                                    <MapPin size={24} className="text-secondary shrink-0" />
                                    <span className="truncate">{props.data["community"]}, {props.data["city"]}</span>
                                </div>
                                <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-base font-medium text-gray-300">
                                    <span className="flex items-center gap-2"><BedDouble size={20} /> {availbeds}</span>
                                    <span className="flex items-center gap-2"><Square size={20} />{areaRangeMin} ~ {areaRangeMax} Sqft</span>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button onClick={() => toggleFavorite({ id: props.data["propertyID"], type: 'project' })} className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 backdrop-blur-md transition-colors font-bold ${saved ? 'bg-red-500 text-white border-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                        <Heart size={20} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save"}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (compared) {
                                                removeFromCompare(props.data["propertyID"]);
                                            } else {
                                                addToCompare({ id: props.data["propertyID"], type: 'project', data: props.data });
                                            }
                                        }} className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 backdrop-blur-md transition-colors font-bold ${compared ? 'bg-[#0c1356] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                        <Shuffle size={20} /> {compared ? "Compared" : "Compare"}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-gray-800 hidden lg:block">
                                <InquiryForm hideFeedbackButton={true} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Sub-nav */}
                <Sticky stickyClassName="mt-22 z-50" boundaryElement=".mainuppper" hideOnBoundaryHit={false}>
                    <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 z-30 shadow-sm overflow-x-auto no-scrollbar transition-all duration-300">
                        <div className="container mx-auto px-4 md:px-12 flex justify-between items-center min-w-max">
                            <h2 className="text-xl font-bold text-primary mr-8 hidden lg:block">{props.data["propertyName"]}</h2>
                            <div className="flex space-x-2 rtl:space-x-reverse">
                                {tabs.filter(function (cat) {
                                    if (cat === "Location" && props.data["communityMapAndMasterPlan"] == null && props.data["locationMapImages"] == null) {
                                        return false; // skip
                                    }
                                    return true;
                                }).map((tab) => {
                                    //if(tab === 'Location' && props.data["communityMapAndMasterPlan"] !== null && props.data["locationMapImages"] !== null) return null;
                                    return (
                                        <button key={tab} onClick={() => scrollToSection(tab)} className={`px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-wider border-b-4 transition-all hover:text-secondary ${activeTab === tab ? 'border-secondary text-secondary' : 'border-transparent text-gray-500'}`}>
                                            {tab}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Sticky>

                <div className="bg-gray-50 pb-32">
                    <div className="container mx-auto px-4 md:px-12 space-y-20 md:space-y-24 pt-12 md:pt-20">
                        {/* Overview / Facts */}
                        <section id="overview" className="scroll-mt-40">
                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                                <div className="lg:w-7/12">
                                    <h3 className="text-3xl font-serif font-bold text-primary mb-6 md:mb-8">Overview</h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none font-light">
                                        <ReadMore id="read-more-text" text={props.data["enPropertyOverView"]} amountOfWords={100} classes="whitespace-break-spaces" />

                                        {/* Construction Update (New Rich Feature) */}
                                        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8 mb-8 hidden">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-primary flex items-center gap-2"><Clock size={20} /> Construction Update</h4>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">On Track</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 font-bold">
                                                <span>Excavation</span>
                                                <span>Structure</span>
                                                <span>Finishing</span>
                                                <span>Handover</span>
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-gray-800 text-xl mb-4 mt-8">Features</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                                            {props.data['aminities'] && props.data['aminities'].map((item: any, index: any) => (
                                                <li key={index} className="flex items-center gap-3 text-base"><CheckCircle2 className="text-secondary shrink-0" size={20} />{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="lg:w-5/12 w-full space-y-8">
                                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                        <div className="bg-primary p-6 text-white"><h4 className="font-serif text-2xl font-bold">Project Facts</h4></div>
                                        <div className="p-2">
                                            {availbeds ? (<TableRow title="Available Bedrooms" content={availbeds} />) : ("")}
                                            {availtype ? (<TableRow title="Property Types" content={availtype} />) : ("")}
                                            {props.data['masterDeveloper'] ? (<TableRow title="Master Developer" content={props.data['masterDeveloper']} />) : ("")}
                                            {props.data['minPrice'] ? (<TableRow title="Price Range (AED)" content={`${minprice} ~ ${maxPrice}`} />) : ("")}
                                            {props.data['areaRangeMin'] ? (<TableRow title="Area Range (SqFt)" content={`${areaRangeMin} ~ ${areaRangeMax}`} />) : ("")}
                                            {props.data['numberOfApartment'] && String(props.data['numberOfApartment']) !== '0' ? (<TableRow title="Number of Apartment" content={props.data['numberOfApartment']} />) : ("")}
                                            {props.data['propertyType'] ? (<TableRow title="Property Type" content={props.data['propertyType']} />) : ("")}
                                            {props.data['propertyPlan'] ? (<TableRow title="Property Plan" content={props.data['propertyPlan']} />) : ("")}
                                            {props.data['propertyUsage'] ? (<TableRow title="Property Usage" content={props.data['propertyUsage']} />) : ("")}
                                            {completionDate ? (<TableRow title="Completion Date" content={completionDate} />) : ("")}
                                            {HOdate ? (<TableRow title="Handover Date" content={HOdate} />) : ("")}
                                            {launchDate ? (<TableRow title="Launch Date" content={launchDate} />) : ("")}
                                            {props.data['zoneType'] ? (<TableRow title="Property Types" content={props.data['zoneType']} />) : ("")}
                                        </div>
                                    </div>

                                    {/* Video Tour Placeholder */}
                                    {video !== '' ? (
                                        <FancyboxWrapper>
                                            <a
                                                title="Video"
                                                type="button"
                                                data-fancybox="video"
                                                href={video}
                                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 hover:text-[#111954] cursor-pointer"
                                            >
                                                <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative h-64 group cursor-pointer">
                                                    <img src={imgFeatured} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white pl-1 transition-transform group-hover:scale-110">
                                                            <CirclePlay size={32} className="text-white" fill="currentColor" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-4 left-4 text-white font-bold">Video Tour</div>
                                                </div>
                                            </a>
                                        </FancyboxWrapper>
                                    ) : ("")}
                                </div>
                            </div>
                        </section>

                        {/* Gallery Grid */}
                        <section id="gallery" className="scroll-mt-40">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-3xl font-serif font-bold text-primary">Gallery</h3>
                                <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                                    {allGalleryData.map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveGalleryIndex(index)}
                                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGalleryIndex === index
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-gray-500 hover:text-primary'
                                                }`}
                                        >
                                            {tab.title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
                                <FancyboxWrapper>
                                    {currentGalleryImages.length > 0 && (
                                        <div className="col-span-2 row-span-2 relative group rounded-2xl overflow-hidden cursor-pointer">
                                            <a title={currentTabTitle} data-fancybox="gallerypopup" href={currentGalleryImages[0].imageURL}>
                                                <img src={currentGalleryImages[0].imageURL} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={currentTabTitle} />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                            </a>
                                        </div>
                                    )}
                                    {currentGalleryImages.slice(1, 5).map((img: any, index: any) => {
                                        let imagecontent = img.imageURL.replace('?width=0&height=0', '?width=600&height=400');
                                        return (
                                            <a title={currentTabTitle} data-fancybox="gallerypopup" href={img.imageURL} key={index} className="relative group rounded-2xl overflow-hidden cursor-pointer">
                                                <img src={imagecontent} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={`Gallery ${index}`} />
                                            </a>
                                        )
                                    })}
                                </FancyboxWrapper>
                            </div>
                        </section>

                        {/* Payment Plan (New Rich Feature) */}
                        <section id="payment-plan" className="scroll-mt-40">
                            <PaymentPlansAI
                                propid={props.data["propertyID"]}
                            />
                        </section>

                        {/* Floor Plans */}
                        {unitModels.length !== 0 ? (<div>
                            <UnitModelsAI
                                data={fpGroup}
                            />
                        </div>) : ("")}

                        {/* Master Plan & Location Map */}
                        <section id="location" className="scroll-mt-40">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {props.data["communityMapAndMasterPlan"] !== null ? (
                                    <FancyboxWrapper>
                                        <div>
                                            <h3 className="text-3xl font-serif font-bold text-primary mb-8">Master Plan</h3>
                                            <a
                                                type="button"
                                                title="Master Plan"
                                                //onClick={drawerHandler('gallery',images)}
                                                data-fancybox="masterplan"
                                                href={props.data["communityMapAndMasterPlan"][0]['imageURL']}
                                                className="cursor-pointer"
                                            >
                                                <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[400px] group cursor-pointer relative">
                                                    <img src={props.data["communityMapAndMasterPlan"][0]['imageURL']} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Master Plan" />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="bg-white/90 px-6 py-2 rounded-full font-bold text-primary flex items-center gap-2"><LayoutGrid size={18} /> View Full</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </FancyboxWrapper>
                                ) : ("")}
                                {props.data["locationMapImages"] !== null ? (
                                    <FancyboxWrapper>
                                        <div>
                                            <h3 className="text-3xl font-serif font-bold text-primary mb-8">Location</h3>
                                            <a
                                                type="button"
                                                title="Location Plan"
                                                //onClick={drawerHandler('gallery',images)}
                                                data-fancybox="locationplan"
                                                href={props.data["locationMapImages"][0]['imageURL']}
                                                className="cursor-pointer"
                                            >
                                                <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[400px] relative">
                                                    <img src={props.data["locationMapImages"][0]['imageURL']} className="w-full h-full object-cover grayscale opacity-80" alt="Map" />
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <div className="bg-secondary text-white p-3 rounded-full shadow-xl border-4 border-white animate-bounce">
                                                            <MapPin size={24} fill="currentColor" />
                                                        </div>
                                                    </div>
                                                    <button className="hidden absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md font-bold text-sm text-gray-700 flex items-center gap-2">
                                                        <ExternalLink size={16} /> Open in Google Maps
                                                    </button>
                                                </div>
                                            </a>
                                        </div>
                                    </FancyboxWrapper>
                                ) : ("")}
                            </div>
                        </section>
                        <div className="">
                            <AvailableUnits
                                propid={props.data["propertyID"]}
                                category="Sale"
                                display={4}
                            />
                        </div>
                        <div className="">
                            <AvailableUnits
                                propid={props.data["propertyID"]}
                                category="Rent"
                                display={4}
                            />
                        </div>

                        <div className="">
                            <NearbysWithMap
                                latitude={props.data["mapLatitude"]}
                                longitude={props.data["mapLongitude"]}
                                distance={10}
                            />
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <Faqs data={props.data} />
                        </div>

                    </div>
                </div>
            </div>
            <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
        </>
    );
}

export default PropertyPage;