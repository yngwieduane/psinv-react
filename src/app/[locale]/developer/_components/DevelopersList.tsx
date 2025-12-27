'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";

const DevelopersList = ({slug} : {slug : string}) => {

  const [developersData, setDevelopersData] = useState<any[]>([]);


  const developers = [
    {
        "name" : "Aldar Properties",
        "url" : "aldar-properties-pjsc",
        "nameRef" : "Aldar Properties PJSC",
    },
    {
        "name" : "Emaar Properties",
        "url" : "emaar",
        "nameRef" : "Emaar Properties",
    },
    {
        "name" : "Imkan Properties",
        "url" : "imkan-properties-llc",
        "nameRef" : "Imkan Properties LLC",
    },
    {
        "name" : "Meraas",
        "url" : "meraas",
        "nameRef" : "Meraas",
    },
    {
        "name" : "Dubai Properties",
        "url" : "dubai-properties---idama",
        "nameRef" : "Dubai Properties - IDAMA",
    },
    {
        "name" : "NSHAMA",
        "url" : "nshama",
        "nameRef" : "NSHAMA",
    },
    {
        "name" : "Aabar Properties",
        "url" : "aabar-properties-llc",
        "nameRef" : "Aabar Properties LLC",
    },
    {
        "name" : "Bloom",
        "url" : "bloom",
        "nameRef" : "Bloom",
    },
     {
        "name" : "Manazel Real Estate",
        "url" : "manazel-real-estate",
        "nameRef" : "Manazel Real Estate",
    },
     {
        "name" : "Hydra Properties",
        "url" : "hydra-properties",
        "nameRef" : "Hydra Properties",
    }

  ];

  useEffect(() => {                  
    const fetchDevelopers = async () => {
      try {
        const res = await fetch('/api/external/developersList');
        const developersjson = await res.json();
        console.log("Result is:", developersjson);
        if (developersjson?.result && Array.isArray(developersjson.result)) {
          setDevelopersData(developersjson.result);
        }
      } catch (error) {
        console.error("Failed to load developers:", error);
      }
    };

    fetchDevelopers();
  }, []);


  const getLogo = (name: string) => {              //to get developer logos from api, by comparing the developer names                   
    if (!developersData.length) return null; // or a default logo
    const developerFound = developersData.find((dev:any) => dev.name.trim().toLowerCase() === name.trim().toLowerCase());
    //console.log(`Developer name: ${name}, Logo: ${developerFound?.logo}`);
    return developerFound?.logo;
  };

  if (developers.length === 0) {
    return <p className="text-gray-500">No developers found.</p>;
  }

  const sortedDevelopers = [...developers].sort((a,b) => {
    if (a.url === slug) return -1 ;
    if (b.url === slug) return 1;
    return 0;
  });

  return (
    <div className="flex 2xl:justify-center gap-4 xl:overflow-x-hidden overflow-x-auto w-full scroll-smooth snap-x snap-mandatory scrollbar-hide">

      {sortedDevelopers.map((developer, index) => {
        return (
          <div key={index} className= {`inline-flex border rounded-lg  md:w-[120px] w-full md:h-[170px] h-[140px] snap-start
          ${slug == developer.url ? "active border-2 border-black drop-shadow-xl" : "border-[#ddd] bg-white"}
          `}>
            <Link href={`/en/developer/${developer.url}`}>
              <div className={`text-[#343a40] md:h-[115px] h-[85px] flex md:w-[120px] w-[100]
              flex-column align-center items-center text-center p-2 ${slug == developer.url ? "h-auto" : ""}`}>
                <div className="bg-white p-0 py-2 text-center w-full flex justify-center">
                  <img src={getLogo(developer.nameRef)} className="md:h-[80px] h-[50px]" />
                </div>                 
                <p className="md:text-sm text-xs mt-4">{developer.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );

}

export default DevelopersList;