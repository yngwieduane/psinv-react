import AccordionTabs from "@/app/[locale]/_components/tools/AccordionTabs";
import {useTranslations} from 'next-intl';

const Faqs = (props:any) => {
    const t = useTranslations('ProjectPage');
    const propCommunity = props.data['propertyName'] + " in " +props.data['subCommunity'];
    let availtype = '';
    if(props.data['propertyUnitTypes']){
        props.data['propertyUnitTypes'].forEach((array:any) => {
            availtype += array.unitType;
            availtype += ','
        });
        availtype = availtype.slice(0, availtype.length - 1);
    }
    availtype = availtype.slice(0, availtype.length - 1);
    const accordionData = [
    {
        title: 'Where is ' + propCommunity + ' located?',
        content: propCommunity + ' is located in '+ props.data['community'] + ' ' + props.data['city'],
    },
    {
        title: 'Who is the developer of ' + propCommunity + '?',
        content: 'The developer of ' + propCommunity + ' is '+ props.data['masterDeveloper'],
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
                <h2 className="text-xl mb-5 text-[#111954]">
                    {t("faqs")}
                </h2>
                <AccordionTabs items={accordionData} />
            </div>
        </>
    );
}

export default Faqs;