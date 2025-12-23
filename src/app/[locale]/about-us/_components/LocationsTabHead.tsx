'use client'

import LocationTabHeadContent from "./LocationTabHeadContent";

const LocationsTabHead = ({data, visibleTab, setVisibleTab}: any) => {

    return(
        <>
            <LocationTabHeadContent
                data={data}
                visibleTab={visibleTab}
                setVisibleTab={setVisibleTab}
            />
        </>
    );
};

export default LocationsTabHead