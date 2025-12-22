'use client'
import React, { useEffect } from 'react';
import { useUser } from '@/context/userContext';
import { useRouter } from '@/i18n/navigation';
import { Heart, Shuffle, LogOut, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
    const { user, favorites, compareList, logout, loading } = useUser();
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
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-primary/5 h-32 md:h-48 relative">
                    </div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
                            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        <UserIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl font-serif font-bold text-gray-900">{user.name}</h1>
                                <p className="text-gray-500">{user.email}</p>
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
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="p-4 bg-red-50 text-red-500 rounded-full">
                                    <Heart size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Favorites</p>
                                    <p className="text-3xl font-bold text-gray-900">{favorites.length}</p>
                                    <p className="text-xs text-gray-400 mt-1">Saved Properties</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="p-4 bg-primary/10 text-primary rounded-full">
                                    <Shuffle size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Compare List</p>
                                    <p className="text-3xl font-bold text-gray-900">{compareList.length}</p>
                                    <p className="text-xs text-gray-400 mt-1">Items to Compare</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
