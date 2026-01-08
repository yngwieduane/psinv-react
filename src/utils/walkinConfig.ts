import { WalkinFormConfig } from '@/types/walkinFormTypes';
import { JBR_ALL_AGENTS } from './walkinAgents/jbrAgents';

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
    agentsByDate: {
      "2026-01-08": [
        { id: "7262", name: "Omar Nazih Hamdache" },
        { id: "7278", name: "Mohammad Anas Yousef" },
        { id: "6216", name: "Ahmed Khadragy Ibrahim Moustafa Wasel" },
        { id: "6350", name: "Mohammad Abduljabbar Bakkour" },
      ],
      "2026-01-09": [
        { id: "6330", name: "Tala Moustapha Darwich" },
        { id: "7238", name: "Tavleen Kaur Sumit Uppal" },
        { id: "7467", name: "Maher Archid Hadife" },
        { id: "7331", name: "Ghalia Chater" },
      ],
      "2026-01-10": [
        { id: "9812", name: "Lais Chalithodi" },
        { id: "9846", name: "Lakshay Dua" },
        { id: "7100", name: "Mhd Abul Khir Houmam Alkezbari" },
        { id: "7356", name: "Malek Saleh Ali Salo" },
      ]
    }
  },
  "yas-mall-stand": {
    title: "Yas Mall Walk-In Stand",
    // developerLogoUrl: "/logos/emaar.png",
    sendto: ["wd3@psinv.net", "callcenter@psidubai.com"],
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
    sendto: ["wd3@psinv.net", "callcenter@psinv.net"],
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
    sendto: ["wd3@psinv.net", "callcenter@psidubai.com"],
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
    sendto: ["wd3@psinv.net", "callcenter@psiassets.com"],
    showClientProfession: true,
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
  },
  "psi-assets-yas": {
    title: "PSI Assets - Yas Branch",
    logo: "/images/walkin-form/psi-assets-logo.png",
    sendto: ["wd3@psinv.net", "callcenter@psiassets.com"],
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
