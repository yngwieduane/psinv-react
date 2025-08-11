'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Audrey } from '@/utils/fonts';

interface TopHeaderProps {
    data: {
        image: string;
        title: string;
    };
}

const TopHeader: React.FC<TopHeaderProps> = ({ data }) => {
    const pathname = usePathname(); // Ensure usePathname() is called
    const pathSegments: string[] = pathname.split('/').filter((segment) => segment);

    return(
        <>
            <div className='w-full topHeader text-white text-center sm:h-[400] h-[300]' style={{backgroundImage:`url(${data.image})`}}>
                <div className='container mx-auto h-full'>
                    <div className="row d-flex flex-column justify-content-center align-items-center h-full">
                        <div className="col-12 my-auto">
                            <h1 className={`headerTitle text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-center mb-4 ${Audrey.className}`}>{data ?.title} </h1>
                            <nav className="bg-transparent text-xl">
                                <ul className="flex justify-content-center space-x-2 text-white-500 text-center">
                                    <li>
                                        <Link href="/" className="hover:text-[#343a40]-600">
                                            Home
                                        </Link>
                                    </li>
                                    {pathSegments.map((segment: string, index: number) => {
                                        const isLast = index === pathSegments.length - 1;
                                        const href = '/' + pathSegments.slice(0, index + 1).join('>');

                                        return (
                                            <li key={index} className="flex items-center space-x-2">
                                                <span> &gt; </span>
                                                {isLast ? (
                                                    <span className="text-white-900 font-medium capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                                                        {segment.replace('-', ' ')}
                                                    </span>
                                                ) : (
                                                    <Link href={href} className="hover:text-white-600 capitalize sm:max-w-[80px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                                                        {segment.replace('-', ' ')}
                                                    </Link>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>                                        
                    </div>                                
                </div>
            </div>
        </>
    )
}

export default TopHeader