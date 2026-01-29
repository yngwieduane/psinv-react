import UnitsPage from "./_components/UnitsPage";
import UnitsPageAI from "./_components/UnitsPageAI";
import type { Metadata } from "next";

type Props = {
  searchParams?: Promise<{
    unitid?: string;
    category?: string;
    propertyName?: string;
    propertyId?: string;
    beds?: string;
    page?: string;
  }>;
};

// ✅ Dynamic metadata based on filters
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;

  const category = params?.category;
  const beds = params?.beds;
  const propertyName = params?.propertyName;
  const propertyId = params?.propertyId;

  let title = "Units for Sale in UAE | Property Shop Investment";
  let description =
    "Browse apartments, villas, and properties for sale across UAE with Property Shop Investment.";

    //  Best case — name available
    if (propertyName) {
      title = `${propertyName} Units for Sale in UAE | Prices, Floor Plans & Offers | PSI`;
      description = `Browse available units for sale in ${propertyName} across UAE. View latest prices, floor plans, photos, and exclusive real estate offers with Property Shop Investment.`;
  
    //  only if property ID present
    } else if (propertyId) {
      title = `Property Units for Sale in UAE | Prices & Offers | PSI`;
      description = `Explore available units for sale in this property across UAE. View updated prices, layouts, and real estate opportunities with Property Shop Investment.`;
  
    //  Filter based SEO
    }  else if (category || beds) {
    title = `${beds ? beds + " Bedroom " : ""}${category || "Property"} Units for Sale in UAE | Buy & Invest with PSI`;

    description = `Explore a wide range of ${beds ? beds + "-bedroom " : ""}${category || "property"} units for sale across UAE. Compare prices, locations, and new developments with Property Shop Investment.`;
    }

  return { title, description };
}

export default async function Units(props: {
  searchParams?: Promise<{
    unitid?: string;
    category?: string;
    propertyName?: string;
    propertyId?: string;
    beds?: string;
    page?: string;
  }>;
}){
  const searchParams = await props.searchParams;
  const unitid = searchParams?.unitid || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const propertyId = searchParams?.propertyId || '';
  const beds = searchParams?.beds || '';
  console.log("mainPageUnits="+unitid);
  console.log("propertyId="+propertyId);


    return (
        <>
            <UnitsPageAI unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage}/>
        </>
    );
}