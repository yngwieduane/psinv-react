'use client'

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../LeafletMap'), {    //load LeafletMap only on client side, (without SSR(Server Side Rendering))
    ssr: false,
  });
  
  export default function Map(props: any) {
    return <MapWithNoSSR {...props} />;
  }