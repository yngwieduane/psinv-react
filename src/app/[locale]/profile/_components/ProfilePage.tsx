'use client'
import React, { useEffect } from 'react';
import { useUser } from '@/context/userContext';
import { Link, useRouter } from '@/i18n/navigation';
import { Heart, Shuffle, LogOut, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
    const { user, favorites, compareList, recentlyViewed, logout, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                    <div className="bg-primary/5 h-32 md:h-48 relative">
                    </div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <UserIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                            <button
                                onClick={() => { logout(); router.push('/'); }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            <Link href="/favorites">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                                    <div className="p-4 bg-red-50 text-red-500 rounded-full">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Favorites</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{favorites.length}</p>
                                        <p className="text-xs text-gray-400 mt-1">Saved Properties</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/compare">
                                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                                    <div className="p-4 bg-primary/10 text-primary rounded-full">
                                        <Shuffle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Compare List</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{compareList.length}</p>
                                        <p className="text-xs text-gray-400 mt-1">Items to Compare</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {/* Recently Viewed */}
                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recently Viewed</h2>
                            {recentlyViewed.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recentlyViewed.map((item, index) => {
                                        const uniqueId = `recent-${item.id}-${index}`;
                                        let title = "Property";
                                        let location = "";
                                        let image = "";
                                        let link = "/";
                                        let price = "";

                                        if (item.type === 'project') {
                                            title = item.data?.propertyName || "Project";
                                            location = `${item.data?.community || ''}, ${item.data?.city || ''}`;
                                            image = item.data?.featuredImages?.[0]?.imageURL || "";
                                            link = `/projects/${item.data?.city?.toLowerCase() || 'dubai'}/${item.data?.community?.toLowerCase() || 'community'}/${item.data?.subCommunity?.toLowerCase() || 'sub'}/${item.data?.propertyName?.toLowerCase().replace(/\s+/g, '-')}`;
                                            price = item.data?.minPrice ? `AED ${Number(item.data.minPrice).toLocaleString()}` : 'Price on Request';
                                        } else if (item.type === 'units' || item.type === 'property') {
                                            title = item.data?.marketingTitle || item.data?.propertyname || "Unit";
                                            location = `${item.data?.community || ''}, ${item.data?.city || ''}`;
                                            image = item.data?.imageurl ? item.data.imageurl.split('|')[0] : "";
                                            link = `/unit/${item.data?.slug || item.id}`; // Assuming slug exists or fallback to id
                                            price = item.data?.sellprice || item.data?.rent ? `AED ${Number(item.data?.sellprice || item.data?.rent).toLocaleString()}` : '';
                                        }

                                        return (
                                            <Link key={uniqueId} href={link} className="block group">
                                                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                                    <div className="h-48 relative overflow-hidden">
                                                        {image ? (
                                                            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                                        )}
                                                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-700 uppercase">
                                                            {item.type}
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 truncate mb-1">{title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-2">{location}</p>
                                                        <div className="text-secondary font-bold text-sm">
                                                            {price}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 border-dashed">
                                    <p className="text-gray-400">No recently viewed items</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
