import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AgentDetails = ({ agent }: { agent: any }) => {
    if (!agent) return null;

    // Helper to ensure valid image URL or fallback
    const getAgentImage = (img: string | null) => {
        if (!img || img === "null" || img === "") {
            return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop";
        }
        return img;
    };

    const agentImage = getAgentImage(agent.image);
    // Agent object from unit might have different structure than API
    // Typically it might just be the name or a small object?
    // Based on `grep` results earlier: 
    // `d.masterDeveloper || d.developer || d.developerName || d.agent`
    // And walkin code suggests `agent` might be an object with `id` and `name` or just a string name?
    // Let's assume for now `agent` prop passed is an object. 
    // If props.data[0].agent is just a string name, we might need to adjust.
    // However, looking at `UnitPageAI.tsx`, `post` is the unit object.
    // If `post.agent` is available, we display it.

    // Safety check if agent is just a string (name)
    const isString = typeof agent === 'string';
    const agentName = isString ? agent : (agent.name || agent.agentName || "PSI Agent");
    const agentPhone = isString ? process.env.NEXT_PUBLIC_CALLNUMBER_ASSETS : (agent.phone || process.env.NEXT_PUBLIC_CALLNUMBER_ASSETS);
    const agentWhatsapp = isString ? process.env.NEXT_PUBLIC_WAPPNUMBER_ASSETS : (agent.whatsapp || process.env.NEXT_PUBLIC_WAPPNUMBER_ASSETS);
    const agentImg = isString ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" : (agent.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop");


    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
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
                    <span className="text-sm text-gray-500">Property Consultant</span>
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