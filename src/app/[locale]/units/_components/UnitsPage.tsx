
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import { Suspense } from "react";
import { Skeleton } from "../../_components/tools/Skeleteon";
import UnitsSideSearch from "./UnitsSideSearch";

export default async function UnitsPage(props: any) {
    const unitid = props.unitid || '';
    const category = props.category || '';
    const currentPage = Number(props.page) || 1;
    const propertyId = props.propertyId || '';
    const beds = props.beds || '';

    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <div className="grid grid-cols-4 gap-4 mainuppper">
                    <div className="col-span-4">
                        <Search placeholder="Search by Reference ID"/>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                        <div className="mt-0 space-y-5 lg:mt-2 lg:space-y-5">
                            <Suspense key={unitid + currentPage} fallback={<Skeleton />}>
                                <UnitsList unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage} />
                            </Suspense>
                        </div>
                    </div>
                    <div className="hidden md:flex mt-16 space-y-10 lg:mt-2 lg:space-y-5">
                        <div className="grid grid-cols-1">
                            <UnitsSideSearch onChange=''/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );  
}