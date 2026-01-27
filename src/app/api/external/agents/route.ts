
import { NextRequest, NextResponse } from 'next/server';
import { Agent } from '@/types/types';

const API_KEY = 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ';

export async function GET(request: NextRequest) {
    try {
        const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetAbuDhabiAgentDetails?pageIndex=1&pageSize=100", {
            headers: {
                'accept': '*/*',
                'apiKey': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Agents API Error: ${response.status}`);
        }

        const data = await response.json();

        // Helper to map API data to Agent type
        const mapAgent = (item: any): Agent => {
            const fullName = `${item.firstName || ''} ${item.agentSecondName || ''} ${item.agentLastName || ''}`.replace(/\s+/g, ' ').trim();

            return {
                id: item.UserId || item.id || `agent-${Math.random()}`,
                name: fullName || "Unknown Agent",
                role: item.jobTitle || "Property Consultant",
                image: item.agentProfileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
                languages: item.language ? item.language.split(',').map((l: string) => l.trim()) : ['English'],
                phone: item.businessMobileNumber || item.mobile || "",
                whatsapp: item.businessWhatsAppNumber || item.whatsApp || item.mobile || "",
                email: item.email || "",
                brn: item.brokerLicenseRegistrationNumber || "",
                experience: "",
                description: item.aboutMe || "",
                activeListings: 0,
                location: item.branchName || 'Abu Dhabi'
            };
        };

        const agents: Agent[] = Array.isArray(data.result) ? data.result.map(mapAgent) : [];

        return NextResponse.json(agents);

    } catch (error) {
        console.error("Error fetching agents:", error);
        return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 });
    }
}
