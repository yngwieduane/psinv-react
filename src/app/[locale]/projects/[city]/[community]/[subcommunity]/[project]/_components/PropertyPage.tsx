'use client'
import Link from "next/link";
import slugify from 'react-slugify';
import {useTranslations} from 'next-intl';
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import Gallery from "./Gallery";
import UnitModels from "./UnitModels";
import MapComponent from "@/app/[locale]/_components/MapComponent";
import Image from "next/image";
import CardGroup from "./CardGroup";
import CardOne from "./CardOne";


const PropertyPage = (props:any) => {

    const t = useTranslations('ProjectPage');
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'] : ("");

    const generalImages = props.data["generalImages"] ? props.data["generalImages"] : ("");
    const facilitiesAndAmenitiesImages = props.data["facilitiesAndAmenitiesImages"] ? props.data["facilitiesAndAmenitiesImages"] : ("");
    const communityImages = props.data["communityImages"] ? props.data["communityImages"] : ("");
    const unitModels = props.data["unitModels"] ? props.data["unitModels"] : ("");

    const galleryData = [
        {
            title: "General Images",
            image: generalImages,
        },
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
    return (
        <>
        <div
            className={`bg-white background-image relative bg-cover bg-center`}
            style={{ backgroundImage: `url(${thumbimg})` }}
        >
            <div className="relative isolate px-6 py-14 lg:px-8 bg-[#00000069]">
                <div className="container mx-auto py-32">
                    <div className="text-center col-span-2">
                        <h1 className="text-5xl font-bold tracking-tight text-white drop-shadow-md">
                            {props.data["propertyName"]}
                        </h1>
                        <p className="mt-2 text-lg leading-8 text-white drop-shadow-md">
                            in {props.data["community"]}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 ">
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing1stUSP"]}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing2ndUSP"]}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing3rdUSP"]}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing4thUSP"]}</div>
                        </div>
                        <p className="mt-6 text-lg leading-8 text-white drop-shadow-md">
                            by<br />{props.data["masterDeveloper"]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-4 items-center">
            <div className="text-3xl">{props.data["propertyName"]}</div>
            <div className="grid grid-cols-4 gap-4 items-center text-center">
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('overview')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('gallery')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('floor_plan')}</a>
                <a className="py-2 md:py-4 border-l-1 border-gray-400">{t('location')}</a>
            </div>
        </div>
        <div>
            <Breadcrumb/>
        </div>
        <div>
            <Gallery
                data={galleryData}
            />
        </div>
        {unitModels.length !== 0 ? (<div>
            <UnitModels
                data={fpGroup}
            />
        </div>) : ("")}
        <div className="container mx-auto my-8 px-5">
            <h2 className="font-medium text-center text-3xl my-10">
                {props.data["propertyName"]} {t("property_details")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                <CardOne title="Available Bedrooms" content={availbeds} />
                <CardOne title="Property Types" content={availtype} />
                <CardOne title="Master Developer" content={props.data['masterDeveloper']} />
                <CardOne title="Price Range" content={`${props.data['minPrice']} - ${props.data['maxPrice']}`} />
                <CardOne title="Area Range" content={`${props.data['areaRangeMin']} - ${props.data['areaRangeMax']}`} />
                <CardOne title="Price Range" content={props.data['minPrice']} />
                <CardOne title="Number of Apartment" content={props.data['numberOfApartment']} />
                <CardOne title="Property Type" content={props.data['propertyType']} />
                <CardOne title="Property Plan" content={props.data['propertyPlan']} />
                <CardOne title="Property Usage" content={props.data['propertyUsage']} />
                <CardOne title="Completion Date" content={props.data['completionDate']} />
                <CardOne title="Launch Date" content={props.data['launchDate']} />
                <CardOne title="Zone Type" content={props.data['zoneType']} />
            </div>
        </div>
        <div className="container mx-auto my-8 px-5">
            <h2 className="font-medium text-center text-3xl my-10">
                {props.data["propertyName"]} {t("location_map")}
            </h2>
            <MapComponent
                latitude={props.data['mapLatitude']}
                longitude={props.data['mapLongitude']}
                fallbackImage={props.data["featuredImages"]}
              />
        </div>
        {props.data["communityMapAndMasterPlan"] !== null ? (<div>
            <div className="container mx-auto my-8 px-5">
                <h2 className="font-medium text-center text-3xl my-10">
                    {props.data["propertyName"]} {t("master_plan")}
                </h2>
                <Image alt="Master Plan" src={props.data["communityMapAndMasterPlan"][0]['imageURL']} className="w-full" width={1000} height={500}/>
            </div>
        </div>) : ("")}
        {props.data['propertyPaymentPlans'] !== null
            ? (
        <div className="container mx-auto my-8 px-5">
            <h2 className="font-medium text-center text-3xl my-10">
                {props.data["propertyName"]} {t("payment_plan")}
            </h2>
        </div>) : ("")}
        {props.data["locationMapImages"] !== null ? (<div>
            <div className="container mx-auto my-8 px-5">
                <h2 className="font-medium text-center text-3xl my-10">
                    {props.data["propertyName"]} {t("location_plan")}
                </h2>
                <Image alt="Location Map Plan" src={props.data["locationMapImages"][0]['imageURL']} className="w-full" width={1000} height={500}/>
            </div>
        </div>) : ("")}
        {props.data['facilities'] !== null
            ? 
            <div className="container mx-auto my-8 px-5">
                <h2 className="font-medium text-center text-3xl my-10">
                    {t("facilities_in")} {props.data["propertyName"]}
                </h2>
                <div className="grid grid-cols-5 gap-4">
                    <CardGroup data={props.data['facilities']}/>
                </div>
            </div>
            : ""
        }
        {props.data['aminities'] !== null
            ? 
            <div className="container mx-auto my-8 px-5">
                <h2 className="font-medium text-center text-3xl my-10">
                    {t("aminities_in")} {props.data["propertyName"]}
                </h2>
                <div className="grid grid-cols-5 gap-4">
                    <CardGroup data={props.data['aminities']}/>
                </div>
            </div>
            : ""
        }
        <div className="container mx-auto my-8 px-5">
            <h2 className="font-medium text-center text-3xl my-10">
                {props.data["propertyName"]} {t("overview")}
            </h2>
            <div className="">
                {props.data["enPropertyOverView"]} 
            </div>
        </div>
        </>
    );
}

export default PropertyPage;