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
        { id: "9809", name: "Sana Khalfallah" },
        { id: "7005", name: "Yousef Ahmad Daoud" },
    ],
    "2026-01-25": [
        { id: "7166", name: "Ali Nabil Ali Abdelrahman Shatta" },
        { id: "7277", name: "Youmna Ashraf Mohamed Ali Metwally" },
        { id: "7253", name: "Maya Ramos Da Silva" },
        { id: "7225", name: "Miguel Angel Aguilar Leon" },
    ],
    "2026-01-26": [
        { id: "6403", name: "Mohammad Hazim Abdel Latif Maslamani" },
        { id: "6653", name: "Mahmoud Mahmoud Abdelkader Mekawy" },
        { id: "7043", name: "Omar Khaleel Subhi Basheer" },
        { id: "6827", name: "Munif Ali Alsoliman" },
    ],
    "2026-01-27": [
        { id: "9862", name: "Aleksandra Vojinovic" },
        { id: "9767", name: "Isidora Saveljic" },
        { id: "6171", name: "Shaima Sherif Mohamed Ibrahim Aly" },
        { id: "6563", name: "Ahmad Amjed Subhi Abusalah" },
    ],
    "2026-01-28": [
        { id: "6267", name: "Ali Hekmat Fawzi" },
        { id: "6592", name: "Arnay Baiboranova" },
        { id: "6791", name: "Aymen Sioud" },
        { id: "6403", name: "Mohammad Hazim Abdel Latif Maslamani" },
    ],
    "2026-01-29": [
        { id: "6986", name: "Bashar Nazmi Hussein Alswalhi" },
        { id: "6232", name: "Osama Ibrahim Suleiman Alhawamdeh" },
        { id: "6614", name: "Hanna Jiries Hanna Ibrahim" },
        { id: "4576", name: "Masoud Mamoun Alneser" },
    ],
    "2026-01-30": [
        { id: "6171", name: "Shaima Sherif Mohamed Ibrahim Aly" },
        { id: "6826", name: "Ameer Arsheed" },
        { id: "6252", name: "Nabila Assaad Hage Hassan" },
        { id: "9831", name: "Tareq A A Irfan" },
    ],
    "2026-01-31": [
        { id: "6216", name: "Ahmed Khadragy Ibrahim Moustafa Wasel" },
        { id: "7215", name: "Malek Maher Saeed Othman" },
        { id: "7367", name: "Mohammad Amjed Subhi AbuSalah" },
        { id: "7433", name: "Zaid Saif Eddin Mahmoud El Irani" },
    ],
};
