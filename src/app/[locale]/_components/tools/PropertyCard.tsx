'use client'
import {useLocale, useTranslations} from 'next-intl';
import React from "react";
import Link from "next/link";
import slugify from "react-slugify";

const PropertyCard = (props:any) => {
    const locale = useLocale();
    const propType = props.data["propertyType"] ? (<p className="text-sm">Types<br />{props.data["propertyType"]}</p>) : ("");
    const propBed = props.data["availableBedrooms"] ? (<p className="text-sm">Beds<br />
    {props.data["availableBedrooms"].map((img:any) => {
        return img['noOfBedroom'];
    })}
    </p>) : ("");
    const propHO = props.data["handoverDate"] ? (<p className="text-sm">Handover<br />{props.data["handoverDate"]}</p>) : ("");
    const propSize = props.data["builtupArea_SQFT"] ? (<p className="text-sm">Size<br />{props.data["builtupArea_SQFT"]}</p>) : ("");
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'] : ("");
    const subCommunity = props.data["subCommunity"] ? props.data["subCommunity"] : "n-a";

    const url = "/" + locale + '/projects/' + slugify(props.data['city']) + "/" + slugify(props.data['community']) + "/" + slugify(subCommunity) + "/" + slugify(props.data['propertyName']);
return (
    <Link href={url} className="h-full">
      <div className="w-96 group relative shadow-lg rounded-lg h-full">
        <div className="aspect-h-2 aspect-w-4 overflow-hidden bg-gray-100 relative rounded-lg">
          <img
            src={imgFeatured}
            alt={imgFeatured}
            className="object-cover object-center"
          />
          <div
            className="flex items-center justify-center absolute w-full h-full opacity-0 group-hover:opacity-100 ease-in duration-300"
            aria-hidden="true"
          >
            <div className="w-full h-full p-4 items-center grid grid-cols-1 my-auto rounded-md text-center text-white font-medium text-gray-900 bg-black/[.5]">
              <div>
                <h2 className="text-3xl">{props.data["propertyName"]}</h2>
                <p>{props.data["community"]}</p>
                <p>by {props.data["masterDeveloper"]}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-50 left-0 text-white text-gray-500 opacity-7 ">
          {props.data["maxPrice"]}
        </p>
        <div className="mt-5 text-start justify-between text-base font-medium text-gray-900 px-5">
          <h3 className="text-2xl truncate">{props.data["propertyName"]}</h3>
          <p>
            {props.data["community"]} | {props.data["masterDeveloper"]}
          </p>
        </div>
        <div className="flex text-center justify-around border-t py-5 mt-5">
          {propType}
          {propBed}
          {propHO}
          {propSize}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
