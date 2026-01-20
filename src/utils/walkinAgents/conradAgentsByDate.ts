// src/utils/walkinAgents/conradAgentsByDate.ts

export type WalkinAgent = {
    id: string;
    name: string;
};

export type AgentsByDate = Record<string, WalkinAgent[]>;

export const CONRAD_AGENTS_BY_DATE: AgentsByDate = {
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
};
