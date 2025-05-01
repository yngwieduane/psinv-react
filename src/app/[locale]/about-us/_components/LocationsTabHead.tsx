'use client'

import MainNavbarHeader from "../../_components/MainNavbarHeader";

const LocationsTabHead = ({data, visibleTab, setVisibleTab}: any) => {

    return(
        <>
            <MainNavbarHeader 
                data={data}
                visibleTab={visibleTab}
                setVisibleTab={setVisibleTab}
            />
        </>
    );
};

export default LocationsTabHead