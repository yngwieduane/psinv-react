'use client'
import React from 'react';
import { PROPERTIES } from '@/constants/main'
import { Heart, MapPin, Trash2 } from 'lucide-react';
import PropertyCardAI from '../../_components/tools/PropertyCardAI';
import { useUser } from '@/context/userContext';

const FavoritesPage: React.FC<{}> = ({ }) => {
    const { favorites, toggleFavorite } = useUser();

    const properties = favorites.filter(f => f.type === 'property').map(f => PROPERTIES.find(p => p.id === f.id)).filter(Boolean);
    //const projects = favorites.filter(f => f.type === 'project').map(f => PROJECTS.find(p => p.id === f.id)).filter(Boolean);

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
                <h1 className="text-4xl font-serif font-bold text-primary mb-12">Favorites ({favorites.length})</h1>

                {properties.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Properties</h3>
                        <div className="flex flex-col gap-6">
                            {properties.map(p => p && (
                                <div key={p.id} className="relative group">
                                    <PropertyCardAI data={p} />
                                    <button
                                        onClick={() => toggleFavorite({ id: p.id, type: 'property' })}
                                        className="absolute top-4 right-4 bg-white text-red-500 p-2 rounded-full shadow-md z-20 hover:bg-red-50"
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* {projects.length > 0 && (
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects.map(p => p && (
                        <div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
                             <div className="h-56 bg-gray-200">
                                 <img src={p.images[0]} className="w-full h-full object-cover" />
                             </div>
                             <div className="p-5">
                                 <h4 className="font-bold text-lg text-gray-900 mb-1">{transliterate(p.title)}</h4>
                                 <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14}/> {transliterate(p.location)}</p>
                                 <p className="font-bold text-primary">{formatPrice(p.priceFrom)}</p>
                             </div>
                             <button 
                                onClick={() => toggleFavorite({ id: p.id, type: 'project' })}
                                className="absolute top-3 right-3 bg-white text-red-500 p-2 rounded-full shadow-md z-10 hover:bg-red-50"
                             >
                                <Trash2 size={16} />
                             </button>
                        </div>
                    ))}
                </div>
            </div>
        )} */}
            </div>
        </div>
    );
};

export default FavoritesPage;
