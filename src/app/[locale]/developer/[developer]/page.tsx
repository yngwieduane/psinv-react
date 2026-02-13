import { Metadata } from "next";
import { developers } from "@/data/developerList";
import DevelopersList from "../_components/DevelopersList";
import DevPropertyList from "../_components/DevPropertyList";
import Breadcrumb from "../../_components/Breadcrumb";

type Props = {
  params: Promise<{
    locale: string;
    developer: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { developer } = await params;
  
    const dev = developers.find((d) => d.url === developer);
  
    return {
      title: `⚡ ${dev?.metaTitle || "Property Developers in UAE"} - PSI`,
      description:
        dev?.metaDescription ||
        "Browse real estate developers and projects across UAE with PSI.",
    };
  }
  

const developerMap: Record<string, string> = {
  "aldar-properties-pjsc": "Aldar Properties PJSC",
  "emaar": "Emaar Properties",
  "hydra-properties": "Hydra Properties",
  "imkan-properties-llc": "IMKAN PROPERTIES LLC",
  "meraas": "Meraas",
  "nshama": "NSHAMA",
  "aabar-properties-llc": "Aabar Properties LLC",
  "bloom": "Bloom",
  "manazel-real-estate": "Manazel Real Estate",
  "dubai-properties---idama": "Dubai Properties - IDAMA",
};

export default async function DeveloperPage({ params }: Props) {
  const { developer } = await params;

  const developerName = developerMap[developer];

  return (
    <div className="pt-28 md:pt-36">
      <div className="container mx-auto px-6 md:px-12 flex items-center space-x-2 text-gray-500">
          <Breadcrumb  />
      </div>
      <div className="container mx-auto px-4 md:px-12 py-4">
        <h1 className="text-2xl text-center truncate mt-10">
          {developerName || "Developers"}
        </h1>

        <div className="w-full flex my-5 justify-center">
          <DevelopersList slug={developer} />
        </div>

        <div className="mb-5 mt-10">
          <DevPropertyList developer={developerName} />
        </div>
      </div>
    </div>
  );
}