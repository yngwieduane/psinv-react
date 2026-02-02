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
};
