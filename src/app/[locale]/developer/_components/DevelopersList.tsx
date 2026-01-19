'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/outline";


const DevelopersList = ({ slug }: { slug: string }) => {

  const [developersData, setDevelopersData] = useState<any[]>([]);

  const developers = [
    {
      "name": "Aldar Properties",
      "url": "aldar-properties-pjsc",
      "nameRef": "Aldar Properties PJSC",
    },
    {
      "name": "Emaar Properties",
      "url": "emaar",
      "nameRef": "Emaar Properties",
    },
    {
      "name": "Imkan Properties",
      "url": "imkan-properties-llc",
      "nameRef": "Imkan Properties LLC",
    },
    {
      "name": "Meraas",
      "url": "meraas",
      "nameRef": "Meraas",
    },
    {
      "name": "Dubai Properties",
      "url": "dubai-properties---idama",
      "nameRef": "Dubai Properties - IDAMA",
    },
    {
      "name": "NSHAMA",
      "url": "nshama",
      "nameRef": "NSHAMA",
    },
    {
      "name": "Aabar Properties",
      "url": "aabar-properties-llc",
      "nameRef": "Aabar Properties LLC",
    },
    {
      "name": "Bloom",
      "url": "bloom",
      "nameRef": "Bloom",
    },
    {
      "name": "Manazel Real Estate",
      "url": "manazel-real-estate",
      "nameRef": "Manazel Real Estate",
    },
    {
      "name": "Hydra Properties",
      "url": "hydra-properties",
      "nameRef": "Hydra Properties",
    }
  ];

  // Fetch Logos from API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch('/api/external/developersList');
        const developersjson = await res.json();
        if (developersjson?.result && Array.isArray(developersjson.result)) {
          setDevelopersData(developersjson.result);
        }
      } catch (error) {
        console.error("Failed to load developers logos:", error);
      }
    };

    fetchLogos();
  }, []);

  const getLogo = (nameRef: string) => {
    if (!developersData.length) return null;
    const developerFound = developersData.find((dev: any) =>
      dev.name.trim().toLowerCase() === nameRef.trim().toLowerCase() ||
      nameRef.toLowerCase().includes(dev.name.trim().toLowerCase())
    );
    return developerFound?.logo || '/assets/images/placeholder_logo.png';
  };

  // Since developers is now a static array, it will always have items.
  // The loading state is no longer needed for the developers list itself.

  const sortedDevelopers = [...developers].sort((a, b) => {
    if (a.url === slug) return -1;
    if (b.url === slug) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex 2xl:justify-center gap-4 xl:overflow-x-hidden overflow-x-auto w-full scroll-smooth snap-x snap-mandatory scrollbar-hide py-4">

      {sortedDevelopers.map((developer, index) => {
        const logoUrl = getLogo(developer.nameRef);
        return (
          <div key={index} className={`inline-flex border rounded-lg md:w-[120px] w-full md:h-[170px] h-[140px] snap-start shrink-0
          ${slug == developer.url ? "active border-2 border-black drop-shadow-xl" : "border-[#ddd] bg-white"}
          transition-all duration-300 hover:shadow-lg cursor-pointer
          `}>
            <Link href={`/en/developer/${developer.url}`} className="w-full h-full">
              <div className={`text-[#343a40] h-full flex w-full flex-col items-center justify-between p-2`}>
                <div className="bg-white p-2 w-full flex items-center justify-center flex-1">
                  {logoUrl && logoUrl !== '/assets/images/placeholder_logo.png' ? (
                    <img src={logoUrl} className="md:max-h-[80px] max-h-[50px] object-contain" alt={developer.name} />
                  ) : (
                    <UsersIcon className="h-10 w-10 text-gray-300" />
                  )}

                </div>
                <p className="md:text-sm text-xs text-center font-medium line-clamp-2 w-full">{developer.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );

}

export default DevelopersList;