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
import { useCurrency } from '@/context/currencyContext';
import TableRow from './TableRow';
import PaymentPlansAI from './PaymentPlansAI';
import UnitModelsAI from './UnitModelsAI';
import { useRouter, usePathname } from "next/navigation";
import PhotoGallery from './PhotoGallery';
import BrochureModal from './BrochureModal';


const PropertyPage = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const format = useFormatter();
    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();
    const { convertPrice } = useCurrency();
    let HOdate, launchDate, completionDate, minprice, maxPrice, areaRangeMin, areaRangeMax;
    const [activeTab, setActiveTab] = useState('Overview');
    const [activeFloorPlan, setActiveFloorPlan] = useState(0);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
    const drawerHandler = (content: string, valuesarray: any) => (e: any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }
    const t = useTranslations('ProjectPage');

    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'] : ("");
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);

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
            title: t('facilities_and_amenities'),
            image: facilitiesAndAmenitiesImages,
        },
        {
            title: t('community_images'),
            image: communityImages,
        }
    ];

    const allGalleryData = [
        {
            title: t('project_gallery'),
            image: generalImagesNew
        },
        ...galleryData
    ].filter(item => item.image && item.image.length > 0);

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const currentGalleryImages = allGalleryData[activeGalleryIndex]?.image || [];
    const currentTabTitle = allGalleryData[activeGalleryIndex]?.title || t('gallery');

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
        minprice = convertPrice(props.data["minPrice"]).formatted;
    } else { minprice = "" }
    if (props.data["maxPrice"] !== null && parseInt(props.data["maxPrice"]) > 1) {
        maxPrice = convertPrice(props.data["maxPrice"]).formatted;
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

    let videoJsonLd = null;
    if (video) {
        videoJsonLd = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": `Video Tour of ${props.data["propertyName"]}`,
            "description": `Walkthrough video of ${props.data["propertyName"]} in ${props.data["community"]}`,
            "thumbnailUrl": [imgFeatured],
            // "uploadDate": new Date().toISOString(), // Fallback as we might not have upload date
            "contentUrl": video
        };
    }

    const tabs = ['Overview', 'Gallery', 'Payment Plan', 'Floor Plans', 'Location', 'Nearby'];

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
            {videoJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
                />
            )}

            <div id={props.data["propertyID"]} className="hidden">
                <Breadcrumb />
            </div>
            <div className="bg-white min-h-screen mainban">
                {/* Hero Section */}
                <div className="relative md:min-h-[80vh] h-[80vh] md:h-[auto]  md:min-h-screen md:flex flex-column justify-center">
                    <div className="absolute inset-0">
                        <img src={imgFeatured} className="w-full h-full object-cover" alt="Hero" />
                        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(79deg, #000 -16%, rgb(0 0 0 / 45%) 43%)" }} />
                    </div>

                    <div className="relative h-full container mx-auto px-4 md:px-12 flex flex-col justify-end pb-12 md:pb-15 md:pt-40 text-white">
                        <button onClick={() => router.back()}
                            className="absolute top-26 md:top-32 left-4 md:left-12 cursor-pointer flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-md text-sm font-bold z-10">
                            <ArrowRight className="rotate-180" size={16} /> {t('back')}
                        </button>

                        <div className="flex flex-col md:flex-row items-end justify-between gap-8 md:gap-12 pb-20 md:pb-0">
                            <div className="max-w-3xl w-full">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="bg-secondary px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider rounded">{t('status')}: {props.data["propertyPlan"]}</span>
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider rounded">{props.data["masterDeveloper"]}</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg leading-tight">{props.data["propertyName"]}</h1>
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
                                        <Heart size={20} fill={saved ? "currentColor" : "none"} /> {saved ? t('saved') : t('save')}
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
                                        <Shuffle size={20} /> {compared ? t('compared') : t('compare')}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm text-gray-800 hidden lg:block ">
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
                                    let tabLabel = tab;
                                    if (tab === 'Overview') tabLabel = t('overview');
                                    else if (tab === 'Gallery') tabLabel = t('gallery');
                                    else if (tab === 'Payment Plan') tabLabel = t('payment_plan');
                                    else if (tab === 'Floor Plans') tabLabel = t('floor_plan');
                                    else if (tab === 'Location') tabLabel = t('location');
                                    else if (tab === 'Nearby') tabLabel = t('nearby');
                                    else if (tab === 'Developer') tabLabel = t('developer');

                                    return (
                                        <button key={tab} onClick={() => scrollToSection(tab)} className={`cursor-pointer px-4 md:px-6 py-4 md:py-5 text-xs md:text-sm font-bold uppercase tracking-wider border-b-4 transition-all hover:text-secondary ${activeTab === tab ? 'border-secondary text-secondary' : 'border-transparent text-gray-500'}`}>
                                            {tabLabel}
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
                                    <h3 className="text-3xl  font-bold text-primary mb-6 md:mb-8">{t('overview')}</h3>
                                    <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none font-light">
                                        <ReadMore id="read-more-text" text={props.data["enPropertyOverView"]} amountOfWords={100} classes="whitespace-break-spaces" />

                                        {/* Construction Update (New Rich Feature) */}
                                        <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8 mb-8 hidden">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-bold text-primary flex items-center gap-2"><Clock size={20} /> {t('construction_update')}</h4>
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{t('on_track')}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                                <div className="bg-secondary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 font-bold">
                                                <span>{t('excavation')}</span>
                                                <span>{t('structure')}</span>
                                                <span>{t('finishing')}</span>
                                                <span>{t('handover')}</span>
                                            </div>
                                        </div>

                                        <h4 className="font-bold text-gray-800 text-xl mb-4 mt-8">{t('features')}</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                                            {props.data['aminities'] && props.data['aminities'].map((item: any, index: any) => (
                                                <li key={index} className="flex items-center gap-3 text-base"><CheckCircle2 className="text-primary shrink-0" size={20} />{item.name}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {props.data["projectBrochures"] && props.data["projectBrochures"].length > 0 && props.data["projectBrochures"][0]['imageURL'] && (
                                        <div className="mt-10">
                                            <button
                                                onClick={() => setBrochureModalOpen(true)}
                                                className="inline-flex items-center gap-2 w-full justify-center bg-primary text-xl text-white px-6 py-3 rounded-lg font-bold hover:bg-secondary transition-colors cursor-pointer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-down"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="m9 15 3 3 3-3" /></svg>
                                                {t('download_brochure')}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:w-5/12 w-full space-y-8">
                                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                        <div className="bg-primary p-6 text-white"><h4 className="text-2xl font-bold">{t('facts')}</h4></div>
                                        <div className="p-2">
                                            {availbeds ? (<TableRow title={t('available_bedrooms')} content={availbeds} />) : ("")}
                                            {availtype ? (<TableRow title={t('property_types')} content={availtype} />) : ("")}
                                            {props.data['masterDeveloper'] ? (<TableRow title={t('master_developer')} content={props.data['masterDeveloper']} />) : ("")}
                                            {props.data['minPrice'] ? (<TableRow title={t('price_range')} content={`${minprice} ~ ${maxPrice}`} />) : ("")}
                                            {props.data['areaRangeMin'] ? (<TableRow title={t('area_range')} content={`${areaRangeMin} ~ ${areaRangeMax}`} />) : ("")}
                                            {props.data['numberOfApartment'] && String(props.data['numberOfApartment']) !== '0' ? (<TableRow title={t('number_of_apartment')} content={props.data['numberOfApartment']} />) : ("")}
                                            {props.data['propertyType'] ? (<TableRow title={t('property_type')} content={props.data['propertyType']} />) : ("")}
                                            {props.data['propertyPlan'] ? (<TableRow title={t('property_plan')} content={props.data['propertyPlan']} />) : ("")}
                                            {props.data['propertyUsage'] ? (<TableRow title={t('property_usage')} content={props.data['propertyUsage']} />) : ("")}
                                            {completionDate ? (<TableRow title={t('completion_date')} content={completionDate} />) : ("")}
                                            {HOdate ? (<TableRow title={t('handover_date')} content={HOdate} />) : ("")}
                                            {launchDate ? (<TableRow title={t('launch_date')} content={launchDate} />) : ("")}
                                            {props.data['zoneType'] ? (<TableRow title={t('property_types')} content={props.data['zoneType']} />) : ("")}
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
                                                className="relative inline-flex w-full flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 hover:text-[#111954] cursor-pointer"
                                            >
                                                <div className="bg-black rounded-2xl overflow-hidden shadow-lg relative h-64 group cursor-pointer">
                                                    <img src={imgFeatured} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white pl-1 transition-transform group-hover:scale-110">
                                                            <PlayIcon size={32} className="text-white" fill="currentColor" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-4 left-4 text-white font-bold">{t('video_tour')}</div>
                                                </div>
                                            </a>
                                        </FancyboxWrapper>
                                    ) : ("")}
                                </div>
                            </div>
                        </section>



                        {/* Gallery Grid */}
                        <section id="gallery" className="scroll-mt-40">
                            <PhotoGallery data={props.data} limit={5} viewAllLink={`${pathname}/photo-gallery`} />
                        </section>

                        {/* Floor Plans */}
                        {unitModels.length !== 0 ? (<div id="floor-plans">
                            <UnitModelsAI
                                data={fpGroup}
                                propname={props.data["propertyName"]}
                                viewAllLink={`${pathname}/floor-plan`}
                            />
                        </div>) : ("")}

                        {/* Master Plan & Location Map */}
                        <section id="location" className="scroll-mt-40">
                            <div className="grid grid-cols-1 gap-10">
                                {props.data["communityMapAndMasterPlan"] !== null ? (
                                    <FancyboxWrapper>
                                        <div>
                                            <h3 className="text-3xl font-bold text-primary">{t('master_plan')}</h3>
                                            <h2 className="text-xl text-gray-500 mb-8">{props.data["propertyName"]}</h2>
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
                                                        <span className="bg-white/90 px-6 py-2 rounded-full font-bold text-primary flex items-center gap-2"><LayoutGrid size={18} /> {t('view_full')}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </FancyboxWrapper>
                                ) : ("")}
                                {props.data["locationMapImages"] !== null ? (
                                    <FancyboxWrapper>
                                        <div>
                                            <h3 className="text-3xl font-bold text-primary">{t('location')}</h3>
                                            <h2 className="text-xl text-gray-500 mb-8">{props.data["propertyName"]}</h2>
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
                                                        <ExternalLink size={16} /> {t('open_in_google_maps')}
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

                        <div className="" id="nearby">
                            <NearbysWithMap
                                latitude={props.data["mapLatitude"]}
                                longitude={props.data["mapLongitude"]}
                                distance={10}
                                propname={props.data["propertyName"]}
                            />
                        </div>

                        {/* Payment Plan (New Rich Feature) */}
                        <section id="payment-plan" className="scroll-mt-40">
                            <PaymentPlansAI
                                propid={props.data["propertyID"]}
                                propname={props.data["propertyName"]}
                            />
                        </section>

                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <Faqs data={props.data} propname={props.data["propertyName"]} viewAllLink={`${pathname}/faqs`} />
                        </div>

                    </div>
                </div>
            </div>
            <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />

            {props.data["projectBrochures"] && props.data["projectBrochures"].length > 0 && (
                <BrochureModal
                    isOpen={isBrochureModalOpen}
                    closeModal={() => setBrochureModalOpen(false)}
                    brochureUrl={props.data["projectBrochures"][0]['imageURL']}
                    propertyName={props.data["propertyName"]}
                    image={imgFeatured}
                />
            )}
        </>
    );
}

export default PropertyPage;