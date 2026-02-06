"use client";

import clsx from "clsx";
import LiteYouTube from "./LiteYouTube";
import Image from "next/image";
export interface AboutProps {
  heading?: string;
  subheading?: string;
  description?: string;
  videoId?: string;
  img?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export default function AboutSection({
  heading,
  subheading,
  description,
  videoId,
  img,
  className,
}: AboutProps) {
  return (
    <section id="about" className={clsx("py-16 md:py-20 bg-white", className)}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left: Text Card */}
          <div className="lg:w-1/2 w-full bg-[#F6F9FC] p-8 md:p-12 rounded-lg">
          {subheading && (
              <p className="text-[#00043A] uppercase tracking-widest text-sm mb-4 font-medium">
                {subheading}
              </p>
            )}

            {heading && (
              <h2 className="text-3xl font-bold text-[#00043A] mb-8">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-[#00043A]/60 leading-relaxed text-lg font-light text-justify whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl bg-gray-100">
            {videoId ? (
              <LiteYouTube videoId={videoId} title={heading || "Project video"} />
            ) : (
              img && (
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={heading || "About project"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
