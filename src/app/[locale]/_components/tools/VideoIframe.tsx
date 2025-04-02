'use client'

export default async function VideoIframe(props:any) {
    const src = await props.src;

    return <iframe src={src} allowFullScreen />
}