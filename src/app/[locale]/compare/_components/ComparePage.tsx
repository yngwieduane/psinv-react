'use client'
import React from 'react';
import { PROPERTIES } from '@/constants/main'
import { Shuffle, X, Check, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/context/userContext';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import slugify from 'react-slugify';

const ComparePage: React.FC<{}> = ({ }) => {
    const { compareList, removeFromCompare } = useUser();

    // Enrich compare list with data (prefer saved data, fallback to static list)
    const compareItems = compareList.map(item => {
        return item.data || PROPERTIES.find(p => p.id === item.id);
    }).filter(Boolean);

    if (compareItems.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 container mx-auto px-6 text-center">
                <div className="bg-gray-50 rounded-3xl p-20 flex flex-col items-center">
                    <Shuffle size={64} className="text-gray-300 mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Compare Properties</h2>
                    <p className="text-gray-500 text-lg">Your comparison list is empty. Add properties to compare them side-by-side.</p>
                </div>
            </div>
        );
    }

    const features = [
        { label: 'Location', key: 'location', render: (d: any) => d.community || d.location },
        { label: 'Type', key: 'type', render: (d: any) => d.propertyType || d.type },
        { label: 'Status', key: 'status', render: (d: any) => d.status },
        { label: 'Developer', key: 'developer', render: (d: any) => d.masterDeveloper || d.developer },
        {
            label: 'Beds', key: 'beds', render: (d: any) => {
                if (d.availableBedrooms && Array.isArray(d.availableBedrooms)) {
                    return d.availableBedrooms.map((b: any) => b.noOfBedroom).join(', ');
                }
                return d.beds;
            }
        },
        { label: 'Price From', key: 'price', render: (d: any) => d.priceFrom ? `AED ${d.priceFrom.toLocaleString()}` : 'TBD' },
        {
            label: 'Handover', key: 'handover', render: (d: any) => {
                if (d.handoverDate) return new Date(d.handoverDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
                return d.handover;
            }
        }
    ];

    return (
        <div className="min-h-screen pt-40 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <h1 className="text-4xl font-serif font-bold text-primary mb-12">Compare Properties ({compareItems.length}/3)</h1>

                <div className="overflow-x-auto pb-8">
                    <table className="w-full min-w-[800px] border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 text-left w-48 bg-gray-50 rounded-tl-xl">Feature</th>
                                {compareItems.map((item: any) => (
                                    <th key={item.propertyID || item.id} className="p-4 w-1/3 min-w-[250px] align-top bg-white border-b border-gray-100 relative group">
                                        <button
                                            onClick={() => removeFromCompare(item.propertyID || item.id)}
                                            className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                            title="Remove"
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                                            <img
                                                src={item.featuredImages ? item.featuredImages[0].imageURL : (item.images ? item.images[0] : '')}
                                                className="w-full h-full object-cover"
                                                alt={item.propertyName || item.title}
                                            />
                                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                                {item.status}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{item.propertyName || item.title}</h3>
                                        <p className="text-sm text-gray-500 font-normal flex items-center gap-1 mb-4">
                                            {item.community}
                                        </p>
                                        <Link
                                            href={`/projects/${slugify(item.city)}/${slugify(item.community)}/${slugify(item.subCommunity || 'n-a')}/${slugify(item.propertyName)}`}
                                            className="inline-block w-full py-2 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </th>
                                ))}
                                {/* Fill empty columns if less than 3 */}
                                {[...Array(3 - compareItems.length)].map((_, i) => (
                                    <th key={`empty-${i}`} className="p-4 w-1/3 bg-gray-50/30 border-dashed border-2 border-gray-100 rounded-lg m-2">
                                        <div className="h-full flex flex-col items-center justify-center text-gray-300 min-h-[300px]">
                                            <Shuffle size={48} className="mb-4 opacity-20" />
                                            <p className="font-medium">Add property</p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, idx) => (
                                <tr key={feature.key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                    <td className="p-4 font-bold text-gray-700 border-r border-gray-100">{feature.label}</td>
                                    {compareItems.map((item: any) => (
                                        <td key={item.propertyID || item.id} className="p-4 text-center text-gray-600 border-b border-gray-50">
                                            {feature.render(item)}
                                        </td>
                                    ))}
                                    {[...Array(3 - compareItems.length)].map((_, i) => (
                                        <td key={`empty-cell-${i}`} className="p-4"></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ComparePage;
