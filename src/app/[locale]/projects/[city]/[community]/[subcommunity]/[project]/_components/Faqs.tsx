import AccordionTabs from "@/app/[locale]/_components/tools/AccordionTabs";
import { useTranslations } from 'next-intl';
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Faqs = (props: any) => {
    const router = useRouter();
    const t = useTranslations('ProjectPage');
    const propCommunity = props.data['propertyName'] + " in " + props.data['subCommunity'];
    let availtype = '';
    if (props.data['propertyUnitTypes']) {
        props.data['propertyUnitTypes'].forEach((array: any) => {
            availtype += array.unitType;
            availtype += ','
        });
        availtype = availtype.slice(0, availtype.length - 1);
    }
    availtype = availtype.slice(0, availtype.length - 1);
    const accordionData = [
        {
            title: 'Where is ' + propCommunity + ' located?',
            content: propCommunity + ' is located in ' + props.data['community'] + ' ' + props.data['city'],
        },
        {
            title: 'Who is the developer of ' + propCommunity + '?',
            content: 'The developer of ' + propCommunity + ' is ' + props.data['masterDeveloper'],
        },
        {
            title: 'What are the property types for ' + propCommunity + '?',
            content: 'The property types for ' + propCommunity + ' are ' + availtype,
        },
        {
            title: 'Which is the best property management company for ' + propCommunity + '?',
            content: 'The best property management company in ' + propCommunity + ' is Property Shop Investment',
        },
    ];

    return (
        <>
            <div className="">
                <div className="flex items-center gap-4 mb-2">
                    {props.viewAllLink ? (
                        <button onClick={() => router.push(props.viewAllLink)} className="flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors">
                            <h2 className="text-3xl font-bold text-[#111954] relative inline-block">{t("faqs")}</h2>
                        </button>
                    ) : (
                        <h2 className="text-3xl font-bold text-[#111954] relative inline-block">{t("faqs")}</h2>
                    )}
                </div>
                <h2 className="text-xl text-gray-500 mb-8">{props.propname}</h2>
                <AccordionTabs items={accordionData} />
            </div>
        </>
    );
}

export default Faqs;