import { Metadata } from "next";
import { developers } from "@/data/developerList";
import DevelopersList from "../_components/DevelopersList";
import DevPropertyList from "../_components/DevPropertyList";
import Breadcrumb from "../../_components/Breadcrumb";

type Props = {
  params: { developer: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dev = developers.find(d => d.url === params.developer);

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

export default function DeveloperPage({ params }: Props) {
  const developerSlug = params.developer;
  const developerName = developerMap[developerSlug];

  return (
    <div className="mx-auto container pt-32">
      <Breadcrumb />

      <h1 className="text-2xl text-center truncate">
        {developerName || "Developers"}
      </h1>

      <div className="w-full flex my-5 justify-content-center">
        <DevelopersList slug={developerSlug} />
      </div>

      <div className="mb-5 mt-10">
        <DevPropertyList developer={developerName} />
      </div>
    </div>
  );
}
