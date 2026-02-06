"use client";

import * as React from "react";

type Props = {
  videoId: string;
  title: string;
  className?: string;
};

export default function LiteYouTube({ videoId, title, className }: Props) {
  const [activated, setActivated] = React.useState(false);

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      {!activated ? (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="relative h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={poster}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <span className="absolute inset-0 grid place-items-center">
            <span className="rounded-full bg-black/60 px-5 py-3 text-white">
              ▶ Play
            </span>
          </span>
        </button>
      ) : (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
}
