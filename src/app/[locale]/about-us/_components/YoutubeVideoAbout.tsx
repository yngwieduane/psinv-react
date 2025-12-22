'use client'

import { useState } from "react"
import { boolean } from "zod";

interface YouTubeVideoProps {
    videoId: string,
    thumb?: string,
    height?: string,
}
const YoutubeVideoAbout: React.FC<YouTubeVideoProps> = ({ videoId, thumb, height = 'h-[350px] md:h-[690px]' }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative w-full max-w-5xl mx-auto aspect-video bg-gray-900 rounded shadow-2xl group cursor-pointer overflow-hidden">
            {!isPlaying ? (
                <>
                    <img
                        src={thumb}
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                        alt="Video Thumbnail"
                    />
                    <div className="w-20 h-20  bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-300 blob-play absolute inset-0 flex items-center justify-center" onClick={() => setIsPlaying(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#1E2B4B" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play text-primary ml-1" aria-hidden="true">
                            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path></svg>
                    </div>
                </>
            )
                : (

                    <iframe
                        className="w-full h-full rounded"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
        </div>
    )

}

export default YoutubeVideoAbout