// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
    "2026-02-02": [
        { id: "7466", name: "Farida Elsherihy Mohamed Ahmed Elsherihy" },
        { id: "6970", name: "Esraa Othman Abo Fares" },
        { id: "7005", name: "Yousef Ahmad Daoud" },
        { id: "9846", name: "Lakshay Dua" },
        { id: "7097", name: "Aya Sayed Abdelsalam Ahmed" },
        { id: "9757", name: "Mohammad Rizik Saleh Bani Hani" },
    ],
    "2026-02-03": [
        { id: "7276", name: "Nurhayat Aksoy" },
        { id: "7356", name: "Malek Saleh Ali Salo" },
        { id: "6252", name: "Nabila Assaad Hage Hassan" },
        { id: "7225", name: "Miguel Angel Aguilar Leon" },
        { id: "9767", name: "Isidora Saveljic" },
        { id: "9862", name: "Aleksandra Vojinovic" },
    ],
	"2026-02-04": [
        { id: "6653", name: "Mahmoud Mahmoud Abdelkader Mekawy" },
        { id: "6938", name: "Elias Salim Karam" },
        { id: "7465", name: "Nada Ashraf Aiada Awad Abozuhry" },
        { id: "6987", name: "Shadi Basem Shrafedin Abofakher" },
        { id: "9855", name: "Mostafa El Sayed Katarya" },
        { id: "7106", name: "Mohammed Yasser Zamiti" },
    ],
	 "2026-02-05": [
        { id: "7225", name: "Miguel Angel Aguilar Leon" },
        { id: "7070", name: "Katarzyna Weronika Borowicz" },
        { id: "6762", name: "Hanan Aied Sweis" },
        { id: "6614", name: "Hanna Jiries Hanna Ibrahim" },
        { id: "6403", name: "Mohammad Hazim Abdel Latif Maslamani" },
        { id: "6986", name: "Bashar Nazmi Hussein Alswalhi" },
    ],
};
