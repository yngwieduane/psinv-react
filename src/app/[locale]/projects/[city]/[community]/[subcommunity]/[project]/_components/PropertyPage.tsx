'use client'
import Link from "next/link";
import slugify from 'react-slugify';
import {useTranslations} from 'next-intl';


const PropertyPage = (props:any) => {

    const t = useTranslations('HomePage');
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'] : ("");

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
                            {t(props.data["propertyName"])}
                        </h1>
                        <p className="mt-2 text-lg leading-8 text-white drop-shadow-md">
                            in {t(props.data["community"])}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 ">
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{t(props.data["marketing1stUSP"])}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{t(props.data["marketing1stUSP"])}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{t(props.data["marketing1stUSP"])}</div>
                            <div className="text-xl font-bold tracking-tight text-white drop-shadow-md">{t(props.data["marketing1stUSP"])}</div>
                        </div>
                        <p className="mt-6 text-lg leading-8 text-white drop-shadow-md">
                            by<br />{t(props.data["masterDeveloper"])}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default PropertyPage;