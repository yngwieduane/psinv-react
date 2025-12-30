'use client'
import React, { useState } from 'react';
import { PROPERTIES } from '@/constants/main'
import { Heart, MapPin, Trash2, LayoutGrid, List } from 'lucide-react';
import PropertyCardAI from '../../_components/tools/PropertyCardAI';
import UnitListBoxAI from '../../units/_components/UnitListBoxAI';
import { useUser } from '@/context/userContext';

const FavoritesPage: React.FC<{}> = ({ }) => {
    const { favorites, toggleFavorite } = useUser();
    const [activeTab, setActiveTab] = useState<'project' | 'units'>('project');

    const projectItems = favorites
        .filter(f => f.type === 'project')
        .map(f => {
            const data = f.data || PROPERTIES.find(p => p.id === f.id);
            return data ? { item: f, data } : null;
        })
        .filter((i): i is { item: typeof favorites[0], data: any } => i !== null);

    const unitItems = favorites
        .filter(f => f.type === 'units' || f.type === 'property')
        .map(f => {
            // For units, we rely heavily on saved data. 
            // If data is missing (legacy), it might not show correct info unless we have a UNITS constant (which we don't seem to have globally like PROPERTIES)
            // But we fixed UnitListBoxAI to save data, so new faves will work.
            if (f.data) return { item: f, data: f.data };
            return null;
        })
        .filter((i): i is { item: typeof favorites[0], data: any } => i !== null);

    const activeList = activeTab === 'project' ? projectItems : unitItems;

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 container mx-auto px-6 text-center">
                <div className="bg-gray-50 rounded-3xl p-20 flex flex-col items-center">
                    <Heart size={64} className="text-gray-300 mb-6" />
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Favorites</h2>
                    <p className="text-gray-500 text-lg">Your favorites list is empty.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6">
                    <h1 className="text-4xl font-serif font-bold text-primary">Favorites ({favorites.length})</h1>

                    {/* Tabs */}
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('project')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'project'
                                ? 'bg-white text-[#353455] shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <LayoutGrid size={16} />
                            Projects ({projectItems.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('units')}
                            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === 'units'
                                ? 'bg-white text-[#353455] shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <List size={16} />
                            Units ({unitItems.length})
                        </button>
                    </div>
                </div>

                {activeList.length === 0 ? (
                    <div className="bg-gray-50/50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
                        <p className="text-gray-500 font-medium">No {activeTab} favorites yet.</p>
                    </div>
                ) : (
                    activeTab === 'project' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {activeList.map(({ item, data }) => (
                                <div key={item.id} className="relative group">
                                    <PropertyCardAI data={data} />
                                    {/* PropertyCardAI has its own heart button, but if we want to add extra controls we can. 
                                        However, the card's internal button handles toggleFavorite. 
                                        So we don't strictly need an overlay trash button if the card handles it. 
                                        Let's rely on the card's button which I verified has Heart icon.
                                    */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                            {activeList.map(({ item, data }) => (
                                <div key={item.id} className="relative">
                                    {/* UnitListBoxAI expects props key mapping to match what's typical. 
                                         Usually it takes `data={data}`. 
                                         It also has adType, etc props.
                                         Let's pass adType based on status/rent/sell.
                                     */}
                                    <UnitListBoxAI
                                        data={data}
                                        adType={data.status === 'Ready' ? 'Sale' : (data.rent ? 'Rent' : 'Sale')} // infer ad type
                                        seoTitle={data.marketingTitle}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
