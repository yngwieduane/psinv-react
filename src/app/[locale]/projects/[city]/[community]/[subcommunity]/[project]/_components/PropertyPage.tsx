'use client'
import { useState } from 'react';
import {useFormatter, useTranslations} from 'next-intl';
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import Gallery from "./Gallery";
import UnitModels from "./UnitModels";
import MapComponent from "@/app/[locale]/_components/MapComponent";
import SwiperMaterialProjectPage from "@/app/[locale]/_components/SwiperMaterialProjectPage";
import Image from "next/image";
import CardGroup from "./CardGroup";
import CardOne from "./CardOne";
import AvailableUnits from './AvailableUnits';
import StripeContentPro from './StripeContentPro';
import { ReadMore } from '@/app/[locale]/_components/ReadMore';
import FancyboxWrapper from '@/app/[locale]/_components/tools/FancyboxWrapper';
import Nearbys from './Nearbys';
import Sticky from 'react-sticky-el';
import InquiryForm from '@/app/[locale]/_components/InquiryForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCirclePlay, faLayerGroup, faLocationDot, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import DrawerDetails from '@/app/[locale]/unit/[slug]/components/DrawerDetails';
import Faqs from './Faqs';
import NearbysWithMap from './NearbyWithMap';
import PaymentPlans from './PaymentPlans';


