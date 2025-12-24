"use client";

import React from "react";
import { PlayCircle } from "lucide-react";

type VideoItem = {
  id: string;     // youtube video id
  title: string;
};

const VIDEOS: VideoItem[] = [
  { id: "nInSXXQ9j7o", title: "UAE Real estate investment" },
  { id: "yawdZO52bKM", title: "Invest in UAE real estate" },
  { id: "dFSSo7qMcDA", title: "Why Abu Dhabi?" },
];

function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video bg-black/5">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {/* Optional overlay look (like your screenshot) */}
        <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="h-14 w-14 text-white drop-shadow" fill="currentColor" />
        </div>
      </div>

      <p className="mt-3 mb-5 text-center text-sm font-semibold text-gray-800">
        {title}
      </p>
    </div>
  );
}

export default function VideosSection() {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
        Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {VIDEOS.map((v) => (
          <YouTubeEmbed key={v.id} id={v.id} title={v.title} />
        ))}
      </div>
    </section>
  );
}
