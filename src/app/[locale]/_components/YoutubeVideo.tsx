"use client";

import React, { useState } from "react";
import YouTube,{YouTubeEvent, YouTubeProps} from "react-youtube";

interface YoutubeVideoProps {
    videoId: string;
    thumb: string;
  }

  const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ videoId, thumb }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const options: YouTubeProps["opts"] = {
        height: "690",
        width: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };

    const handleClick = () => {
        setIsPlaying(true);
    };
    // const thumbnailUrl = `${thumb}`;

    // const onReady = (event: YouTubeEvent) => {
    //     event.target.pauseVideo();
    // };

    if(!thumb || thumb.trim() === "") {
        return <YouTube videoId={videoId} opts={options} id="video" />;
    }

    //else part
    return(
        <div style={{position: "relative", width:"100%", height:"690px"}}>
            {!isPlaying ? (
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                    <img src={thumb}  alt="Video thumbnail"
                        style={{ width: "100%", height: "690px", objectFit: "cover", borderRadius: "8px" }}
                    />                    
                   <div className="blob-play" style={{                                               
                       display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        }}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <polygon points="16,12 28,20 16,28" fill="#2C2D65" />
                        </svg>
                    </div>
                </div>
            ) : (
                <YouTube videoId={videoId} opts={options} 
                // onReady={onReady} 
                id="video" />
            )}             
                
        </div>        
    );     
    
};

export default YoutubeVideo;