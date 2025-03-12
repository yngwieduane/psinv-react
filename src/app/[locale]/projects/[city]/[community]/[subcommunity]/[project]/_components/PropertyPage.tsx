'use client'
import Link from "next/link";
import slugify from 'react-slugify';
import {useTranslations} from 'next-intl';
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import Gallery from "./Gallery";
import UnitModels from "./UnitModels";


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
    return (
        <>
        <div
            className="bg-white background-image relative"
            style={{ backgroundImage: `url(${imgFeatured})` }}
        >
            <div className="relative isolate px-6 py-14 lg:px-8">
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
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing1stUSP"]}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing1stUSP"]}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{props.data["marketing1stUSP"]}</div>
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
        </>
    );
}

export default PropertyPage;