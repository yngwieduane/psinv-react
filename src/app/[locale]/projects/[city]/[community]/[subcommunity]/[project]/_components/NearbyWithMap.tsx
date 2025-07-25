'use client'
import { NearbysType } from "@/types/types";
import { calculateDistance, Coordinate } from "@/utils/utils";
import { useState, useEffect, Fragment, useCallback, Key } from "react";
import classNames from 'classnames';

import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerProps,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';

export type AnchorPointName = keyof typeof AdvancedMarkerAnchorPoint;

import './NearbyWithMap.css';
import { RealEstateIcon } from "../../../../../../../../../public/icons/real-estate-icon";

const NearbysWithMap = ({
    latitude,
    longitude,
    distance
  }: {
    latitude: string;
    longitude: string;
    distance: number;
  }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<NearbysType[]>([]);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [chosenLandmark, setChosenLandmark] = useState<Coordinate[]>([]);
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string;
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (latitude) {
          setLoading(true);
          fetch(`/api/external/nearbys?latitude=${latitude}&longitude=${longitude}&distance=${distance}`)
            .then(res => res.json())
            .then(data => {
              setResults(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setResults([]);
          setLoading(false);
        }
      }, 300);
  
      return () => clearTimeout(timeout);
    }, [query]);
    const data = results.sort((a, b) => parseInt(b.longitude) - parseInt(a.longitude)).map((dataItem, index) => ({...dataItem, zIndex: index}));

    const mainlat = parseFloat(latitude);
    const mainlng = parseFloat(longitude);
    const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    const renderCustomPin = () => {
        return (
        <>
            <div className="custom-pin">
            <button className="close-button">
                <span className="material-symbols-outlined"> close </span>
            </button>

            <div className="image-container">
                {/* <RealEstateGallery
                images={realEstateListing.fallbackImage}
                isExtended={clicked}
                /> */}
                <span className="icon">
                <RealEstateIcon />
                </span>
            </div>

            {/* <RealEstateListingDetails details={realEstateListing.details} /> */}
            </div>

            <div className="tip" />
        </>
        );
    };

    const onMapClick = useCallback(() => {
        // setSelectedId(null);
        // setSelectedMarker(null);
        // setInfoWindowShown(false);
    }, []);

    const handleLocationClick = (location: any) => {
        console.log('Clicked');
        setChosenLandmark(location);
    };
    return (
        <>
        {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}
        {results.length > 0 && (
            <>
            <h2 className="text-xl mb-5 text-[#111954]">
                Nearbys
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
                <ul role="list" className="grid grid-cols-2 md:grid-cols-2 space-y-3 space-x-3 overflow-auto max-h-42 md:max-h-[600px] py-2">
                    {data.slice(0, 20).map((post, index) => {
                        const pointA: Coordinate = { lat: parseFloat(latitude), lng: parseFloat(longitude) }; 
                        const pointB: Coordinate = { lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }; 

                        const distance = calculateDistance(pointA, pointB);

                        return (
                            <li
                            key={index}
                            className=""
                            >
                                <button 
                                    onClick={()=>{
                                        handleLocationClick(pointB);
                                    }}  
                                    className="w-full overflow-hidden bg-white px-4 py-4 shadow-sm sm:rounded-md sm:px-6 cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                                    >
                                    <p className="text-xs">{post.categoryName}</p>
                                    <p className="text-sm truncate normal-case">{post.landmarkEnglishName}, {post.addressLine1English}</p>
                                    <p>{distance}km</p>
                                </button>
                            </li>
                        )
                    })}
                </ul>
                <div className="advanced-marker-example">
                    <APIProvider apiKey={API_KEY} libraries={['marker']}>
                        <Map
                            mapId={'49ae42fed52588c3'}
                            defaultZoom={12}
                            defaultCenter={{lat: mainlat, lng: mainlng}}
                            onClick={onMapClick}
                            clickableIcons={false}
                            style={{width: '100%', height: '70vh'}}
                            fullscreenControl={false}>
                            <AdvancedMarker
                                position={position}
                                title={'AdvancedMarker with custom html content.'}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                className={classNames('real-estate-marker', {clicked, hovered})}
                                // onClick={() => setClicked(!clicked)} 
                                >
                                {renderCustomPin()}
                            </AdvancedMarker>
                            <Directions latitude={latitude} longitude={longitude} data={data} chosenLandmark={chosenLandmark}/>
                        </Map>
                    </APIProvider>
                </div>
            </div>
            </>
        )}
        </>
    );
};

