'use client'
import { Link } from '@/i18n/navigation';
import React from "react";
import slugify from "react-slugify";

const PropertyCard = (props:any) => {
    const propType = props.data["propertyType"] ? (<p className="text-sm">Types<br />{props.data["propertyType"]}</p>) : ("");
    const propBed = props.data["availableBedrooms"] ? (<p className="text-sm">Beds<br />
    {props.data["availableBedrooms"].map((img:any) => {
        return img['noOfBedroom'];
    })}
    </p>) : ("");
    const propHO = props.data["handoverDate"] ? (<p className="text-sm">Handover<br />{props.data["handoverDate"]}</p>) : ("");
    const propSize = (props.data["builtupArea_SQFT"] && props.data["builtupArea_SQFT"] !== '0') ? (<p className="text-sm">Size<br />{props.data["builtupArea_SQFT"]}</p>) : ("");
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'].replace('?width=0&height=0','?width=400&height=230') : ("");
    const subCommunity = props.data["subCommunity"] ? props.data["subCommunity"] : "n-a";

    const url =  '/projects/' + slugify(props.data['city']) + "/" + slugify(props.data['community']) + "/" + slugify(subCommunity) + "/" + slugify(props.data['propertyName']);
return (
    <Link href={url} className="h-full">
      <div className={`max-w-96 ${props.csswidth} group relative shadow-lg rounded-lg h-full hover:bg-gray-200 `}>
        <div className="aspect-h-2 aspect-w-4 overflow-hidden bg-gray-100 relative rounded-lg">
          {imgFeatured !== '' ? (
              <img
                src={imgFeatured}
                alt={imgFeatured}
                className="object-cover object-center"
              />
            ) : (
              <div className='w-full h-50 bg-light'></div>
            )}
          <div
            className="flex items-center justify-center absolute w-full h-full opacity-0 ease-in duration-300"
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
        <div className="flex text-center justify-around border-t border-gray-200 py-5 mt-5">
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
