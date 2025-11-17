'use client'
import { Link } from '@/i18n/navigation';
import React from "react";
import slugify from "react-slugify";
import {useFormatter} from 'next-intl';
import Image from 'next/image';

const PropertyCard = (props:any) => {
  
    const format = useFormatter();
    let HOdate;

    const propType = props.data["propertyType"] ? (<p className="text-sm">Types<br />{props.data["propertyType"]}</p>) : ("");
    const propBed = props.data["availableBedrooms"] ? (<p className="text-sm">Beds<br />
    {props.data["availableBedrooms"].map((img:any) => {
        return img['noOfBedroom']+',';
    })}
    </p>) : ("");
    if(props.data["handoverDate"]){
      HOdate = new Date(props.data["handoverDate"]);
      HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short'});
    }else{
      HOdate = false;
    }

    const propHO = HOdate ? (<p className="text-sm">Handover<br />{HOdate}</p>) : ("");
    const propSize = (props.data["builtupArea_SQFT"] && props.data["builtupArea_SQFT"] !== '0') ? (<p className="text-sm">Size (BUA)<br />{props.data["builtupArea_SQFT"]}</p>) : ("");
    const imgFeatured = props.data["featuredImages"] ? props.data["featuredImages"][0]['imageURL'].replace('?width=0&height=0','?width=384&height=200') : ("");
    const subCommunity = props.data["subCommunity"] ? props.data["subCommunity"] : "n-a";

    const url =  '/projects/' + slugify(props.data['city']) + "/" + slugify(props.data['community']) + "/" + slugify(subCommunity) + "/" + slugify(props.data['propertyName']);
return (
    <Link title={props.data["propertyName"]} href={url} className="h-full">
      <div className={`max-w-96 ${props.csswidth} group relative shadow-lg rounded-lg h-full hover:bg-gray-200 `}>
        <div className="aspect-h-2 aspect-w-4 overflow-hidden bg-gray-100 relative rounded-lg">
          {imgFeatured !== '' ? (
              <Image
                src={imgFeatured}
                alt={imgFeatured}
                title={imgFeatured}
                className="h-50 w-full"
                width={300}
                height={200}
              />
            ) : (
              <div className='w-full h-50 bg-light'></div>
          )}
          <div
            className="flex items-center justify-center absolute w-full h-full opacity-0 ease-in duration-300"
            aria-hidden="true"
          >
            <div className="w-full h-full p-4 items-center grid grid-cols-1 my-auto rounded-md text-center text-white font-medium text-gray-900 bg-black/50">
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
        <div className="flex text-center justify-around border-t border-gray-200 py-5 mt-5 group-hover:border-white">
          {propType}
          {propBed}
          {propHO}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
