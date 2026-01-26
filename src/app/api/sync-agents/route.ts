import { NextRequest, NextResponse } from 'next/server';
import { Agent } from '@/types/types';
import { db, admin } from '@/lib/firebase-admin';

const API_KEY = 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ';

type Branch = 'abudhabi' | 'dubai' | 'assets';

const API_CONFIG: Record<Branch, string> = {
    abudhabi: "https://integration.psi-crm.com/ExternalApis/GetAbuDhabiAgentDetails",
    dubai: "https://integration.psi-crm.com/ExternalApis/GetDubaiAgentDetails",
    assets: "https://integration.psi-crm.com/ExternalApis/GetAssetsAgentDetails"
};

export async function GET(request: NextRequest) {
    try {
        const results = {
            totalSynced: 0,
            byBranch: {
                abudhabi: 0,
                dubai: 0,
                assets: 0
            },
            errors: [] as string[]
        };

        const mapAgent = (item: any, branch: Branch): Agent => {
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
                location: item.branchName || branch,
                branch: branch
            };
        };

        for (const [branchKey, url] of Object.entries(API_CONFIG)) {
            const branch = branchKey as Branch;
            console.log(`Starting sync for ${branch}...`);

            for (let page = 1; page <= 10; page++) {
                try {
                    const response = await fetch(`${url}?pageIndex=${page}&pageSize=100`, {
                        headers: {
                            'accept': '*/*',
                            'apiKey': API_KEY
                        }
                    });

                    if (!response.ok) {
                        console.error(`Error fetching ${branch} page ${page}: ${response.status}`);
                        results.errors.push(`${branch} page ${page} failed: ${response.status}`);
                        continue;
                    }

                    const data = await response.json();
                    const rawAgents = data.result;

                    if (!Array.isArray(rawAgents) || rawAgents.length === 0) {
                        console.log(`No more data for ${branch} at page ${page}. Stopping.`);
                        break;
                    }

                    const agents = rawAgents.map((item) => mapAgent(item, branch));

                    if (agents.length > 0) {
                        const batch = db.batch();

                        agents.forEach((agent) => {
                            const docRef = db.collection('agents').doc(String(agent.id));
                            batch.set(docRef, agent, { merge: true });
                        });

                        await batch.commit();

                        results.byBranch[branch] += agents.length;
                        results.totalSynced += agents.length;
                        console.log(`Synced ${agents.length} agents for ${branch} page ${page}`);
                    }

                } catch (error: any) {
                    console.error(`Exception processing ${branch} page ${page}:`, error);
                    results.errors.push(`${branch} page ${page} error: ${error.message}`);
                }
            }
        }

        return NextResponse.json({
            success: true,
            summary: results
        });

    } catch (error: any) {
        console.error("Global Sync Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
