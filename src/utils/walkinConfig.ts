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
       "2026-01-12": [
    { id: "6269", name: "Abdalla Awad Reyad Kaldas" },
    { id: "7438", name: "Ali Hekmat Fawzi" },
    { id: "6563", name: "Ahmad Amjed Subhi Abusalah" },
    { id: "7446", name: "Cathlyn Vergara Jaen" },
  ],
  "2026-01-13": [
    { id: "7465", name: "Nada Ashraf Aiada Awad Abozuhry" },
    { id: "7043", name: "Omar Khaleel Subhi Basheer" },
    { id: "4576", name: "Masoud Mamoun Alneser" },
    { id: "4260", name: "Nada Yasser Abdalla Ibrahim" },
  ],
  "2026-01-14": [
    { id: "7100", name: "Mhd Abul Khir Houmam Alkezbari" },
    { id: "7132", name: "Sonja Gert Theunis Christoffel Bosch" },
    { id: "7284", name: "Uzair Sameer Sameer Javed Aziz" },
    { id: "7005", name: "Yousef Ahmad Daoud" },
  ],
  "2026-01-15": [
    { id: "9856", name: "Tarek AbouHuwaij" },
    { id: "6152", name: "Bojana Popovic" },
    { id: "9757", name: "Mohammad Rizik Saleh Bani Hani" },
    { id: "7356", name: "Malek Saleh Ali Salo" },
  ],
  "2026-01-16": [
    { id: "7231", name: "Abdulrazzaq Omar Mubarak Balain" },
    { id: "7400", name: "Asel Baiarstanova" },
    { id: "6153", name: "Norma Said Daamash" },
    { id: "7254", name: "Anastasiya Aksatskaya" },
  ],
  "2026-01-17": [
    { id: "9797", name: "Mohammed H. J. Mhanna" },
    { id: "7142", name: "Firas Riyad Abu Haibeh" },
    { id: "6805", name: "Fahim Shaar" },
    { id: "6639", name: "Yousef Ahmad Alisha" },
  ],
  "2026-01-18": [
    { id: "7211", name: "Petronella Awad" },
    { id: "4280", name: "Mohammad Alshaikh Hasan" },
    { id: "7166", name: "Ali Nabil Ali Abdelrahman Shatta" },
    { id: "7343", name: "Abdelrahman Ahmed Mohamed Attia Mandour" },
  ],
  "2026-01-19": [
    { id: "7232", name: "Hamza Nedal Daoud Eleiwat" },
    { id: "6614", name: "Hanna Jiries Hanna Ibrahim" },
    { id: "7465", name: "Nada Ashraf Aiada Awad Abozuhry" },
    { id: "4621", name: "Oumaima Rouicha" },
  ],
  "2026-01-20": [
    { id: "9870", name: "Naziruddin Vaziruddin Shaikh Vaziruddin Imamuddin Shaikh" },
    { id: "9812", name: "Lais Chalithodi" },
    { id: "9757", name: "Mohammad Rizik Saleh Bani Hani" },
    { id: "7276", name: "Nurhayat Aksoy" },
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
