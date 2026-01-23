// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
    "2026-01-21": [
        { id: "7282", name: "Aya Kabbaj" },
        { id: "7205", name: "Michael Borsch" },
        { id: "7042", name: "Fawzi Zaki Fawzi (Shaikh Mahmoud)" },
        { id: "7211", name: "Petronella Awad" },
    ],
     "2026-01-22": [
        { id: "7314", name: "Ahmed Esmael Shalaby Mostafa" },
        { id: "7166", name: "Ali Nabil Ali Abdelrahman Shatta" },
        { id: "5103", name: "Manal Moustafa Mohamed Khaled" },
        { id: "6513", name: "Modar AbdulMuhsen Ali" },
    ],
    "2026-01-23": [
        { id: "6592", name: "Arnay Baiboranova" },
        { id: "6345", name: "Diana Bashirova" },
        { id: "7262", name: "Omar Nazih Hamdache" },
    ],
    "2026-01-24": [
        { id: "9837", name: "Menna Fouad Abdelkhalek Elsayed Ali" },
        //{ id: "", name: "Sara Hussein Ibrahem Ibrahem Elmakhzangy" },
        { id: "9809", name: "Sana Khalfallah" },
        { id: "7005", name: "Yousef Ahmad Daoud" },
    ],
    "2026-01-25": [
        { id: "7166", name: "Ali Nabil Ali Abdelrahman Shatta" },
        { id: "7277", name: "Youmna Ashraf Mohamed Ali Metwally" },
        { id: "7253", name: "Maya Ramos Da Silva" },
        { id: "7225", name: "Miguel Angel Aguilar Leon" },
    ],
};
