
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { useState, useEffect } from "react";

type Units = {
    category: string;
    code: string;
    status: string;
    refNo: string;
    community: string;
    propertyname: string;
    built_upArea: string;
    bedrooms: string;
    unitView: string | null;
    unitModel: string | null;
    floorNo: string | null;
    handoverDate: string;
    agent: string;
    contactNumber: string | null;
    remarks: string;
    imageurl: string;
    facilities: string;
    country_name: string;
    state_name: string;
    city_name: string;
    district_name: string;
    financing_company: string | null;
    parking: string;
    sub_type: string;
    floorPlans: string | null;
    sellprice: string;
    rent: string | null;
    sub_community: string;
    property_overview: string;
    local_area_amenities_des: string | null;
    no_of_bathrooms: string;
    pdfBrochureLink: string | null;
    fittingFixtures: string | null;
    unit_Amenities: string;
    agent_Pk: string;
    property_Pk: string;
    property_ownership_desc: string | null;
    country_pk: string;
    state_pk: string;
    city_pk: string;
    district_pk: string;
    community_pk: string;
    sub_community_pk: string | null;
    view_360: string | null;
    agent_rera_no: string | null;
    pro_google_coordinates: string;
    salesmanemail: string;
    last_updated: string;
    listing_date: string;
    expiry_date: string;
    recomended_properties: string | null;
    financeOffered: string | null;
    newspaper: string | null;
    roi: string | null;
    externalUrl: string | null;
    infoGraphics: string | null;
    marketingTitle: string;
    title_AR: string | null;
    description_Ar: string | null;
    externalUrl_youtube: string | null;
    externalUrl_VirtualTour: string | null;
    featuredProperty: string;
    dealOfTheDay: string;
    dealExpirationPeriod: string | null;
    targetPrice: string | null;
    developerName: string;
    currentOffer: string | null;
    marketingOptions: string;
    mandate: string | null;
    currencyAbr: string;
    areaMeasurement: string;
    reraStrNo: string | null;
    furnish_status: string;
};
const SimilarUnits = ({
    propid,
    category,
    display
  }: {
    propid: number;
    category: string;
    display: number;
  }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Units[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (category.trim() !== "") {
          setLoading(true);
          fetch(`/api/external/units/project?propid=${propid}&category=${category}`)
            .then(res => res.json())
            .then(data => {
              setResults(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setResults([]);
          setLoading(false);
        }
      }, 300);
  
      return () => clearTimeout(timeout);
    }, [query]);

    return (
        <>
        {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}
        {results.length > 0 && (
            <>
            <ul
                role="list"
                className="mx-4 flex space-x-3 sm:mx-6 overflow-x-auto"
            >
                {results.slice(0,display).map((post, index) => {
                    const propertyData = {
                        bedrooms: post.bedrooms,
                        propertyType: post.category,
                        adType: category,
                        name: post.propertyname,
                        community: post.community,
                        emirate: post.city_name,
                        refNo: post.refNo,
                        seoStart: "",
                    };
                    const seoData = generateSeoData(propertyData);
                    
                    return (
                        <li
                        key={index}
                        className="inline-flex flex-col text-center w-96 "
                        >
                            <UnitBox data={post} seoUrl={seoData.seoUrl}/>
                        </li>
                    )
                })}
            </ul>
            </>
        )}
        </>
    );
};


export default SimilarUnits;