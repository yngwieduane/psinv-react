'use client';

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import slugify from "react-slugify";

export default function ArticlesCard({ news}: { news: any}) {
    return (
        <Link href={`/articles/${slugify(news.title + '-' + news.id)}`} >
            <div 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            >
                <Image
                    src={news.imageUrl}
                    alt={news.title}
                    width={300}
                    height={200}
                    className="w-full h-36 object-cover"
                />
                <div className="p-4">
                    <span className="text-xs font-semibold uppercase text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">{news.category}</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-2 leading-snug hover:text-indigo-600 transition">
                        {news.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{news.summary.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-400 mt-3">{news.date}</p>
                </div>
            </div>
        </Link>
    );
};