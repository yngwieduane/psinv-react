'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InquiryForm from "../../_components/InquiryForm";
import DrawerDetails from "../../unit/[slug]/components/DrawerDetails";
import { useState } from "react";
import Sticky from 'react-sticky-el';
import { CalendarCheck } from "lucide-react";

const UnitsSidebar = (props: any) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content: string, valuesarray: any) => (e: any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }

    return (
        <div className="w-full">
            <Sticky boundaryElement=".mainuppper" hideOnBoundaryHit={false}>
                <div className="hidden md:flex">
                    <InquiryForm hideFeedbackButton={true} />
                </div>
                <div className="p-5">
                    <button
                        type="button"
                        onClick={drawerHandler('requestview', props.data)}
                        name="details"
                        className="w-full rounded-lg border border-[#111954] p-4 cursor-pointer"
                    >
                        <CalendarCheck /> Request a Meeting
                    </button>
                </div>
                <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
            </Sticky>
        </div>
    );
}

export default UnitsSidebar;