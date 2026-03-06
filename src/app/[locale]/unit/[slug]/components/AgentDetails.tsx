'use client';

import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AgentDetails = ({ agent }: { agent: any }) => {
    const isString = typeof agent === 'string';
    const initialAgentName = isString ? agent : (agent?.name || agent?.agentName || "PSI Agent");

    const [agentData, setAgentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgent = async () => {
            if (!initialAgentName || initialAgentName === "PSI Agent" || initialAgentName === "null") {
                setLoading(false);
                return;
            }

            try {
                // Query firebase for agent with this name
                const q = query(
                    collection(db, "agents"),
                    where("name", "==", initialAgentName),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    setAgentData(querySnapshot.docs[0].data());
                }
            } catch (error) {
                console.error("Failed to fetch agent details from Firebase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgent();
    }, [initialAgentName]);

    if (!agent && !agentData && !initialAgentName) return null;

    // Helper to ensure valid image URL or fallback
    const getAgentImage = (img: string | null | undefined) => {
        if (!img || img === "null" || img === "") {
            return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop";
        }
        return img;
    };

    // Use fetched data if available, otherwise fallback to prop data or environment defaults
    const agentName = agentData?.name || initialAgentName;
    const agentRole = agentData?.role || "Property Consultant";
    const propPhone = isString ? null : agent?.phone;
    const propWhatsapp = isString ? null : (agent?.whatsapp || agent?.mobile);
    const propImage = isString ? null : agent?.image;

    const agentPhone = agentData?.phone || propPhone || process.env.NEXT_PUBLIC_CALLNUMBER_ASSETS;
    const agentWhatsapp = agentData?.whatsapp || propWhatsapp || process.env.NEXT_PUBLIC_WAPPNUMBER_ASSETS;
    const agentImg = getAgentImage(agentData?.image || propImage);

    // If still loading, we can show a placeholder or just render whatever info we already have
    // rendering with what we have is fine as it will update when fetched.

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)] relative overflow-hidden">
            {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <h3 className="text-xl font-bold text-primary mb-6">Listing Agent</h3>

            <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
                    <Image
                        src={agentImg}
                        alt={agentName}
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-lg">{agentName}</h4>
                    <span className="text-sm text-gray-500">{agentRole}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Link href={`tel:${agentPhone}`} className="cursor-pointer w-full bg-white hover:bg-[#dedede] border border-gray-300 py-3 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2">
                    <Phone size={18} /> Call
                </Link>
                <Link href={`https://wa.me/${agentWhatsapp}?text=I%20am%20Interested%20in%20this%20property`} target="_blank" className="cursor-pointer w-full bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> WhatsApp
                </Link>
            </div>
        </div>
    );
}

export default AgentDetails;