'use client';

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import('../GoogleMapEmbed'), { ssr: false });

export default function Map(props: any) {
  return <MapWithNoSSR {...props} />;
}