'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    display: "swap",
});

interface Project {
    image: string;
    title: string;
    title_ar?: string;
    type: string;
    project_url: string;
}

interface CityProjectsGridProps {
    projects: Project[];
}

const CityProjectsGrid: React.FC<CityProjectsGridProps> = ({ projects }) => {
    const hasProjects = projects?.length > 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[320px] animate-[fadeIn_0.5s_ease-out]">
            {hasProjects ? (
                projects.map((project, index) => (
                    <Link key={index} href={`/en${project.project_url}`} title={project.title}>
                        <div
                            key={index}
                            className="group relative h-80 overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={384}
                                height={430}
                                sizes="(max-width: 600px) 100vw, 384px"
                                quality={85}
                                priority={index < 2}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className={`text-2xl font-serif font-bold mb-1 ${outfit.className}`}>{project.title}</h3>
                                <p className={`text-xs font-light tracking-widest text-gray-300 ${outfit.className} `}>{project.type}</p>
                                <div className="h-0.5 w-0 bg-secondary mt-4 transition-all duration-500 group-hover:w-16" />
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-10 bg-white rounded-lg border border-dashed border-gray-300">
                    <p className="text-lg">Coming soon</p>
                </div>
            )}
        </div>
    );
};

export default CityProjectsGrid;
