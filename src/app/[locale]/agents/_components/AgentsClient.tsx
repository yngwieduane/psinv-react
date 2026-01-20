'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, MapPin, Search, Filter, Globe, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AgentsClient = () => {
    const t = useTranslations('Agents');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await fetch('/api/external/agents');
                if (res.ok) {
                    const data = await res.json();
                    setAgents(data['result']);
                }
            } catch (error) {
                console.error("Failed to load agents", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    const filteredAgents = useMemo(() => {
        return agents.filter(agent => {
            const matchesSearch = agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.languages?.some((lang: string) => lang.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesBranch = selectedBranch === 'all' || agent.location === selectedBranch;
            return matchesSearch && matchesBranch;
        });
    }, [searchQuery, selectedBranch, agents]);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0c1356] to-[#CE641D] uppercase tracking-wide">
                    {t('title')}
                </h1>
                <p className="text-gray-500 text-lg md:text-xl font-light">
                    {t('subtitle')}
                </p>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0c1356] focus:ring-2 focus:ring-[#0c1356]/10 outline-none transition-all"
                        />
                    </div>
                    <div className="relative md:w-64">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#0c1356] focus:ring-2 focus:ring-[#0c1356]/10 outline-none transition-all appearance-none cursor-pointer bg-white"
                        >
                            <option value="all">{t('allBranches')}</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agents Grid */}
            {agents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {agents.map((agent) => (
                        <div
                            key={agent.id}
                            className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-2"
                        >
                            <div className="relative h-80 overflow-hidden bg-gray-100">
                                <Image
                                    src={agent.image}
                                    alt={agent.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1356]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0c1356] shadow-sm flex items-center gap-1">
                                    <MapPin size={12} />
                                    {agent.location}
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-3">
                                    <a
                                        href={`tel:${agent.phone}`}
                                        className="bg-white hover:bg-[#CE641D] text-[#0c1356] hover:text-white p-3 rounded-full transition-colors shadow-lg"
                                        title={t('contact.call')}
                                    >
                                        <Phone size={20} />
                                    </a>
                                    <a
                                        href={`https://wa.me/${agent.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white hover:bg-green-600 text-[#0c1356] hover:text-white p-3 rounded-full transition-colors shadow-lg"
                                        title={t('contact.whatsapp')}
                                    >
                                        <MessageCircle size={20} />
                                    </a>
                                    <a
                                        href={`mailto:${agent.email}`}
                                        className="bg-white hover:bg-blue-600 text-[#0c1356] hover:text-white p-3 rounded-full transition-colors shadow-lg"
                                        title={t('contact.email')}
                                    >
                                        <Mail size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#CE641D] transition-colors line-clamp-1" title={agent.name}>{agent.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mt-1">{agent.role}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {agent.languages.slice(0, 3).map((lang: string, idx: number) => (
                                        <span key={idx} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100 flex items-center gap-1">
                                            <Globe size={10} /> {lang}
                                        </span>
                                    ))}
                                    {agent.languages.length > 3 && (
                                        <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">
                                            +{agent.languages.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-100">
                                    <div className="text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-[#0c1356] font-bold text-lg">{agent.experience}</span>
                                            <span className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1 mt-1">
                                                <Briefcase size={10} /> {t('experience')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-[#0c1356] font-bold text-lg">{agent.activeListings}</span>
                                            <span className="text-xs text-gray-400 uppercase tracking-wide flex items-center gap-1 mt-1">
                                                <Award size={10} /> {t('activeListings')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('noAgentsFound')}</h3>
                    <p className="text-gray-500 max-w-sm">{t('subtitle')}</p>
                </div>
            )}
        </div>
    );
};

export default AgentsClient;
