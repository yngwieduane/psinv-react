import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";


export default async function UnitPage(props: any) {
    props.data
    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
        </>
    );  
}