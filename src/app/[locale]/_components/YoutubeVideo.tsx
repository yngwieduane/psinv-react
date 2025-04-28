"use client";

import React, { useState } from "react";
import YouTube,{YouTubeEvent, YouTubeProps} from "react-youtube";

interface YoutubeVideoProps {
    videoId: string;
    thumb: string;
    height: string;
  }

  const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ videoId, thumb, height }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const options: YouTubeProps["opts"] = {
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };

    const handleClick = () => {
        setIsPlaying(true);
    };

    if(!thumb || thumb.trim() === "") {
        return <YouTube videoId={videoId} opts={options} id="video" />;
    }

    //else part
    return(
        <div className={`${height} w-full relative`}>
            {!isPlaying ? (
                <div onClick={handleClick} className="cursor-pointer relative h-full w-full">
                    <img src={thumb}  alt="Video thumbnail" className="w-full h-full object-cover rounded-lg"
                        style={{ width: "100%", objectFit: "cover", borderRadius: "8px" }}
                    />                    
                   <div className="blob-play absolute inset-0 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <polygon points="16,12 28,20 16,28" fill="#2C2D65" />
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full">
                    <YouTube videoId={videoId} opts={options} className="w-full h-full"
                    // onReady={onReady} 
                    id="video" />
                </div>
            )}             
                
        </div>        
    );     
    
};

export default YoutubeVideo;