function Directions({data,latitude,longitude,chosenLandmark}:{data:any;latitude:any;longitude:any;chosenLandmark:any}) {
    const map = useMap();
    const maps = useMapsLibrary("maps");
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    const Z_INDEX_SELECTED = data.length;
    const Z_INDEX_HOVER = data.length + 1;
    
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedLandmark, setSelectedLandmark] = useState<NearbysType[]>([]);

    const [selectedMarker, setSelectedMarker] =
        useState<google.maps.marker.AdvancedMarkerElement | null>(null);
    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
    const onMouseLeave = useCallback(() => setHoverId(null), []);
    const onMarkerClick = useCallback(
        (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
        setSelectedId(id);

        if (marker) {
            setSelectedMarker(marker);
        }

        if (id !== selectedId) {
            setInfoWindowShown(true);
        } else {
            setInfoWindowShown(isShown => !isShown);
        }
        },
        [selectedId]
    );

    const handleInfowindowCloseClick = useCallback(
        () => setInfoWindowShown(false),
        []
    );

    const mainlat = parseFloat(latitude);
    const mainlng = parseFloat(longitude);
    const position = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(
        new routesLibrary.DirectionsRenderer({
            draggable: true, // Only necessary for draggable markers
            map
        })
        );
    }, [routesLibrary, map]);


    //chosenLandmark

    useEffect(() => {
    if(chosenLandmark) {
        handleDirectionsRequest(chosenLandmark);
    }  
    }, [chosenLandmark]);

    //const directionsRenderer = new google.maps.DirectionsRenderer({map});
    const handleDirectionsRequest = async (destination: Coordinate) => {
        console.log('Driving');
        console.log(destination);
        const directionsService = new google.maps.DirectionsService();
        
        const request: google.maps.DirectionsRequest = {
            origin: position, // current/main location
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
                console.log(result);
            } else {
                console.error("Directions request failed due to " + status);
            }
        })
        .then(response => {
            directionsRenderer?.setDirections(response);
            setRoutes(response.routes);
            //console.log(routes)
        });

    };
    return (
        <>
            {data.slice(0, 20).map((post: NearbysType, index: any) => {
                let zIndex = index;

                if (hoverId === post.landmarkId) {
                    zIndex = Z_INDEX_HOVER;
                }

                if (selectedId === post.landmarkId) {
                    zIndex = Z_INDEX_SELECTED;
                }

                const position = {
                    lat: parseFloat(post.latitude),
                    lng: parseFloat(post.longitude)
                };

                return (
                    <AdvancedMarkerWithRef
                        onMarkerClick={(
                        marker: google.maps.marker.AdvancedMarkerElement
                        ) => {
                            //onMarkerClick(post.landmarkId, marker);
                            handleDirectionsRequest(position);
                            setSelectedLandmark([post]);
                        }}
                        onMouseEnter={() => onMouseEnter(post.landmarkId)}
                        onMouseLeave={onMouseLeave}
                        key={post.landmarkId}
                        className="custom-marker"
                        style={{
                            transform: `scale(${[hoverId, selectedId].includes(post.landmarkId) ? 1.3 : 1})`,
                            transformOrigin: AdvancedMarkerAnchorPoint['BOTTOM'].join(' ')
                        }}
                        position={position}>
                        <Pin
                        background={selectedId === post.landmarkId ? '#22ccff' : null}
                        borderColor={selectedId === post.landmarkId ? '#1e89a1' : null}
                        glyphColor={selectedId === post.landmarkId ? '#0f677a' : null}
                        />
                    </AdvancedMarkerWithRef>
                );
            })}
            {infoWindowShown && selectedMarker && (
            <InfoWindow
                anchor={selectedMarker}
                pixelOffset={[0, -2]}
                onCloseClick={handleInfowindowCloseClick}>
                <h2 className="hidden">Marker {selectedId}</h2>
                <h2 className="text-lg">{selectedLandmark[0]?.landmarkEnglishName}</h2>
                <ul>
                {routes.map((route, index) => (
                    <li key={route.summary}>
                        <p>From: {route.legs[0].start_address.split(',')[0]}</p>
                        <p>To: {route.legs[0].end_address.split(',')[0]}</p>
                        <p>Distance: {route.legs[0].distance?.text}</p>
                        <p>Duration: {route.legs[0].duration?.text}</p>
                    </li>
                ))}
                </ul>
            </InfoWindow>
            )}
        </>
  );
}

export const AdvancedMarkerWithRef = (
  props: AdvancedMarkerProps & {
    onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
  }
) => {
  const {children, onMarkerClick, ...advancedMarkerProps} = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}>
      {children}
    </AdvancedMarker>
  );
};

export default NearbysWithMap;