const PropertyPage = (props:any) => {
    const format = useFormatter();
    let HOdate,launchDate,completionDate,minprice,maxPrice,areaRangeMin,areaRangeMax;
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content:string,valuesarray:any) => (e:any) => {
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


    const generalImagesNew = [{ imageURL: imgFeatured }, ...generalImages ]; 
    console.log(generalImagesNew); 
    
    const map = props.data["mapLongitude"]+","+props.data["mapLatitude"];
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
    let availbeds = '';
    props.data['availableBedrooms'].forEach((array:any) => {
        availbeds += array.noOfBedroom;
        availbeds += ','
    });
    availbeds = availbeds.slice(0, availbeds.length - 1);
    let availtype = '';
    props.data['propertyUnitTypes'].forEach((array:any) => {
        availtype += array.unitType;
        availtype += ','
    });
    availtype = availtype.slice(0, availtype.length - 1);

    let fpGroup;
    if (unitModels) {
        fpGroup = Object.entries(
            unitModels.reduce((acc:any, value:any) => {
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
    const thumbimg = imgFeatured.replace('?width=0&height=0','?width=1400&height=600');

    if(props.data["handoverDate"]){
      HOdate = new Date(props.data["handoverDate"]);
      HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short'});
    }else{
      HOdate = false;
    }
    if(props.data["launchDate"]){
      launchDate = new Date(props.data["launchDate"]);
      launchDate = format.dateTime(launchDate, {year: 'numeric',month: 'short'});
    }else{
      launchDate = false;
    }
    if(props.data["completionDate"]){
      completionDate = new Date(props.data["completionDate"]);
      completionDate = format.dateTime(completionDate, {year: 'numeric',month: 'short'});
    }else{
      completionDate = false;
    }

    if(props.data["minPrice"] !== null && parseInt(props.data["minPrice"]) > 1){
        minprice = format.number(props.data["minPrice"]);
    }else{minprice=""}
    if(props.data["maxPrice"] !== null && parseInt(props.data["maxPrice"]) > 1){
        maxPrice = format.number(props.data["maxPrice"]);
    }else{maxPrice=""}
    if(props.data["areaRangeMin"] !== null && parseInt(props.data["areaRangeMin"]) > 1){
        areaRangeMin = format.number(props.data["areaRangeMin"]);
    }else{areaRangeMin=""}
    if(props.data["areaRangeMax"] !== null && parseInt(props.data["areaRangeMax"]) > 1){
        areaRangeMax = format.number(props.data["areaRangeMax"]);
    }else{areaRangeMax=""}
    return (
        <>
        <div id={props.data["propertyID"]}>
            <Breadcrumb/>
        </div>
        <div className="container mx-auto my-5 px-5">
            {/* Swiper */}
            {galleryData !== null ? (
                <div className="relative">
                    <SwiperMaterialProjectPage slides={generalImagesNew}/>
                </div>
            ) : ("")}
        </div>
        <div className="hidden grid grid-cols-2 gap-4 px-4 items-center">
            <div className="text-3xl">{props.data["propertyName"]}</div>
            <div className="grid grid-cols-4 gap-4 items-center text-center ">
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('overview')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('gallery')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('floor_plan')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('location')}</a>
            </div>
        </div>
        {/* STRIPE CONTENT */}
        <div className="mt-7 md:mt-0">
            <StripeContentPro data={props.data}/>
        </div>
        <div className="container mx-auto my-5 px-5">
            {/* START DETAILS UPPER*/}
            <div className="mainuppper grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-3">
                    <div className="flex gap-4 my-10">
                        {map !== null ? (
                        <button
                            type="button"
                            onClick={drawerHandler('map',map)}
                            name="map"
                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faLocationDot}/>
                            Map
                        </button>
                        ) : ("")}
                        {video !== '' ? (
                        <FancyboxWrapper>
                            <a
                                type="button"
                                data-fancybox="video"
                                href={video}
                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faCirclePlay}/>
                                Video
                            </a>
                        </FancyboxWrapper>
                        ) : ("")}
                        {props.data["communityMapAndMasterPlan"] !== null ? (
                        <FancyboxWrapper>
                            <a
                                type="button"
                                //onClick={drawerHandler('gallery',images)}
                                data-fancybox="masterplan"
                                href={props.data["communityMapAndMasterPlan"][0]['imageURL']}
                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faLayerGroup}/>
                                Master Plan
                            </a>
                        </FancyboxWrapper>
                        ) : ("")}
                        {props.data["locationMapImages"] !== null ? (
                        <FancyboxWrapper>
                            <a
                                type="button"
                                //onClick={drawerHandler('gallery',images)}
                                data-fancybox="locationplan"
                                href={props.data["locationMapImages"][0]['imageURL']}
                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faMapLocationDot}/>
                                Location Plan
                            </a>
                        </FancyboxWrapper>
                        ) : ("")}
                    </div>
                    <div className="my-8">
                        <AvailableUnits
                            propid={props.data["propertyID"]}
                            category="Sale"
                            display={4}
                        />
                    </div>
                    <div className="my-8">
                        <AvailableUnits
                            propid={props.data["propertyID"]}
                            category="Rent"
                            display={4}
                        />
                    </div>
                    <div className="mb-10">
                        <h2 className="text-xl mb-5 text-[#111954]">
                            {t("property_details")}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                            {availbeds ? (<CardOne title="Available Bedrooms" content={availbeds} />) : ("")}
                            {availtype ? (<CardOne title="Property Types" content={availtype} />) : ("")}
                            {props.data['masterDeveloper'] ? (<CardOne title="Master Developer" content={props.data['masterDeveloper']} />) : ("")}
                            {props.data['minPrice'] ? (<CardOne title="Price Range (AED)" content={`${minprice} ~ ${maxPrice}`} />) : ("")}
                            {props.data['areaRangeMin'] ? (<CardOne title="Area Range (SqFt)" content={`${areaRangeMin} ~ ${areaRangeMax}`} />) : ("")}
                            {props.data['numberOfApartment'] ? (<CardOne title="Number of Apartment" content={props.data['numberOfApartment']} />) : ("")}
                            {props.data['propertyType'] ? (<CardOne title="Property Type" content={props.data['propertyType']} />) : ("")}
                            {props.data['propertyPlan'] ? (<CardOne title="Property Plan" content={props.data['propertyPlan']} />) : ("")}
                            {props.data['propertyUsage'] ? (<CardOne title="Property Usage" content={props.data['propertyUsage']} />) : ("")}
                            {completionDate ? (<CardOne title="Completion Date" content={completionDate} />) : ("")}
                            {HOdate ? (<CardOne title="Handover Date" content={HOdate} />) : ("")}
                            {launchDate ? (<CardOne title="Launch Date" content={launchDate} />) : ("")}
                            {props.data['zoneType'] ? (<CardOne title="Property Types" content={props.data['zoneType']} />) : ("")}
                        </div>
                    </div>
                    {unitModels.length !== 0 ? (<div>
                        <UnitModels
                            data={fpGroup}
                        />
                    </div>) : ("")}
                    <div className="container mx-auto my-8 px-5">
                        <PaymentPlans
                            propid={props.data["propertyID"]}
                        />
                    </div>
                    <div className="container mx-auto my-10 px-5">
                        <NearbysWithMap
                            latitude={props.data["mapLatitude"]}
                            longitude={props.data["mapLongitude"]}
                            distance={10}
                        />
                    </div>
                    {props.data['propertyPaymentPlans'] !== null
                        ? (
                    <div className="container mx-auto my-10 px-5">
                        <h2 className="font-medium text-center text-3xl my-10">
                            {props.data["propertyName"]} {t("payment_plan")}
                        </h2>
                    </div>) : ("")}
                    {props.data['facilities'] !== null
                        ? 
                        <div className="container mx-auto my-10 px-5">
                            <h2 className="text-xl mb-5 text-[#111954]">
                                {t("facilities_in")} {props.data["propertyName"]}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <CardGroup data={props.data['facilities']}/>
                            </div>
                        </div>
                        : ""
                    }
                    {props.data['aminities'] !== null
                        ? 
                        <div className="container mx-auto my-10 px-5">
                            <h2 className="text-xl mb-5 text-[#111954]">
                                {t("aminities_in")} {props.data["propertyName"]}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <CardGroup data={props.data['aminities']}/>
                            </div>
                        </div>
                        : ""
                    }
                    <div className="container mx-auto my-10 px-5">
                        <h2 className="text-xl mb-5 text-[#111954]">
                            {props.data["propertyName"]} {t("overview")}
                        </h2>
                        <div className="">
                            <ReadMore id="read-more-text" text={props.data["enPropertyOverView"]} amountOfWords={100} classes="whitespace-break-spaces"/>
                        </div>
                    </div>
                    <div className="container mx-auto my-10 px-5">
                        <Faqs data={props.data}/>
                    </div>
                </div>
                <Sticky stickyClassName="mt-28" boundaryElement=".mainuppper"  hideOnBoundaryHit={false}>
                    <div className="hidden md:flex">
                        <InquiryForm hideFeedbackButton={true}/>
                    </div>
                    <div className="p-5">
                        <button
                            type="button"
                            onClick={drawerHandler('requestview', props.data)}
                            name="details"
                            className="w-full rounded-lg border border-[#111954] p-4 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faCalendarCheck}/> Request a Meeting
                        </button>
                    </div>
                </Sticky>
            </div>
        </div>
        <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
        </>
    );
}

export default PropertyPage;