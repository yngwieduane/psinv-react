import { WalkinFormConfig } from '@/types/walkinFormTypes';
import { JBR_ALL_AGENTS } from './walkinAgents/jbrAgents';
import { CONRAD_AGENTS_BY_DATE } from "./walkinAgents/conradAgentsByDate";

export const walkinFormConfig: Record<string, WalkinFormConfig> = {
  "conrad-hotel-at-etihad-tower-abu-dhabi": {
    title: "Conrad Hotel at Etihad Tower, Abu Dhabi",
    developerLogoUrl: "/images/walkin-form/etihad-logo.png",
    referredbyid: 3458,
    sendto: ["wd3@psinv.net", "yngwie.g@psinv.net", "callcenter@psinv.net"],
    branch: "AUH",
    showClientProfession: true,
    showContactInformation: true,
    showHostedBy: true,
    agentsByDate: CONRAD_AGENTS_BY_DATE,
  },
  "yas-mall-stand": {
    title: "Yas Mall Walk-In Stand",
    // developerLogoUrl: "/logos/emaar.png",
    sendto: ["callcenter@psidubai.com"],
    referredbyid: 3458,
    showClientProfession: true,
    branch: "AUH",
    showContactInformation: false,
    showHostedBy: true,
    agentsByDate: {
      "2025-08-14": [
        { id: "6190", name: "Ahmad Sam Soultan" },
        { id: "7155", name: "Omar Abu Farha" }
      ]
    }
  },
  "galleria-stand-deyaar": {
    title: "Galleria Stand Deyaar",
    developerLogoUrl: "/images/walkin-form/deyaar-logo.svg",
    sendto: ["callcenter@psinv.net"],
    referredbyid: 3458,
    showClientProfession: true,
    branch: "AUH",
    showContactInformation: true,
    showHostedBy: true,
    agentsByDate: {
      "2025-08-14": [
        { id: "6190", name: "Ahmad Sam Soultan" },
        { id: "7155", name: "Omar Abu Farha" }
      ]
    }
  },
  "jbr-lead-registration-dubai": {
    title: "JBR Lead Registration",
    // developerLogoUrl: "/logos/emaar.png",
    sendto: ["callcenter@psidubai.com"],
    showClientProfession: true,
    referredbyid: 4421,
    branch: "dubai",
    showContactInformation: true,
    showHostedBy: true,
    agents: JBR_ALL_AGENTS,
  },
  "psi-assets-reem": {
    title: "PSI Assets - Reem Branch",
    logo: "/images/walkin-form/psi-assets-logo.png",
    sendto: ["callcenter@psiassets.com"],
    showClientProfession: true,
    branch: "assets",
    showContactInformation: true,
    showHostedBy: true,
    agentsByDate: {
      "2026-01-14": [
        { id: "7056", name: "Abdel Rahman Ayed Abdalla Janem" },
        { id: "4794", name: "PSI Asset" }
      ],
      "2025-08-15": [
        { id: "7056", name: "Abdel Rahman Ayed Abdalla Janem" },
        { id: "4794", name: "PSI Asset" }
      ]
    }
  },
  "psi-assets-yas": {
    title: "PSI Assets - Yas Branch",
    logo: "/images/walkin-form/psi-assets-logo.png",
    sendto: ["callcenter@psiassets.com"],
    showClientProfession: false,
    branch: "assets",
    showContactInformation: true,
    showHostedBy: true,
    agentsByDate: {
      "2025-08-14": [
        { id: "7056", name: "Abdel Rahman Ayed Abdalla Janem" },
        { id: "4794", name: "PSI Asset" }
      ],
      "2025-08-15": [
        { id: "7056", name: "Abdel Rahman Ayed Abdalla Janem" },
        { id: "4794", name: "PSI Asset" }
      ]
    }
  }
};
